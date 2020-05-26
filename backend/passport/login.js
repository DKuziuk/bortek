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
  // ---------  ПОДТВЕРЖДЕНИЕ Email ------------------------
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
                  if (err) {
                    // если ошибка удаления пишем в лог, пользователь автоматически удалится после истечения срока
                    l("e",logN,"NotConfirmedUser.deleteByLink:data=",err.msg.ru)
                  }
                  // отправляем страничку с успешной авторизацией
                  res.status(200).render("userConfirmEmail_Ok",{"email":data.email,
                                                           "home":config.home.ui,
                                                           "title":config.home.title
                                                         }
                                        );//res
                });
                return
              } else {
                next();
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
          res.status(409).json({
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

router.post('/', async function(req, res, next) {
  let email=req.query.email;
  let pwd=req.query.pwd;
  // -- настройки логгера --------------
  let trace=1;
  let logN=logName+"POST:/login/email="+email+"=> ";trace = ((gTrace !== 0) ? gTrace : trace);
  if (trace) {l("i",logN,"Started. req.query=", req.query)};
  // --------- проверяем наличие всех необходимых данных ---------------
  if ( ! email | ! pwd) {
    // нехватает данных: ошибка+выход
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
    return
  } //if ( ! email | ! pwd)

  // -----------  запрос в базу --------------------
  let userRecord=await User.findOne({'email':email});
  if (trace) {l("i",logN,"userRecord=", userRecord)};
  if (! userRecord) {
    // пользователь не найден
    //  -------------- ищем в базе ожидающих подтверждение Email ------------
    let notConfirmedUser= await NotConfirmedUser.findOne({'email':email});
    if (trace) {l("i",logN,"notConfirmedUser=", notConfirmedUser)};
    if (! notConfirmedUser) {
      // в базе неподтвержденных тоже нет, ответ - ошибка
      if (trace) {l("e",logN,"User not found")};
      res.status(404).json({
        err:{
           msg:{
             "en":logN+"User not found"
            ,"ru":logN+"Пользователь не найден"
            ,'ua':logN+"Користувача не знайдено"
          }} //err
        ,data:null
      });//res
      return
    }; //  if (! notConfirmedUser)

    // пользователь найден в базе неподтвержденных
    // отправляем письмо
    NotConfirmedUser.findByEmail(email,(err,user)=>{
      if (user) {
       sendMail(user,(err,data) =>{if (trace) {l("w",logN,"Was sent activation Letter")};return}); // повторно отсылаем письмо
      }
    })

    // ответ с ошибкой
    if (trace) {l("w",logN,"Email not confirmed.")};
    res.status(449).json({
      err:{
         msg:{
           "en":logN+"Email not confirmed. We was sent to your Email the confirmation link"
          ,"ru":logN+"Электронная почта не подтверждена. Мы отправили Вам ссылку для подтверждения"
          ,'ua':logN+"Електронна пошта не підтверджена. Ми надіслали Вам посилання для підтвердження"
        }} //err
      ,data:null
    });//res
    return
  }//if (! userRecord)
  // ----------- пользователь найден  -------------
  // ----------    проверяем пароль   -------------
  let correctPasword = await argon2.verify(userRecord.pwd,pwd);
  if (! correctPasword) {
    // --------- неправильній пароль ---------------
    if (trace) {l("e",logN,"Password is wrong.")};
    res.status(403).json({
      err:{
         msg:{
           "en":logN+"Password is wrong."
          ,"ru":logN+"Неправильный пароль."
          ,'ua':logN+"Невірний пароль."
        }} //err
      ,data:null
    });//res
    return
  } //if (! correctPasword)

  // -------   ВСЕ Ок -----------------
  // ------ генерируем ответ ----------
  let msg= {user:{
                _id:userRecord._id
                , email:userRecord.email
                , verified : userRecord.verified
              },
            token:generateJWT(userRecord) // token
          } // msg
  res.status(200).json({
    err:null //err
    ,data:msg
  });//res
  //next();//res.send('respond with a resource ');
});

module.exports = router;



function generateJWT(user){
  let data={
    _id:user._id,
    email:user.email
  };
  const signature=config.jwt.secret;
  const expiration="1h";
  return "Bearer " + jwt.sign({data,},signature,{expiresIn:expiration});
}
