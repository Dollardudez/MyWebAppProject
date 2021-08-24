/** @function parseEmail()
 * Creates a new post using the supplied form data
 */
 function parseEmail(req, res) {
    console.log("I am here!!!!!!!!");
    var phone = req.body.phone
    var email = req.body.email
    var messageBody = req.body.message-body
    console.log(phone + email + messageBody);
    // Redirect to the read page for the post
    res.statusCode = 302;
    res.setHeader("Location", `/`);
    res.end();
}

module.exports = parseEmail;