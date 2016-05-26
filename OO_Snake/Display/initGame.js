// http://jsfiddle.net/straker/bLBjn/
        sounds.load([
          "../Client/lib/sounds/explosion.wav", 
          "../Client/lib/sounds/music.wav",
        ]);
        
        sounds.whenLoaded = setup;
        
        var explosion;
        
        function setup() {
          console.log("sounds loaded");
        
          //Create the sounds
          explosion = sounds["../Client/lib/sounds/explosion.wav"];
          var music = sounds["../Client/lib/sounds/music.wav"]; 
              
          music.loop = true;
          music.volume = 0.7; 
          music.play();
        }
        
        function sfxEat() {
          soundEffect(
            523.25,       //frequency
            0.05,         //attack
            0.2,          //decay
            "sine",       //waveform
            1,            //volume
            0.8,          //pan
            0,            //wait before playing
            600,          //pitch bend amount
            true,         //reverse
            100,          //random pitch range
            0,            //dissonance
            undefined,    //echo: [delay, feedback, filter]
            undefined     //reverb: [duration, decay, reverse?]
          );
        }
        
//initialiseer de objecten
var game = new Game();
var renderer = new Renderer(game);

var newFood = [];

var snakesToRemove = [];
var tempSnakes = [];

var snakeFood = [];
// // hou de snakeobjecten bij
var snakes = [];
var debugMode = true;

// @str = array
function removeSnake(str) {
    var strl = str.length;
    for (var i = 0; i < strl; i++) {
        var pos = snakeByClientId(str[i].clientID);
        if(pos !== false) {
            var rsnake = snakes[pos];
            var id = rsnake.clientID;
            tempSnakes.push(rsnake);
            snakes.splice(pos, 1);
            try {
    	        socket.emit("spotOpen", id);
            } catch (e) { console.log("single player? - could not emit Socket.io: spotOpen" + "punten" + snake.points)}
        }
    }
    snakesToRemove = [];
        for (var i = 0; i < tempSnakes.length; i++) {
            var tsnake = tempSnakes[i];
            if (tsnake.segments.length > 0) {
                tsnake.segments.pop();
            } else {
                tempSnakes.splice(i, 1);
            }
        }
    
}

renderer.drawCells();
var img = new Image();
//var doorImg = new Image();
img.src = "../Display/img/wall_brick_forward.png";
//doorImg.src = "../Display/img/doorTest.png"
/*doorImg.onload = function() {
    renderer.drawAnImage({x: 394, y: -84},doorImg);
};*/

var fullCell = (game.cellSize + game.cellSpacing);
var csIndex = fullCell / 8;
var endTopLeftCells;
var endRightDownCells;
var endBottomLeftCells;
var endLeftDownCells;




//wanneer de server zegt dat iemand joint, wordt deze functie aangeroepen
//functie wordt aangeroepen door com.js (socket.io) data param wordt aut. meegegeven
function addPlayer(data) {
    console.log("new player: " + data.id);
    snakes.push(new Snake(data.id));
    var snake = snakes[snakes.length - 1];
    // snake.color = "#1009f2";
    snake.spawnSnake(1, 1);
    console.log("snake: " + snakes[0].clientID);
    console.log("snake: " + snakes[0].color);
}
/*

function addAI() {
    console.log("new AI");
    var AI = new RoboSchnake();
    snakes.push(AI.snake);
    //var snake = snakes[snakes.length - 1];
    // snake.color = "#1009f2";
    //snake.spawnSnake(6, 6);
    AI.snake.isAI = true;
    console.log("snake AI: " + snakes[0].color);
}
*/


var food;
function addFood() {
    //snake = snake || null;
    for (var i = 0; newFood.length <3;  i++) {
     newFood.push(new Food());
    }
    
    //food = new Food();
    for (var i = 0; i < newFood.length; i++) {
         console.log("newfood pos x="+newFood[i].position.x + "newfood pos y =" + newFood[i].position.y);
    }
   
    // renderer.drawCell(food.position, food.color); // = randPosition()
   // renderer.drawCell(food.position2, food.color);
    /*if(snake != null) {
        console.log("Caught food: " + food.caughtFood + " | total caught food of " + snake.clientID + ": " + snake.totalCaughtFood);// + totalCaughtFood
        console.log("Length: " +  snake.length);// + totalCaughtFood
    }
    */
}
addFood();
/*
function addNewFood() {
    newFood.push(new Food(position));
    console.log("food" + newFood);
    if(snake != null) {
        console.log("Caught food: " + food.caughtFood + " | total caught food of " + snake.clientID + ": " + snake.totalCaughtFood);// + totalCaughtFood
        console.log("Length: " +  snake.length);// + totalCaughtFood
    }
}
*/

var snakeFood;
var sfArray = [];

function addSnakeFood(snake){
    for (var i = 0; i < snake.segments.length; i++) {
        sfArray.push(new caughtSnake(snake.segments[i]));
    }
}
/*
function generateFoodPosition(collisions){
    this.wallCollisions = collisions;
    for (var i = 0; i < collisions.length; i++) {
        if()
    }
}
*/


var speed = 15;  // FPS

var stats = new Stats();
stats.showPanel( 1 );
document.body.appendChild( stats.dom );

function draw() {
    renderer.clearLayer("fg");
    //renderer.drawCell(food.position, food.color); // = randPosition()
    
     for (var i = 0; i < newFood.length; i++) {
         renderer.drawCell(newFood[i].position, newFood[i].color); // = randPosition()
    }
    
    // deze moeten het laatst worden gedrawed
    renderer.drawSnakes(snakes);
    renderer.drawSnakes(tempSnakes);
    
}

var deltaTime, lastTime = 0;

function gameLoop() {
     // deltaTime = currentTime - lastTime;
	stats.begin();

    update();
    draw();
    collisionDetect();

    stats.end();
    // lastTime = currentTime;
    
    setTimeout(function(){
        gameLoop();
        // requestAnimationFrame(gameLoop);
    }, 1000 / speed); //20
}

var YOpenWall = 20;
var YSpace = 10;
var XOpenWall = game.wGridth / 3;

var XSpace = 21 * csIndex;
console.log(XSpace);
var wallLeftUp = new Collision(-1, 0, 0, YOpenWall, "wall left upper half");
var wallLeftDown = new Collision(-1, YOpenWall + YSpace, 0, game.hGridth + 1, "wall left bottom half");

var wallRightUp = new Collision(game.wGridth -1, 0, game.wGridth, YOpenWall, "wall right upper half");
var wallRightDown = new Collision(game.wGridth -1, YOpenWall + YSpace, game.wGridth, game.hGridth + 1, "wall right bottom half");

var wallTopLeft = new Collision(-1, -1, XOpenWall - 1, 0, "wall top left");
var wallTopRight = new Collision(Math.round(XOpenWall * 2), -1, game.wGridth, 0, "wall top right");

var wallBottomLeft = new Collision(0, game.hGridth -1, XOpenWall, game.hGridth, "wall top left");
var wallBottomRight = new Collision(XOpenWall + XSpace, game.hGridth -1, game.wGridth + 1, game.hGridth, "wall top");

var collisions = [];
collisions.push(wallLeftDown);
collisions.push(wallLeftUp);
collisions.push(wallRightDown);
collisions.push(wallRightUp);
collisions.push(wallTopLeft);
collisions.push(wallTopRight);
collisions.push(wallBottomLeft);
collisions.push(wallBottomRight);

//Food.randPosition(collisions);

renderer.collisionDraw(collisions);

//put images on collision
img.onload = function() {
    
    var grow = 0;
    console.log("CSINDEX: " + csIndex);
    
    //linksboven (adaptive to changes in cellsize and cellspacing)
    for(var i = 0; i < (9 * csIndex); i++) {
        for(var spawnY = 0; spawnY < (csIndex * 32); spawnY += 32) {
            renderer.drawAnImage({x: grow, y: spawnY}, img);
        }
        grow += 32;
    }
    
    grow += 8.5 * 32;
    
    //rechtsboven (adaptive to changes in cellsize and cellspacing)
    for(var i = 0; i < (9 * csIndex); i++) {
        for(var spawnY = 0; spawnY < (csIndex * 32); spawnY += 32) {
            renderer.drawAnImage({x: grow, y: spawnY}, img);
        }
        grow += 32;
    } //uncommend
    
// top
    /*renderer.drawAnImage({x: 13, y: 13},img);
    renderer.drawAnImage({x: 42, y: 13},img);
    renderer.drawAnImage({x: 74, y: 13},img);
    renderer.drawAnImage({x: 106, y: 13},img);
    renderer.drawAnImage({x: 138, y: 13},img);
    renderer.drawAnImage({x: 170, y: 13},img);
    renderer.drawAnImage({x: 202, y: 13},img);
    renderer.drawAnImage({x: 234, y: 13},img);
    renderer.drawAnImage({x: 266, y: 13},img);
    renderer.drawAnImage({x: 298, y: 13},img);
    renderer.drawAnImage({x: 330, y: 13},img);
    renderer.drawAnImage({x: 362, y: 13},img);  
    
//left
    renderer.drawAnImage({x: 13, y: 45  },img);    
    renderer.drawAnImage({x: 13, y: 77  },img);    
    renderer.drawAnImage({x: 13, y: 109  },img);    
    renderer.drawAnImage({x: 13, y: 141  },img);    
    renderer.drawAnImage({x: 13, y: 173  },img); 
    
    renderer.drawAnImage({x: 13, y: 318  },img);    
    renderer.drawAnImage({x: 13, y: 350  },img);    
    renderer.drawAnImage({x: 13, y: 382  },img);    
    renderer.drawAnImage({x: 13, y: 414  },img);    
    renderer.drawAnImage({x: 13, y: 446  },img);   
//bottom
    renderer.drawAnImage({x: 13, y: 478},img);
    renderer.drawAnImage({x: 42, y: 478},img);
    renderer.drawAnImage({x: 74, y: 478},img);
    renderer.drawAnImage({x: 106, y: 478},img);
    renderer.drawAnImage({x: 138, y: 478},img);
    renderer.drawAnImage({x: 170, y: 478},img);
    renderer.drawAnImage({x: 202, y: 478},img);
    renderer.drawAnImage({x: 234, y: 478},img);
    renderer.drawAnImage({x: 266, y: 478},img);
    renderer.drawAnImage({x: 298, y: 478},img);
    renderer.drawAnImage({x: 330, y: 478},img);
    renderer.drawAnImage({x: 362, y: 478},img);*/
}


function collisionDetect() { 
    // temp scoreCount to send to player
    var scoreCount;
    
// Get all snakes that are in the game
    for(var i = 0; i < snakes.length; i++) {
    
        wallTopLeft.CollisionWith(snakes[i]);
        wallTopRight.CollisionWith(snakes[i]);
        wallRightUp.CollisionWith(snakes[i]);
        wallRightDown.CollisionWith(snakes[i]);
        wallBottomRight.CollisionWith(snakes[i]);
        wallBottomLeft.CollisionWith(snakes[i]);
        wallLeftDown.CollisionWith(snakes[i]);
        wallLeftUp.CollisionWith(snakes[i]);
        
        wallTopLeft.CollisionWith(0,newFood[i]);
        wallTopRight.CollisionWith(0,newFood[i]);
        wallRightUp.CollisionWith(0,newFood[i]);
        wallRightDown.CollisionWith(0,newFood[i]);
        wallBottomRight.CollisionWith(0,newFood[i]);
        wallBottomLeft.CollisionWith(0,newFood[i]);
        wallLeftDown.CollisionWith(0,newFood[i]);
        wallLeftUp.CollisionWith(0,newFood[i]);
        
        for (var a = 0; a < newFood.length; a++) {
          // console.log("newfood pos x="+newFood[a].position.x + "newfood pos y =" + newFood[a].position.y);
        }
        
        // Get all snakes in the game once more
        for(var j = 0; j < snakes.length; j++) {
            for(var s = 1; s < snakes[j].segments.length; s++) {
                // Check if head of snakes colides against any other seg
                if(snakes[i].segments[0].x == snakes[j].segments[s].x && snakes[i].segments[0].y == snakes[j].segments[s].y ) {
                    console.log("erwin collision: TRUE");
                    snakesToRemove.push(snakes[i]);
                    // addSnakeFood(snakes[i]);
                    explosion.play();
                    console.log("snake position for removal: " + i);
                    console.log("behaalde punten" + snakes[i].points)
                } 
            }
        }
        /*
        
            if(newFood[i].position.x == game.sizeX && newFood[i].position.y == game.sizeY){
            else if ()
        }
        */
            
        
        
        if(debugMode) {
            // collision with walls ( openparts )
            if(snakes[i].segments[0].x >= game.sizeX) snakes[i].segments[0].x = 0;      //collision with canvas wall right
            else if(snakes[i].segments[0].x <= -1) snakes[i].segments[0].x = game.sizeX - 1; //collision with canvas wall left
            else if(snakes[i].segments[0].y >= game.sizeY)  snakes[i].segments[0].y = 0;     //collision with canvas wall bottom
            else if(snakes[i].segments[0].y <= -1) snakes[i].segments[0].y = game.sizeY - 1; //collision with canvas wall top
        }
        
        //collision with Fruit
        if (newFood.length >0){
            for (var a = 0; a < newFood.length; a++) {
                     if(snakes[i].segments[0].x == newFood[a].position.x && snakes[i].segments[0].y == newFood[a].position.y) {
            snakes[i].totalCaughtFood++;
            snakes[i].points = snakes[i].length;
            snakes[i].addSegment(4);
            var index = newFood.indexOf(i);
            if (index > -1) {
             newFood.splice(index, 1);
            }
            addFood();
            //addNewFood();
            sfxEat();
            sendScore(snakes[i]);
             console.log("newfood pos x="+newFood[i].position.x + "newfood pos y =" + newFood[i].position.y);
            console.log("points=" + snakes[i].points);
                }       
            }
        }

            
        //collision with snakeFood(snakeFood = fruit dat de snake achterlaat als hij kapot gaat)
        if(tempSnakes.length > 0) {
            for(var j = 0; j < tempSnakes.length; j++) {
                for(var s = 0; s < tempSnakes[j].segments.length; s++) {
                    // Check if head of snakes colides against any other seg
                    if(snakes[i].segments[0].x == tempSnakes[j].segments[s].x && snakes[i].segments[0].y == tempSnakes[j].segments[s].y ) {
                        console.log("SNAKE FOOD: TRUE");
                        snakes[i].addSegment(1);
                        sendScore(snakes[i]);
                        tempSnakes[j].segments.splice(s, 1);
                        sfxEat();
                    } 
                }
            }
        }
        
    }
    removeSnake(snakesToRemove);
}

function update() {
    for (var i = 0; i < snakes.length; i++) {
        snakes[i].moveSnake();
    }
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