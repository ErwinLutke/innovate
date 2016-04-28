/**************************************************
** GAME VARIABLES
**************************************************/
var keys,			// Keyboard input
	localPlayer,	// Local player
	socket;			// Socket connection


/**************************************************
** GAME INITIALISATION
**************************************************/
function init() {
	// Initialise keyboard controls
	keys = new Keys();

	// Set start position
	var startX = 0,
		startY = 0;

	// Initialise the local player
	localPlayer = new Player(startX, startY);
	
	// Initialise socket connection
	socket = io.connect('/client');

	// Start listening for events
	setEventHandlers();
};


/**************************************************
** GAME EVENT HANDLERS
**************************************************/
var setEventHandlers = function() {
	// Keyboard
	window.addEventListener("keydown", onKeydown, false);
	window.addEventListener("keyup", onKeyup, false);

	// Socket connection successful
	socket.on("connect", onSocketConnected);

	// Socket disconnection
	socket.on("disconnect", onSocketDisconnect);
};

// Keyboard key down
function onKeydown(e) {
	if (localPlayer) {
		keys.onKeyDown(e);
		update();
	};
};

// Keyboard key up
function onKeyup(e) {
	if (localPlayer) {
		keys.onKeyUp(e);
	};
};

// Socket connected
function onSocketConnected() {
	console.log("Connected to socket server");

	// Send local player data to the game server
	socket.emit("new player", {x: localPlayer.getX(), y: localPlayer.getY(), color: localPlayer.color});
};

// Socket disconnected
function onSocketDisconnect() {
	console.log("Disconnected from socket server");
};

/**************************************************
** GAME COLLISION
**************************************************/

//work in progress
function checkCollision() {
	if (localPlayer.getX < 0) {
    	localPlayer.setX += 5;
	}	
	if (localPlayer.getY < 0) {
	}
	console.log(localPlayer.getX());
}

/**************************************************
** GAME UPDATE
**************************************************/
function update() {
	// Update local player and check for change]
	if (localPlayer.update(keys)) {
		// Send local player data to the game server
		socket.emit("move player", {x: localPlayer.getX(), y: localPlayer.getY()});
		
	};
};

