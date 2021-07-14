const express = require('express');
const boxLocations = require('./endpoints/box-locations.js');
const boxDetails = require('./endpoints/box-location-details.js');
const createRequest = require('./endpoints/create-request.js')
const loadBody = require('./middleware/load-body');



var app = express();

app.post("/box-locations/:id/requests", loadBody, createRequest);
app.get("/box-locations/:id", boxDetails);
app.get("/box-locations.json", boxLocations);
app.use(express.static('static'));

module.exports = app;
