// #1
const User = require("./models").User;
const bcrypt = require("bcryptjs");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
module.exports = {
// #2
  createUser(newUser, callback){

// #3
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);
   
// #4

    return User.create({
        username: newUser.username,
      email: newUser.email,
      password: hashedPassword
      
    })
    .then((user) => {

      const msg = {
        to: newUser.email,
        from: 'Khang@blocipedia.com',
        subject: 'Welcome to Blocipedia',
        text: "Hi there, this is Khang from Blocipedia, it's my pleasure to have you as a new user on this Wikis community. Enjoy",
        html: 'Thank you for Joining Blocipedia. To start contributing to the Wiki community please visit the site and login with the user information you provided.<br>Looking forward to collaborting with you!<br><br>-The Blocipedia Team',
        };
        sgMail.send(msg);
        callback(null, user);
      
    })
    .catch((err) => {
      callback(err);
    })
  }

}