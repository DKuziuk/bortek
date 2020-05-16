const sendmail=require('../nodemail.js');//настроенный транспорт
// ------------ логгер  --------------------
const l = require('../log.js'); // логер
let logName="<"+(__filename.replace(__dirname,"")).slice(1)+">:";


const conf=require('../config.js').home;

// отсылает регистрационное письмо на указанный адрес
function sentLetter(user,cb) {
  // user={ email:"" , link:"" }
  let link=` ${conf.url}/login/signup/${user.link}`;
  let message={
     to:user.email
    ,subject: `Подтверждение почтового адреса`
    ,text:`Для подтверждения почты скопируйте и вставьте в адресную строку браузера ссылку: ${link}`
    ,html:`<h3>Для подтверждения почты перейдите по ссылке: <a href="${link}">${link}</a> </h3>
           <h4>Или скопируйте и вставьте в адресную строку браузера: <u>${link}</u></h4>`
  }
  sendmail(message,(err,data) =>{

  })
}//sentLetter

module.exports=sentLetter;//module.exports

// ----------- test section  -----------
if (! module.parent) {
  sentLetter({email:"0504238839@ukr.net",link:"5eb800b83ff7e65c34bc8646"},(err,data) => {
    if (err) {
      l("e",logName,err)
    }
    if (data) {
      l("i",logName,"Letter to: ",data.to[0], " was sended")
    }
  })
}
