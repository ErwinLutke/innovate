
//initialiseer de objecten
var game = new Game();
var renderer = new Renderer(game);

var snakesToRemove = [];
var tempSnakes = [];
// // hou de snakeobjecten bij
var snakes = [];
var debugMode = true;

// @snakeToRemove = array
function removeSnake(snakeToRemove) {
    var srl = snakeToRemove.length;
    for (var i = 0; i < srl; i++) {
        var pos = snakeToRemove.shift();
        var rsnake = snakes[pos];
        tempSnakes.push(rsnake);
        // console.log("removing snake: " + pos);
        var id = rsnake.clientID;
        // console.log("remoo " + id);
        snakes.splice(pos, 1);
	    socket.emit("spotOpen", id);
    }
    
    if(tempSnakes.length > 0) {
        for (var i = tempSnakes.length -1; i >= 0; i--) {
            console.log("check 1");
            var tsnake = tempSnakes[i];
            if (tsnake.segments.length -1 > 0) {
                renderer.drawCell(tsnake.segments[tsnake.segments.length -1], game.clearColor);
                tsnake.segments.pop();
            } else {
                tempSnakes.splice(i, 1);
            }
        }
    }
}

//wanneer de server zegt dat iemand joint, wordt deze functie aangeroepen
//functie wordt aangeroepen door com.js (socket.io) data param wordt aut. meegegeven
function addPlayer(data) {
    console.log("new player: " + data.id);
    snakes.push(new Snake(data.id));
    var snake = snakes[snakes.length - 1];
    snake.color = "#1009f2";
    snake.spawnSnake(15, 15);
    console.log("snake: " + snakes[0].clientID);
}

renderer.drawCells();

var food;
function addFood(snake) {
    snake = snake || null;
    food = new Food();
    renderer.drawCell(food.position, food.color); // = randPosition()
    if(snake != null) {
        console.log("Caught food: " + food.caughtFood + " | total caught food of " + snake.clientID + ": " + snake.totalCaughtFood);// + totalCaughtFood
    }
}
addFood();
//renderer.drawCell(food.position = randPosition(), food.color);

// snake.color = "#1009f2";
// snake.spawnSnake(5,0);

// snakes.push(snake);

//spawnFood();
//var food = new Food();

//het aantal fps dat die moet halen
var speed = 15;
//var om "p" element op te halen
var fps  = document.getElementById('fps');
// fps wordt berekent vanaf 2 punten, tijd nu en tijd na de loop
var lastLoop = new Date;
var loopTime = 0;

function gameLoop() {
    var thisLoop = new Date;
    fps.innerHTML = (1000 / (thisLoop - lastLoop) |0) + " FPS";
    lastLoop = thisLoop;
    
    //food.spawnFood();
    
    collisionDetect();
    
    // renderer.drawCell(food.position)
    renderer.drawSnakes(snakes);
    
    for (var i = 0; i < snakes.length; i++) {
        snakes[i].moveSnake();
    }
    
     setTimeout(function(){
       gameLoop();
     }, 1000 / speed); //20
}


function collisionDetect() {            
// Get all snakes that are in the game
    for(var i = 0; i < snakes.length; i++) {
        // Save the snake that we are going to check
        // var snake = snakes[i];
        // Get all snakes in the game once more
        for(var j = 0; j < snakes.length; j++) {
            // Check saved snake against all the snakes
            for(var s = 1; s < snakes[j].segments.length; s++) {
                // Check if head of snakes colides against any other seg
                if(snakes[i].segments[0].x == snakes[j].segments[s].x && snakes[i].segments[0].y == snakes[j].segments[s].y ) {
                    console.log("erwin collision: TRUE");
                    snakesToRemove.push(i);
                    console.log("snake position for removal: " + i);
                } 
            }
        }
    }
    //collision with Fruit
    for (var i = 0; i < snakes.length; i++) {
        if(snakes[i].segments[0].x == food.position.x && snakes[i].segments[0].y == food.position.y) {
            snakes[i].totalCaughtFood++;
            snakes[i].addSegment(4);
            addFood(snakes[i]);
        }
    }
    
    for (var i = 0; i < snakes.length; i++) {
        //collision with canvas wall right
        if(snakes[i].segments[0].x == game.sizeX) {
            if(debugMode === true) { //kan later worden vervangen door "openWall === true"?
                snakes[i].segments[0].x = 0;
            } else {
                console.log("Game Over | Points:" + loopTime);
            }
        }
        //collision with canvas wall left
        if(snakes[i].segments[0].x <= -1) {
            if(debugMode === true) { //kan later worden vervangen door "openWall === true"?
                snakes[i].segments[0].x = game.sizeX - 1;
            } else {
                console.log("Game Over | Points:" + loopTime);
            }
        }
        //collision with canvas wall bottom
        if(snakes[i].segments[0].y == game.sizeY) {
            if(debugMode === true) { //kan later worden vervangen door "openWall === true"?
                snakes[i].segments[0].y = 0;
            } else {
                console.log("Game Over | Points:" + loopTime);
            }
        }
        //collision with canvas wall top
        if(snakes[i].segments[0].y <= -1) {
            if(debugMode === true) { //kan later worden vervangen door "openWall === true"?
                snakes[i].segments[0].y = game.sizeY - 1;
            } else {
                console.log("Game Over | Points:" + loopTime);
            }
        }
    }
    
    
    removeSnake(snakesToRemove);
}

function snakeByClientId(clientSnakeId) {
    for (var i = 0; i < snakes.length; i++) {
        if (snakes[i].clientID == clientSnakeId) {
            return i;
        }
    }
    return false;
}



//draws the entire grid
gameLoop();

    