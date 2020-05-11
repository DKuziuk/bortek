const mongoose = require('mongoose');
var Schema= mongoose.Schema;
const argon2 = require('argon2');
// ------------ логгер  --------------------
const l = require('../log.js'); // логер
let logName="<"+(__filename.replace(__dirname,"")).slice(1)+">:";
let gTrace=0; //=1 глобальная трассировка (трассируется все)


var UserNotConfirmedSchema= new Schema({
   email: {
     index:true,
     type:String,
     unique:true,
     required:true
     } //email
  ,pwd:{
    type:String,
    required:true,
  } //password
  ,timestamp:{
    type:Number,
    default: function() {
      return (new Date()).getTime()+3*24*60*60*1000 // + 3 дня
    }
  }// ссылка для подтверждения
});

UserNotConfirmedSchema.statics.deleteByLink = function (id,cb) {
  // -- настройки логгера --------------
  let trace=0;
  let logN=logName+"deleteByLink:"+id+":";trace = ((gTrace !== 0) ? gTrace : trace);
  if (trace) {l("i",logN,"Started")};
  let caption=logN;
  this.findByIdAndRemove(id,function(err,person) {
    if (err){
      let error={
           msg:{
             "en":(caption+`Database Error: `+err.message)
            ,"ru":(caption+`Ошибка базы данных:`+err.message)
            ,'ua':(caption+`Помилка інформаційної бази:`+err.message)
          }}//err
          l("e",err,"Started");
          return cb(error, null)
     };
     if (trace) {l("i",logN,"person=",person)};

     if (person) {
       let data= {
         "email":person.email
         ,"pwd":person.pwd
       }
       return cb(null,data)
     } else {
       let error={
            msg:{
              "en":(caption+`Link not found.`)
             ,"ru":(caption+`Адрес не найден`)
             ,'ua':(caption+`Адресу не знайдено`)
           }}//err
           if (trace) {l("e",error.msg.ru)};
           return cb(error, null)
     }
  })//deleteOne
};//deleteByLink

UserNotConfirmedSchema.statics.findByLink = function (id,cb) {
  // -- настройки логгера --------------
  let trace=0;
  let logN=logName+"findByLink:"+id+":";trace = ((gTrace !== 0) ? gTrace : trace);
  if (trace) {l("i",logN,"Started")};
  let caption="NotConfirmedSchema:findByLink:"+id+" :->";
  this.findById({'_id':id},function(err,person) {
    if (err){
      let error={
           msg:{
             "en":(caption+`Search Database Error: `+err.message)
            ,"ru":(caption+`Ошибка поиска базы данных:`+err.message)
            ,'ua':(caption+`Помилка пошуку інформаційної бази:`+err.message)
          }}//err
          l("e",err);
          return cb(error, null)
     };
     if (trace) {l("i",logN,"person=",person)};
     if (person) {
       let data= {
         "email":person.email
         ,"pwd":person.pwd
         ,"link":person._id.toString()
       }
       return cb(null,data)
     } else {
           return cb(null, null)
     }
  })
};


UserNotConfirmedSchema.statics.findByEmail = function (email,cb) {
  // -- настройки логгера --------------
  let trace=0;
  let logN=logName+"findByEmail:"+email+":";trace = ((gTrace !== 0) ? gTrace : trace);
  if (trace) {l("i",logN,"Started")};
  let caption="NotConfirmedSchema:findByEmail:"+email+" :->";
  this.findOne({'email':email},function(err,person) {
    if (err){
      let error={
           msg:{
             "en":(caption+`Search Database Error: `+err.message)
            ,"ru":(caption+`Ошибка поиска базы данных:`+err.message)
            ,'ua':(caption+`Помилка пошуку інформаційної бази:`+err.message)
          }}//err
          l("e",err);
          return cb(error, null)
     };
     if (trace) {l("i",logN,"person=",person)};

     if (person) {
       let data= {
         "email":person.email
         ,"pwd":person.pwd
         ,"link":person._id.toString()
       }
       return cb(null,data)
     } else {

           if (trace) {l("e","Не найден")};
           return cb(null, null);
     }
  })
};



// async function findByEmail(email){
//
// }
UserNotConfirmedSchema.statics.addUser = async function (user,cb) {
    // -- настройки логгера --------------
    let trace=0;
    let logN=logName+"addUser:"+user.email+":=>";trace = ((gTrace !== 0) ? gTrace : trace);
    if (trace) {l("i",logN,"Started")};
    user.pwd=await argon2.hash(user.pwd);
    this.create(user, function(err,user){
      if (err)  {
        let error={
             msg:{
               "en":(logN+`Database Error: `+err.errmsg)
              ,"ru":(logN+`Ошибка базы данных:`+err.errmsg)
              ,'ua':(logN+`Помилка інформаційної бази:`+err.errmsg)
            }}//err
        return cb(error, null)
      };
      // пользователь успешно создан
      // возвращаем пользователя
      let newUser={
        "email":user.email
        ,"link":user._id.toString()
      }
      if (trace) {l("i",logN,"Return:",newUser)};
      return cb(null,newUser);
    })
}; //addUser


var NotConfirmed=mongoose.model('notConfirmedUser',UserNotConfirmedSchema); // создаем модель и коллекцию: notConfirmedUser
module.exports=NotConfirmed;
