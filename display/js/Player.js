/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Player = function(startX, startY) {
	var x = startX,
		y = startY,
		color,
		id,
		speed = 5;

	// Getters and setters
	var getX = function() {
		return x;
	};

	var getY = function() {
		return y;
	};

	var setX = function(newX) {
		x = newX;
	};

	var setY = function(newY) {
		y = newY;
	};

	var draw = function(ctx) {
		ctx.fillStyle = this.color;
		ctx.fillRect(x, y, 50, 50);
	};

	// Define which variables and methods can be accessed
	return {
		getX: getX,
		getY: getY,
		setX: setX,
		setY: setY,
		color: color,
		draw: draw,
		id: id
	}
};