# TaskFlow - MERN Project Management Application

TaskFlow is a full-stack project and task management web application built using the MERN stack.  
It allows users to create projects, manage tasks, track progress, and securely access their personal workspace.

---

## Features

### Authentication
- User registration and login
- Password encryption using bcrypt
- JWT based authentication
- Protected routes for authenticated users

### Project Management
- Create projects
- Update project details
- Delete projects
- Track project status and deadlines

### Task Management
- Create tasks under projects
- Assign priority levels
- Update task status
- Edit and delete tasks
- Search tasks by title
- Filter tasks by priority and status

### Dashboard
- View total projects
- View pending tasks
- View completed tasks
- Centralized project overview

---

## Tech Stack

### Frontend
- React.js
- React Router
- Bootstrap
- JavaScript

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js

---


## Project Structure

TaskFlow/

│
├── backend/
│
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── .env
│
│
├── frontend/
│
│   ├── src/
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Projects.jsx
│   │   └── Tasks.jsx
│   │
│   └── package.json
│
└── README.md

---


## API Endpoints

### Authentication

POST /api/auth/register

POST /api/auth/login

---

### Projects

GET    /api/projects

POST   /api/projects

PUT    /api/projects/:id

DELETE /api/projects/:id

---

### Tasks

GET    /api/tasks

POST   /api/tasks

PUT    /api/tasks/:id

DELETE /api/tasks/:id

---

## Authentication Flow

1. User registers an account
2. Backend hashes password
3. JWT token is generated
4. Token stored in browser local storage
5. Token used for protected API requests

---


## Author

Developed as a MERN stack portfolio project.