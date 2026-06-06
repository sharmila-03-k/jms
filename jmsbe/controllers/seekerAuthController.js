const JobSeeker = require('../models/JobSeeker');

// @desc    Register a new job seeker
// @route   POST /api/seeker/auth/register
const registerSeeker = async (req, res) => {
  const { name, email, password, phone, skills } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Name, email and password are required',
    });
  }

  try {
    const existingSeeker = await JobSeeker.findOne({ email });
    if (existingSeeker) {
      return res.status(400).json({
        success: false,
        message: 'Email is already registered',
      });
    }

    const seeker = await JobSeeker.create({ name, email, password, phone, skills });

    res.status(201).json({
      success: true,
      message: 'Job seeker registered successfully',
      data: {
        _id: seeker._id,
        name: seeker.name,
        email: seeker.email,
        phone: seeker.phone,
        skills: seeker.skills,
      },
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Login job seeker
// @route   POST /api/seeker/auth/login
const loginSeeker = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required',
    });
  }

  try {
    const seeker = await JobSeeker.findOne({ email });
    if (!seeker) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isMatch = await seeker.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        _id: seeker._id,
        name: seeker.name,
        email: seeker.email,
        phone: seeker.phone,
        skills: seeker.skills,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = { registerSeeker, loginSeeker };
