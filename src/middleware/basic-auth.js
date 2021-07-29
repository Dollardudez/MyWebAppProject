const bcrypt = require('bcrypt');
const db = require('../database');
const serveError = require('../serve-error');

/** @function basicAuth()
 * This middleware enforces basic HTTP authentication for 
 * its protected resources.  The `Authorization` header must 
 * contain a username/password match for one in the database
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object 
 * @param {function} next - the callback from the express app
 */
function basicAuth(req, res, next) {
  if(!req.headers['authorization']) {
  // TODO: Send challenge
      res.writeHead(401, {
        'WWW-Authenticate': 'Basic realm=Creating posts'
      }).end();
  } else {
    // TODO: Check credentials
      var encodedCredentials = req.headers['authorization'].split(' ')[1];
      var buffer = new Buffer(encodedCredentials, "base64");
      var credentialString = buffer.toString("utf-8");
      var credentials = credentialString.split(':');
      var email = credentials[0];
      var password = credentials[1];
      var user = db.prepare("SELECT * FROM users WHERE username = ?").get(email);
      if(!user) return res.writeHead(403).end();
      bcrypt.compare(password, user.cryptedPassword, function(err, result) {
      if(err) return serveError(req, res, 500, err);
      if(result) next();
      else res.writeHead(403).end();
      });
  }
}

module.exports = basicAuth;