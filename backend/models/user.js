const mongoose = require('mongoose');
var Schema= mongoose.Schema;


const PaymentDetailsShema = require('./paymentDetails.js');
const DeliveryAdressSchema= require("./deliveryAdress.js");

var UserSchema= new Schema({
   email: {
     type:String,
     unique:true,
     index:true} //email
  ,nickname: String
  ,pwd:{
    type:String,
    required:true,

  } //password
  ,verified:{
    type:Boolean,
    default:false} // email - реальный? проверяется отправкой письма и ответом на определенный  URL
  ,adresses: [DeliveryAdressSchema] // адреса доставки
  ,person: {
    name:String,
    surname:String,
    patronymic:String
  }
  ,paymentDetails: [PaymentDetailsShema] // реквизиты для оплаты
})


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
    // try add to base
    this.create(user,function(err,user){
      if (err) return cb(err,null);
      // пользователь успешно создан
      // в этом месте проводим верификаццию e-mail пользователя
      // возвращаем пользователя
      return cb(null,user);
    })
}; //addUser


var User=mongoose.model('User',UserSchema); // создаем модель
module.exports=User;
