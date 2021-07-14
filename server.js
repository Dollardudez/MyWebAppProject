const http = require('http');
require('./src/database');
require('./src/templates');


const port = 3000;

// Create the server
const app = require('./src/app');

// Start listening for requests
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

