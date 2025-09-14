const mongoose = require('mongoose');
const { Transaction } = require('../models');

exports.create = (userId, data) =>
  Transaction.create({ ...data, userId });

exports.list = (userId, { from, to, page = 1, limit = 50 } = {}) => {
  const q = { userId };
  if (from || to) q.date = { ...(from ? { $gte: new Date(from) } : {}), ...(to ? { $lte: new Date(to) } : {}) };
  return Transaction.find(q)
    .sort({ date: -1, _id: -1 })
    .skip((+page - 1) * +limit)
    .limit(+limit);
};

exports.getOne = (userId, id) =>
  Transaction.findOne({ _id: id, userId });

exports.patch = (userId, id, patch) =>
  Transaction.findOneAndUpdate({ _id: id, userId }, { $set: patch }, { new: true });

exports.remove = async (userId, id) => {
  const r = await Transaction.deleteOne({ _id: id, userId });
  return r.deletedCount > 0;
};

exports.summary = async (userId, { from, to } = {}) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const match = { userId: userObjectId };
  if (from || to) match.date = { ...(from ? { $gte: new Date(from) } : {}), ...(to ? { $lte: new Date(to) } : {}) };

  const totals = await Transaction.aggregate([
    { $match: match },
    { $group: { _id: '$type', totalMinor: { $sum: '$amountMinor' } } }
  ]);

  const byCategory = await Transaction.aggregate([
    { $match: { ...match, type: 'expense' } },
    { $group: { _id: '$category', totalMinor: { $sum: '$amountMinor' } } },
    { $sort: { totalMinor: -1 } }
  ]);

  return {
    totals: totals.reduce((acc, x) => (acc[x._id] = x.totalMinor, acc), {}),
    expensesByCategory: byCategory.map(x => ({ category: x._id, totalMinor: x.totalMinor }))
  };
};
