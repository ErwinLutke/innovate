
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

function onSocketDisconnect() {
	console.log("Disconnected from the server");
}

function onNewPlayer(player) {
	addPlayer(player);
}

function onMovePlayerSnake(client) {
	var snakePos = snakeByClientId(client.id);
	console.log(snakePos);
	snakes[snakePos].direction = client.direction;
}

function onRemovePlayer(player) {
	var pos = snakeByClientId(player.id);
	snakes.splice(pos, 1);
//	socket.emit("spotOpen", player.id);
}

init();