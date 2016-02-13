var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var mongoClient = require('mongodb').MongoClient;

// define location of static files for html
app.use("/", express.static(__dirname));

io.on('connection', sendData);

setInterval(sendData, 1000);
function sendData() {
  mongoClient.connect('mongodb://localhost:27017/arduino', function(err, db) {
    if (err) {
      throw err;
    }
    db.collection('test').find().limit(50).sort({
      '_id': -1
    }).toArray(function(err, result) {
      if (err) {
        throw err;
      }
      io.emit('measurements', result);
    });
  });
};

// setInterval(sendData(client), 1000);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

server.listen(9000);
