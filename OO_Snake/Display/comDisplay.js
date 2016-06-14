var game;
var socket;

/**************************************************
** COMMUNICATION SETUP
**************************************************/
function init(){
	socket = io.connect('/display');
	setEventHandlers();
}

/**************************************************
** SETUP GAME EVENT HANDLERS
**************************************************/
var setEventHandlers = function() {
	// Socket connection successful
	socket.on("connect", onSocketConnected);

	// Socket disconnection
	socket.on("disconnect", onSocketDisconnect);

	// New player message received
	socket.on("newPlayer", onNewPlayer);

	// Player move message received
	socket.on("movePlayerSnake", onMovePlayerSnake);

	// Player removed message received
	socket.on("removePlayer", onRemovePlayer);
	
	// Music options
	socket.on("music", onMusic);
};



/**************************************************
** EVENT HANDLERS - LISTENERS
**************************************************/
function onSocketConnected() {
	console.log("connected to the server");
}

function onSocketDisconnect(msg) {
	console.log("Disconnected from the server: " + msg);
}

function onNewPlayer(player) {
	game.addPlayer(player);
}

function onMovePlayerSnake(client) {
	var snakePos = game.snakeByClientId(client.id);
	if(snakePos !== false) {
		game.snakes[snakePos].moves.push(client.direction);
		game.snakes[snakePos].direction = client.direction;
	}
}

function onRemovePlayer(player) {
	var pos = game.snakeByClientId(player.id);
	if(pos !== false) {
		game.snakesToRemove.push(game.snakes[pos]);
	}
}

function onMusic(data) {
	if(data) {
		game.music.play();
		game.soundToggle = true;
	}
	if(!data) {
		game.music.stop();
		game.soundToggle = false;
	}
}

/**************************************************
** START COMMUNICATION
**************************************************/
init();

// @socket - holds the data connection to the server
game = new Game(socket);
game.loop();
