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
	// alert(msg);
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
	//console.log("moving snake: " + snakePos);
}

function onRemovePlayer(player) {
	var pos = game.snakeByClientId(player.id);
	if(pos !== false) {
		game.snakesToRemove.push(game.snakes[pos]);
	}
	// snakes.splice(pos, 1);
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
** EVENT HANDLERS - SENDERS  (temp in Game.js)
**************************************************/
function sendScore(snake){
	    try {
    		socket.emit("recieveScore", {id: snake.clientID, points: snake.length});
    		//console.log("sending points to server");
        }
        catch(e){
           // console.log("SP? - cant send scores");
        }
}


/**************************************************
** START COMMUNICATION
**************************************************/
init();

game = new Game(socket);
game.loop();
