const fs = require('fs');
const path = require('path');
const serveFile = require('./serve-file');
const listDirectory = require('./list-directory.js');

/** @function handleRequest
 * Provides a function for handling HTTP requests 
 * @param {http.incomingMessage} req - the request object
 * @param {http.serverResponse} res - the response object
 */
function handleRequest(req, res) {
  if(req.method !== 'GET') return res.writeHead(501).end();
  var pathname = new URL(req.url, 'http://localhost').pathname;    
  fs.stat(path.join("static", pathname), (err, stat) => {
    if(err) return res.writeHead(404).end();
    if(stat.isFile()) {
      serveFile(req, res);
      return;
    }
    console.log("shouldnt be here!");
    if(stat.isDirectory()) return listDirectory(req, res);
      return res.writeHead(404).end();
    });
}

module.exports = handleRequest;
