const express = require('express');
const router = express.Router();
const { searchJobsBySkill } = require('../controllers/seekerJobController');

router.get('/search', searchJobsBySkill);

module.exports = router;
