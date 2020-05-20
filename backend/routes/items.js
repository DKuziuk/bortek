// ------------ логгер  --------------------
const l = require('../log.js'); // логер
let logName="<"+(__filename.replace(__dirname,"")).slice(1)+">:";
let gTrace=1; //=1 глобальная трассировка (трассируется все)
// -----------------
var express = require('express');
var router = express.Router();
//const materials = require('../config').materials;

router.post('/add', async function(req, res, next) {
  // -- настройки логгера --------------
  let trace=1;
  let logN=logName+"POST:items/add => ";trace = ((gTrace !== 0) ? gTrace : trace);

  if (trace) {l("i",logN);console.dir("req.query=",req.query)};

  res.status(200).send("Received"  );//res
  return
});


module.exports = router;
