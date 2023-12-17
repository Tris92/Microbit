const {SerialPort} = require('serialport');
const port = new SerialPort({path:"COM5",baudRate: 115200});

var { ReadlineParser } = require('@serialport/parser-readline');
const parser = port.pipe(new ReadlineParser({delimiter: '\n'}));

//serial port from microbit 
port.on('open', () => {
  console.log("Serial port open")
})

// read the data 
// parser.on('data', (data) => {
//   let temp = data.split(":")[0]
//   let light = data.split(":")[1]
//   console.log(`Temperature = ${temp} & Room luminosity = ${light}`)
// })

parser.on('data', (data) => {
  console.log(data)
})

********************* AUTO DETECT SERIAL PORT 

let boardPort = '';
let boardKeywordIdentifier = 'Arduino'; //my device identifier
let checkingTimeInterval = 1000;
let waitForUsb = setInterval(getBoardPortName, checkingTimeInterval);

function getBoardPortName() {

    SerialPort.list(function(err,ports) {
        ports.forEach(function(port){

            if(port.manufacturer.includes(boardKeywordIdentifier)) {
                boardPort = port.comName;
            }

        })
    });

    if(boardPort != '') {
        clearInterval(waitForUsb);
        listenToTheBoard(boardPort); //function to be executed when board is connected
    }

}