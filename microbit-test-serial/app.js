var express = require('express');
var {SerialPort} = require('serialport');
var { ReadlineParser } = require('@serialport/parser-readline');
const port = new SerialPort({path: "COM5", baudRate: 115200})
const parser = new ReadlineParser();

const server = require('http').createServer();
const io = require('socket.io')(server);

port.pipe(parser);

parser.on('data', data => {
  console.log('Data:', data);
  io.emit('data', data.toString());
});

var app = express();

io.on('connection', socket => {
  console.log('Socket.io client connected!');

  parser.on('data', data => {
    console.log('Data:', data.toString());
    socket.emit('data', data);
  });
});
server.listen(3000);

app.get('/serial-data', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});