var socket;

/**************************************************
** COMMUNICATION SETUP
**************************************************/
function init() {
	socket = io.connect("/client");					// stores the io object 
	setEventHandlers();	
}
/**************************************************
** GAME EVENT HANDLERS - CLIENT
**************************************************/
var setEventHandlers = function() {
	socket.on("connect", onSocketConnected);		// Socket connection successful
	socket.on("disconnect", onSocketDisconnect);	// Socket disconnection
	socket.on("playGame", onPlayGame);
};
								// setup the event handling
// Socket connected
function onSocketConnected() {
	console.log("Connected to socket server");
}

// Socket disconnected
function onSocketDisconnect() {
	console.log("Disconnected from socket server");
}

function onPlayGame() {
	// auto hiding div messaging that the player entered the game
	function tempAlert(msg,duration) {
		var el = document.createElement("div");
		el.setAttribute("style","position:absolute;top:40%;left:20%;background-color:white;");
		el.innerHTML = msg;
		setTimeout(function(){
			el.parentNode.removeChild(el);
		},duration);
		
		document.body.appendChild(el);
	}
	tempAlert("Play Game",1000);
	
	// - to do
	// show scores, show name, show color
	// controls are now clickable
}

function movePlayer(dir) {
	socket.emit("movePlayer", dir);
}

init();