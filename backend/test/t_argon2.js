const argon2 = require('argon2');
var hash;
async function main () {
  const pwd="12345";
  hash= await argon2.hash(pwd);
  console.log("hash=",hash);
  testPwd("wrongPwd");
  testPwd(pwd);
}
main();

async function testPwd(pwd) {
  if (await argon2.verify(hash,pwd)){
    //
    console.log("Password:"+pwd+" are correct");
  } else {
    console.log("Password:"+pwd+" wrong");
  }
}
// $argon2i$v=19$m=4096,t=3,p=1$p1X4bOC10/14Ff4vMKZL7w$i3blrhBLl+PFol3Vgpz08EeybrzDc+GuuFHJ+Rm65Lo
