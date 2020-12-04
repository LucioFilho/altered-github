const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

let num = Number(0);

let xPoss = [];
let yPoss = [];
let beltRadiuses = [];

for (let i = 0; i < 100; i++) {
   let xPos = 700 + Math.floor(Math.random() * 200);
   let yPos = 500 + Math.floor(Math.random() * 200);
   xPoss.push(xPos);
   yPoss.push(yPos);

   let radiuses = 2 + Math.floor(Math.random() * 20);
   beltRadiuses.push(radiuses);
}

io.on('connection', (socket) => {
   console.log('User ' + socket.id + ' is connected.');

   socket.on('disconnect', (data) => {
      console.log('User ' + socket.id + ' has disconnected.');
      io.emit('shipOff', {
         userID: socket.id
      });
   });

   socket.on('getRoom', (data) => {
      io.emit('getRoom', {
         fS: "beacon",
         sType: "circle",
         sID: "beacon",
         sWidth: 0,
         sHeight: 0,
         sX: 600,
         sY: 600,
         sr: 4,
         sStrokeWidth: 1,
         sPrecision: "geometricPrecision",
         rootSvg: "Board",
         b: 1,
         shipCode: data.shipCode
      });

      for (let i = 0; i < 10; i++) {
         io.emit('getRoom', {
            fS: "belt" + i,
            sType: "circle",
            sID: "beacon" + i,
            sWidth: 0,
            sHeight: 0,
            sX: xPoss[i],
            sY: yPoss[i],
            sr: beltRadiuses[i],
            sStrokeWidth: 1,
            sPrecision: "geometricPrecision",
            rootSvg: "Board",
            b: 1,
            shipCode: data.shipCode
         });
      }

   });

   socket.on('giveMeNumber', (data) => {
      num++;
      data = num;
      io.emit('giveMeNumber', data);
      console.log("serverStatus: " + data);
   });

   socket.on('getShip', (data) => {
      data.userID = socket.id;
      data.sID = "ship" + socket.id;
      io.emit('getShip', data);
   });

   socket.on('updateShip', (data) => {
      io.emit('updateShip', data);
   });

});

server.listen(port, () => {
   console.log(`Server is up on port ${port}.`);
});
