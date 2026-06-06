const Job = require('../models/Job');

// @desc    Search jobs by skill
// @route   GET /api/seeker/jobs/search?skill=React
const searchJobsBySkill = async (req, res) => {
  const { skill } = req.query;

  if (!skill) {
    return res.status(400).json({
      success: false,
      message: 'Skill query parameter is required',
    });
  }

  try {
    const jobs = await Job.find({
      skills: { $regex: skill, $options: 'i' },
    })
      .populate('recruiter', 'name company')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: jobs.length > 0 ? 'Jobs fetched successfully' : 'No jobs found for the given skill',
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = { searchJobsBySkill };
