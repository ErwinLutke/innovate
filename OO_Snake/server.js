/**************************************************
**  REQUIREMENTS
**************************************************/
var util = require("util"),  
    express = require('express'),
    http = require('http'),
    socketio = require('socket.io'),
    scoresDB = require('./DB/Scores.js');
        
/**************************************************
** SERVER SERTUP
**************************************************/
var app = express(),                  // create express instance
    server = http.createServer(app),  // create the http server from express
    io = socketio(server),            // setup socket io to listen to the server
    port = 8081,
    // process.env.PORT,          // stores port to listen on
    ip = process.env.IP;              // stores the ip
    
var password = 123;

// setup namespace for different sockets
var nspDisplay = io.of('/display');
var nspClient = io.of('/client');
    
// gives access to game and client files
app.use('/client', express.static('Client'));
app.use('/display', express.static('Display'));
app.use('/', express.static('Client'));
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
var topScores;    // stores scores of top Players

var tempPlayer;

  
/**************************************************
** GAME INITIALISATION
**************************************************/
function init() { 
    scoresDB.ReadJson();   // loads the scores
    topScores = scoresDB.getScores();    // get scores and names of top 3 players
    tempPlayer = [];
    
    server.listen(port, ip);        // start up the game server
    util.log('Started game server: listening on port:' + port + ' on ip: ' + ip );
    
    players = [];                   // create empty array for storing the players
    waitingLine = [];               // create empty array for storing the waiting players
    maxPlayers = 5 ;                // number of allowed players
    
    nspDisplay.max_connections = 1;         // max number of display allowed
    nspDisplay.current_connections = 0;     // current number of displays
    
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
  	
  	// checks if max number displays is reached and disconnects client if its true
    if (nspDisplay.current_connections >= nspDisplay.max_connections) {
        display.emit('disconnect', 'Game in progress, cant display another');
        display.disconnect();
    } 
    else {
        nspDisplay.current_connections++;
        players = [];
        waitingLine = [];
        display.on("recieveScore", onRecieveScore);
        
      	display.on("spotOpen", onSpotOpen);  	            // Listen if Display has open spot because a player died
        display.on("disconnect", onDisplayDisconnect);  	// Listen for display disconnection
    }
}

function onDisplayDisconnect() {
  	util.log("Display has disconnected: " + this.id);
  	nspDisplay.current_connections--;
}

function onRecieveScore(data) {
    
    var player = playerById(data.id);
    var playerScore = data.points;
    
    players[player.pos].Score = playerScore;
   
    io.nsps['/client'].sockets[data.id].emit("sendScore", playerScore);
  	util.log("player score: " + playerScore);
}

function onSpotOpen(removedPlayerId) {
    var player = playerById(removedPlayerId);
    
    if (player === false) {
        util.log("onSpotOpen: player not found");
       // return
    }
    if(player.play === 1) {
        if(scoresDB.isInTop3(players[player.pos])) {
            tempPlayer.push(players[player.pos]);
            io.nsps['/client'].sockets[removedPlayerId].emit("topScore", topScores);
        } 
        else {
            io.nsps['/client'].sockets[removedPlayerId].emit("snakeDead", topScores);
        }
        players.splice(player.pos, 1);
    }
    
    if (waitingLine.length > 0) {
        var newPlayer = waitingLine.shift();
        players.push(newPlayer);
        nspDisplay.emit("newPlayer", newPlayer);
        
        io.nsps['/client'].sockets[newPlayer.id].emit("playGame");
        if (waitingLine.length > 0) {
            for(var i = 0; i < waitingLine.length; i++) {
                io.nsps['/client'].sockets[waitingLine[i].id].emit("waitingLine" , i+1);
            }
        }
    }
}


/**************************************************
** GAME EVENT HANDLERS - CLIENT
**************************************************/
var setEventHandlersClient = function() {
    nspClient.on("connection", onSocketConnectionClient);
};


function onSocketConnectionClient(client) {
  	util.log("New Client has connected: " + client.id);
    // util.log("playerArray check:  -- " + players[0].id);
    client.on("setPlayerName", onSetPlayerName);
  	client.on("disconnect", onClientDisconnect);    // Listen for client disconnected
    client.on("movePlayer", onMovePlayer);	        // Listen for move player message
    
    client.on("winPrice", onWinPrice);	            // store score of player
}

function onWinPrice(number){
    var player = playerById(this.id);
    
    if(player.play === 2){
        tempPlayer[player.pos].Nummer = number;
        scoresDB.updateScore(tempPlayer[player.pos]);
        topScores = scoresDB.getScores();
        io.nsps['/client'].sockets[this.id].emit("snakeDead", topScores);
        util.log("score saved, player:" + player.Naam + "\n\rscore: " + player.Score);
        tempPlayer.splice(player.pos, 1);
    }
}

function onSetPlayerName(playerName) {
    util.log("new player: " + playerName);
    
    // Create a new player
    var newPlayer = {id: this.id, Naam: playerName, Score: 0, Nummer: ""};
    util.log(newPlayer.Naam);
    // Place player in game or waitingLine 
    if(players.length < maxPlayers) {
        players.push(newPlayer);                    // Add new player to the players array
        nspDisplay.emit("newPlayer", newPlayer);    // Broadcast new player to gameDisplay
        this.emit("playGame");
        
    }
    else {
        waitingLine.push(newPlayer);                // Add new player to the waiting array
        var waitingPos = waitingLine.length;        // get the waiting position
        util.log("in wait");
        // send waiting position to this player
        //nspClient.sockets.connected[newPlayer.id]
        this.emit("waitingLine", waitingPos);
    }
}

// Socket client has disconnected
function onClientDisconnect() {
  	util.log("Player has disconnected: " + this.id);
  
    // find index position in array of the player by id
  	var removePlayer = playerById(this.id);
  	
  	// Player not found
  	if (removePlayer === false) {
        util.log("onClientDisconnect: Player not found: " + this.id);
        return;
  	}
  
  	// Remove player from arrays by index position - QUICKFIX
    if(removePlayer.play === 1) {
        players.splice(removePlayer.pos, 1);
        nspDisplay.emit("removePlayer", {id: this.id});
    }
    else if (removePlayer.play === 0) {
        waitingLine.splice(removePlayer.pos, 1);
    }
    else {
        tempPlayer.splice(removePlayer, 1);
    }
  	
  
  	// Broadcast removed player to connected socket clients
  	// only if in player array, not finished
}

// Player has moved
function onMovePlayer(dir) {
	// Find player in array

    util.log("player movement " + dir );
	var movePlayer = playerById(this.id);
	
	// Player not found
	if (movePlayer === false) {
		util.log("onMovePlayer: Player not found: "+ this.id);
		return;
	}
	
	if(movePlayer.play === 1) {
    	// Broadcast updated position to connected socket clients
    	nspDisplay.emit("movePlayerSnake", {id: players[movePlayer.pos].id, direction: dir});
	}
}


/**************************************************
** HELPER FUNCTIONS
**************************************************/
// Find player by ID: Checks players array and waitinglne array and tempPlayer array
function playerById(id) {
  	for (var i = 0; i < players.length; i++) {
  		  if (players[i].id == id) {
  			    return {pos: i, play: 1};
  		  }
  	}
  	
  	for (var i = 0; i < waitingLine.length; i++) {
  		  if (waitingLine[i].id == id) {
  			    return {pos: i, play: 0};
  		  }
  	}
  	  	
  	for (var i = 0; i < tempPlayer.length; i++) {
  		  if (tempPlayer[i].id == id) {
  			    return {pos: i, play: 2};
  		  }
  	}
  	return false;
}

/**************************************************
** START SERVER
**************************************************/
init();