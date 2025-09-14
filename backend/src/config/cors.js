const cors = require('cors');
const { CORS_ORIGIN } = require('./env');

module.exports = cors({
  origin: CORS_ORIGIN,
  credentials: true,
});
