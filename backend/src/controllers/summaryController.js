const mongoose = require('mongoose');
const { Transaction } = require('../models');

exports.getSummary = async (req, res) => {
  const { from, to } = req.query;
  const userObjectId = new mongoose.Types.ObjectId(req.user.id);
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

  res.json({
    totals: totals.reduce((acc, x) => (acc[x._id] = x.totalMinor, acc), {}),
    expensesByCategory: byCategory.map(x => ({ category: x._id, totalMinor: x.totalMinor }))
  });
};
