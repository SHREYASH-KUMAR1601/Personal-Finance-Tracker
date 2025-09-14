const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: { type: String, enum: ['income', 'expense'], required: true, index: true },
    amountMinor: { type: Number, required: true },            // store in paise/cents
    currency: { type: String, default: 'INR' },               // simple default
    category: { type: String, required: true },               // free text for speed
    note: { type: String, default: '' },
    date: { type: Date, required: true, index: true },        // when it happened
    source: { type: String, enum: ['manual', 'receipt', 'import'], default: 'manual' },
    receiptId: { type: Schema.Types.ObjectId, ref: 'Receipt', default: null }, // link if parsed
    merchant: { type: String, default: '' }                   // optional from receipt
  },
  { timestamps: true }
);

// fast range queries per user
transactionSchema.index({ userId: 1, date: -1 });
transactionSchema.index({ userId: 1, type: 1, category: 1 });

module.exports = mongoose.model('Transaction', transactionSchema);
