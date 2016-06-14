// Script Game.js, hier initialiseert hij het spel 
function Game(socket) {
    this.socket = socket || null;           // holds object for communication with the server
    
    // setup fps
    this.last = null;
    this.interval = 1000 / this.speed;
    this.delta;
    this.speed = 15;                        // set global snake speed
    
    this.roboSchnakeID = 0;                 // stores ids of AI snakes
    this.AIs = [];                          // holds all AI snakes
    this.maxAI = 1;                         // sets max AIs allow
    
    this.snakes = [];                       // Will hold all the snakes that are in the game
    this.snakesToRemove = [];               // Holds all the snakes that have had a collision, they will be prepped for removal
    
    this.snakeColors = [];                  // Stores all colors of the snakes. 
    this.snakeColors[0] = 0;                // Used to give a unique color to each snake
                                            
    this.tempSnakes = [];                   /* This holds all the snakes that have been removed and thus are no longer "playable". 
                                               They are now food and the segments will be slowly removed from the field */
    
    this.collisions = [];                   // Holds all the colission object for the walls and AI snakes
    this.newFood = [];                      // holds the food objects
    
    // setup grid size;
    this.wGridth = 98;
    this.hGridth = 50;
    
    this.sizeX =  this.wGridth;//80 ///2 | 0
    this.sizeY =  this.hGridth;//50 ///2 | 0
    
    this.cellSize = 15;//16
    this.cellSpacing = 1;
    
    
    // Moet nog juister asset loader worden gemaakt
    if(this.loadAssets()) {
        this.setup();
    }
    
    this.renderer = new Renderer(this);     // setup the render object to draw onscreen
    
    
    // SOUNDS
    this.soundToggle = true;
    
    this.music = new AudioFX('../Display/Sounds/snake_music', {
                            formats: ['mp3'],
                            volume:   0.5,
                            loop:     true,
                            autoplay: true });
                            
    this.explosion = new AudioFX('../Display/Sounds/snake_splat', {
                            formats: ['wav'],
                            volume:   0.5,
                            loop:     false,
                            autoplay: false });
                            
    this.eat = new AudioFX('../Display/Sounds/snake_eat', {
                            formats: ['wav'],
                            volume:   0.5,
                            loop:     false,
                            autoplay: false });
    
    // loads img for food
    this.rasp = new Image();
    this.rasp.src = "../Display/img/rasp2.png";
    
    // setup the collision and add food;
    this.setupCollisions();
    this.addFood();
    

}


/****************************************************************************************************
** SETUP - CANVAS, COLLISIONS
****************************************************************************************************/

//if this is done, run the game
Game.prototype.setup = function() {

    this.canvas_fg = document.getElementById('canvas_fg');
    this.ctx_fg = this.canvas_fg.getContext('2d');
        
    this.canvas_bg = document.getElementById('canvas_bg');
    this.ctx_bg = this.canvas_bg.getContext('2d');
    
    this.canvas_fg.height = this.sizeY * ( this.cellSize + this.cellSpacing ) + this.cellSpacing;
    this.canvas_fg.width = this.sizeX * ( this.cellSize + this.cellSpacing ) + this.cellSpacing;
   
    this.canvas_bg.height = (14 + this.sizeY) * ( this.cellSize + this.cellSpacing) + this.cellSpacing;
    this.canvas_bg.width = (14 + this.sizeX) * ( this.cellSize + this.cellSpacing) + this.cellSpacing;
    
    this.canvas_fg.style.top = (window.innerHeight - this.canvas_fg.height) / 2 +"px";
    this.canvas_fg.style.left = (window.innerWidth - this.canvas_fg.width) / 2 +"px";
    
    this.canvas_bg.style.top = (window.innerHeight - this.canvas_bg.height) / 2 +"px";
    this.canvas_bg.style.left = (window.innerWidth - this.canvas_bg.width) / 2 +"px";
    
   
};

//setup the collision objects
Game.prototype.setupCollisions = function() {
        
    var YOpenWall = 20;
    var YSpace = 10;
    var XOpenWall = this.sizeX / 3;
    
    // var XSpace = 21 * csIndex;
    var wallLeftUp = new Collision(-1, 0, 0, YOpenWall - 3, "wall left upper half");
    var wallLeftDown = new Collision(-1, YOpenWall + YSpace + 2, 0, this.sizeY , "wall left bottom half");
    
    var wallRightUp = new Collision(this.sizeX -1, 0, this.sizeX, YOpenWall - 3, "wall right upper half");
    var wallRightDown = new Collision(this.sizeX -1, YOpenWall + YSpace + 2, this.sizeX, this.sizeY, "wall right bottom half");
    
    var wallTopLeft = new Collision(-1, -1, XOpenWall, 0, "wall top left");
    var wallTopRight = new Collision(Math.round(XOpenWall * 2), -1, this.sizeX, 0, "wall top right");
    
    var wallBottomLeft = new Collision(0, this.sizeY -1, XOpenWall, this.sizeY, "wall top left");
    var wallBottomRight = new Collision(Math.round(XOpenWall * 2), this.sizeY -1, this.sizeX, this.sizeY, "wall top");
    
    this.collisions.push(wallLeftDown);
    this.collisions.push(wallLeftUp);
    this.collisions.push(wallRightDown);
    this.collisions.push(wallRightUp);
    this.collisions.push(wallTopLeft);
    this.collisions.push(wallTopRight);
    this.collisions.push(wallBottomLeft);
    this.collisions.push(wallBottomRight);
    
    this.renderer.collisionDraw(this.collisions);
};

Game.prototype.loadAssets = function() {
    return true;
};


/****************************************************************************************************
** CORE FUNCTIONS - LOOP, UPDATE, DRAW
****************************************************************************************************/
Game.prototype.loop = function() {
// TEST LOOP VOOR SMOOTH SNAKE - WIP
    
    // this.now     =   (new Date()).getTime();     // assign current time  
    // this.delta   =   (this.now - this.last);     // calculate the difference between last and current frame  


    // if(this.delta > this.interval) { 
    //     this.update(this.delta);   
    //     this.last = this.now - (this.delta % this.interval);  
    // } 
    // this.draw();  
    
    // requestAnimationFrame(this.loop.bind(this));
    
// LOOP HIERONDER WERKT
    game.update();
    game.draw();


    setTimeout(function () {
        Game.prototype.loop.call();
    }, 1000 / game.speed);
};


// The update function is responsible for all the game logic, moving the snake, checking for collision and adding food
Game.prototype.update = function() {

    // Call function to remove the snakes that have died
    this.removeSnake(this.snakesToRemove);
    
    //check if an AI should be added
    this.addAI();
    
    // store length of snakes[] and tempSnakes[] for performance
    var sl = this.snakes.length;
    var tsl = this.tempSnakes.length;
    
    // move all player snakes
    for (var m = 0; m < sl; m++) {
        this.snakes[m].moveSnake();
    }
    
    // move all AI snakes
    for (var a = 0; a < this.AIs.length; a++) {
        this.AIs[a].moveAI();
    }
    
    // collision checks with all snakes
    for(var i = 0; i < sl; i++) {
        var snake = this.snakes[i],
        shx = snake.segments[0].x,
        shy = snake.segments[0].y;
            
        for (var c = 0; c < this.collisions.length; c++) {
            if(this.collisions[c].CollisionWith(snake, null)) {
                this.snakesToRemove.push(snake);
                if(this.soundToggle) {
                    this.explosion.audio.currentTime = 0;
                    this.explosion.play();
                }
            }
            this.collisions[c].CollisionWith(0, this.newFood[1]);
        }
        
        // Collision with self and other snakes
        for(var j = 0; j < sl; j++) {
            var os = this.snakes[j];
            if(os.segments.length > 1 && snake.segments.length > 1) {
                for(var s = 1; s < os.segments.length; s++) {
                    if(shx == os.segments[s].x && shy == os.segments[s].y ) {
                        this.snakesToRemove.push(snake);
                        if(this.soundToggle) {
                            this.explosion.audio.currentTime = 0;
                            this.explosion.play();
                        }
                    } 
                }
            }
        }
  
        //collision with Fruit
        if (this.newFood.length > 0){
            for (var a = 0; a < this.newFood.length; a++) {
                if(shx == this.newFood[a].position.x && shy == this.newFood[a].position.y) {
                    snake.totalCaughtFood++;
                    snake.points = snake.length;
                    snake.addSegment(4);
                    this.newFood.splice(a, 1);
                    this.addFood();
                    if(this.soundToggle) {
                        this.eat.audio.currentTime = 0;
                        this.eat.play();
                    }
                    try { 
                        // send the score
                        if(!snake.isAI){
                    		this.socket.emit("recieveScore", {id: snake.clientID, points: snake.length});
                        }
                    }
                    catch(e){
                    }
                }       
            }
        }

            
        //collision with snakeFood(snakeFood = fruit dat de snake achterlaat als hij kapot gaat)
        if(tsl > 0) {
            for(var ts = 0; ts < tsl; ts++) {
                var tsnake = this.tempSnakes[ts];
                for(var s = 0; s < tsnake.segments.length; s++) {
                    // Check if head of snakes colides against any other seg
                    if(shx == tsnake.segments[s].x && shy == tsnake.segments[s].y ) {
                        snake.addSegment(1);
                        tsnake.segments.splice(s, 1);
                        if(this.soundToggle) {
                            this.eat.audio.currentTime = 0;
                            this.eat.play();
                        }
                        
                        try {
                            if(!snake.isAI){
                        		this.socket.emit("recieveScore", {id: snake.clientID, points: snake.length});
                            }
                        }
                        catch(e){
                        }
                    } 
                }
            }
        }
              
        // collision with walls ( openparts )
        if (shx >= this.sizeX)      this.snakes[i].segments[0].x = 0;                //collision with canvas wall right
        else if(shx <= -1)          this.snakes[i].segments[0].x = this.sizeX - 1;   //collision with canvas wall left
        else if(shy >= this.sizeY)  this.snakes[i].segments[0].y = 0;                //collision with canvas wall bottom
        else if(shy <= -1)          this.snakes[i].segments[0].y = this.sizeY - 1;   //collision with canvas wall top
        
        
    }
};  

//draws every snake and raspberry
Game.prototype.draw = function(delta) {

    // draws dead snakes with some transparency
    this.renderer.ctx_fg.globalAlpha = 0.7;
    this.renderer.drawSnakes(this.tempSnakes);
    this.renderer.ctx_fg.globalAlpha = 1;
    
    this.renderer.drawSnakes(this.snakes);
    
    for (var i = 0; i < this.newFood.length; i++) {
         this.renderer.ctx_fg.drawImage(
            this.rasp, 
            this.newFood[i].position.x * ( this.cellSize + 1) -2,
            this.newFood[i].position.y * ( this.cellSize + 1) -2,
            19,
            19
        );
    }
};


/****************************************************************************************************
** ADDING OBJECTS - FOOD, SNAKE, AI
****************************************************************************************************/
Game.prototype.addFood = function() {
    while (this.newFood.length < 2) {
        this.newFood.push(new Food());
    }
};

Game.prototype.addPlayer = function(data) {
    this.snakes.push(new Snake(data.player.id));
    var snake = this.snakes[this.snakes.length - 1];
    snake.color = data.color;+
    snake.spawnSnake(2, 2);
};

//checks if an AI should be added or removed based on the amount of players
Game.prototype.addAI = function() {
    if(this.snakes.length <= this.maxAI && this.AIs.length < this.maxAI) {
        this.roboSchnakeID++;
        var AISnake = new Snake(this.roboSchnakeID);
        AISnake.isAI = true;
        AISnake.length = 1;
        AISnake.isAI = true;
        var AI = new RoboSchnake(AISnake, this);
        AI.id = this.roboSchnakeID;
        this.snakes.push(AISnake);
        this.AIs.push(AI);
    }
};


/****************************************************************************************************
** REMOVING OBJECTS - SNAKE, AI
****************************************************************************************************/
//functie om de snakes te verwijderen 
Game.prototype.removeSnake = function(str) {
    if(str.length > 0) {
        for (var i = 0; i < str.length; i++) {
            var pos = this.snakeByClientId(str[i].clientID);
            
            if(pos !== false) {
                var rsnake = this.snakes[pos];
                var sid = rsnake.clientID;
                rsnake.dead = true;
                this.tempSnakes.push(rsnake);
                this.snakes.splice(pos, 1);
                if(rsnake.isAI) {
                    var rpos = this.roboSchnakeById(sid);
                    if(rpos !== false) this.AIs.splice(rpos, 1);//splice(i, 1)
                }
                try {
                    this.socket.emit("spotOpen", {id: sid, color: rsnake.color});
                } catch (e) {}
            }
        }
        this.snakesToRemove = [];
    }
    
    if (this.tempSnakes.length > 0) {
        for (var i = 0; i < this.tempSnakes.length; i++) {
            var tsnake = this.tempSnakes[i];
            this.renderer.clearSnake(tsnake);
            if(tsnake.deathTime == 0) {
                if (tsnake.segments.length > 0) {
                    tsnake.prevT = tsnake.segments.pop(); 
                } else {
                    this.tempSnakes.splice(i, 1);
                }
            } else {
                tsnake.deathTime--;
            }
        }
    }
};

/****************************************************************************************************
** HELPER FUNCTIONS
****************************************************************************************************/
// Gives back the snake position in the snakes array based on the clientID
Game.prototype.snakeByClientId = function(clientSnakeId) {
    for (var i = 0; i < this.snakes.length; i++) {
        if (this.snakes[i].clientID === clientSnakeId) {
            return i;
        }
    }
    return false;
};

// Give back the roboSchnake position in the AIs array based on clientID
Game.prototype.roboSchnakeById = function(roboID) {
    for (var i = 0; i < this.AIs.length; i++) {
        if (this.AIs[i].id == roboID) {
            return i;
        }
    }
    return false;
};
