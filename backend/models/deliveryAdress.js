const mongoose = require('mongoose');

const DeliveryAdressSchema=new mongoose.Schema({
   title: String // краткое название адреса . например: НП-Дом
  ,phone: Number // номер телефона получателя, может отличаться от пользователя
  ,email: String // адрес почты на который отправлять сообщение об отправке
  ,city: String // город, нужно верифицировать по базе городов
  ,deliveryType: String // тип доставки НП, Укрпочта и пр.
  ,deliveryAddress: String // адрес доставки
  ,reciever:String // получатель
});

module.exports=DeliveryAdressSchema;
