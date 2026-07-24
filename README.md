# Task Management API

A production-ready RESTful Task Management API built with **Node.js**, **Express.js**, and **MongoDB**. The application provides secure authentication, role-based access control (RBAC), task management, analytics, rate limiting, and interactive API documentation using OpenAPI (Swagger).

---

## Overview

This project was developed as part of a Backend Developer Assignment. It demonstrates a modular and scalable REST API architecture with secure authentication, authorization, task management, analytics, and API documentation.

---

---

## Live Demo

**Base URL**

https://task-management-api-pqa2.onrender.com/

**Swagger API Documentation**

https://task-management-api-pqa2.onrender.com/api-docs

---

## Features

### Authentication

- User Registration
- User Login
- User Logout
- Get Authenticated User Profile
- JWT Authentication using HTTP-only Cookies
- Password Hashing using bcrypt

### Role-Based Access Control (RBAC)

Supported roles:

- Admin
- Manager
- User

Permissions are enforced at the endpoint level.

---

## Task Management

- Create Task
- Get All Tasks
- Get Task by ID
- Update Task
- Delete Task
- Assign Task to User

---

## Search, Filtering and Pagination

Supports:

- Pagination
- Search by Title
- Filter by Status
- Filter by Priority

Example:

```http
GET /api/tasks?page=1&limit=10&status=TODO&priority=HIGH&search=Backend
```

---

## Analytics

Analytics endpoint provides:

- Total Tasks
- Completed Tasks
- Pending Tasks
- In Progress Tasks
- Overdue Tasks
- Completion Rate

Endpoint:

```http
GET /api/analytics
```

---

## Security Features

- JWT Authentication
- HTTP-only Cookies
- Role-Based Authorization
- Password Hashing
- Request Validation
- Rate Limiting
- Global Error Handling
- Protected Routes

---

## API Documentation

Swagger UI is available at:

```
http://localhost:5000/api-docs
```

## Project Structure

```
src
├── config
├── constants
├── controllers
├── middleware
├── models
├── routes
├── services
├── utils
├── validators
├── app.js
└── server.js
```

---

## Technology Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication

- JWT
- bcrypt

### Validation

- express-validator

### Documentation

- Swagger UI
- swagger-jsdoc

### Security

- express-rate-limit
- cookie-parser

---

## Installation

Clone the repository

```bash
git clone https://github.com/Veer-ctrl/task-management-api.git
```

Navigate into the project

```bash
cd task-management-api
```

Install dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

JWT_EXPIRES_IN=7d

NODE_ENV=development
```

---

## Running the Application

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

## API Endpoints

### Authentication

| Method | Endpoint |
|--------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| POST | /api/auth/logout |
| GET | /api/auth/me |

### Users

| Method | Endpoint |
|--------|----------|
| GET | /api/users |
| GET | /api/users/:id |
| PATCH | /api/users/:id/role |
| PATCH | /api/users/:id/team |
| DELETE | /api/users/:id |

### Tasks

| Method | Endpoint |
|--------|----------|
| POST | /api/tasks |
| GET | /api/tasks |
| GET | /api/tasks/:id |
| PUT | /api/tasks/:id |
| DELETE | /api/tasks/:id |
| PATCH | /api/tasks/:id/assign |

### Analytics

| Method | Endpoint |
|--------|----------|
| GET | /api/analytics |

---

## Swagger Documentation

Interactive API documentation is available through Swagger UI.

The documentation includes:

- Endpoint descriptions
- Request schemas
- Response schemas
- Query parameters
- Authentication requirements

---

## Bonus Features Implemented

- Analytics API
- Rate Limiting
- Search & Filtering
- Pagination
- OpenAPI 3.0 Documentation

---

## Assumptions

- Managers can manage users within their assigned team.
- Users can only access and manage their own tasks.
- Admins have unrestricted access.
- JWT tokens are stored in HTTP-only cookies.
- MongoDB is used as the primary database.


## Author

**Veer Pratap Singh**

GitHub: https://github.com/Veer-ctrl

---

## License

This project was developed as part of a Backend Developer Assignment and is intended for educational and evaluation purposes.
