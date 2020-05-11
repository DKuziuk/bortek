
// message = {
//     to: "0504238839@ukr.net",
//     subject: "Message title", //тема
//     text: "Plaintext version of the message",
//     html: "<p>HTML version of the message</p>"
//     };



// ------------ логгер  --------------------
const l = require('./log.js'); // логер
let logName="<"+(__filename.replace(__dirname,"")).slice(1)+">:";
let gTrace=0; //=1 глобальная трассировка (трассируется все)


const config = require('./config').mail;
// ------- nodemailer
const nodemailer = require("nodemailer");
let transporter=nodemailer.createTransport(config.transport);


// transporter.verify(function(error, success) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Server is ready to take our messages");
//   }
// });
function sendMail(mail,cb){
    mail["from"]=config.transport.auth.user;
    transporter.sendMail( mail, ( err , info ) => {
        if (err) {
          l("e",logName,"sendMail:Error:",err)
          cb(err,null);
          return
        }
        l("i",logName,"sendMail:",info);
        if (info) {
          let data=info.envelope;
          cb(null,data);
          return
        }
      }
    )
};

module.exports=sendMail;



// ----------- test section  -----------
if (! module.parent) {
  let message = {
      to: "0504238839@ukr.net",
      subject: "Message title", //тема
      text: "Plaintext version of the message",
      html: "<p>HTML version of the message</p>"
      };
  sendMail(message,(err,data) => {
    if (err) {
      l("e",err)
    }
    if (data) {
      l("i","Letter to: ",data.to[0], " was sended")
    }
  })

}
