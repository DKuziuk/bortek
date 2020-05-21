const mongoose = require('mongoose');
var Schema= mongoose.Schema;


const PaymentDetailsShema = require('./paymentDetails.js');
const DeliveryAdressSchema= require("./deliveryAdress.js");

var UserSchema= new Schema({
   email: { //email
     type:String,
     unique:true,
     index:true
   }
  ,pwd:{
    type:String,
    required:true,
  } //password
  ,basket:{// id текущего открытого заказа (=корзина)
     type:String//Schema.Types.ObjectId
    ,default:null
  }
  ,allOrders:[Schema.Types.ObjectId] // список id всех  заказов
  ,adresses: [DeliveryAdressSchema] // адреса доставки. ПЕРЕДЕЛАТЬ  Решил хранить прямо в пользователе, т.к. это уникальная информация
  ,person: { // имя, отчество, фамилия пользователя
    name:String,
    surname:String,
    patronymic:String
  }
  ,paymentDetails: [PaymentDetailsShema] // реквизиты для оплаты ПЕРЕДЕЛАТЬ  Решил хранить прямо в пользователе, т.к. это уникальная информация
});


UserSchema.statics.findByEmail = function (email,cb) {
  this.findOne({'email':email},function(err,person) {
    if (err) return cb(err,null);
    return cb(null,person)
  })
};

// async function findByEmail(email){
//
// }
UserSchema.statics.addUser = function (user,cb) {
  let logN="UserSchema.addUser:";
    // try add to base
    this.create(user,function(err,user){
      if (err) {
        // ошибка базы
        let error={
             msg:{
               "en":logN+err.errmsg
              ,"ru":logN+err.errmsg
              ,'ua':logN+err.errmsg
            }} //error
            cb(error,null);
            return
        }//  if (err)
      //if (err) return cb(err,null);
      // пользователь успешно создан
      // в этом месте проводим верификаццию e-mail пользователя
      // возвращаем пользователя
      return cb(null,user);
    })
}; //addUser


var User=mongoose.model('User',UserSchema); // создаем модель
module.exports=User;
