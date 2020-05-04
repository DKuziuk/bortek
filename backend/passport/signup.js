var express = require('express');
var router = express.Router();
// ------------ логгер  --------------------
const l = require('../log.js'); // логер
let logName="<"+(__filename.replace(__dirname,"")).slice(1)+">:";
let gTrace=0; //=1 глобальная трассировка (трассируется все)

const argon2 = require('argon2');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const config = require('../config');


router.get('/', async function(req, res, next) {
  // -- настройки логгера --------------
  let trace=1;
  let logN=logName+"route:/singin:";trace = ((gTrace !== 0) ? gTrace : trace);
  if (trace) {l("w",logN,"Started")};
  let email=req.query['email'];
  let pwd=req.query['pwd'];
  if ( ! email | ! pwd) {
    res.status(400);
    //res.end("Недостаточно данных. email="+email+"; pwd="+pwd);
    next(new Error("Недостаточно данных. email="+email+"; pwd="+pwd));
    return
  }
  // email & pwd - есть, пробуем создать пользователя
  let user={
    'email':email,
    'pwd': await argon2.hash(pwd)
  }
  if (trace) {l("i",logN,"Created user=",user)};
  // пробуем записать в базу
  User.addUser(user,(err,data)=>{
    if (trace) {l("i",logN,"Created user=",user)};
    if (err) {
       res.status(400);
       next(err);
       return
    }
    if (trace) {l("i",logN,"Created data=",data)};
    res.end('You are on signup page User='+data.email);

  })

  //next();
  // console.log("user:", req.query);
  // console.log("req.headers=:", req.headers);
  // let email=req.query.email;
  // let pwd=req.query.pwd;
  // if ( ! email | ! pwd) {
  //   res.status(400);
  //   next(new Error("Bad request/ User:"+email+" pwd="+pwd))
  // }
  // let user = await login(email,pwd).catch((err) => {console.log(err); return next(err)});
  // if (user) {res.send(JSON.stringify(user));}

});

module.exports = router;


// async function signup (user){
//   user.pwd=
//   User.create(user).catch((err)=>{});
//   if (! userRecord) {
//     throw new Error ('User not found')
//   } else {
//     console.log("findByEmail:: user=",userRecord.email);
//     const correctPasword = await argon2.verify(userRecord.pwd,pwd);
//     if (! correctPasword) {
//       throw new Error ('Incorrect password')
//     }
//     return {
//       user:{
//         _id:userRecord._id
//         , email:userRecord.email
//       },
//       token:generateJWT(userRecord)
//     }
//   } //else
// }

// function generateJWT(user){
//   let data={
//     _id:user._id,
//     email:user.email
//   };
//   const signature=config.jwt.secret;
//   const expiration="1h";
//   return "Bearer " + jwt.sign({data,},signature,{expiresIn:expiration});
// }
