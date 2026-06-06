const Application = require('../models/Application');
const Job = require('../models/Job');
const JobSeeker = require('../models/JobSeeker');

// @desc    Apply for a job
// @route   POST /api/seeker/applications/apply
const applyForJob = async (req, res) => {
  const { seekerId, jobId } = req.body;

  if (!seekerId || !jobId) {
    return res.status(400).json({
      success: false,
      message: 'seekerId and jobId are required',
    });
  }

  try {
    const seeker = await JobSeeker.findById(seekerId);
    if (!seeker) {
      return res.status(404).json({
        success: false,
        message: 'Job seeker not found',
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    const alreadyApplied = await Application.findOne({ jobSeeker: seekerId, job: jobId });
    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this job',
      });
    }

    const application = await Application.create({ jobSeeker: seekerId, job: jobId });

    res.status(201).json({
      success: true,
      message: 'Applied successfully',
      data: application,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid seekerId or jobId format',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get all jobs applied by a job seeker
// @route   GET /api/seeker/applications/my-applications?seekerId=xxx
const getMyApplications = async (req, res) => {
  const { seekerId } = req.query;

  if (!seekerId) {
    return res.status(400).json({
      success: false,
      message: 'seekerId query parameter is required',
    });
  }

  try {
    const seeker = await JobSeeker.findById(seekerId);
    if (!seeker) {
      return res.status(404).json({
        success: false,
        message: 'Job seeker not found',
      });
    }

    const applications = await Application.find({ jobSeeker: seekerId })
      .populate('job', 'title companyName location salary jobType experience skills')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: applications.length > 0 ? 'Applications fetched successfully' : 'No applications found',
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid seekerId format',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = { applyForJob, getMyApplications };
