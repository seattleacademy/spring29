var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.text());

port = 1700; //use ports between 1025 and 1999 on math server
poseData = {}

poseData.x = 0;
poseData.y = 0;
poseData.h = 0; //heading in degrees
poseData.counter = 0;
poseData.timestamp = Date.now();
poseData.vR = 0;
poseData.vL = 0
poseData.d = 50

function getPose() {
    poseData.counter++;
    return JSON.stringify(poseData);
}

app.all('/getpose', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
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

app.all('/setwheels', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log(JSON.parse(req.body));
    poseData.timestamp = Date.now();
    poseData.vX = JSON.parse(req.body).vX; 
    poseData.vY = JSON.parse(req.body).vY;
    res.send(getPose());
});
app.listen(port, function() {
    console.log('listening on port', port);
});
