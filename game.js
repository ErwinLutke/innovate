/**************************************************
**  REQUIREMENTS
**************************************************/
var util = require("util"),  
    express = require('express'),
    http = require('http'),
    socketio = require('socket.io');
    
var Player = require("./Player").Player;	

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
app.use('/client', express.static('client'));
app.use('/js', express.static('js'));
app.use('/display', express.static('display'));

// request to the root of dir (homepage)
app.get('/', function(request, response){
    response.sendFile(__dirname + '/index.html');
});


/**************************************************
** GAME VARIABLES
**************************************************/
var players;      // array of connected players
var maxPlayers;   // int - players allowed to play at the same time
var waitingLine;  // stores players if no spot is free

  
/**************************************************
** GAME INITIALISATION
**************************************************/
function init() {
    players = [];                 // create empty array for storing the players
   // maxPlayers = 4;               // number of allowed players
   // waitingLine = [];             // create empty array for storing the waiting players
    
    server.listen(port, ip);      // start up the game server
    
    util.log('Started game server: listening on port:' + port + ' on ip: ' +ip );

    // setup the event handling
    setEventHandlersDisplay();
    setEventHandlersClient();
    
};

/**************************************************
** GAME EVENT HANDLERS  - DISPLAY
**************************************************/
var setEventHandlersDisplay = function() {
    nspDisplay.on("connection", onSocketConnectionDisplay)
};

function onSocketConnectionDisplay(display) {
  	util.log("New display has connected: " + display.id);
  	// Listen for display disconnection
  	display.on("disconnect", onDisplayDisconnect);
  	console.log(players[0]);
  	display.emit("players", JSON.stringify(players));
  console.log(JSON.stringify(players));
}

function onDisplayDisconnect() {
  	util.log("Display has disconnected: " + this.id);
};

/**************************************************
** GAME EVENT HANDLERS  - CLIENT
**************************************************/
var setEventHandlersClient = function() {
    nspClient.on("connection", onSocketConnectionClient);
};

function onSocketConnectionClient(client) {
  	util.log("New player has connected: " + client.id);
  
  	// Listen for client disconnected
  	client.on("disconnect", onClientDisconnect);
  
	// Listen for new player message
	client.on("new player", onNewPlayer);

  	// Listen for move player message
   	client.on("move player", onMovePlayer);
}


// Socket client has disconnected
function onClientDisconnect() {
  	util.log("Player has disconnected: " + this.id);
  
  	var removePlayer = playerById(this.id);
  
  	// Player not found
  	if (!removePlayer) {
    		util.log("Player not found: "+this.id);
    		return;
  	};
  
  	// Remove player from players array
  	players.splice(players.indexOf(removePlayer), 1);
  
  	// Broadcast removed player to connected socket clients
  	nspDisplay.emit("remove player", {id: this.id});
};

function onNewPlayer(data) {
    // Create a new player
    var newPlayer = new Player(data.x, data.y);
    newPlayer.id = this.id;
    newPlayer.color = data.color;
    
    // Broadcast new player to connected socket clients
    nspDisplay.emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY(), color: newPlayer.color});
    
    // Send existing players to the displays
    // var existingPlayer;
    // for (var i = 0; i < players.length; i++) {
    //   	existingPlayer = players[i];
    //   	nspDisplay.emit("new player", {id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY() });
    // };
    	
    // Add new player to the players array
    players.push(newPlayer);
};

// Player has moved
function onMovePlayer(data) {
	// Find player in array
	var movePlayer = playerById(this.id);

	// Player not found
	if (!movePlayer) {
		util.log("Player not found: "+this.id);
		return;
	};
	// Update player position
	movePlayer.setX(data.x);
	movePlayer.setY(data.y);
	
	// Broadcast updated position to connected socket clients
	nspDisplay.emit("move player", {id: movePlayer.id, x: movePlayer.getX(), y: movePlayer.getY()});
};

/**************************************************
** HELPER FUNCTIONS
**************************************************/
// Find player by ID
function playerById(id) {
  	for (var i = 0; i < players.length; i++) {
  		  if (players[i].id == id) {
  			    return players[i];
  		  }
  	};
  	
  	return false;
};


/**************************************************
** START GAME
**************************************************/
init();