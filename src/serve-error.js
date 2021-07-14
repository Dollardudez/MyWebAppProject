/** @function serveError 
 * Serves the requested HTTP status code and logs the error
 * @param {http.IncomingMessage} req - the request object
 * @param {http.ServerResponse} res - the response object 
 * @param {int} status - the optional status code 
 * @param {error|string} err - the optional error
 */
function serveError(req, res, status, err) {
  console.error(`Error occurred with request ${req.method} ${req.url}`);
  console.error(err);
  console.trace();
  res.writeHead(status).end();
  return;
}

module.exports = serveError;