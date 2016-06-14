/**************************************************
**  REQUIREMENTS
**************************************************/
var util = require("util"),                 // Module for logging
    express = require('express'),           // Module for express framework
    http = require('http'),                 // using http
    socketio = require('socket.io'),        // loads up socket.io
    scoresDB = require('./DB/Scores.js');   // Loads functions for scores
        
/**************************************************
** SERVER SERTUP
**************************************************/
var app = express(),                  // create express instance
    server = http.createServer(app),  // create the http server from express
    io = socketio(server),            // setup socket io to listen to the server
    //port = 8081,
    port = process.env.PORT,          // stores port to listen on
    ip = process.env.IP;              // stores the ip
    
    
    
// setup namespace for different sockets
var nspDisplay = io.of('/display');
var nspClient = io.of('/client');
var nspAdmin = io.of('/admin');

// setup passowrd for the admin panel
var password = "";
    
// gives access to game and client files
app.use('/client', express.static('Client'));
app.use('/admin', express.static('Client'));
app.use('/display', express.static('Display'));
app.use('/', express.static('Client'));

// request to the root of dir (homepage) send the request to client index
app.get('/', function(request, response){
   response.sendFile(__dirname + '/Client/client.html');
});



/**************************************************
** GAME VARIABLES
**************************************************/
var players;                // array of connected players
var waitingLine;            // stores players if no spot is free
var maxPlayers;             // int - players allowed to play at the same time
var topScores;              // stores scores of top Players

var allScores = [];         // Stores all scores of everyone playing
var tempPlayer = [];        // stores temporary players
var OccupiedColors = [];    // sets color for the snake and players
var playMusic = 1;          // Sets music on or off

/**************************************************
** GAME INITIALISATION
**************************************************/
function init() { 
    scoresDB.ReadJson();                        // loads the top scores
    topScores = scoresDB.getScores();           // get scores and names of top 3 players
    allScores = scoresDB.readAllScores();       // loads all scores
    saveAllPlayerScores();                      // saves all player scores

    server.listen(port, ip);                    // start up the game server
    util.log('Started game server: listening on port:' + port + ' on ip: ' + ip );
    
    players = [];                               // create empty array for storing the players
    waitingLine = [];                           // create empty array for storing the waiting players
    maxPlayers = 10;                            // number of allowed players
    
    nspDisplay.max_connections = 1;             // max number of display allowed
    nspDisplay.current_connections = 0;         // current number of displays
    
    // setup the event handling
    setEventHandlersDisplay();
    setEventHandlersClient();
    setEventHandlersAdmin();
}

/**************************************************
** EVENT HANDLERS - ADMIN
**************************************************/
// When admin panel connects, this function triggers
var setEventHandlersAdmin = function() {
    nspAdmin.on("connection", onSocketConnectionAdmin);
};

// Setup function for when admin client connects
// @socket is the connection data to the client
function onSocketConnectionAdmin (socket) {
    socket.on("disconnect", onAdminDisconnect);
    socket.on("checkPassword", onCheckPassword);
}

// Empty function
function onAdminDisconnect() {
}

// Checks entered password against server password for data access
// @pass - this is the password that the client sends in string format
function onCheckPassword(pass){

    if (pass === password){
        // stores the phone numbers of the top 3
        var numbers = scoresDB.getNummers();
        
        // sends the top3 scores and phonenumbers, also sends the music option
        this.emit("passwordSucces", {scores: topScores, phone: numbers, music: playMusic});
        // Current scores will be sent to the adminpanel for display
        this.emit("setPlayerScores", allScores);
        
        //sets listener for the music toggle in admin panel
        this.on("music", onMusic);   
    }
    else {
        // if the passwords dont match
        this.emit("passwordFail");
    }
}

// Triggered when the music in admin panel is toggled
// Will also stop ll other sounds
// @toggle - booleaan, true - play, false = stop;
function onMusic(toggle) {
    playMusic = toggle;
    nspDisplay.emit("music", toggle);
}

/**************************************************
** GAME EVENT HANDLERS - DISPLAY
**************************************************/
// Main function of the display listening event
var setEventHandlersDisplay = function() {
        nspDisplay.on("connection", onSocketConnectionDisplay);
};

// Setup function when display has connected
function onSocketConnectionDisplay(display) {
  	// checks if max number displays is reached and disconnects client if its true
    if (nspDisplay.current_connections >= nspDisplay.max_connections) {
        display.emit('disconnect', 'Game in progress, cant display another');
        display.disconnect();
    } 
    else {
        // if display is allowed to connect (not reached max)
        nspDisplay.current_connections++;
        
        // resets players and waitingline
        players = [];
        waitingLine = [];
        
        // setup listeners
        display.on("recieveScore", onRecieveScore);         // player grabbed a point
      	display.on("spotOpen", onSpotOpen);  	            // Listen if Display has open spot because a player died
        display.on("disconnect", onDisplayDisconnect);  	// Listen for display disconnection
    }
}

// Responsible for decrementing the total Displays connected
function onDisplayDisconnect() {
  	nspDisplay.current_connections--;
}

// Responsible for updating scores
// @data holds the player id and points
function onRecieveScore(data) {
    var player = playerById(data.id);               // get the player position from players[] by id
    var thePlayer = players[player.pos];            // store the player object
    var playerScore = data.points;                  // store the player score
    thePlayer.Score = playerScore;                  // save the player score  

    // get the position of the player in the allScores array
    var pos = playerByIdScores(thePlayer.id);
    
    // check if player exists in the allScores array
	if(pos === false) { 
        thePlayer.Date = getCurrentTime();
	    // New player: store the player in the allScores array
	    allScores.push(thePlayer);
	}
	else if(thePlayer.Score > allScores[pos].Score) {
        thePlayer.Date = getCurrentTime();
	    // Existing player: store the player score in all scores if its higher then his previous score
	    allScores[pos].Score = thePlayer.Score;
	} 
	
	    
    // Update player scores, send to client and adminpanel
    io.nsps['/client'].sockets[data.id].emit("sendScore", playerScore);
    nspAdmin.emit("updatePlayerScores", thePlayer);
    
}

// Responsible for pushing players from the waitingline to players[] and removing them from players[]
// Resonspible for notifying if the player has a topscore
// @removedPlayer holds the client id and the color for the snake
function onSpotOpen(removedPlayer) {
    //get index position from players[]
    var player = playerById(removedPlayer.id);
    
    // if the player was playing
    if(player.play === 1) {
        //store the player
        var thePlayer = players[player.pos];
        
        //remove color from OccupiedColors[] so that new snake can use it
        var indexToRemove = OccupiedColors.indexOf(removedPlayer.color);
        OccupiedColors.splice(indexToRemove, 1);
       
        // check if player has a score in the top 3
        if(scoresDB.isInTop3(thePlayer)) {
            // player has score, temporary store the player and send notification of highscore to client
            // tempPlayer will be used to possibly update the highscores depending on the client
            tempPlayer.push(thePlayer);
            io.nsps['/client'].sockets[removedPlayer.id].emit("topScore", topScores);
        } 
        else {
            // player is not in the top 3, send notification to the client that the snake died
            io.nsps['/client'].sockets[removedPlayer.id].emit("snakeDead", topScores);
        }
        // remove player from players[]
        players.splice(player.pos, 1);
    }
    
    // Check if there are players in the waiting line
    if (waitingLine.length > 0) {
        // store the first waiting player and push them in players[]
        var newPlayer = waitingLine.shift();
        players.push(newPlayer);
        
        // Determine color for the snake
        var sColor = giveColor();
        
        // send player and color towards the display to enter the game.
        // send notification to client to enter the game
        nspDisplay.emit("newPlayer", { player: newPlayer, color: sColor });
        io.nsps['/client'].sockets[newPlayer.id].emit("playGame", sColor);
        
        // check if there are still more players in the waitingline
        if (waitingLine.length > 0) {
            // update position of every client in the waitingline. Poisition is -1;
            for(var i = 0; i < waitingLine.length; i++) {
                io.nsps['/client'].sockets[waitingLine[i].id].emit("waitingLine" , i+1);
            }
        }
    }
}

/**************************************************
** GAME EVENT HANDLERS - CLIENT
**************************************************/
// Listens for new client connections
var setEventHandlersClient = function() {
    nspClient.on("connection", onSocketConnectionClient);
};

// Triggers when a new client connects
// @client - stores the socket connection from the client
function onSocketConnectionClient(client) {
    client.on("setPlayerName", onSetPlayerName);    // Listen for client if player nickname has been set
  	client.on("disconnect", onClientDisconnect);    // Listen for client disconnected
    client.on("movePlayer", onMovePlayer);	        // Listen for move player message
    client.on("winPrice", onWinPrice);	            // Listen if client enters phonenumber
}

// Responsible for updating the top 3 highscores
// @number - the phonenumber of the player with a highscore
function onWinPrice(number) {
    // search index position of player in tempPlayers[]
    var player = playerById(this.id);
    
    // if player is in TempPlayers
    if(player.play === 2){
        // Set the number of the player
        tempPlayer[player.pos].Nummer = number;
        // update the highscores
        scoresDB.updateScore(tempPlayer[player.pos]);
        // redefine the topscores
        topScores = scoresDB.getScores();
        // send message to client to enter gameOver screen with new top scores
        io.nsps['/client'].sockets[this.id].emit("snakeDead", topScores);
        // remove player from tempPlayer[]
        tempPlayer.splice(player.pos, 1);
    }
}

//Responsible for storing the nickname of the client
// @playerName - holds the nickname entered by the client
function onSetPlayerName(playerName) {
    // Create a new player, set Score and Nummber to nothing
    var newPlayer = {id: this.id, Naam: playerName, Score: 0, Nummer: ""};
   
    // Place player in game or waitingLine 
    if(players.length < maxPlayers) {
        // if maxPlayers not reached, determine snake color and push to players[]
        var sColor = giveColor();
        players.push(newPlayer);  
        
        // Broadcast new player to gameDisplay and send play message to client
        nspDisplay.emit("newPlayer", { player: newPlayer, color: sColor });
        this.emit("playGame", sColor);
    }
    else {
        // if maxplayers is reached, player will be send to the waiting line
        waitingLine.push(newPlayer);                // Add new player to the waiting array
        var waitingPos = waitingLine.length;        // get the waiting position
        this.emit("waitingLine", waitingPos);       // send waiting position to this player
    }
}

// Responsible for managing the disconnection of clients
// Manages the players[], tempPlayers[] and waitingLinep[] for proper handling
function onClientDisconnect() {
     // find index position in array of the player by id
  	var removePlayer = playerById(this.id);
  	
  	// Player not found
  	if (removePlayer === false) {
        return;
  	}
  
  	// Remove player from arrays by index position
    if(removePlayer.play === 1) {
        // of player is playing the game, remove from display and players[]
        nspDisplay.emit("removePlayer", {id: this.id});
        players.splice(removePlayer.pos, 1);
    }
    else if (removePlayer.play === 0) {
        // if player is in the waitingline, remove player
        waitingLine.splice(removePlayer.pos, 1);
    }
    else {
        // if players is in the highscore submission screen, remove player
        tempPlayer.splice(removePlayer, 1);
    }
}

// Responsible for moving the player
// @dir - holds the direction of the players (up, down, left, right)
function onMovePlayer(dir) {
	// Find player in players[]
	var movePlayer = playerById(this.id);
	
	// Player not found
	if (movePlayer === false) {
		return;
	}

    // If player is in players[]
	if(movePlayer.play === 1) {
    	// Broadcast updated position to connected display
    	nspDisplay.emit("movePlayerSnake", {id: players[movePlayer.pos].id, direction: dir});
	}
}


/**************************************************
** HELPER FUNCTIONS
**************************************************/
// Find player by ID in players[], waitingLine[], tempPlayers[]
// returns position and what array the player is found in
// if none is found, return false
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

// Will return a random number between 0 and 9
function giveColor() {
    var color = Math.floor((Math.random() * 10));
    while(OccupiedColors.indexOf(color) != -1) {
        color = Math.floor((Math.random() * 10));
    }
    OccupiedColors.push(color);
    return color;
}

// Resposible for returning the index position of the player in allScores[]
function playerByIdScores(id) {
  	for (var i = 0; i < allScores.length; i++) {
  		  if (allScores[i].id == id) {
  			    return i;
  		  }
  	}
  	return false;
}

// saves scores every 30 seconds
function saveAllPlayerScores() {
    scoresDB.saveAllScores(allScores);
	setTimeout(saveAllPlayerScores, 30000);
}

//returns current time
function getCurrentTime() {
    var currentdate = new Date(); 
    var datetime =    ("0" + currentdate.getDate()).slice(-2) + "/"
                    + ("0" + (currentdate.getMonth()+1)).slice(-2)  + "/" 
                    + ("0" + currentdate.getFullYear()).slice(-2) + " @ "  
                    + ("0" + currentdate.getHours()).slice(-2) + ":"  
                    + ("0" + currentdate.getMinutes()).slice(-2) + ":" 
                    + ("0" + currentdate.getSeconds()).slice(-2);
    return datetime;
}

/**************************************************
** START SERVER
**************************************************/
init();