// ------------ логгер  --------------------
const l = require('../log.js'); // логер
let logName="<"+(__filename.replace(__dirname,"")).slice(1)+">:";
let gTrace=0; //=1 глобальная трассировка (трассируется все)
const sendMail = require('./sendMail');
var express = require('express');
var router = express.Router();
const argon2 = require('argon2');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const config = require('../config');
const NotConfirmedUser = require('../models/notConfirmedUser.js');

function err500(logN,err,res){
  // ошибка базы
  res.status(500).json({
    // отсылает ошибку 500 - Database error
    // logN - описание функции для трассировки
    err:{
       msg:{
         "en":logN+`Database error:`+err.msg.en
        ,"ru":logN+`Ошибка базы данных:`+err.msg.ru
        ,'ua':logN+`Помилка бази:`+err.msg.ua
      }
     ,data:null
    }
  } );//res
  return
}

router.get('/signup/test', async function(req, res, next) {
  res.status(200).render("userRegistered",{"email":"085@ukr.net",
                                           "home":config.home.ui,
                                           "title":config.home.title
                                         }
                        );//res

});

router.get('/signup/:id', async function(req, res, next) {
  // -- настройки логгера --------------
  let trace=1;
  let logN=logName+"GET::/signup/"+req.params.id+" => ";trace = ((gTrace !== 0) ? gTrace : trace);
  if (trace) {l("i",logN,"Started")};
  // -- конец настроек логгера --------------
  let id=req.params.id;
  // ----- проверяем в базе наличие такого адреса (id) ------
  NotConfirmedUser.findByLink(id,(err,data) => {
        if (err) {
          if (trace) {l("e",logN,"NotConfirmedUser.findByLink:err=",err)};
          err500(logN,err,res);
          return}//  if (err)
        if (! data ) {
          res.status(400).render("userConfirmEmail_NotFinded",{"home":config.home.ui,"title":config.home.title})
          return
        };
        if (trace) {l("i",logN,"NotConfirmedUser.findByLink:data=",data)};
        if (data) {
            //---- ссылка найдена -------------
            //---- создаем пользователя в основной базе
            User.addUser({"email":data.email,"pwd":data.pwd},(err,data) =>{
              if (err) {
                if (trace) {l("e",logN,"User.addUser:err=",err)};
                err500(logN,err,res);

                return}//  if (err)
              if (trace) {l("i",logN,"User.addUser:data=",data)};
              if (data) {
                // пользователь перенесен в базу Users
                // удаляем пользователя с базы   NotConfirmedUser
                NotConfirmedUser.deleteByLink(id,(err,data)=>{
                  if (trace) {l("i",logN,"NotConfirmedUser.deleteByLink:data=",data)};
                });
                // отправляем страничку с успешной авторизацией
                res.status(200).render("userConfirmEmail_Ok",{"email":data.email,
                                                         "home":config.home.ui,
                                                         "title":config.home.title
                                                       }
                                      );//res

                return
              } else {

              }
            })
          }

  })

  // res.status(404).json({
  //   err:{
  //      msg:{
  //        "en":`Requested user ${id} not founded.`
  //       ,"ru":`Запрошенный пользователь ${id} в базе отсутствует, или истек срок подтверждения.`
  //       ,'ua':`Користувача ${id} не знайдено, чи закінчився термін підтвердження `
  //     }
  //    ,data:null
  //   }
  // } );//res
  // return
});///  GET signup/:id

router.post('/signup', async function(req, res, next) {
        let email=req.query.email;
        let pwd=req.query.pwd;
      // -- настройки логгера --------------
      let trace=1;
      let logN=logName+"POST::/signup ("+email+") => ";trace = ((gTrace !== 0) ? gTrace : trace);
      if (trace) {l("i",logN,"Started")};
      // -- конец настроек логгера --------------

      // ---- проверяем наличие создаваемого пользователя в базе пользователей
      User.findByEmail(email,(err,data) => {
        if (err) {
          // ошибка базы
          res.status(500).json({
            err:{
               msg:{
                 "en":logN+`Database error:`+err.msg.en
                ,"ru":logN+`Ошибка базы данных:`+err.msg.ru
                ,'ua':logN+`Помилка бази:`+err.msg.ua
              }
             ,data:null
            }
          } );//res
          return
        }//  if (err)
        if (data) {
          if (trace) {l("w",logN,"User was registered")};
          // пользователь уже зарегистрирован
          res.status(400).json({
            err:{
               msg:{
                 "en":logN+`Dublicate user`
                ,"ru":logN+`Пользователь уже зарегистрирован`
                ,'ua':logN+`Користувач вже зареестрований`
              }
             ,data:null
            }
            } );//res
            return
        } //if (data)
        // ---- проверяем наличие создаваемого пользователя в базе неподтвержденных пользователей
        NotConfirmedUser.findByEmail(email,(err,data) => {
          if (data) {
            if (trace) {l("w",logN,"User was registered in not confirmed users")};
            // пользователь найден в базе неподтвержденных
            sendMail(data,(err,data) =>{return}); // повторно отсылаем письмо
            // нужно сделать проверку по времени, и отсылать письма не чаще 1 раза в час
            // иначе может быть атака множественных запросов
            res.status(449).json({
              err:{
                 msg:{
                   "en":logN+`You have to confirm your Email.`
                  ,"ru":logN+`Вы должны подтвердить свой Email, перейдя по ссылке, что находится в письме`
                  ,'ua':logN+`Ви повинні підтвердити свою єлектронну адресу, перейшовши за посиланням, що знаходиться в листі`
                }
               ,data:null
              }
              } );//res
              //sentEmail(data.email,data.link);
              return
          }//if (data)
          if (pwd) {
                // создаем нового пользователя в NotConfirmedUser и отсылаем ему письмо
                NotConfirmedUser.addUser({"email":email,"pwd":pwd},(err,data)=>{
                  if (err) {
                    // ошибка базы
                    res.status(500).json({
                      err:{
                         msg:{
                           "en":logN+`Database error:`+err.msg.en
                          ,"ru":logN+`Ошибка базы данных:`+err.msg.ru
                          ,'ua':logN+`Помилка бази:`+err.msg.ua
                        }
                       ,data:null
                      }
                    } );//res
                    return
                  }//  if (err)
                  if (data) {
                    // пользователь создан
                    if (trace) {l("w",logN,"User was created")};
                    sendMail(data,(err,data) =>{return}); // отсылаем письмо
                    res.status(200).json({
                        err:null
                       ,data:data
                      });//res
                      return
                  }//if (data)
                })//NotConfirmedUser.addUser
        } else {
          // пароль не указан
        }
        })//  NotConfirmedUser.findByEmail
      }) //  User.findByEmail
});///  POST /signup

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
    } );//res
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
