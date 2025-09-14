const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'devsecret';

exports.sign = (payload, opts = { expiresIn: '7d' }) => jwt.sign(payload, SECRET, opts);
exports.verify = (token) => jwt.verify(token, SECRET);
