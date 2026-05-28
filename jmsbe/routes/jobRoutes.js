const express = require('express');
const router = express.Router();
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require('../controllers/jobController');

router.route('/').get(getAllJobs).post(createJob);
router.route('/:id').get(getJobById).put(updateJob).delete(deleteJob);

module.exports = router;
