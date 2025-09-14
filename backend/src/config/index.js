const env = require('./env');
const { connectDB } = require('./db');
const cors = require('./cors');
const upload = require('./multer');

module.exports = { env, connectDB, cors, upload };
