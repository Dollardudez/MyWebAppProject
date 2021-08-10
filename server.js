const http = require('http');
require('./src/database');
require('./src/templates');


const port = process.env.PORT || 3000;

// Create the server
const app = require('./src/app');

// Start listening for requests
app.listen(8080, () => {
  console.log(`Listening on port 8081`);
});

