const express = require('express');
const app = express();
const port = 3000;
const UserAgents = require('user-agents');
const userAgent = new UserAgents().toString();
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

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use(() => {
  console.log(userAgent);
});

// userAgentLogging - fix this to not use new userAgent(); and rather pull the existing UA string.
console.log(userAgent); // Logging the existing userAgent string
