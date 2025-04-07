const express = require('express');
const app = express();
const port = 3000;
const UserAgents = require('user-agents');
const userAgent = new UserAgents().toString();
console.log(userAgent); // Add this to verify the value
const dir = '/user';

app.get('/', (req, res) => {
  res.send('Hello Express!');
  console.log(`Received GET request to the API with userAgent:`);
  console.log(userAgent.toString());
});

app.post('/', (req, res) => {
  res.send('Received a POST request to the API...');
  console.log(`Received POST request from port: ${port} to ${dir}userAgent:`);
  console.log(userAgent.toString());
});

app.put('/user', (req, res) => {
  res.send('Received a PUT request to the API...');
  console.log(`Received PUT request from port: ${port} to ${dir}userAgent:`);
  console.log(userAgent.toString());
});

app.delete('/user', (req, res) => {
  res.send('Received a DELETE request to the API...');
  console.log(`Received DELETE request from port: ${port} to ${dir}userAgent:`);
  console.log(userAgent.toString());
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

// Export the app and userAgent for testing
module.exports = { app, userAgent };
