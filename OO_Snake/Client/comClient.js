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
	socket.on("waitingLine", onWaitingLine);
	socket.on("replay", onReplay);
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
	tempAlert("Play Game",2000);
	
	// - to do
	// show scores, show name, show color
	// controls are now clickable
}

function onWaitingLine(pos) {
	// auto hiding div messaging that the player entered the game
	function tempAlert(msg, duration) {
		var el = document.createElement("div");
		el.setAttribute("style","position:absolute;top:40%;left:20%;background-color:white;");
		el.innerHTML = msg;
		setTimeout(function(){
			el.parentNode.removeChild(el);
		},duration);
		
		document.body.appendChild(el);
	}
	tempAlert("Im the Waiting line, poisiton: " + pos, 4000);
	
	// - to do
	// show scores, show name, show color
	// controls are now clickable
}

function movePlayer(dir) {
	socket.emit("movePlayer", dir);
}

function onReplay() {
	var el = document.createElement("replay");
		el.setAttribute("style","position:absolute;top:40%;left:20%;padding:100px;background-color:green;border:1px solid black;");
		el.innerHTML = "Press to play again!";
		document.body.appendChild(el);
		el.onclick = function() {
			location.reload(); 
		}; 
		// socket.emit("movePlayer", dir);
}

init();