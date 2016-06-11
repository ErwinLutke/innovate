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
	socket.on("snakeDead", onSnakeDead);					// recieve message you dead
	
	socket.on("topScore", onTopScore);				// recieve message you dead WITH highscore!
	
	//scores
	socket.on("sendScore", onSendScore); // get the current client score from server
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

function onPlayGame(color) {
	showHide(color);
}

function onWaitingLine(pos) {
	waitingLine(pos);
}

function onSendScore(score) {
	console.log("onSendScore function");
	updateMyScore(score);
}

function onTopScore() {
	inTopScore();
	console.log("onTopScores function");
}

function onSnakeDead(scores) { // death - view highscore, own score and replay button ( remember name)
	showTopScores(scores);
	// console.log(typeof scores);
	gameOver();
}

/**************************************************
** EVENT HANDLERS - SENDERS
**************************************************/
function movePlayer(dir) {
	socket.emit("movePlayer", dir);
}

function setPlayerName(name) {
	//misschien nog wat checks toevoegen?
	console.log("setplayername functie called");
	socket.emit("setPlayerName", name);
}

function setPhoneNumber(number) {
	//misschien nog wat checks toevoegen?
	console.log("winPrice functie called");
	socket.emit("winPrice", number);
}


/**************************************************
** START COMMUNICATION
**************************************************/
init();