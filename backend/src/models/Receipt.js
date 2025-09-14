const mongoose = require('mongoose');
const { Schema } = mongoose;

const receiptSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },          // image/* or application/pdf
    storagePath: { type: String, required: true },       // disk path or cloud key
    text: { type: String, default: '' },                 // OCR/parsed text
    parsed: {
      amountMinor: { type: Number, default: null },
      currency: { type: String, default: 'INR' },
      date: { type: Date, default: null },
      merchant: { type: String, default: '' },
      category: { type: String, default: 'Misc' }
    },
    status: { type: String, enum: ['uploaded', 'parsed', 'confirmed'], default: 'uploaded' }
  },
  { timestamps: true }
);

receiptSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Receipt', receiptSchema);
