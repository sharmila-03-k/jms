const jwt = require('jsonwebtoken');
const Recruiter = require('../models/Recruiter');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token provided',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.recruiter = await Recruiter.findById(decoded.id).select('-password');

    if (!req.recruiter) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, recruiter not found',
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, invalid token',
    });
  }
};

module.exports = { protect };
