const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const DeliveryAddressSchema= require("./deliveryAdress.js");
const PaymentDetailsShema = require('./paymentDetails.js');
const User= require("./user.js");

const states= new Map(
  {
    basket: {
        title:{ en:"Basket"
               ,ua:"Корзина"
               ,ru:"Корзина"}
    },
    confirmed:{
      title:{ en:"Order confirmed"
             ,ua:"Замовлення підтверджено"
             ,ru:"Заказ подтвержден"}
    },
    invoiced:{
      title:{ en:"Invoice was send"
             ,ua:"Рахунок надіслано"
             ,ru:"Счет выставлен"}
    },
    paid:{
      title:{ en:"The order was paid"
             ,ua:"Замовлення сплачено"
             ,ru:"Заказ оплачен"}
    },
    production:{
      title:{ en:"The order is in production"
             ,ua:"Замовлення на виробництві"
             ,ru:"Заказ в производстве"}
    },
    inspecting:{
      title:{ en:"The order is inspecting."
             ,ua:"Замовлення очікує на перевірку"
             ,ru:"Заказ ожидает проверки"}
    },
    awaitingDelivery:{
      title:{ en:"The order is waiting delivery"
             ,ua:"Замовлення очікує на транспортування"
             ,ru:"Заказ ожидает отправки"}
    },
    shipment:{
      title:{ en:"The order is delivering"
             ,ua:"Замовлення прямує до вас"
             ,ru:"Заказ отправлен"}
    },
    received:{
      title:{ en:"The order was received"
             ,ua:"Замовлення отримано"
             ,ru:"Заказ получен"}
    },
  }
) // states


function now() {
  // return timestamp "now"
  return (new Date()).getTime;
}


var OrderSchema= new Schema({
   user_id :{  // id пользователя, создавшего Заказ
      type:Schema.Types.ObjectId
      ,required:true
      ,set: (id) =>{

      }
    }
  ,payer : PaymentDetailsShema // плательщик
  ,deviveryAdress: DeliveryAddressSchema  // номер адреса доставки в списке  адресов
  ,state : { // состояние заказа код
    type:String
    ,enum:stateList
    ,default:0
  }
  ,stateTitle : { // состояние заказа описание
    type:String
    ,default:"Корзина"
  }
  ,price: { // текущая стоимость заказа
    type:Number
    ,default:0
  }
  ,startTime:{// timestamp создания
    type:Number
    ,default: now
  }
  ,lastChange:{ // timestamp последнего изменения
    type:Number
    ,default:now
  }
  ,invoice_id:{// id счета, для оплаты Заказа
     type:Schema.Types.ObjectId
    ,default:null
    }
  ,log:{ // лог событий по  Заказу
    type:String
    ,default:""
  }
}) //OrderSchema

OrderSchema.statics.newOrder = async function (user) {
  // добавляет новый заказ

}

OrderSchema.statics.deleteOrder = async function (user) {
}

OrderSchema.statics.toNextState = async function (user) {

}


var Order=mongoose.model('User',OrderSchema); // создаем модель
module.exports=Order;
