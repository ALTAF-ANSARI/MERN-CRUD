# MERN CRUD App (Task Manager)

A simple CRUD application using **MongoDB, Express, React (Vite), Node.js**.

## Features
- Create, Read, Update, Delete tasks
- Mark tasks complete / incomplete
- REST API with Mongoose validation

## Folder Structure
```
mern-crud/
├── server/   -> Express + MongoDB API
└── client/   -> React (Vite) frontend
```

## Prerequisites
- Node.js 18+
- MongoDB running locally (`mongodb://127.0.0.1:27017`) or a MongoDB Atlas URI

## Run the Backend
```bash
cd server
npm install
cp .env.example .env     # edit MONGO_URI if needed
npm run dev              # starts on http://localhost:5000
```

## Run the Frontend
```bash
cd client
npm install
npm run dev              # opens on http://localhost:5173
```
The Vite dev server proxies `/api` requests to `http://localhost:5000`.

## API Endpoints
| Method | Endpoint         | Description       |
|--------|------------------|-------------------|
| GET    | /api/tasks       | Get all tasks     |
| GET    | /api/tasks/:id   | Get one task      |
| POST   | /api/tasks       | Create a task     |
| PUT    | /api/tasks/:id   | Update a task     |
| DELETE | /api/tasks/:id   | Delete a task     |

Sample POST body:
```json
{ "title": "Learn MERN", "description": "Build a CRUD app" }
```
