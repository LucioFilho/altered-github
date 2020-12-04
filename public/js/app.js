//link to cast svg
const SvgNS = "http://www.w3.org/2000/svg";

function makeid(idLength) {
   const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
   let result = '';
   for (var i = 0; i < idLength; i++) {
      result += characters[Math.floor(Math.random() * characters.length)];
   }
   return result;
}

const shipCode = makeid(7) + (90 + Math.floor(Math.random() * 900));

let roomShips = [];
let serverStatus = 0;
let userID = null;
let setPoint = "beacon";
let logOffShips = [];
let previousSetPoint = "beacon";
let vX = parseFloat(window.innerWidth);
let vY = parseFloat(window.innerHeight);
let pX = parseFloat(window.innerWidth) / 2;
let pY = parseFloat(window.innerHeight) / 2;
let a = [0, 0, vX, vY];
let targetSetPoint = "";
let shipsTarget = {};
let zoomFactor = 1;
const fps = 20;

//arc
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
   let angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

   return {
      X: centerX + (radius * Math.cos(angleInRadians)),
      Y: centerY + (radius * Math.sin(angleInRadians))
   };
}

//click displayActions
function displayActions(sID) {

   if (sID !== yourShip && shipsTarget[sID] !== yourShip) {
      setPoint = sID;
   }
   
}

// svg element creator
function svger(fS, sType, sID, sWidth, sHeight, sX, sY, sr, sStrokeWidth, sPrecision, rootSvg, b, userID) {

   fillerStroker(fS);

   const shapeVger = document.createElementNS(SvgNS, sType);

   if (sType !== "circle") {
      shapeVger.setAttributeNS(null, "id", sID);
      shapeVger.setAttributeNS(null, "width", sWidth);
      shapeVger.setAttributeNS(null, "height", sHeight);
      shapeVger.setAttributeNS(null, "x", sX);
      shapeVger.setAttributeNS(null, "y", sY);
      shapeVger.setAttributeNS(null, "fill", Filler);
      shapeVger.setAttributeNS(null, "stroke", Stroker);
      shapeVger.setAttributeNS(null, "stroke-width", sStrokeWidth);
      shapeVger.setAttributeNS(null, "shape-rendering", sPrecision);
   } else {
      shapeVger.setAttributeNS(null, "id", sID);
      shapeVger.setAttributeNS(null, "cx", sX);
      shapeVger.setAttributeNS(null, "cy", sY);
      shapeVger.setAttributeNS(null, "r", sr);
      shapeVger.setAttributeNS(null, "fill", Filler);
      shapeVger.setAttributeNS(null, "stroke", Stroker);
      shapeVger.setAttributeNS(null, "stroke-width", sStrokeWidth);
      shapeVger.setAttributeNS(null, "shape-rendering", sPrecision);
   }

   if (rootSvg === "Board") {
      Board.appendChild(shapeVger);
   }

   if (b === 1) {
      const el = document.getElementById(sID);

      el.onclick = function(event) {
         displayActions(sID);
      };
      el.onmouseover = function(event) {
         fillerStroker("shipOver");
         document.getElementById(sID).setAttributeNS(null, "fill", Filler);
      };
      el.onmousedown = function(event) {
         fillerStroker("shipDown");
         document.getElementById(sID).setAttributeNS(null, "fill", Filler);
      };
      el.onmouseup = function(event) {
         fillerStroker("shipUp");
         document.getElementById(sID).setAttributeNS(null, "fill", Filler);
      };
      el.onmouseout = function(event) {
         fillerStroker(fS);
         document.getElementById(sID).setAttributeNS(null, "fill", Filler);
      };

   }

}

//____ALL SOCKETS RELATED___________

var socket = io();
//get server eventcontroller
socket.emit('giveMeNumber');
socket.on('giveMeNumber', (data) => {
   serverStatus = data;
   console.log("serverStatus: " + serverStatus);
});

//get room
socket.emit('getRoom', {
   shipCode: shipCode
});
socket.on('getRoom', (data) => {
   if (data.shipCode === shipCode) {
      svger(data.fS, data.sType, data.sID, data.sWidth, data.sHeight, data.sX, data.sY, data.sr, data.sStrokeWidth, data.sPrecision, data.rootSvg, data.b, null);
   }
});

//set ship
let yourShip = "ship";
let sizes = [1, 2, 3, 4, 6, 8, 9, 12, 15, 16, 18, 26, 32, 40, 64, 128, 256];
let size = sizes[Math.floor(Math.random() * sizes.length)] / 2; //ship radius
let shipPow = 0;

function shipSpeed() {
   switch (size) {
      case 128:
         shipPow = 0.1;
         break;
      case 64:
         shipPow = 0.2;
         break;
      case 32:
         shipPow = 0.3;
         break;
      case 20:
         shipPow = 0.4;
         break;
      case 16:
         shipPow = 0.5;
         break;
      case 13:
         shipPow = 0.6;
         break;
      case 9:
         shipPow = 0.8;
         break;
      case 8:
         //fall through
      case 7.5:
         shipPow = 0.9;
         break;
      case 6:
         shipPow = 1;
         break;
      case 4.5:
         //fall through
      case 4:
         shipPow = 2;
         break;
      case 3:
         shipPow = 1;
         break;
      case 2:
         shipPow = 2;
         break;
      case 1.5:
         shipPow = 3;
         break;
      case 1:
         shipPow = 6;
         break;
      case 0.5:
         shipPow = 9;
         break;
      default:

   }
}
shipSpeed();


socket.emit('getShip', {
   fS: "ship",
   sType: "circle",
   sID: yourShip,
   shipCode: shipCode,
   sWidth: 0,
   sHeight: 0,
   sX: 200 + Math.floor(Math.random() * 100),
   sY: 200 + Math.floor(Math.random() * 100),
   sr: size,
   sStrokeWidth: 1,
   sPrecision: "geometricPrecision",
   rootSvg: "Board",
   b: 1,
   targetID: "beacon"
});

socket.on('getShip', (data) => {
   if (!roomShips.includes(data.sID)) {

      svger(data.fS, data.sType, data.sID, data.sWidth, data.sHeight, data.sX, data.sY, data.sr, data.sStrokeWidth, data.sPrecision, data.rootSvg, data.b, data.userID);
      roomShips.push(data.sID);
      shipsTarget[data.sID] = data.targetID;

      if (shipCode === data.shipCode) {
         yourShip = data.sID;
      } else if (roomShips.includes(yourShip)) {

         socket.emit('getShip', {
            fS: "ship",
            sType: "circle",
            sID: yourShip,
            sWidth: 0,
            sHeight: 0,
            sX: parseFloat(document.getElementById(yourShip).getAttribute("cx")),
            sY: parseFloat(document.getElementById(yourShip).getAttribute("cy")),
            sr: size,
            sStrokeWidth: 1,
            sPrecision: "geometricPrecision",
            rootSvg: "Board",
            b: 1

         });

      }

   }
});

socket.on('shipOff', (data) => {
   if (setPoint !== "ship" + data.userID) {
      document.getElementById("ship" + data.userID).remove();
      //console.log(data.userID);
   } else if (!logOffShips.includes("ship" + data.userID)) {
      logOffShips.push("ship" + data.userID);
   }
});

socket.on('updateShip', (data) => {

   if (document.getElementById(data.sID)) {

      let shipCX = parseFloat(document.getElementById(data.sID).getAttribute("cx"));
      let shipCY = parseFloat(document.getElementById(data.sID).getAttribute("cy"));
      let shipPowOffsetX = parseFloat(data.sX) - shipCX;
      let shipPowOffsetY = parseFloat(data.sY) - shipCY;

      shipsTarget[data.sID] = data.targetID;

      if (shipCX < parseFloat(data.sX)) {
         shipPowOffsetX = parseFloat(data.sX) - shipCX;
         if (data.sP < shipPowOffsetX) {
            document.getElementById(data.sID).setAttribute("cx", shipCX + parseFloat(data.sP));
         } else {
            document.getElementById(data.sID).setAttribute("cx", parseFloat(data.sX));
         }
      } else {
         shipPowOffsetX = shipCX - parseFloat(data.sX);
         if (data.sP < shipPowOffsetX) {
            document.getElementById(data.sID).setAttribute("cx", shipCX - parseFloat(data.sP));
         } else {
            document.getElementById(data.sID).setAttribute("cx", parseFloat(data.sX));
         }
      }

      if (shipCY < parseFloat(data.sY)) {
         shipPowOffsetY = parseFloat(data.sY) - shipCY;
         if (data.sP < shipPowOffsetY) {
            document.getElementById(data.sID).setAttribute("cy", shipCY + parseFloat(data.sP));
         } else {
            document.getElementById(data.sID).setAttribute("cy", parseFloat(data.sY));
         }
      } else {
         shipPowOffsetY = shipCY - parseFloat(data.sY);
         if (data.sP < shipPowOffsetY) {
            document.getElementById(data.sID).setAttribute("cy", shipCY - parseFloat(data.sP));
         } else {
            document.getElementById(data.sID).setAttribute("cy", parseFloat(data.sY));
         }
      }

   }

});

//____UPDATING___________
let shipAngular = 360;
let timeWarp = 200;
let warpFraction = timeWarp;

function updateGame() {

   vX = parseFloat(window.innerWidth) * zoomFactor;
   vY = parseFloat(window.innerHeight) * zoomFactor;
   pX = vX / 2;
   pY = vY / 2;
   a = [0, 0, vX, vY];

   let pointX = 600;
   let pointY = 600;
   let orbitRadius = 100;

   if (document.getElementById(yourShip)) {

      if (document.getElementById("beacon")) {
         if (logOffShips.includes(setPoint)) {
            previousSetPoint = setPoint;
            setPoint = "beacon";
            warpFraction = timeWarp;
         }
         orbitRadius = 2 * (parseFloat(document.getElementById(yourShip).getAttributeNS(null, "r")) + parseFloat(document.getElementById(setPoint).getAttributeNS(null, "r")));
         pointX = parseFloat(document.getElementById(setPoint).getAttributeNS(null, "cx"));
         pointY = parseFloat(document.getElementById(setPoint).getAttributeNS(null, "cy"));

      }

      shipAngular = shipAngular < 0 ? 360 : shipAngular -= shipPow;

      let orbit = polarToCartesian(pointX, pointY, orbitRadius, shipAngular);

      //warp ship
      if (previousSetPoint !== setPoint && warpFraction > 0) {

         let warperX = 0;
         let warperY = 0;
         let warperXCamera = 0;
         let warperYCamera = 0;
         let orbitXwarp = 0;
         let orbitYwarp = 0;
         let orbitXwarpCamera = 0;
         let orbitYwarpCamera = 0;

         let xWarpStart = parseFloat(document.getElementById(yourShip).getAttribute("cx"));
         let yWarpStart = parseFloat(document.getElementById(yourShip).getAttribute("cy"));

         let xWarpStartCamera = parseFloat(document.getElementById(previousSetPoint).getAttributeNS(null, "cx"));
         let yWarpStartCamera = parseFloat(document.getElementById(previousSetPoint).getAttributeNS(null, "cy"));
         let xWarpEndCamera = parseFloat(document.getElementById(setPoint).getAttributeNS(null, "cx"));
         let yWarpEndCamera = parseFloat(document.getElementById(setPoint).getAttributeNS(null, "cy"));

         if (xWarpStartCamera < xWarpEndCamera) {
            warperXCamera = (xWarpEndCamera - xWarpStartCamera) / warpFraction;
            orbitXwarpCamera = xWarpStartCamera + warperXCamera;
         } else {
            warperXCamera = (xWarpStartCamera - xWarpEndCamera) / warpFraction;
            orbitXwarpCamera = xWarpStartCamera - warperXCamera;
         }

         if (yWarpStartCamera < yWarpEndCamera) {
            warperYCamera = (yWarpEndCamera - yWarpStartCamera) / warpFraction;
            orbitYwarpCamera = yWarpStartCamera + warperYCamera;
         } else {
            warperYCamera = (yWarpStartCamera - yWarpEndCamera) / warpFraction;
            orbitYwarpCamera = yWarpStartCamera - warperYCamera;
         }

         if (xWarpStart < orbit.X) {
            warperX = (orbit.X - xWarpStart) / warpFraction;
            orbitXwarp = xWarpStart + warperX;
         } else {
            warperX = (xWarpStart - orbit.X) / warpFraction;
            orbitXwarp = xWarpStart - warperX;
         }

         if (yWarpStart < orbit.Y) {
            warperY = (orbit.Y - yWarpStart) / warpFraction;
            orbitYwarp = yWarpStart + warperY;
         } else {
            warperY = (yWarpStart - orbit.Y) / warpFraction;
            orbitYwarp = yWarpStart - warperY;
         }

         socket.emit('updateShip', {

            targetID: setPoint,
            sID: yourShip,
            sX: orbitXwarp,
            sY: orbitYwarp,
            sP: shipPow

         });

         a[0] = orbitXwarpCamera - pX;
         a[1] = orbitYwarpCamera - pY;

         warpFraction--;

         if (warpFraction === 0) {

            if (logOffShips.includes(previousSetPoint)) {
               document.getElementById(previousSetPoint).remove();
               logOffShips = [];
            }

            previousSetPoint = setPoint;
            warpFraction = timeWarp;

         }

      } else {

         socket.emit('updateShip', {

            targetID: setPoint,
            sID: yourShip,
            sX: orbit.X,
            sY: orbit.Y,
            sP: shipPow

         });

         a[0] = pointX - pX;
         a[1] = pointY - pY;

      }

      document.getElementById("canvas").setAttribute("viewBox", a[0] + " " + a[1] + " " + a[2] + " " + a[3]);

   }

}
gameUpdate = setInterval(updateGame, fps);
