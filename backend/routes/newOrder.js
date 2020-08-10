// ------------ логгер  --------------------
const l = require('../log.js'); // логер
let logName="<"+(__filename.replace(__dirname,"")).slice(1)+">:";
let gTrace=1; //=1 глобальная трассировка (трассируется все)

var express = require('express');
var router = express.Router();

const materials = require('../config').materials;
//const newOrderConfig = require('../config').newOrder;
const multer=require ('./myMulter.js');


router.post('/', async function(req, res, next) {
  // -- настройки логгера --------------
  let trace=1;
  let logN=logName+"POST:/materials/list => ";trace = ((gTrace !== 0) ? gTrace : trace);
  //-------------------------------------
  
  //добавляем список материалов
  let data={};
  data['materials']=materials;
  //
  if (trace) {l("i",logN,"data=",data)};

  res.status(200).json( data );//res
  //return
});

//
router.post('/upload',multer ,async function(req, res, next) {
  // -- настройки логгера --------------
  let trace=1;
  let logN=logName+"POST:/newOrder/upload => ";trace = ((gTrace !== 0) ? gTrace : trace);
  //-------------------------------------

  if (trace) {l("i",logN,"req.files="); console.dir(req.file);};
  if (trace) {l("i",logN,"req.body="); console.dir(req.body);};

  res.status(200).send("Ok");//res
  //return
});

module.exports = router;
