var socket;

/**************************************************
** COMMUNICATION SETUP
**************************************************/
function init() {
	socket = io.connect("/client");					// stores the io object 
	setEventHandlers();	
}

/**************************************************
** SETUP GAME EVENT HANDLERS
**************************************************/
var setEventHandlers = function() {
	socket.on("connect", onSocketConnected);		// Socket connection successful
	socket.on("disconnect", onSocketDisconnect);	// Socket disconnection
	socket.on("playGame", onPlayGame);				// recieve GO to play the game
	socket.on("waitingLine", onWaitingLine);		// recieve message to be in waiting line
	socket.on("snakeDead", onSnakeDead);			// recieve message that snake died
	socket.on("topScore", onTopScore);				// recieve message snake died, WITH highscore!
	socket.on("sendScore", onSendScore);			// get client score from server
};

/**************************************************
** EVENT HANDLERS - LISTENERS
**************************************************/
// Socket connected
function onSocketConnected() {
	console.log("Connected to socket server");
}

// Socket disconnected
function onSocketDisconnect() {
	console.log("Disconnected from socket server");
}

// player may play
function onPlayGame(color) {
	// shows the controls, hide the rest
	// passes the color of the snake for display
	showHide(color);
}

// is in waiting line
function onWaitingLine(pos) {
	// shows the waitingline with the position
	waitingLine(pos);
}

// recieves scores from server when fruit is eaten
function onSendScore(score) {
	updateMyScore(score);
}

// if highscore is reached
function onTopScore(topscores) {
	// show topscore screen for phone submission
	inTopScore(topscores);
}

function onSnakeDead(scores) { 
	// shows gameOver screen and updates top scores
	showTopScores(scores);
	gameOver();
}

/**************************************************
** EVENT HANDLERS - SENDERS
**************************************************/
function movePlayer(dir) {
	//sends position pressed to server
	socket.emit("movePlayer", dir);
}

function setPlayerName(name) {
	// sends entered name to server
	socket.emit("setPlayerName", name);
}

function setPhoneNumber(number) {
	// sends entered phonenumber to server
	socket.emit("winPrice", number);
}


/**************************************************
** START COMMUNICATION
**************************************************/
init();