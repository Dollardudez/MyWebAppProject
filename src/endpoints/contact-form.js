var nodemailer = require('nodemailer');

/** @function parseEmail()
 * Creates a new post using the supplied form data
 */
 function parseEmail(req, res) {
    var phone = req.body.phone
    var email = req.body.email
    var messageBody = req.body.message_body
    console.log(phone + email + messageBody);
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'robbobabobiddy@gmail.com',
          pass: 'Georgeyoudirty!dirty!pigomy'
        }
      });
      
      var mailOptions = {
        from: email,
        to: 'robclancy.98@gmail.com',
        subject: 'From a user on MHK Chests site',
        text: email + ":\n" + phone + ":\n" + messageBody
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          
        }
      });

    // Redirect to the read page for the post
    res.statusCode = 302;
    res.setHeader("Location", `/`);
    res.end();
}

module.exports = parseEmail;