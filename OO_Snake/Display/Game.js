// Script Game.js, hier initialiseert hij het spel 

function Game (wGridth, hGridth) {
    this.snakeLength = 5;
    this.snakeGrow = 1;
    this.maxFood = 1;
    
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    
//    this.canvas.beginPath();
//    this.canvas.lineWidth = "6";
//    this.canvas.strokeStyle = "red";
//    this.canvas.rect(5, 5, 290, 140);  
//    this.canvas.stroke();

    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    
    this.wGridth = this.canvas.width / 10 |0;
    this.hGridth = this.canvas.height / 10 |0;
    
    this.sizeX =  this.wGridth;//80 ///2 | 0
    this.sizeY =  this.hGridth;//50 ///2 | 0
    
    this.cellSize = 8;//16
    this.cellSpacing = 1;
    this.clearColor = "#4d4d4d"; //#838383
    this.solidsColor = '#EFEFEF';
    
    
        //teken een vierkant voor de border

}

//initialiseer de objecten
var game = new Game();
var renderer = new Renderer(game);

//hou de snakeobjecten bij
var snakes = [];

//wanneer de server zegt dat iemand joint, wordt deze functie aangeroepen
//functie wordt aangeroepen door com.js (socket.io) data param wordt aut. meegegeven
function addPlayer(data) {
    snakes.push(new Snake(data.id));
    var snake = snakes[snakes.length - 1];
    snake.color = "#1009f2";
    snake.spawnSnake(15, 15);
}


// snake.color = "#1009f2";
// snake.spawnSnake(5,0);

// snakes.push(snake);
var totalCaughtFood = 0;
var caughtFood = true;
var food;

function spawnFood() {
    if(caughtFood == true) {
        food = new Food();
        renderer.drawCell(food.position, food.color);
        caughtFood = false;
    }
}

function gameLoop() {
    spawnFood();
    collisionDetect();
    
    //renderer.drawCells();
    //renderer.drawCell(food.position, food.color);
    renderer.drawSnakes(snakes);
    setTimeout(function(){
      gameLoop();
    }, 1000 / 15);
}

function collisionDetect() {
    //collision with Fruit
    for (var i = 0; i < snakes.length; i++) {
        if(snakes[i].segments[0].x == food.position.x && snakes[i].segments[0].y == food.position.y) {
            totalCaughtFood++;
            caughtFood = true;
            snakes[i].addSegment(4);
        }
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
renderer.drawCells();
gameLoop()

