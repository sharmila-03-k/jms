const express = require('express');
const router = express.Router();
const { applyForJob, getMyApplications } = require('../controllers/applicationController');

router.post('/apply', applyForJob);
router.get('/my-applications', getMyApplications);

module.exports = router;
