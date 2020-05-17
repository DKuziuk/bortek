const mongoose = require('mongoose');
const NotConfirmed = require('./notConfirmedUser');
// ------------ логгер  --------------------
const l = require('../log.js'); // логер
let logName="<"+(__filename.replace(__dirname,"")).slice(1)+">:";
let gTrace=0; //=1 глобальная трассировка (трассируется все)
let users=[];
// -------------  ТЕСТЫ   ----------------

// --------------  findById --------------
function findById(id){
  NotConfirmed.findByLink(id,function(err,user){
    let caption="Find byLink ("+id+")=>";
    if (err) {l("e",caption," error: ",err.msg.ru);return};
    if (user) {
      l("i",caption,user);
      return ;
     }
    l("w",caption,"No person finded.");
  })
};
// --------------  findByEmail --------------
function findByEmail(email){
  NotConfirmed.findByEmail(email,function(err,user){
    let caption="Find byEmail ("+email+")=>";
    if (err) {l("e",caption," error: ",err.msg.ru);return};
    if (user) {
      l("i",caption,user);
      return ;
     }
    l("w",caption,"No person finded.");
  })
};
// --------------  add User --------------
function addUser(data,cb) {
  let user= new  NotConfirmed(data); // создаем обьект
  let caption="addUser("+data.email+"):=>"
  NotConfirmed.addUser(user,(err,person)=>{
    if (err) {l("e",caption,"User: "+user.email+". Cant be added, because:",err.msg.ru);return cb(err,null)};
    if (person) {
      l("i",caption,"Added:",person);
      return cb(null,person);
     }
  err=new Error("No person added.")
  l("w",caption,err.message);
  return cb(err,null);
  });
}
// --------------  findByEmail --------------
function deleteByLink(link){
  NotConfirmed.deleteByLink(link,function(err,user){
    let caption="deleteByLink ("+link+")=>";
    if (err) {l("e",caption," error: ",err.msg.ru);return};
    if (user) {
      l("i",caption,"DELETED:",user);
      return ;
     }
    l("w",caption,"No person deleted.");
  })
};

  let conf=require('../config.js').db;

  // -- настройки логгера --------------
  let trace=1;
  let logN=logName+"test:";trace = ((gTrace !== 0) ? gTrace : trace);
  if (trace) {l("w",logN,"Started")};

  // mongoose.connection.on('error', err => {
  //   console.log("--------------------\n MongoDB connect  error ! \n--------------------");
  //   console.log(err.message);
  //  });
  async function start() {
    try {
    await mongoose.connect(conf.url, {useNewUrlParser: true, useUnifiedTopology:true ,useFindAndModify:false})
    } catch (error) {
      console.log("--------------------\n MongoDB connect  error ! \n--------------------");
      l("w",logN,error.message);
      new Error("Could not connect to base");
      process.exitCode=1;
      process.exit();
    }
    console.log("--------------------\n MongoDB connected ! \n--------------------");
    //  try create some users

    //console.log("--->"+user);
   // user.save(
   //   (err)=>{
   //     if (err) {
   //       console.log(err.errmsg);
   //       return
   //     };
   //     console.log("Записано в базу пользователя:" + user.email);
   // }  ); //save

     addUser({"email":"123456@ukr.net",pwd:"123456"},(err,user) => {
             if (user) {users.push (user)}
           });
     addUser({"email":"23456@ukr.net",pwd:"23456"},(err,user) => {
             if (user) {users.push (user)}
           });



  findById("5eb800b83ff7e65c34bc8646"); //correct
  findById("5eb800b83ff7e65c34bc8647"); //incorrect


  findByEmail("1235@ukr.net"); //correct
  findByEmail("12356@ukr.net");//incorrect

  // setTimeout(function () {
  //    // ---  test deleting -----
  //     for (var i = 0; i < users.length; i++) {
  //       deleteByLink(users[i].link)
  //     }
  //     deleteByLink("5eb800b83ff7e65c34bc8647");
  //
  // }, 2000);
  // User.findByEmail("ss@ukr.net",(err,person)=>{
  //   if (err) {console.error(err);return};
  //   if (person) {
  //     console.log("Finded:");
  //     console.log(person);
  //     return ;
  //    }
  //   console.log("No person finded.");
  //
  // });
  

  }
  start();
