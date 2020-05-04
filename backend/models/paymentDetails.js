const mongoose = require('mongoose');
const PaymentDetailsSchema = new mongoose.Schema({
   method: String // метод оплаты
  ,isCompany: Boolean
  ,person: {name:String,surname:String,patronymic:String}
  ,company:{Name:String ,companyEDRPOU: Number}
})//PaymentDetailsShema


module.exports=PaymentDetailsSchema;
