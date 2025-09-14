const { Receipt, Transaction } = require('../models');
const parse = require('./receiptParseService');

exports.storeUpload = async (userId, { originalname, mimetype, path }) => {
  const { text, parsed } = await parse.parseFile({ path, mimetype });
  return Receipt.create({
    userId,
    originalName: originalname,
    mimeType: mimetype,
    storagePath: path,
    text,
    parsed,
    status: 'parsed'
  });
};

exports.confirmToTransaction = async (userId, receiptId, override = {}) => {
  const receipt = await Receipt.findOne({ _id: receiptId, userId });
  if (!receipt) return { error: 'Not found' };

  const merged = { ...receipt.parsed, ...override };
  const { amountMinor, currency = 'INR', date = new Date(), category = 'Misc', note = '', merchant = '' } = merged;
  if (!amountMinor) return { error: 'amountMinor required' };

  const tx = await Transaction.create({
    userId,
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

  return { transaction: tx };
};

exports.list = (userId) =>
  Receipt.find({ userId }).sort({ createdAt: -1 });

exports.getOne = (userId, id) =>
  Receipt.findOne({ _id: id, userId });
