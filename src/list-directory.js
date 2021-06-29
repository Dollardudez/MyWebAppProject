const fs = require('fs');
const path = require('path');
const serveFile = require('./serve-file');

/** @module listDirectory
 * Provides a function for serving a directory listing
 * for the directory matching the pathname in the req.url 
 * If not found, serves a 404 status code.
 * @param {http.incomingMessage} req - the request object
 * @param {http.serverResponse} res - the response object
 */
function listDirectory(req, res) {
  
  var pathname = new URL(req.url, "http://localhost").pathname;
  var dirPath = path.join('static', pathname);
  
  fs.readdir(dirPath, (err, entries) => {
    if(err) return req.writeHead(404).end();
    // Check for an index file 
    console.log("we are in listdir");
    if(entries.includes('index.html')) {
      req.url = path.join(req.url, 'index.html');
      console.log("we got to the html!");

      serveFile(req, res);
      return;
    }
    
    

    // Build the dynamic HTML snippets
    var pathHeader = `<h2>Directory Listing for ${pathname}</h2>`;
    
    var listing = entries.map(entry => {
      var url = path.posix.join(pathname, entry);
      return `<a href="${url}">${entry}</a>`;
    }).join("\n");
    
    var parentLink = (pathname === "/") ? "" : `<a href="${path.dirname(pathname)}">Parent directory</a>`;
    
    // Build the complete dynamic page
    var html = `<!doctype html>
                <html>
                  <head>
                    <title>Directory Listing</title>
                  </head>
                  <body>
                    ${pathHeader}
                    <div style="display: flex; flex-direction: column; padding: 2rem 0">
                      ${listing}
                    </div>
                    ${parentLink}
                  </body>
                </html>
                `;
    
    // Serve the page
    res.writeHeader(200, {
      "Content-Type": "text/html",
      "Content-Length": html.length
    }).end(html);
  });
}

module.exports = listDirectory;