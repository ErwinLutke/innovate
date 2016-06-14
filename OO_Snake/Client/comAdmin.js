
var socket;					// stores connection to the server
var allPlayerScores = [];	// stores all scores, get from server at init

/**************************************************
** COMMUNICATION SETUP
**************************************************/
function init(){
	socket = io.connect('/admin');	// connect to the server
	setEventHandlers();				// setup eventhandlers
}

/**************************************************
** SETUP GAME EVENT HANDLERS
**************************************************/
var setEventHandlers = function() {
	// Socket connection successful
	socket.on("connect", onSocketConnected);
};



/**************************************************
** EVENT HANDLERS - LISTENERS
**************************************************/
function onSocketConnected() {
	console.log("connected to the server");
	
	// Socket disconnection
	socket.on("disconnect", onSocketDisconnect);

	// If password is succesful or failed
	socket.on("passwordSucces", onPasswordSucces);
	socket.on("passwordFail", onPasswordFail);
}

function onSocketDisconnect(msg) {
	console.log("Disconnected from the server: " + msg);
}


// if succesfull shows the admin panel
// @data - holds the top3 scores and phonenumbers, also the music option
function onPasswordSucces(data) {
	// Manages the scores
	socket.on("setPlayerScores", onSetPlayerScores);			// sets all playerscores
	socket.on("updatePlayerScores", onUpdatePlayerScores);		// update all player scores
	
	// shows the admin panel
    showAdminPanel(data);
}

function onPasswordFail() {
    alert("Onjuist wachtwoord");
    location.reload();
}

// update player scores
function onUpdatePlayerScores(player) {
	var pos = playerById(player.id);
	console.log("onupdate scores all players");
	
	if(pos === false) {
		console.log("is a new player");
		player.Date = new Date().toLocaleString();
		allPlayerScores.push(player);
	} else {
		console.log("existing player update score")
		if(player.Score > allPlayerScores[pos].Score) {
			player.Date = new Date().toLocaleString();
			allPlayerScores[pos].Score = player.Score;
		}
	}
	updateScoresAll(allPlayerScores);
}

// sets all player scores
function onSetPlayerScores(scores){
		allPlayerScores = scores;
		updateScoresAll(allPlayerScores);
}

/**************************************************
** EVENT HANDLERS - SENDERS
**************************************************/
function checkPassword(pass) {
    socket.emit("checkPassword", pass);
}

function toggleMusic(toggle) {
    socket.emit("music", toggle);
}


/**************************************************
** HELPER FUNCTIONS
**************************************************/
function playerById(id) {
  	for (var i = 0; i < allPlayerScores.length; i++) {
  		  if (allPlayerScores[i].id == id) {
  			    return i;
  		  }
  	}
  	return false;
}

/**************************************************
** START COMMUNICATION
**************************************************/
init();

