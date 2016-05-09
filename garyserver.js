var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.text());

port = 1500; //use ports between 1025 and 1999 on math server
poseData = {}

poseData.x = 0;
poseData.y = 0;
poseData.h = 0;
poseData.counter = 0;
poseData.timeStamp = Date.now();

function getPose() {
    poseData.counter++;
    poseData.timestamp = Date.now();
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

app.listen(port, function() {
    console.log('listening on port', port);
});