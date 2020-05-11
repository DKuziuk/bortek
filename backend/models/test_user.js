const mongoose = require('mongoose');
const User= require('./user.js');
const conf=require('../config.js').db;

console.log(conf);

if (! module.parent) {
  const config = require('../config');
  // mongoose.connection.on('error', err => {
  //   console.log("--------------------\n MongoDB connect  error ! \n--------------------");
  //   console.log(err.message);
  //  });
  async function start() {
    try {
    await mongoose.connect(conf.url, conf.options)
    } catch (error) {
      console.log("--------------------\n MongoDB connect  error ! \n--------------------");
      console.log(error.message);
      new Error("Could not connect to base");
      process.exitCode=1;
      process.exit();
    }
    console.log("--------------------\n MongoDB connected ! \n--------------------");
    //  try create some users
    var user= new User(
      {
        email:"1235@ukr.net"
        ,nickname:"chief2"
        ,pwd:"12345"
        ,person: {
           name: "Вол"
           ,surname:"Зин"
           ,patronymic:"Николаевич"}
      }
    ); // создаем обьект
    //console.log("--->"+user);
   // user.save(
   //   (err)=>{
   //     if (err) {
   //       console.log(err.errmsg);
   //       return
   //     };
   //     console.log("Записано в базу пользователя:" + user.email);
   // }  ); //save
   User.addUser(user,(err,person)=>{
     if (err) {console.error("User: "+user.email+". Cant be added, because:"+err.errmsg);return};
     if (person) {
       console.log("Added:");
       console.log(person);
       return ;
      }
     console.log("No person added.");
   });

  User.findByEmail("ss@ukr.net",(err,person)=>{
    if (err) {console.error(err);return};
    if (person) {
      console.log("Finded:");
      console.log(person);
      return ;
     }
    console.log("No person finded.");

  });

  }
  start();


}
