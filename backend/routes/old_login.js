var express = require('express');
var router = express.Router();
const argon2 = require('argon2');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const config = require('../config');

router.get('/', async function(req, res, next) {
  console.log("user:", req.query);
  console.log("req.headers=:", req.headers);
  let email=req.query.email;
  let pwd=req.query.pwd;
  if ( ! email | ! pwd) {
    res.status(400);
    next(new Error("Bad request/ User:"+email+" pwd="+pwd))
  }
  let user = await login(email,pwd).catch((err) => {console.log(err); return next(err)});
  if (user) {res.send(JSON.stringify(user));}
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
