const Recruiter = require('../models/Recruiter');
const Job = require('../models/Job');

const recruitersData = [
  {
    name: 'Anjali Sharma',
    email: 'anjali@techhire.com',
    password: 'anjali123',
    phone: '9876543210',
    company: 'TechHire Solutions',
  },
  {
    name: 'Rahul Verma',
    email: 'rahul@webworks.com',
    password: 'rahul1234',
    phone: '9812345678',
    company: 'WebWorks Pvt Ltd',
  },
];

const jobsData = (recruiterId, companyName) => [
  {
    title: 'Frontend Developer',
    companyName,
    location: 'Hyderabad',
    salary: '8 LPA',
    jobType: 'Full Time',
    experience: '1-2 Years',
    description:
      'We are looking for a skilled Frontend Developer to build responsive web applications using React.js.',
    skills: ['React', 'JavaScript', 'CSS', 'HTML'],
    recruiter: recruiterId,
  },
  {
    title: 'Backend Developer',
    companyName,
    location: 'Bangalore',
    salary: '10 LPA',
    jobType: 'Full Time',
    experience: '2-3 Years',
    description:
      'Experienced Backend Developer needed to design and build RESTful APIs using Node.js and MongoDB.',
    skills: ['Node.js', 'Express', 'MongoDB', 'REST API'],
    recruiter: recruiterId,
  },
  {
    title: 'Full Stack Developer',
    companyName,
    location: 'Pune',
    salary: '14 LPA',
    jobType: 'Full Time',
    experience: '3-5 Years',
    description:
      'Looking for a Full Stack Developer comfortable with both React frontend and Node.js backend development.',
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'Git'],
    recruiter: recruiterId,
  },
];

const seedData = async () => {
  try {
    const existingRecruiters = await Recruiter.countDocuments();
    if (existingRecruiters > 0) {
      console.log('Seed data already exists — skipping seeding.');
      return;
    }

    console.log('Seeding recruiters and jobs...');

    for (const rData of recruitersData) {
      const recruiter = await Recruiter.create(rData);
      console.log(`  Recruiter created: ${recruiter.name} (${recruiter.email})`);

      const jobs = jobsData(recruiter._id, recruiter.company);
      await Job.insertMany(jobs);
      console.log(`  3 jobs created for ${recruiter.name}`);
    }

    console.log('Seeding complete. 2 recruiters and 6 jobs loaded.');
  } catch (error) {
    console.error('Seeding error:', error.message);
  }
};

module.exports = seedData;
