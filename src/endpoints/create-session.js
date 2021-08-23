const bcrypt = require('bcryptjs');
const templates = require('../templates');
const db = require('../database');
const serveError = require('../serve-error');

/** @function createSession
 * A helper method invoked when session creation is
 * successful.  The request should have an object
 * as its body parameter with username and password set.
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */
function createSession(req, res) {
  
  var email = req.body.email;
  var password = req.body.password;
  var user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  console.log('user', user);
  if(!user) return failure(req, res, "Email/Password not found.  Please try again.");
  bcrypt.compare(password, user.password, (err, result) => {
    if(err) return serveError(req, res, 500, err);
    console.log('result', result);
    if(result) success(req, res, user);
    else return failure(req, res, "Username/Password not found. Please try again.");
  });
}

module.exports = createSession;

/** @function success
 * Helper function for creating the user session after 
 * a successful login attempt.
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 * @param {object} user - the user who signed in
 */
function success(req, res, user) {
  
  var session = {
    user:{
      time: Date.UTC(),
      admin: user.admin,
      id: user.id,
      first: user.firstname,
      last: user.lastname,
      email: user.email
    }
  }
  res.setHeader("Set-Cookie", `session=${encodeURIComponent(JSON.stringify(session))};`);
  // Redirect to home page
  res.statusCode = 302;
  res.setHeader("Location", "/");
  res.end();
}

/** @function failure 
 * A helper function for reporting issues logging a 
 * user in.
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 * @param {string} errorMessage - the error message for the user
 * @param {string} errorMessage - a message to display to the user
 */
function failure(req, res, errorMessage) {
  const loggedIn = req.session && true;
  var username = loggedIn ? req.session.user.first + " " + req.session.user.last : "Guest";
  if (typeof loggedIn === 'undefined') {
    loggedIn = false;
  }
  if(!errorMessage) errorMessage = "There was an error processing your request.  Please try again."
  var form = templates["signin.html"]({
    errorMessage: errorMessage
  });
    var navBar = templates['navbar.html']({user: username});

  var html = templates["layout.html"]({
    title: "Sign Up",
    navbar: navBar,
    content: form
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}