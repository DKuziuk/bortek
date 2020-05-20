var config={};


config['db']={
  url:"mongodb+srv://express:Danya@cluster0-jsi7v.azure.mongodb.net/test?retryWrites=true&w=majority"
  //url:"mongodb://express:Danya@localhost:27017/lazer?authSource=lazer&readPreference=primary&appname=Express&ssl=false"
  ,options:{useNewUrlParser: true, useUnifiedTopology:true ,useFindAndModify:false}
}; //db


config['jwt']={
  secret:"my_pa55w0rd"
}; //jwt

config["home"]={
   url:"http://192.168.2.54:3001"
  ,title:"Сайт лазерной резки"
  ,ui:"http://192.168.2.54:3000" // react site (user interface)
};// home


// настройки почты
config['mail']={
  "transport":{
     pool:true
    ,host:"smtp.ukr.net"
    ,port:465
    ,secure:true
    ,auth:{
       user:"0459571216@ukr.net"
      ,pass:"6Xu0N679hWF8lnON"
    }
  } //transport
}; // mail

// ------------  список материалов -----------
config['materials']=[
  {
    id:"St3"
    ,title:"Ст3пс(ГК)"
    ,code:0  // код материала в AutoNest
    ,analogs:"Ст3, 1449-2723CR, 1.0038, Fe37-3FN"
    ,thickness:[0.8,1.0,1.5,3,5,6,8]   //мм
  }
  ,{
     id:"304S"
     ,title:"304S"
     ,code:1  // код материала в AutoNest
     ,analogs:"08Х18Н10, AISI304, 1.4301"
     ,thickness:[0.8,1.2,1.5,3,5,6]   //мм
  }
  ,{
    id:"310S"
    ,title:"310S"
    ,code:3  // код материала в AutoNest
    ,analogs:"20Х23Н18, AISI310, 1.4845"
    ,thickness:[1.5,2,3,5,6]   //мм
  }
]

module.exports=config;
