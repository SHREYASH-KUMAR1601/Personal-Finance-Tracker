const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const Tesseract = require('tesseract.js');
const { Receipt, Transaction } = require('../models');

exports.upload = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'file required' });
  const { originalname, mimetype, path: storagePath } = req.file;

  let text = '';
  try {
    if (mimetype === 'application/pdf') {
      const data = await pdfParse(fs.readFileSync(storagePath));
      text = data.text || '';
    } else {
      const ocr = await Tesseract.recognize(storagePath, 'eng');
      text = ocr.data.text || '';
    }
  } catch {}

  const amtMatch = text.match(/(?:total|amount)[^\d]{0,10}(\d+(?:[.,]\d{2})?)/i) || text.match(/\b(\d+(?:[.,]\d{2})?)\b/);
  const amountMinor = amtMatch ? Math.round(parseFloat(amtMatch[1].replace(',', '')) * 100) : null;

  const r = await Receipt.create({
    userId: req.user.id,
    originalName: originalname,
    mimeType: mimetype,
    storagePath,
    text,
    parsed: { amountMinor, currency: 'INR', category: 'Misc' },
    status: 'parsed'
  });

  res.status(201).json(r);
};

exports.confirm = async (req, res) => {
  const receipt = await Receipt.findOne({ _id: req.params.id, userId: req.user.id });
  if (!receipt) return res.status(404).json({ error: 'Not found' });

  const merged = { ...receipt.parsed, ...req.body };
  const { amountMinor, currency = 'INR', date = new Date(), category = 'Misc', note = '', merchant = '' } = merged;
  if (!amountMinor) return res.status(400).json({ error: 'amountMinor required' });

  const tx = await Transaction.create({
    userId: req.user.id,
    type: 'expense',
    amountMinor,
    currency,
    category,
    note,
    date,
    source: 'receipt',
    receiptId: receipt._id,
    merchant
  });

  receipt.status = 'confirmed';
  await receipt.save();

  res.status(201).json(tx);
};

exports.list = async (req, res) => {
  const docs = await Receipt.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(docs);
};

exports.getOne = async (req, res) => {
  const doc = await Receipt.findOne({ _id: req.params.id, userId: req.user.id });
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.json(doc);
};
