# JMS — Job Management System

Lightweight Job Management System (JMS) with a Node/Express backend and a React frontend.

## Project structure

- `jmsbe/` — backend (Express, MongoDB)
- `jmsfe/` — frontend (React)

## Quick start

Prerequisites: Node.js, npm, and a running MongoDB instance.

1. Start the backend

```bash
cd jmsbe
npm install
# ensure MongoDB is running, then:
npm start
```

The backend runs on `http://localhost:5000` by default.

2. Start the frontend

```bash
cd jmsfe
npm install
npm start
```

The frontend runs on `http://localhost:3000` by default.

## Useful frontend routes

- `/` — Login
- `/seeker/login` — Job seeker login
- `/seeker/register` — Job seeker registration
- `/seeker/jobs` — Search jobs (empty until you search)
- `/seeker/applied` — View your applied jobs

## Backend API (selected endpoints)

- Apply for a job

	- POST `/api/seeker/applications/apply`
	- Body: `{ "seekerId": "<id>", "jobId": "<id>" }`

- View my applications

	- GET `/api/seeker/applications/my-applications?seekerId=<id>`

- Search jobs (seeker)

	- GET `/api/seeker/jobs/search?skill=<skill>`

Refer to `jmsbe/README-JobSeeker.md` for detailed API examples and response samples.

## Notes

- The project uses simple localStorage-based session for seekers (no token required). Copy the `_id` returned from login when calling seeker APIs directly.
- If you want, I can add a Docker Compose file to run MongoDB + backend + frontend together.

