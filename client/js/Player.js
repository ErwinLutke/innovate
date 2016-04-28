/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Player = function(startX, startY) {
	var x = startX,
		y = startY,
		color = "rgb("+Math.floor(Math.random()*200)+","+Math.floor(Math.random()*200)+","+Math.floor(Math.random()*200)+")",
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
	
	// Update player position
	var update = function(keys) {
		// Previous position
		var prevX = x,
			prevY = y;

		// Up key takes priority over down
		if (keys.up) {
			y -= speed;
		} else if (keys.down) {
			y += speed;
		};

		// Left key takes priority over right
		if (keys.left) {
			x -= speed;
		} else if (keys.right) {
			x += speed;
		};
		
		return (prevX != x || prevY != y) ? true : false;
	};
	
	// Define which variables and methods can be accessed
	return {
		getX: getX,
		getY: getY,
		setX: setX,
		setY: setY,
		color: color,
		update: update
	}
};