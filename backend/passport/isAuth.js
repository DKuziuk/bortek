const jwt = require('express-jwt');
module.exports= function (req,res,next) {
  console.log("Im in my passport \n -----------------");
  console.log(req.headers);
  if (! req.headers.authorization) {
    // если нет заголовка Authorization -  то выход
    res.status(401)//.end("Unathorized user!!!. Please go to /login for athorization!  \n      Я Вас не знаю! Пройдите по адресу /login и получите пароль!");
    //console.log("res.status=",res.status);
    next(new Error("Unathorized user!!!. Please go to /login for athorization!  \n      Я Вас не знаю! Пройдите по адресу /login и получите пароль!"));
  } ;
  console.log("Authorization header finded");
  next();
}
