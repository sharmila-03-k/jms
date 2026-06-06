# JMSBE — Job Seeker API Extension

This document covers the **Job Seeker** APIs — an extension to the existing Job Management System backend.

A Job Seeker can:
- Register an account
- Log in
- Search jobs by skill
- Apply for a job
- View all jobs they have applied for

> **Note:** No token/authentication required. The `_id` returned from login is used directly in apply and my-applications requests.

---

## Base URL

```
http://localhost:5000
```

---

## Job Seeker Models (for reference)

### JobSeeker Fields
| Field | Type | Notes |
|---|---|---|
| name | String | Required |
| email | String | Required, unique |
| password | String | Required, stored as hash |
| phone | String | Optional |
| skills | Array of Strings | e.g. `["React", "JavaScript"]` |

### Application Fields
| Field | Type | Notes |
|---|---|---|
| jobSeeker | ObjectId | Reference to JobSeeker |
| job | ObjectId | Reference to Job |

---

## API Reference

---

### Job Seeker Auth — `/api/seeker/auth`

---

#### Register a Job Seeker

```
POST http://localhost:5000/api/seeker/auth/register
Content-Type: application/json
```

Request Body:
```json
{
  "name": "Ravi Kumar",
  "email": "ravi@example.com",
  "password": "ravi1234",
  "phone": "9876543210",
  "skills": ["React", "JavaScript", "CSS"]
}
```

Success Response `201`:
```json
{
  "success": true,
  "message": "Job seeker registered successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Ravi Kumar",
    "email": "ravi@example.com",
    "phone": "9876543210",
    "skills": ["React", "JavaScript", "CSS"]
  }
}
```

Error Response `400` (email already exists):
```json
{
  "success": false,
  "message": "Email already registered"
}
```

---

#### Login as Job Seeker

```
POST http://localhost:5000/api/seeker/auth/login
Content-Type: application/json
```

Request Body:
```json
{
  "email": "ravi@example.com",
  "password": "ravi1234"
}
```

Success Response `200`:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Ravi Kumar",
    "email": "ravi@example.com",
    "phone": "9876543210",
    "skills": ["React", "JavaScript", "CSS"]
  }
}
```

Error Response `401`:
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

> **Note:** Copy the `_id` from the login response. You will use it as `seekerId` when applying for jobs and viewing your applications.

---

### Jobs API — `/api/seeker/jobs`

---

#### Search Jobs by Skill

```
GET http://localhost:5000/api/seeker/jobs/search?skill=React
```

- Replace `React` with any skill you want to search.
- The search is **case-insensitive**.
- Returns all jobs where the `skills` array contains the given skill.

Success Response `200`:
```json
{
  "success": true,
  "message": "Jobs fetched successfully",
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
      "title": "Frontend Developer",
      "companyName": "Google",
      "location": "Hyderabad",
      "salary": "12 LPA",
      "jobType": "Full Time",
      "experience": "2 Years",
      "skills": ["React", "JavaScript", "Redux"],
      "recruiter": {
        "name": "Anjali Sharma",
        "company": "TechHire Solutions"
      }
    }
  ]
}
```

Response when no jobs match `200`:
```json
{
  "success": true,
  "message": "No jobs found for the given skill",
  "data": []
}
```

---

### Applications API — `/api/seeker/applications`

---

#### Apply for a Job

```
POST http://localhost:5000/api/seeker/applications/apply
Content-Type: application/json
```

Request Body:
```json
{
  "seekerId": "64f1a2b3c4d5e6f7a8b9c0d1",
  "jobId": "64f1a2b3c4d5e6f7a8b9c0d2"
}
```

- `seekerId` — the `_id` you got from the login response
- `jobId` — the `_id` of the job from the search results

Success Response `201`:
```json
{
  "success": true,
  "message": "Applied successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d3",
    "jobSeeker": "64f1a2b3c4d5e6f7a8b9c0d1",
    "job": "64f1a2b3c4d5e6f7a8b9c0d2",
    "appliedAt": "2026-06-04T10:30:00.000Z"
  }
}
```

Error Response `400` (already applied):
```json
{
  "success": false,
  "message": "You have already applied for this job"
}
```

Error Response `404` (job not found):
```json
{
  "success": false,
  "message": "Job not found"
}
```

---

#### Get My Applied Jobs

```
GET http://localhost:5000/api/seeker/applications/my-applications?seekerId=64f1a2b3c4d5e6f7a8b9c0d1
```

- Replace the `seekerId` value with the `_id` from your login response.

Success Response `200`:
```json
{
  "success": true,
  "message": "Applied jobs fetched successfully",
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d3",
      "appliedAt": "2026-06-04T10:30:00.000Z",
      "job": {
        "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
        "title": "Frontend Developer",
        "companyName": "Google",
        "location": "Hyderabad",
        "salary": "12 LPA",
        "jobType": "Full Time",
        "experience": "2 Years",
        "skills": ["React", "JavaScript", "Redux"]
      }
    }
  ]
}
```

Response when no applications found `200`:
```json
{
  "success": true,
  "message": "No applications found",
  "data": []
}
```

---

## How to Test — Step by Step

Follow these steps in order using **Thunder Client** or **Postman**:

| Step | Action | API |
|---|---|---|
| 1 | Register as a job seeker | `POST /api/seeker/auth/register` |
| 2 | Login with your credentials | `POST /api/seeker/auth/login` |
| 3 | Copy the `_id` from the login response | — |
| 4 | Search for jobs by skill | `GET /api/seeker/jobs/search?skill=React` |
| 5 | Copy a `_id` from a job in the results | — |
| 6 | Apply for that job (send seekerId + jobId in body) | `POST /api/seeker/applications/apply` |
| 7 | View all your applied jobs (pass seekerId in query) | `GET /api/seeker/applications/my-applications?seekerId=...` |

---

## New Files Added to the Project

The following files were added to implement these APIs:

```
jmsbe/
├── models/
│   ├── JobSeeker.js              ← Job seeker schema
│   └── Application.js            ← Application schema
├── controllers/
│   ├── seekerAuthController.js   ← Register & Login logic
│   ├── seekerJobController.js    ← Search jobs logic
│   └── applicationController.js  ← Apply & view applications logic
└── routes/
    ├── seekerAuthRoutes.js        ← /api/seeker/auth
    ├── seekerJobRoutes.js         ← /api/seeker/jobs
    └── applicationRoutes.js       ← /api/seeker/applications
```

---

## API Response Format

All APIs follow the same consistent response structure used in the existing project.

**Success:**
```json
{
  "success": true,
  "message": "Description of what happened",
  "data": {}
}
```

**Error:**
```json
{
  "success": false,
  "message": "Description of the error"
}
```
