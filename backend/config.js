var config={};


config['db']={
  url:"mongodb://express:Danya@localhost:27017/lazer?authSource=lazer&readPreference=primary&appname=Express&ssl=false"
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


module.exports=config;
