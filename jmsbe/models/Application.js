const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    jobSeeker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobSeeker',
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Application', applicationSchema);
