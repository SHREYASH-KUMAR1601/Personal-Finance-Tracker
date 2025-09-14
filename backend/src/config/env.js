const path = require('path');
require('dotenv').config();

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT || 5000),
  MONGO_URL: process.env.MONGODB_URI || process.env.MONGO_URL || 'mongodb://localhost:27017/pft',
  JWT_SECRET: process.env.JWT_SECRET || 'devsecret',
  CORS_ORIGIN: process.env.CORS_ORIGIN || process.env.CLIENT_URL || '*',
  UPLOAD_DIR: process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads'),
};

module.exports = env;
