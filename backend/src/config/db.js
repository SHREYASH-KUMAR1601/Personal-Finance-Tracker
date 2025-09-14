const mongoose = require('mongoose');
const { MONGO_URL } = require('./env');

async function connectDB() {
  mongoose.set('strictQuery', true);
  await mongoose.connect(MONGO_URL);
  return mongoose.connection;
}

module.exports = { connectDB };
