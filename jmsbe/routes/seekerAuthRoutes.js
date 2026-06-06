const express = require('express');
const router = express.Router();
const { registerSeeker, loginSeeker } = require('../controllers/seekerAuthController');

router.post('/register', registerSeeker);
router.post('/login', loginSeeker);

module.exports = router;
