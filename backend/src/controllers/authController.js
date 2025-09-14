const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../config/env');

exports.register = async (req, res) => {
  try {
    const { email, name = '', password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email, password required' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: 'Email exists' });
    const passwordHash = await bcrypt.hash(password, 10);
    const u = await User.create({ email, name, passwordHash });
    res.status(201).json({ id: u._id.toString(), email: u.email });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const u = await User.findOne({ email });
    if (!u) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, u.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: u._id.toString() }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
