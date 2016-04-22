var mailTransport = require('nodemailer-sendgrid-transport');
var nodemailer = require('nodemailer');
var fs = require("fs");
//var User = require("./models/user");
var phantom = require('phantom');

var mailTemplate = fs.readFileSync(__dirname+'/temp-mail.html').toString();
//console.log(mailTemplate);

function getMail(regNo, name) {
    var ret = mailTemplate;
    if (regNo) {
        ret = ret.replace(/{{regNo}}/g, regNo);
    }
    if (name) {
        ret = ret.replace(/{{name}}/g, name);
    }
    return ret;
}

var transport = nodemailer.createTransport(mailTransport({
    auth: {
        api_key: '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'
    }
}));
var sendMsg = function(email, regNo, name, attachment, done) {
    var msg = getMail(regNo, name);
    fs.readFile(attachment, function(err, file) {
        if (err) return done(err);
        transport.sendMail({
            sender: '"Computer Society of India, Vellore" <noreply@csivit.com>',
            to: [email],
            subject: 'Codeplay 2016 - Coders Pass',
            html: msg,
            attachments: [{
                'filename': 'pass.pdf',
                'content': file
            }]
        }, function(err, info) {
            if (err) {
                console.error(err);
            }
            else {
                console.log(info);
            }
            done(err);
        });
    });
};

function calc(reg_no, name, email) {
    phantom.create().then(function(ph) {
        ph.createPage().then(function(page) {
            page.open("https://developers-pass-koolkushagra-1.c9users.io/pass/" + reg_no).then(function(status) {
                page.render('passes/' + reg_no + '.pdf').then(function() {
                    console.log('Page Rendered');
                    ph.exit();
                    sendMsg(email, reg_no, name, 'passes/' + reg_no + '.pdf', function(err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                });
            });
        });
    });
}

module.exports.generate = calc;