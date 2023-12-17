const {SerialPort} = require('serialport');
const port = new SerialPort({path:"COM5",baudRate: 115200});

var { ReadlineParser } = require('@serialport/parser-readline');
const parser = port.pipe(new ReadlineParser({delimiter: '\n'}));

const express = require('express');
const app = express();

const server = require('http').createServer();
const socket = require('socket.io')(server);

//serial port from microbit 
port.on('open', () => {
  console.log("Serial port open")
})

// parser.on('data', (data) => {
//   console.log(data);
//   socket.emit(data);
// });

socket.on('connection', function (socket) {
  console.log("Socket connected");
    socket.emit(data);

    socket.on('data', function (data) {
        data = data.value;
        io.sockets.emit({value: data});
    });
});

// io.on('connection', socket => {
//   console.log('Socket.io client connected!');

//   parser.on('data', (data) => {
//     console.log(data);
//     socket.emit(data);
//   });
// });

server.listen(3000);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// read the data 
// parser.on('data', (data) => {
//   let temp = data.split(":")[0]
//   let light = data.split(":")[1]
//   console.log(`Temperature = ${temp} & Room luminosity = ${light}`)
// })

