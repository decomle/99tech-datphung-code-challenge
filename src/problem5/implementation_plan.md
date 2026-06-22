# Todo API - TypeScript + Express + MongoDB

## Overview

This project implements a RESTful Todo API using:

* TypeScript
* Express.js
* MongoDB
* Mongoose
* Docker
* Jest
* Supertest

The application follows a layered architecture:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
MongoDB
```

---

# Requirements

Implement CRUD operations for Todo items.

## Functionalities

### Create Todo

```http
POST /todos
```

### List Todos

```http
GET /todos
```

Supports filtering and pagination.

### Get Todo Details

```http
GET /todos/:id
```

### Update Todo

```http
PUT /todos/:id
```

### Delete Todo

```http
DELETE /todos/:id
```

---

# Tech Stack

| Layer       | Technology |
| ----------- | ---------- |
| Runtime     | Node.js    |
| Language    | TypeScript |
| Framework   | Express    |
| Database    | MongoDB    |
| ODM         | Mongoose   |
| Validation  | Zod        |
| Testing     | Jest       |
| API Testing | Supertest  |
| Container   | Docker     |

---

# Project Structure

```text
src/
├── config/
│   └── database.ts
│
├── controllers/
│   └── todo.controller.ts
│
├── services/
│   └── todo.service.ts
│
├── repositories/
│   └── todo.repository.ts
│
├── models/
│   └── todo.model.ts
│
├── routes/
│   └── todo.routes.ts
│
├── validators/
│   └── todo.validator.ts
│
├── middleware/
│   ├── validate.middleware.ts
│   └── error.middleware.ts
│
├── types/
│
├── tests/
│   ├── unit/
│   └── integration/
│
├── app.ts
└── server.ts

docker-compose.yml
.env
README.md
```

---

# Todo Model

## Fields

```ts
{
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

---

# API Design

## Create Todo

### Request

```http
POST /todos
```

```json
{
  "title": "Learn TypeScript",
  "description": "Finish coding challenge"
}
```

### Response

```json
{
  "_id": "...",
  "title": "Learn TypeScript",
  "description": "Finish coding challenge",
  "completed": false
}
```

Status:

```http
201 Created
```

---

## List Todos

### Request

```http
GET /todos
```

### Optional Filters

```http
GET /todos?completed=true
GET /todos?title=typescript
GET /todos?page=1&limit=10
```

### Response

```json
[
  {
    "_id": "...",
    "title": "Learn TypeScript",
    "completed": false
  }
]
```

---

## Get Todo

```http
GET /todos/:id
```

Response:

```http
200 OK
```

or

```http
404 Not Found
```

---

## Update Todo

```http
PUT /todos/:id
```

Request:

```json
{
  "completed": true
}
```

Response:

```http
200 OK
```

---

## Delete Todo

```http
DELETE /todos/:id
```

Response:

```http
204 No Content
```

---

# MongoDB Setup

## docker-compose.yml

```yaml
version: "3.9"

services:
  mongodb:
    image: mongo:7

    container_name: todo-mongodb

    ports:
      - "27017:27017"

    environment:
      MONGO_INITDB_DATABASE: todo_db

    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

Run:

```bash
docker compose up -d
```

Verify:

```bash
docker ps
```

---

# Environment Variables

## .env

```env
PORT=3000

MONGODB_URI=mongodb://localhost:27017/todo_db
```

---

# Mongoose Schema

```ts
const TodoSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    completed: {
      type: Boolean,
      default: false
    },

    dueDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);
```

---

# Repository Layer

Responsible only for database operations.

## Methods

```ts
create()

findAll()

findById()

update()

delete()
```

Example:

```ts
async findById(id: string) {
  return Todo.findById(id);
}
```

---

# Service Layer

Responsible for business logic.

## Responsibilities

* Validate business rules
* Handle missing resources
* Coordinate repository calls

Example:

```ts
async getTodo(id: string) {
  const todo = await repository.findById(id);

  if (!todo) {
    throw new NotFoundError("Todo not found");
  }

  return todo;
}
```

---

# Controller Layer

Responsible for:

* Request handling
* Response formatting
* HTTP status codes

Example:

```ts
createTodo(req, res)
```

Flow:

```text
Request
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
MongoDB
```

---

# Validation

Use Zod.

## Create Todo Schema

```ts
const createTodoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.string().datetime().optional()
});
```

## Update Todo Schema

```ts
const updateTodoSchema = createTodoSchema
  .partial()
  .extend({
    completed: z.boolean().optional()
  });
```

---

# Error Handling

Centralized middleware.

Example responses:

```json
{
  "message": "Todo not found"
}
```

```json
{
  "message": "Validation failed"
}
```

---

# Filtering

Supported query params:

```http
GET /todos?completed=true
GET /todos?title=typescript
```

Repository implementation:

```ts
const filter = {};

if (completed !== undefined) {
  filter.completed = completed;
}

if (title) {
  filter.title = {
    $regex: title,
    $options: "i"
  };
}
```

---

# Pagination

Query:

```http
GET /todos?page=1&limit=10
```

Implementation:

```ts
skip = (page - 1) * limit;
```

```ts
find()
.skip(skip)
.limit(limit)
```

---

# Unit Testing

## Tools

* Jest

## Mock

Mock repository layer.

```text
Service
 ↑
Mock Repository
```

### Create Todo

Cases:

* creates todo successfully
* rejects empty title

### Get Todo

Cases:

* returns todo
* throws not found

### Update Todo

Cases:

* updates existing todo
* throws not found

### Delete Todo

Cases:

* deletes existing todo
* throws not found

---

# Integration Testing

## Tools

* Jest
* Supertest

Test API endpoints.

### POST /todos

* should create todo
* should return 400 for invalid payload

### GET /todos

* should return todos
* should support filtering
* should support pagination

### GET /todos/:id

* should return todo
* should return 404

### PUT /todos/:id

* should update todo

### DELETE /todos/:id

* should delete todo

---

# Scripts

```json
{
  "dev": "nodemon",
  "build": "tsc",
  "start": "node dist/server.js",
  "test": "jest",
  "lint": "eslint ."
}
```

---

# Bonus Features

If time permits:

## Swagger

```http
/api-docs
```

## Request Logging

Using Morgan.

## Health Check

```http
GET /health
```

Response:

```json
{
  "status": "ok"
}
```

## Soft Delete

Add:

```ts
isDeleted: boolean
```

Instead of permanently deleting records.

---

# Deliverables

* TypeScript Express API
* MongoDB Docker setup
* CRUD endpoints
* Repository / Service / Controller architecture
* Validation with Zod
* Unit tests
* Integration tests
* README documentation
* Docker Compose
* Environment configuration
* Error handling middleware
