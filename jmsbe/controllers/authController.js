const jwt = require('jsonwebtoken');
const Recruiter = require('../models/Recruiter');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

// @desc    Register a new recruiter
// @route   POST /api/auth/register
const registerRecruiter = async (req, res) => {
  const { name, email, password, phone, company } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Name, email and password are required',
    });
  }

  try {
    const existingRecruiter = await Recruiter.findOne({ email });
    if (existingRecruiter) {
      return res.status(400).json({
        success: false,
        message: 'Email is already registered',
      });
    }

    const recruiter = await Recruiter.create({
      name,
      email,
      password,
      phone,
      company,
    });

    const token = generateToken(recruiter._id);

    res.status(201).json({
      success: true,
      message: 'Recruiter registered successfully',
      data: {
        _id: recruiter._id,
        name: recruiter.name,
        email: recruiter.email,
        phone: recruiter.phone,
        company: recruiter.company,
        token,
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

// @desc    Login recruiter
// @route   POST /api/auth/login
const loginRecruiter = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required',
    });
  }

  try {
    const recruiter = await Recruiter.findOne({ email });

    if (!recruiter || !(await recruiter.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = generateToken(recruiter._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        _id: recruiter._id,
        name: recruiter.name,
        email: recruiter.email,
        phone: recruiter.phone,
        company: recruiter.company,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get logged-in recruiter profile
// @route   GET /api/auth/profile
const getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Profile fetched successfully',
    data: req.recruiter,
  });
};

module.exports = { registerRecruiter, loginRecruiter, getProfile };
