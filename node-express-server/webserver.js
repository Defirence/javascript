const express = require('express');
const app = express();
const port = 3000;
const UserAgents = require('user-agents');
const userAgent = new UserAgents().toString();
console.log(userAgent); // Add this to verify the value
const dir = '/user';

app.use(express.json()); // Middleware to parse JSON request bodies

// Middleware to handle unsupported Content-Type
app.use((req, res, next) => {
    const supportedTypes = ['application/json'];
    if (req.method === 'POST' && !supportedTypes.includes(req.headers['content-type'])) {
        return res.status(415).send({ error: 'Unsupported Media Type' });
    }
    next();
});

app.get('/', (req, res) => {
  const userAgent = new UserAgents().toString();
  res.status(200).json({ message: 'Hello Express!' }); // Respond with JSON
  console.log(`Received GET request to the API with userAgent: ${userAgent}`);
});

app.post('/', (req, res) => {
    console.log(`User-Agent: ${req.headers['user-agent']}`); // Log the User-Agent header
    res.status(400).send({ error: 'Bad Request' });
});

app.put('/user', (req, res) => {
  try {
    const userAgent = new UserAgents().toString();
    // Ensure the request body is parsed and simulate an error if requested
    if (req.body && req.body.simulateError) {
      throw new Error('Simulated server error');
    }
    res.status(200).json({ message: 'Resource updated successfully' });
    console.log(`Received PUT request from port: ${port} to ${dir} userAgent: ${userAgent}`);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' }); // Handle server error
    console.error('Error occurred on PUT /user:', error.message);
  }
});

app.delete('/user', (req, res) => {
  const userAgent = new UserAgents().toString();
  res.status(204).send(); // Respond with 204 for successful deletion
  console.log(`Received DELETE request from port: ${port} to ${dir} userAgent: ${userAgent}`);
});

// POST /user route
app.post('/user', (req, res) => {
    const { name, age } = req.body;
    if (name && age) {
        // Simulate resource creation
        res.status(201).send({ message: 'User created successfully' });
    } else {
        res.status(400).send({ error: 'Invalid user data' });
    }
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

// Export the app and userAgent for testing
module.exports = { app, userAgent };
