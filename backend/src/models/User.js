const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String, default: '' },
    passwordHash: { type: String, required: true }, // plain bcrypt hash
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
