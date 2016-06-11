var socket;
var allPlayerScores = [];

/**************************************************
** COMMUNICATION SETUP
**************************************************/
function init(){
	socket = io.connect('/admin');
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
	socket.on("passwordSucces", onPasswordSucces);
	socket.on("passwordFail", onPasswordFail);
	
	socket.on("setPlayerScores", onSetPlayerScores);
	socket.on("updatePlayerScores", onUpdatePlayerScores);
	
	socket.on("snakeDead", onSnakeDead);
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

function onSnakeDead(scores) { // death - view highscore, own score and replay button ( remember name)
	showTopScores(scores);
}


function onUpdatePlayerScores(player) {
	var pos = playerById(player.id);
	console.log("onupdate scores all players");
	
	if(pos === false) {
		console.log("is a new player");
		allPlayerScores.push(player);
	} else {
		console.log("existing player update score");
		allPlayerScores[pos].Score = player.Score;
	}
	updateScoresAll(allPlayerScores);
}

function onSetPlayerScores(scores){
	if(scores.length > allPlayerScores.length) {
		allPlayerScores = scores;
	}
	saveAllPlayerScores();
}


function playerById(id) {
  	for (var i = 0; i < allPlayerScores.length; i++) {
  		  if (allPlayerScores[i].id == id) {
  			    return i;
  		  }
  	}
  	return false;
}

function onPasswordSucces(data) {
    showAdminPanel(data);
}

function onPasswordFail() {
    alert("Onjuist wachtwoord");
    location.reload();
}

/**************************************************
** EVENT HANDLERS - SENDERS  (temp in Game.js)
**************************************************/

function checkPassword(pass) {
    socket.emit("checkPassword", pass);
}

function toggleMusic(toggle) {
    socket.emit("music", toggle);
}

function saveAllPlayerScores() {
	socket.emit("saveAllScores", allPlayerScores)
	setTimeout(saveAllPlayerScores, 60000 * 5);
}

/**************************************************
** START COMMUNICATION
**************************************************/
init();

