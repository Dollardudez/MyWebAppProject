//Get request data from the formconst db = require('../src/database');
const db = require('../database');


/** @function createPost()
 * Creates a new post using the supplied form data
 */
function createBox(req, res) {
    console.log(req);
    var name = req.body.name
    var lat = req.body.lat
    var lng = req.body.lng
    console.log(name + lat + lng);
    var request = db.prepare("INSERT INTO boxes (name, lat, lng) VALUES (?, ?, ?)").run(name, lat, lng);
    console.log(request);
    if(request.changes !== 1) return serveError(req, res, 500, "Unable to write to database");
    // Redirect to the read page for the post
    res.statusCode = 302;
    res.setHeader("Location", `/`);
    res.end();
}

module.exports = createBox;