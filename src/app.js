const express = require('express');
const boxLocations = require('./endpoints/box-locations.js');
const boxDetails = require('./endpoints/box-location-details.js');
const createRequest = require('./endpoints/create-request.js')
const loadBody = require('./middleware/load-body');
const basicAuth = require('./middleware/basic-auth');
const newUser = require('./endpoints/new-user.js');
const createUser = require('./endpoints/create-user');
const newSession = require('./endpoints/new-session');
const createSession = require('./endpoints/create-session');
const parseCookie = require('./middleware/parse-cookie');
const loadCookieSession = require('./middleware/load-cookie-session');
const logout = require('./endpoints/logout');
const indexPage = require('./endpoints/index');





var app = express();
app.use(parseCookie);
app.use(loadCookieSession);
app.use(express.static('static'));
app.get('/', indexPage);
app.post("/box-locations/:id/requests", loadBody, createRequest);
app.post("/signin", loadBody, createSession);
app.get('/signin', newSession);
app.get("/signup", newUser);
app.post("/signup", loadBody, createUser);
app.get("/box-locations/:id", boxDetails);
app.get("/box-locations.json", boxLocations);
app.get("/logout", logout);

module.exports = app;
