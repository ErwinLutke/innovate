var clients = 0;

//var http = require("http");
//var express = require('express');
//var app = express();
//var server = http.createServer(app);
//var io = require('socket.io')(server);//.listen tussen ()()
//app.listen(80);

var express = require('express');
var app     = express();
var server  = app.listen(8080); //op c9 altijd poort 8080 gebruiken
var io      = require('socket.io').listen(server);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/client.html', function (req, res) {
  res.sendFile(__dirname + '/client.html');
});

app.get('/libraries/paper.js', function (req, res) {
  res.sendFile(__dirname + '/libraries/paper.js');
});

app.get('/libraries/keyDecode.js', function (req, res) {
  res.sendFile(__dirname + '/libraries/keyDecode.js');
});

app.get('/libraries/jquery-2.2.3.min.js', function (req, res) {
  res.sendFile(__dirname + '/libraries/jquery-2.2.3.min.js');
});

io.sockets.on('connection', function (socket) {
  clients += 1;
  console.log("Clients: " + clients);
  socket.emit('clientnum', clients);
  socket.on('up', function (data) {
    socket.broadcast.emit('velchange', {velx: 0, vely: -1, client:data});
  });
  socket.on('down', function (data) {
    socket.broadcast.emit('velchange', {velx: 0, vely: 1, client:data});
  });
  socket.on('left', function (data) {
    socket.broadcast.emit('velchange', {velx: -1, vely: 0, client:data});
  });
  socket.on('right', function (data) {
    socket.broadcast.emit('velchange', {velx: 1, vely: 0, client:data});
  });
});
