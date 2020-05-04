// ------------ логгер  --------------------
const l = require('../log.js'); // логер
let logName="<"+(__filename.replace(__dirname,"")).slice(1)+">:";
let gTrace=0; //=1 глобальная трассировка (трассируется все)

var express = require('express');
var router = express.Router();
const argon2 = require('argon2');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const config = require('../config');

router.get('/', async function(req, res, next) {
  // -- настройки логгера --------------
  let trace=1;
  let logN=logName+"route:/singin:";trace = ((gTrace !== 0) ? gTrace : trace);
  if (trace) {l("w",logN,"Started")};
  // -- настройки логгера --------------
  if (trace) {l("i",logN,"user:", req.query)};
  //if (trace) {l("i",logN,"req.headers=:", req.headers)};
  let email=req.query.email;
  let pwd=req.query.pwd;
  if ( ! email | ! pwd) {
    let text=` --> email:${email}; pwd:${pwd}`
    res.status(400).json({
      err:{
         msg:{
           "en":"Was received the not full request"+text
          ,"ru":"Неполный запрос"+text
          ,'ua':"Неповний запит"+text
        }
       ,data:null
      }
    }
  );//res
    // res.status(400);
    // next(new Error("Bad request. User:"+email+" pwd="+pwd));
  }
  let data = await login(email,pwd).catch((err) => {
    l("w",logN,"req.headers=:", err);
    let text=` --> email:${email}; pwd:${pwd}; ${err}`
    res.status(404).json({
      err:{
         msg:{
           "en":"User not found"+text
          ,"ru":"Пользователь не найден"+text
          ,'ua':"Користувача не знайдено"+text
        }
       ,data:null
      }
    }
  );//res
    //return next(err)
  });
  if (trace) {l("i",logN," data=", data)};
  if (! data.user.verified) {
    res.status(401).json({
      err:{
         msg:{
           "en":"Email is not verified. Please, verify it , by click on link, what we were send to your E-mail: "+email
          ,"ru":"Электронная почта не подтверждена. Для подтверждения,пожалуйста, перейдите по ссылке, отправленной на E-mail: "+email
          ,'ua':"Електронна пошта не підтверджена. Для підтвердження, будь ласка, перейдіть за посиланням, що ми надіслали на E-mail: "+email
        }
       ,data:null
      }
    });
  } else {
    res.status(200).json({
      err:null
      ,"data":data
    }
    );
  }

  //res.send('respond with a resource ');
});

module.exports = router;


async function login(email,pwd){
  let userRecord=await User.findOne({'email':email});
  if (! userRecord) {
    throw new Error ('User not found')
  } else {
    console.log("findByEmail:: user=",userRecord.email);
    const correctPasword = await argon2.verify(userRecord.pwd,pwd);
    if (! correctPasword) {
      throw new Error ('Incorrect password')
    }
    return {
      user:{
        _id:userRecord._id
        , email:userRecord.email
        , verified : userRecord.verified
      },
      token:generateJWT(userRecord)
    }
  } //else
}

function generateJWT(user){
  let data={
    _id:user._id,
    email:user.email
  };
  const signature=config.jwt.secret;
  const expiration="1h";
  return "Bearer " + jwt.sign({data,},signature,{expiresIn:expiration});
}
