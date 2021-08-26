const bcrypt = require('bcryptjs');
const templates = require('../templates');
const db = require('../database');
const serveError = require('../serve-error');

/** @function createUser
 * An endpoint for creating a new user.  The request
 * should have an object as its body parameter with 
 * username, password, and passwordConfirmation set.
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */
function createUser(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var firstname = req.body.first;
  var lastname = req.body.last;
  var passwordConfirmation = req.body.passwordConfirmation;
  
  // Check password and password confirmation match
  if(password !== passwordConfirmation) return failure(req, res, "Your password and password confirmation must match.");
  
  // Check for existing user
  var existingUser = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if(existingUser) return failure(req, res, `The username "${email}" is already taken.`);
  
  // Hash the password
  const passes = 10;
  bcrypt.hash(password, passes, (err, hash) => {
    if(err) return serveError(req, res, 500, err);
    // Save user to the database
    var info = db.prepare("INSERT INTO users (firstname, lastname, password, email) VALUES (?, ?, ?, ?);").run(firstname, lastname, hash, email);
    var user = db.prepare(`SELECT * FROM users where email = ?;`).get(email);
    if(info.changes === 1) success(req, res, user);
    else failure(req, res, "An error occurred.  Please try again.");
  });
}

module.exports = createUser;

/** @function success 
 * A helper method invoked when user creation is successful.
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 * @param {integer} userID - the id of the user in the database
 */
function success(req, res, user) {
  // Set session cookie
  console.log(user.firstname);
  var session = {
    user: {
      admin: user.admin,
      id: user.id,
      first: user.firstname,
      last: user.lastname,
      email: user.email
    }
  }
  console.log(session);
  res.setHeader("Set-Cookie", `session=${encodeURIComponent(JSON.stringify(session))};`);
  // Redirect to home page
  res.statusCode = 302;
  res.setHeader("Location", "/");
  res.end();
}

/** @function failure 
 * A helper method invoked when user creation fails.
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 * @param {string} errorMessage - a message to display to the user
 */
function failure(req, res, errorMessage) {
  var loggedIn = req.session && true;
  var username = loggedIn ? req.session.user.first + " " + req.session.user.last : "Guest";
  if(!errorMessage) errorMessage = "There was an error processing your request.  Please try again."
  var form = templates["signup.html"]({
    errorMessage: errorMessage
  });
  var navBar = templates['navbar.html']({user: username, LoggedIn: loggedIn.toString(), IsNavIndex: "not-index-page" });
  var html = templates["layout.html"]({
    title: "Sign Up",
    navbar: navBar,
    content: form
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}