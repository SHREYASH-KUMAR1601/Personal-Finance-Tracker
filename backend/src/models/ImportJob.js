const mongoose = require('mongoose');
const { Schema } = mongoose;

const importJobSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    sourceFile: {
      originalName: { type: String, required: true },
      mimeType: { type: String, required: true },
      storagePath: { type: String, required: true }
    },
    status: { type: String, enum: ['queued', 'processing', 'done', 'failed'], default: 'queued' },
    summary: {
      total: { type: Number, default: 0 },
      inserted: { type: Number, default: 0 },
      skipped: { type: Number, default: 0 },
      reason: { type: String, default: '' }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ImportJob', importJobSchema);
