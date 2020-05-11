var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var jwt = require('express-jwt');
const login = require ('./passport/login.js');
const signup = require('./passport/signup.js');
// load config data
const config = require('./config');
//connect to mongodb
const mongoose = require('mongoose');
mongoose.connect(config.db.url,config.db.options )
                .catch(error => {
                  console.log("MongoDB: %s",error.message);
                  process.exit(1);
                });
mongoose.connection.on("open",() => {console.log("--------- MongoDB connected !! ---------- ");})
// -------
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuring Passport
// const passport = require('passport');
// var expressSession = require('express-session');
// app.use(expressSession({secret: 'mySuperDuperPassw'}));
// app.use(passport.initialize());
// app.use(passport.session());
// // настраиваем passport
// const initPassport = require('./passport/init');
// initPassport(passport);
// const myPassport = require('./passport/isAuth');
// app.use(myPassport);

app.use('/login', login); // верификация + выдача токена
// app.use(function(req,res,next){
//   console.log('------req.user-------');
//   console.log(req.user);
//   console.log('-------------');
//   next();
// });
app.use(function(req,res,next){
  console.log('------req.headers-------');
  console.log(req.headers);
  console.log('-------------');
  next();
});
// jwt ищет заголовок Authorization с токеном в формате "Bearer  eyJhbGciOiJIUzI1NiIsI..." пробел обязательно
// и записывает пользователя в req.user, если токен не правильный - ошибка 401
app.use(jwt({secret:config.jwt.secret}));

app.use(function(req,res,next){
  console.log('------req.user-------');
  console.log(req.user);
  console.log('-------------');
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
