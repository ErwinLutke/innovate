var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);

server.listen(process.env.PORT, process.env.IP);

// load seperated socket logic
var io = require('./lib/sockets')(server);

//debug mode
var debug = false;


console.log('Started Socket.io, listening on port:' + process.env.PORT + ' on ip: ' + process.env.IP +
            '\r\nDebug mode: ' + debug);

// gives access to game and client files
app.use('/client', express.static('client'));
app.use('/js', express.static('js'));
app.use('/game', express.static('game'));

// request to the root of dir (homepage)
app.get('/', function(request, response){
	// send index
  	response.sendFile(__dirname + '/index.html');
});



function numConnected () {
  io.of('/display').clients(function(error, clients){
    if (error) throw error;
    console.log('\r\nnumber of displays: ' + clients.length); // => [PZDoMHjiu8PYfRiKAAAF, Anw2LatarvGVVXEIAAAD]
  });
  io.of('/client').clients(function(error, clients){
    if (error) throw error;
    console.log('\r\nnumber of clients: ' + clients.length); // => [PZDoMHjiu8PYfRiKAAAF, Anw2LatarvGVVXEIAAAD]
  });
}
var recursive = function () {
    numConnected();
    setTimeout(recursive,5000);
}
recursive();