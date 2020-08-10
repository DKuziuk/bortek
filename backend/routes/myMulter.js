// ------------ логгер  --------------------
const l = require('../log.js'); // логер
let logName="<"+(__filename.replace(__dirname,"")).slice(1)+">:";
let gTrace=1; //=1 глобальная трассировка (трассируется все)
// -----------------------------------------
const fs = require('fs');
const newOrderConfig = require('../config').newOrder;
const multer = require('multer');
function fileFilter (req, file, cb) {
  // -- настройки логгера --------------
  let trace=1;
  let logN=logName+"fileFilter() => ";trace = ((gTrace !== 0) ? gTrace : trace);
  // -----------------------------------
  if (trace) {l("i",logN,"file="); console.dir(file);};
  if (file.mimetype === 'image/vnd.dxf') {
    cb(null,true);
    return
  }
  cb(new Error("Не поддерживаеый тип файла:"+file.mimetype),false)
};

const storage=multer.diskStorage({
  // определяем куда записываем файл
  destination:function(req,file,cb){
    // -- настройки логгера --------------
    let trace=1;
    let logN=logName+"destination() => ";trace = ((gTrace !== 0) ? gTrace : trace);
    // -----------------------------------
    let path=newOrderConfig.path+'/'//+req.user.data._id;
    if (trace) {l("i",logN,"path=",path); };
    cb(null,path);
  },
  filename: function (req,file,cb){
    // -- настройки логгера --------------
    let trace=1;
    let logN=logName+"filename() => ";trace = ((gTrace !== 0) ? gTrace : trace);
    // -----------------------------------
    let fileName=/*file.fieldname+*/'-'+Date.now();
    if (trace) {l("i",logN,"fileName=",fileName); };
    cb(null,fileName);
  }
});

const upload=multer({storage:storage,fileFilter:fileFilter}); //принимаем один файл ({ dest: newOrderConfig.fileName });
module.exports=upload.single('dxf',newOrderConfig.maxCount);
