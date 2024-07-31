# Task Manager App

# Overview

The Task Manager Application is a full-stack project that allows users to manage their tasks efficiently. It includes user authentication, task creation, updating, deletion, and a task board interface to visualize the tasks.

# Prerequisites

### Node.js (v14 or later)

### npm (v6 or later)

### MongoDB (locally installed or a MongoDB Atlas account)

# Backend

## Technologies Used

### Node.js

### Express.js

### MongoDB (Mongoose)

### Passport.js (JWT Authentication)

### Bcrypt.js (Password Hashing)

# Installation

## Clone the repository

### `git clone https://github.com/lokesh21012002/Task-Manager-Backend.git`

### `cd task-manager-app/`

### `npm install`

## Set up environment variables

Create a .env file in the backend directory and add the following environment variables:

### `mongoURI=your_mongo_db_uri`

### `secretOrKey=your_jwt_secret`

### `PORT=5000`

## Run the backend server

### `npm start`

## API Endpoints

### `Register User: POST /api/users/register`

### `Login User: POST /api/users/login`

### `Create Task: POST /api/tasks (Protected)`

### `Get All Tasks: GET /api/tasks (Protected)`

### `Update Task: PUT /api/tasks/:id (Protected)`

### `Delete Task: DELETE /api/tasks/:id (Protected)`
