const { ImportJob } = require('../models');

exports.enqueue = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'file required' });
  const job = await ImportJob.create({
    userId: req.user.id,
    sourceFile: {
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      storagePath: req.file.path
    },
    status: 'queued'
  });
  res.status(201).json(job);
};

exports.list = async (req, res) => {
  const jobs = await ImportJob.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(jobs);
};

exports.getOne = async (req, res) => {
  const job = await ImportJob.findOne({ _id: req.params.id, userId: req.user.id });
  if (!job) return res.status(404).json({ error: 'Not found' });
  res.json(job);
};
