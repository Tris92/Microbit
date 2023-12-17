var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var {SerialPort} = require('serialport');
var { ReadlineParser } = require('@serialport/parser-readline');
const port = new SerialPort({path: "COM5", baudRate: 115200})
const parser = new ReadlineParser();

const server = require('http').createServer();
const io = require('socket.io')(server);

port.pipe(parser);

parser.on('data', data => {
  console.log('Data:', data);
  io.emit('data', data);
});

io.on('connection', socket => {
  console.log('Socket.io client connected!');

  parser.on('data', data => {
    console.log('Data:', data);
    socket.emit('data', data);
  });
});
server.listen(3001);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// respon to web GET request on index.html
app.get('/', function (req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
