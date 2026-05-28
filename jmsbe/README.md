# JMSBE — Job Management System Backend

A simplified Naukri-style Job Management System backend built with **Node.js**, **Express.js**, and **MongoDB**.

---

## Prerequisites

Make sure the following are installed on your machine before starting:

| Tool | Download Link |
|---|---|
| Node.js (v18 or above) | https://nodejs.org |
| MongoDB Community Server | https://www.mongodb.com/try/download/community |

To verify installations, run in terminal:

```bash
node -v
npm -v
mongod --version
```

---

## Project Setup Steps

### Step 1 — Unzip the Project

Unzip `jmsbe.zip` to any folder on your machine.

```
jmsbe/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── .env
├── server.js
└── package.json
```

---

### Step 2 — Open Terminal in Project Folder

```bash
cd jmsbe
```

---

### Step 3 — Install Dependencies

```bash
npm install
```

This installs all required packages: `express`, `mongoose`, `dotenv`, `cors`, `bcryptjs`, `jsonwebtoken`, `nodemon`.

---

### Step 4 — Start MongoDB

Open a **new terminal** and run:

```bash
mongod
```

> Keep this terminal running in the background. MongoDB must be running before starting the server.

---

### Step 5 — Start the Backend Server

Go back to the project terminal and run:

```bash
npm run dev
```

You should see:

```
Server running on port 5000
MongoDB Connected: 127.0.0.1
Seeding recruiters and jobs...
  Recruiter created: Anjali Sharma (anjali@techhire.com)
  3 jobs created for Anjali Sharma
  Recruiter created: Rahul Verma (rahul@webworks.com)
  3 jobs created for Rahul Verma
Seeding complete. 2 recruiters and 6 jobs loaded.
```

> On subsequent restarts it will show: `Seed data already exists — skipping seeding.`

---

## Base URL

```
http://localhost:5000
```

---

## API Reference

### Jobs API — `/api/jobs`

#### Get All Jobs
```
GET http://localhost:5000/api/jobs
```
Returns all jobs with recruiter details. No authentication required.

---

#### Get Job by ID
```
GET http://localhost:5000/api/jobs/:id
```
Replace `:id` with the MongoDB `_id` of the job.

---

#### Create a Job
```
POST http://localhost:5000/api/jobs
Content-Type: application/json
```
Request Body:
```json
{
  "title": "Frontend Developer",
  "companyName": "Google",
  "location": "Hyderabad",
  "salary": "12 LPA",
  "jobType": "Full Time",
  "experience": "2 Years",
  "description": "React developer role",
  "skills": ["React", "JavaScript", "Redux"]
}
```

---

#### Update a Job
```
PUT http://localhost:5000/api/jobs/:id
Content-Type: application/json
```
Request Body (partial update supported):
```json
{
  "salary": "15 LPA",
  "location": "Bangalore"
}
```

---

#### Delete a Job
```
DELETE http://localhost:5000/api/jobs/:id
```

---

### Auth API — `/api/auth`

#### Register a Recruiter
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json
```
Request Body:
```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "password": "yourpassword",
  "phone": "9876543210",
  "company": "Your Company"
}
```

---

#### Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json
```
Request Body:
```json
{
  "email": "you@example.com",
  "password": "yourpassword"
}
```

---

## Pre-loaded Seed Data

Two recruiters and 6 jobs are automatically loaded when you start the server for the first time.

### Recruiter 1
| Field | Value |
|---|---|
| Name | Anjali Sharma |
| Email | anjali@techhire.com |
| Password | anjali123 |
| Company | TechHire Solutions |

### Recruiter 2
| Field | Value |
|---|---|
| Name | Rahul Verma |
| Email | rahul@webworks.com |
| Password | rahul1234 |
| Company | WebWorks Pvt Ltd |

Each recruiter has **3 jobs** pre-loaded:
- Frontend Developer — Hyderabad — 8 LPA
- Backend Developer — Bangalore — 10 LPA
- Full Stack Developer — Pune — 14 LPA

---

## API Response Format

All APIs return a consistent JSON structure:

**Success:**
```json
{
  "success": true,
  "message": "Jobs fetched successfully",
  "data": []
}
```

**Error:**
```json
{
  "success": false,
  "message": "Job not found"
}
```

---

## HTTP Status Codes

| Code | Meaning |
|---|---|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 404 | Not Found |
| 500 | Server Error |

---

## Environment Variables

The `.env` file is included in the zip. Default values:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/jmsdb
JWT_SECRET=jmsbe_super_secret_key_change_in_production
JWT_EXPIRES_IN=7d
```

> No changes needed to run locally.

---

## Connecting from React

In your React app, set the base URL:

```js
const BASE_URL = 'http://localhost:5000/api';
```

Example using `fetch`:
```js
const response = await fetch('http://localhost:5000/api/jobs');
const data = await response.json();
console.log(data.data); // array of jobs
```

Example using `axios`:
```js
const { data } = await axios.get('http://localhost:5000/api/jobs');
console.log(data.data); // array of jobs
```

> CORS is enabled — your React app on any port (3000, 5173, etc.) can call this API directly.
