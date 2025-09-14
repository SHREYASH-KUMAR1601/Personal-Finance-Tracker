const express = require('express');
const { env, connectDB, cors } = require('./config');

const authRoutes = require('./routes/auth');
const txRoutes = require('./routes/transactions');
const summaryRoutes = require('./routes/summary');
const receiptRoutes = require('./routes/receipts');
const importRoutes = require('./routes/imports'); // optional

const app = express();
app.use(cors);
app.use(express.json());

connectDB().then(() => console.log('mongo connected'));

app.get('/health', (req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api/transactions', txRoutes);
app.use('/api/summary', summaryRoutes);
app.use('/api/receipts', receiptRoutes);
app.use('/api/imports', importRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

app.listen(env.PORT, () => console.log('api on', env.PORT));
