const request = require('supertest');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('../routes/users'); // Adjust the path as necessary

app.use(bodyParser.json());
app.use('/api/users', userRoutes); // Use your actual routes

describe('User Routes API', () => {
  // Test for user sign-up
  it('should sign up a new user', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({ username: 'newuser', password: 'password123', email: 'newuser@example.com' });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('username', 'newuser');
  });

  // Test for user login
  it('should log in a user', async () => {
    // First, create a user to log in
    await request(app)
      .post('/api/users/register')
      .send({ username: 'loginuser', password: 'password123', email: 'loginuser@example.com' });

    const response = await request(app)
      .post('/api/users/login')
      .send({ username: 'loginuser', password: 'password123' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token'); // Assuming login returns a token
  });

  // Test for login with invalid credentials
  it('should fail login with invalid credentials', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({ username: 'wronguser', password: 'wrongpassword' });

    expect(response.statusCode).toBe(401); // Unauthorized
    expect(response.body).toHaveProperty('error', 'Invalid credentials');
  });

  // Test for user sign-up with existing username
  it('should fail sign up with existing username', async () => {
    // Create a user first
    await request(app)
      .post('/api/users/register')
      .send({ username: 'existinguser', password: 'password123', email: 'existinguser@example.com' });

    const response = await request(app)
      .post('/api/users/signup')
      .send({ username: 'existinguser', password: 'newpassword', email: 'newemail@example.com' });

    expect(response.statusCode).toBe(400); // Bad Request
    expect(response.body).toHaveProperty('error', 'Username already exists');
  });
});
