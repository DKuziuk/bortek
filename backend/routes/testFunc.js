function send(){
  let n=new FormData();
  n.append("id","5");
  let  request = new XMLHttpRequest();
    request.open("POST","http://192.168.2.54:3001/items/add");
    request.setRequestHeader('Content-Type', 'multipart/form-data');
    //request.overrideMimeType="multipart/form-data";
    request.setRequestHeader('Authorization',`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVlYWM1MTViMGU4OWNiMzE5ODMxYWZhOCIsImVtYWlsIjoic3NAdWtyLm5ldCJ9LCJpYXQiOjE1OTAzNDkyNzIsImV4cCI6MTU5MDM1Mjg3Mn0.kOuOYqBhIBPGYn5PA9As_Na8PPBtMOkJ_u63vovfXP8`);
    console.log(request.getAllResponseHeaders());
    request.onload = function (event) {
      console.log("event^",event);
    };
    request.send(n);
}
