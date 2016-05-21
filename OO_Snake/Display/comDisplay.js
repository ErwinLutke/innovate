
var socket;


    
function init(){
	socket = io.connect('/display');
	setEventHandlers();
}

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

function onSocketConnected() {
	console.log("connected to the server");
}

function onSocketDisconnect(msg) {
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
		snakesToRemove.push(pos);
	}
	// snakes.splice(pos, 1);
}

init();