const request = require('supertest');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const taskRoutes = require('../routes/tasks'); // Adjust the path as necessary

app.use(bodyParser.json());
app.use('/api/tasks', taskRoutes); // Use your actual routes

describe('Task Manager API', () => {
  // Test for creating a new task
  it('should create a new task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({ name: 'New Task', description: 'Task description' });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('name', 'New Task');
  });

  // Test for getting all tasks
  it('should get all tasks', async () => {
    const response = await request(app).get('/api/tasks');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test for getting a single task by ID
  it('should get a task by ID', async () => {
    const newTask = await request(app)
      .post('/api/tasks')
      .send({ name: 'Task to get', description: 'Description' });

    const taskId = newTask.body.id;
    const response = await request(app).get(`/api/tasks/${taskId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name', 'Task to get');
  });

  // Test for updating a task
  it('should update a task', async () => {
    const newTask = await request(app)
      .post('/api/tasks')
      .send({ name: 'Task to update', description: 'Description' });

    const taskId = newTask.body.id;
    const response = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({ name: 'Updated Task', description: 'Updated description' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name', 'Updated Task');
  });

  // Test for deleting a task
  it('should delete a task', async () => {
    const newTask = await request(app)
      .post('/api/tasks')
      .send({ name: 'Task to delete', description: 'Description' });

    const taskId = newTask.body.id;
    const response = await request(app).delete(`/api/tasks/${taskId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Task deleted successfully');
  });
});
