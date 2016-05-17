/**************************************************
**  REQUIREMENTS
**************************************************/
var util = require("util"),  
    express = require('express'),
    http = require('http'),
    socketio = require('socket.io');	

/**************************************************
** SERVER SERTUP
**************************************************/
var app = express(),                  // create express instance
    server = http.createServer(app),  // create the http server from express
    io = socketio(server),            // setup socket io to listen to the server
    port = process.env.PORT,          // stores port to listen on
    ip = process.env.IP;              // stores the ip
    
// setup namespace for different sockets
var nspDisplay = io.of('/display');
var nspClient = io.of('/client');
    
// gives access to game and client files
app.use('/client', express.static('Client'));
app.use('/display', express.static('Display'));
//app.use('/js', express.static('js'));

// request to the root of dir (homepage) send the request to client index
app.get('/', function(request, response){
   response.sendFile(__dirname + '/Client/client.html');
});


/**************************************************
** GAME VARIABLES
**************************************************/
var players;      // array of connected players
var waitingLine;  // stores players if no spot is free
var maxPlayers;   // int - players allowed to play at the same time
  
/**************************************************
** GAME INITIALISATION
**************************************************/
function init() {
    server.listen(port, ip);        // start up the game server
    util.log('Started game server: listening on port:' + port + ' on ip: ' + ip );
    
    players = [];                   // create empty array for storing the players
    waitingLine = [];               // create empty array for storing the waiting players
    maxPlayers = 4;                 // number of allowed players

    // setup the event handling
    setEventHandlersDisplay();
    setEventHandlersClient();
    
}

/**************************************************
** GAME EVENT HANDLERS - DISPLAY
**************************************************/
var setEventHandlersDisplay = function() {
    nspDisplay.on("connection", onSocketConnectionDisplay);
};

function onSocketConnectionDisplay(display) {
  	util.log("New display has connected: " + display.id);
  	
  	display.on("disconnect", onDisplayDisconnect);  	// Listen for display disconnection
  	display.on("spotOpen", onSpotOpen);  	            // Listen if Display has open spot because a player died or left
}

function onDisplayDisconnect() {
  	util.log("Display has disconnected: " + this.id);
}

function onSpotOpen(removedPlayerId) {
    var pos = playerById(removedPlayerId);
    players.splice(pos, 1);
    
    var newPlayer = waitingLine.shift();
    console.log(newPlayer);
    players.push(newPlayer);
    
    nspDisplay.emit("newPlayer", newPlayer);
    
    
  //  io.nsps['/client'].sockets[newPlayer.id].emit("playGame");
    io.sockets.connected[newPlayer.id].emit("playGame");
}


/**************************************************
** GAME EVENT HANDLERS - CLIENT
**************************************************/
var setEventHandlersClient = function() {
    nspClient.on("connection", onSocketConnectionClient);
};


function onSocketConnectionClient(client) {
  	util.log("New player has connected: " + client.id);
        
    // Create a new player
    var newPlayer = {id: client.id};
    // Place player in game or waitingline 
    if(players.length < maxPlayers) {
        players.push(newPlayer);                    // Add new player to the players array
        nspDisplay.emit("newPlayer", newPlayer);    // Broadcast new player to gameDisplay
        client.emit("playGame");
        
    }
    else {
        waitingLine.push(newPlayer);                // Add new player to the waiting array
        var waitingPos = waitingLine.length;        // get the waiting position
        
        // send waiting position to this player
        //nspClient.sockets.connected[newPlayer.id]
        client.emit("waitingLine", waitingPos);
    }
    
    util.log("playerArray check:  -- " + players[0].id);
    
  	client.on("disconnect", onClientDisconnect);    // Listen for client disconnected
    client.on("movePlayer", onMovePlayer);	        // Listen for move player message
}

// Socket client has disconnected
function onClientDisconnect() {
  	util.log("Player has disconnected: " + this.id);
  
    // find index position in array of the player by id
  	var removePlayer = playerById(this.id);
  	
  	// Player not found
  	if (removePlayer === false) {
    		util.log("Player not found: " + this.id);
    		return;
  	}
  
  	// Remove player from arrays by index position - QUICKFIX
  	try {
  	    players.splice(players.indexOf(removePlayer), 1);
  	    waitingLine.splice(waitingLine.indexOf(removePlayer), 1);
  	} catch (e) {
  	    console.log(e);
  	}
  	
  
  	// Broadcast removed player to connected socket clients
  	// only if in player array, not finished
  	nspDisplay.emit("removePlayer", {id: this.id});
}

// Player has moved
function onMovePlayer(dir) {
	// Find player in array

    util.log("player movement " + dir );
	var movePlayer = playerById(this.id);

	// Player not found
	if (movePlayer === false) {
		util.log("Player not found: "+ this.id);
		return;
	}
	
	// Broadcast updated position to connected socket clients
	nspDisplay.emit("movePlayerSnake", {id: players[movePlayer].id, direction: dir});
}


/**************************************************
** HELPER FUNCTIONS
**************************************************/
// Find player by ID: Checks players array and waitinglne array
function playerById(id) {
  	for (var i = 0; i < players.length; i++) {
  		  if (players[i].id == id) {
  			    return i;
  		  }
  	}
  	
  	for (var i = 0; i < waitingLine.length; i++) {
  		  if (waitingLine[i].id == id) {
  			    return i;
  		  }
  	}
  	return false;
}

/**************************************************
** START GAME
**************************************************/
init();