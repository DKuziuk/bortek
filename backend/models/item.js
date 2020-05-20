const mongoose = require('mongoose');
var Schema= mongoose.Schema;

var ItemSchema= new Schema({
  order_id:{
     type:Schema.Types.ObjectId
    ,default:null
    ,required:true
  },
  user_id:{
    type:Schema.Types.ObjectId
   ,default:null
   ,required:true
 },
 material_id:{
     type:String
    ,required:true
  },
 thickness:{
     type:Number
    ,required:true
  },
 amount:{ //pcs
     type:Number
    ,default:1
  },
 fileName:{
     type:String
    ,required:true
  }, // имя файла как у Заказчика например: пластина1.dxf
 filePath:{
     type:String
  }, // путь к файлу на сервере /order_id/item_id.dxf
 svg:{
     type:String
     ,default:""
  },
 priority:{
     type:Number
    ,default:0
  },
 commentary:{
     type:String
    ,default:""
  },
 area:{
     type:Number
  },
 cuttingLength:Number, //m
 contours:Number //pcs
});

ItemSchema.static.addItem = async function (item) {

}

var Item=mongoose.model('User',ItemSchema); // создаем модель
module.exports=Item;
