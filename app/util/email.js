var mailTransport = require('nodemailer-sendgrid-transport');
var nodemailer = require('nodemailer');

var transport = nodemailer.createTransport(mailTransport({
    auth: {
        api_key: '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'
    }
}));

var mail = {};

mail.sendMsg = function(name, email, msg){
  msg = "<h4>Name: "+name+"</h4><br/><h4>Email: "+email+"</h4><br/><p>"+msg+"</p>";
  transport.sendMail({
        sender: '"Computer Society of India, Vellore" <doubts@csivit.com>',
        to: ["vaish.kushagra@gmail.com","arorayash.thisisus@gmail.com"],
        subject: 'Codeplay 2016 - Doubts',
        html: msg
    }, function(err, info) {
        if (err) {
            console.error(err);
        }
        else {
            console.log(info);
        }
    });
};

module.exports = mail;
