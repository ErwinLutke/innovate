
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
	addPlayer(player);
}

function onMovePlayerSnake(client) {
	var snakePos = snakeByClientId(client.id);
	snakes[snakePos].moves.push(client.direction);
	snakes[snakePos].direction = client.direction;
	console.log("moving snake: " + snakePos);
}

function onRemovePlayer(player) {
	var pos = snakeByClientId(player.id);
	if(pos !== false) {
		snakesToRemove.push(snakes[pos]);
	}
	// snakes.splice(pos, 1);
}


/**************************************************
** EVENT HANDLERS - SENDERS
**************************************************/
function sendScore(snake){
	    try {
    		socket.emit("recieveScore", {id: snake.clientID, points: snake.length});
    		console.log("sending points to server");
        }
        catch(e){
            console.log("SP? - cant send scores");
        }
}


/**************************************************
** START COMMUNICATION
**************************************************/
init();