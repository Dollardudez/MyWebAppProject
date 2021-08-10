const http = require('http');
require('./src/database');
require('./src/templates');
require('dotenv').config();


const port = process.env.PORT;

// Create the server
const app = require('./src/app');

// Start listening for requests
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

