/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Player = function(startX, startY) {
	var x = startX, 		// used for moving the position
		y = startY, 		// used for moving the position
		jsonX,				// used for remembering the position
		jsonY, 				// used for remembering the position
		color,				// defines player color
		speed = 5, 			// movement speed
		id;					// id for player

	// Getters and setters
	var getX = function() {
		return x;
	};

	var getY = function() {
		return y;
	};

	var setX = function(newX) {
		x = newX;
		this.jsonX = newX;
	};

	var setY = function(newY) {
		y = newY;
		this.jsonY = newY;
	};

	// Define which variables and methods can be accessed
	return {
		getX: getX,
		getY: getY,
		setX: setX,
		setY: setY,
		id: id,
		speed: speed,
		color: color,
		jsonX: jsonX,
		jsonY: jsonY
	}
};

// Export the Player class so you can use it in
// other files by using require("Player").Player
exports.Player = Player;