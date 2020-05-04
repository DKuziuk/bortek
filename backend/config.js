var config={};
config['db']={
  url:"mongodb://express:Danya@localhost:27017/lazer?authSource=lazer&readPreference=primary&appname=Express&ssl=false"
}
config['jwt']={
  secret:"my_pa55w0rd"
}
module.exports=config;
