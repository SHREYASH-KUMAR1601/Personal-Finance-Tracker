const Transaction = require('../models/Transaction');

exports.create = async (req, res) => {
  const { type, amountMinor, currency = 'INR', category, note = '', date, source = 'manual', receiptId = null, merchant = '' } = req.body;
  if (!type || !amountMinor || !category || !date) return res.status(400).json({ error: 'missing fields' });
  const doc = await Transaction.create({ userId: req.user.id, type, amountMinor, currency, category, note, date, source, receiptId, merchant });
  res.status(201).json(doc);
};

exports.list = async (req, res) => {
  const { from, to, page = 1, limit = 50 } = req.query;
  const q = { userId: req.user.id };
  if (from || to) q.date = { ...(from ? { $gte: new Date(from) } : {}), ...(to ? { $lte: new Date(to) } : {}) };
  const docs = await Transaction.find(q).sort({ date: -1, _id: -1 }).skip((+page - 1) * +limit).limit(+limit);
  res.json(docs);
};

exports.getOne = async (req, res) => {
  const doc = await Transaction.findOne({ _id: req.params.id, userId: req.user.id });
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.json(doc);
};

exports.patch = async (req, res) => {
  const updated = await Transaction.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, { $set: req.body }, { new: true });
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
};

exports.remove = async (req, res) => {
  const r = await Transaction.deleteOne({ _id: req.params.id, userId: req.user.id });
  if (!r.deletedCount) return res.status(404).json({ error: 'Not found' });
  res.status(204).end();
};
