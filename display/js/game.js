/**************************************************
** GAME VARIABLES
**************************************************/
var canvas,			// Canvas DOM element
	ctx,			// Canvas rendering context
	keys,			// Keyboard input
	remotePlayers,	// Remote players
	socket;			// Socket connection


/**************************************************
** GAME INITIALISATION
**************************************************/
function init() {
	// Declare the canvas and rendering context
	canvas = document.getElementById("gameCanvas");
	ctx = canvas.getContext("2d");

	// Maximise the canvas
	canvas.width = window.innerWidth - 20;
	canvas.height = window.innerHeight - 20;

	// Initialise socket connection
	socket = io.connect('/display');
	
	// Initialise remote players array
	remotePlayers = [];

	// Start listening for events
	setEventHandlers();
};


/**************************************************
** GAME EVENT HANDLERS
**************************************************/
var setEventHandlers = function() {
	// Window resize
	window.addEventListener("resize", onResize, false);

	// Socket connection successful
	socket.on("connect", onSocketConnected);

	// Socket disconnection
	socket.on("disconnect", onSocketDisconnect);

	// Socket connection successful
	socket.on("players", onSocketPlayers);
	
	// New player message received
	socket.on("new player", onNewPlayer);

	// Player move message received
	socket.on("move player", onMovePlayer);

	// Player removed message received
	socket.on("remove player", onRemovePlayer);
};

// Browser window resize
function onResize(e) {
	// Maximise the canvas
	canvas.width = window.innerWidth - 20;
	canvas.height = window.innerHeight - 20;
};

// Socket connected
function onSocketConnected() {
	console.log("Connected to socket server");
};

// Socket disconnected
function onSocketDisconnect() {
	console.log("Disconnected from socket server");
};

// Set the players from server
function onSocketPlayers(players) {
	remotePlayers = [];
	var jsonPlayers = JSON.parse(players);
  	for (var i = 0; i < jsonPlayers.length; i++) {
  		var player = new Player(jsonPlayers[i].jsonX, jsonPlayers[i].jsonY)
  		player.id = jsonPlayers[i].id;
  		player.speed = jsonPlayers[i].speed;
  		player.color = jsonPlayers[i].color;
  		remotePlayers.push(player);
  	}
};

// New player
function onNewPlayer(data) {
	console.log("New player connected: "+data.id);

	console.log(data);
	// Initialise the new player
	var newPlayer = new Player(data.x, data.y);
	newPlayer.id = data.id;
	newPlayer.color = data.color;
	
	// Add new player to the remote players array
	remotePlayers.push(newPlayer);
	
};


// Move player
function onMovePlayer(data) {
	var movePlayer = playerById(data.id);

	// Player not found
	if (!movePlayer) {
		console.log("Player not found: "+ data.id);
		return;
	};

	console.log(" player move: "+ movePlayer.id);
	// Update player position
	movePlayer.setX(data.x);
	movePlayer.setY(data.y);
};

// Remove player
function onRemovePlayer(data) {
	var removePlayer = playerById(data.id);

	// Player not found
	if (!removePlayer) {
		console.log("Player not found: "+data.id);
		return;
	};

	// Remove player from array
	remotePlayers.splice(remotePlayers.indexOf(removePlayer), 1);
};


/**************************************************
** GAME ANIMATION LOOP
**************************************************/
function animate() {
	draw();
	// Request a new animation frame using Paul Irish's shim
	window.requestAnimFrame(animate);
};



/**************************************************
** GAME DRAW
**************************************************/
function draw() {
	// Wipe the canvas clean
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// Draw remote players
	for (var i = 0; i < remotePlayers.length; i++) {
		remotePlayers[i].draw(ctx);
	};
};

/**************************************************
** GAME HELPER FUNCTIONS
**************************************************/
// Find player by ID
function playerById(id) {
	var i;
	for (i = 0; i < remotePlayers.length; i++) {
		if (remotePlayers[i].id == id)
			return remotePlayers[i];
	};
	
	return false;
};

