const { ImportJob } = require('../models');

exports.enqueue = (userId, file) =>
  ImportJob.create({
    userId,
    sourceFile: {
      originalName: file.originalname,
      mimeType: file.mimetype,
      storagePath: file.path
    },
    status: 'queued'
  });

exports.list = (userId) =>
  ImportJob.find({ userId }).sort({ createdAt: -1 });

exports.getOne = (userId, id) =>
  ImportJob.findOne({ _id: id, userId });
