var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.text());

port = 1500; //use ports between 1025 and 1999 on math server
poseData = {}

poseData.x = 0;
poseData.y = 0;
poseData.h = 0; //heading in degrees
poseData.counter = 0;
poseData.timestamp = Date.now();
poseData.vR = 0;
poseData.vL = 0;
poseData.d = 130;
poseData.omega = 0; //Rotational Velocity

function getPose() {
    poseData.counter++;
    return JSON.stringify(poseData);
}

app.all('/getpose', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    poseData.h = poseData.omega*(Date.now()-poseData.timestamp)/1000;
    res.send(getPose());
});

app.all('/setpose', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log(JSON.parse(req.body));
    poseData.x = JSON.parse(req.body).x;
    poseData.y = JSON.parse(req.body).y;
    poseData.h = JSON.parse(req.body).h;
    res.send(getPose());
});

function radiansToDegrees(rad) { //convert degrees to radians
  return rad * 180 / Math.PI;
}

function omega(vR, vL, d) { //rotation rate
  return ((vR - vL) / d);
}
app.all('/setwheels', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log(JSON.parse(req.body));
    poseData.timestamp = Date.now();
    poseData.vL = JSON.parse(req.body).vL; 
    poseData.vR = JSON.parse(req.body).vR;
    poseData.omega = omega(poseData.vR,poseData.vL,poseData.d);
    // console.log(poseData.omega);
    poseData.omega = radiansToDegrees(poseData.omega);
    // console.log(poseData.omega);

    res.send(getPose());
});
app.listen(port, function() {
    console.log('listening on port', port);
});
