function RoboSchnake(snake, game) {
    this.id;
    //spawnlocation
    this.randPos = function(size) {return Math.floor((Math.random() * size) + 1);};
    var repeat;
    this.posX = 2;
    this.posY = 2;
    do {
        this.posX = this.randPos(94);
        this.posY = this.randPos(46);
        
        var SpawnlocationOnSnake = new Collision(this.posX - 2, this.posY - 2, this.posX + 2, this.posY + 2);
        for(var i = 0; i < game.snakes.length; i++) {
            if(SpawnlocationOnSnake.CollisionWith(game.snakes[i], null, true)) { //als de spawnlocatie met 1 van de snakes collisie heeft
                repeat = true;
            } else {
                repeat = false;
            }
        }
    } while(repeat == true);
    
    this.snake = snake;
    this.snake.direction = 0; //0 1 2 3 right left up down
    this.target = false;
    this.targetPosition = [];
    this.lastDirection = false;
    this.nextDirections = [];
    this.nextDirections[0] = false;
    this.game = game;
   
    this.snake.spawnSnake(this.posX, this.posY);
    
}
// moves AI to nearest food, and if the snakes is about to collide with himself or a other snake it will try to dodge
RoboSchnake.prototype.moveAI = function() {
    try {
        if(this.nextDirections.length > 0) {
            this.dodge(this.nextDirections);
        } else if(this.shouldDodge()) {
            //stores the last direction, to determine which direction the AI was going in order to dodge to the right direction
            switch(this.snake.direction) {
                case 0:
                    if(this.lastDirection == 0) { //naar rechts
                        this.nextDirections[0] = 2; //up
                        this.nextDirections[1] = 1; //left
                        this.nextDirections[2] = 2; //up
                    } else if(this.lastDirection == 2) { //naar rechts-boven
                        this.nextDirections[0] = 2; //up
                        this.nextDirections[1] = 1; //left
                        this.nextDirections[2] = 2; //up
                    } else if(this.lastDirection == 3) { //naar rechts-onder
                  
                        this.nextDirections[0] = 3; //down
                        this.nextDirections[1] = 1; //left
                        this.nextDirections[2] = 3; //down
                    }
                    break;
                case 1:
                    if(this.lastDirection == 1) { //naar links
                        this.nextDirections[0] = 2; //up
                        this.nextDirections[1] = 0; //right
                        this.nextDirections[2] = 2; //up
                    } else if(this.lastDirection == 2) { //naar links-boven
                        this.nextDirections[0] = 2; //up
                        this.nextDirections[1] = 0; //right
                        this.nextDirections[2] = 2; //up
                    } else if(this.lastDirection == 3) { //naar links-onder
                        this.nextDirections[0] = 3; //down
                        this.nextDirections[1] = 0; //right
                        this.nextDirections[2] = 3; //down
                    }
                    break;
                case 2:
                    if(this.lastDirection == 2) { //naar boven
                        this.nextDirections[0] = 0; //right
                        this.nextDirections[1] = 3; //down
                        this.nextDirections[2] = 0; //right
                    } else if(this.lastDirection == 1) { //naar links-boven
                        this.nextDirections[0] = 1; //links
                        this.nextDirections[1] = 3; //onder
                        this.nextDirections[2] = 1; //links
                    } else if(this.lastDirection == 0) { //naar rechts-boven
                        this.nextDirections[0] = 0; //right
                        this.nextDirections[1] = 3; //down
                        this.nextDirections[2] = 0; //right
                    }
                    break;
                case 3:
                    if(this.lastDirection == 3) { //naar beneden
                        this.nextDirections[0] = 0; //right
                        this.nextDirections[1] = 3; //down
                        this.nextDirections[2] = 0; //right
                    } else if(this.lastDirection == 1) { //naar links-onder
                        this.nextDirections[0] = 3; //down
                        this.nextDirections[1] = 0; //right
                        this.nextDirections[2] = 3; //down
                    } else if(this.lastDirection == 0) { //naar rechts-onder
                    alert("naar onder-rechts");
                        this.nextDirections[0] = 1; //left
                        this.nextDirections[1] = 3; //up
                        this.nextDirections[2] = 1; //left
                    }
                    break;
            }
            this.dodge(this.nextDirections);
        } else {
            if(this.target == false) {
                this.target = true;
                //target het food dat dichts bij is en probeert windmolens(een glitch waarbij de AI niet kon kiezen achter een food aan te gaan) tegen te gaan.
                
                this.food1 = this.game.newFood[0];
                this.food2 = this.game.newFood[1];
                
                this.food1X = this.food1.position.x;
                this.food1Y = this.food1.position.y;
                
                this.food2X = this.food2.position.x;
                this.food2Y = this.food2.position.y;
                
                if(this.food1X < this.snake.segments[0].x)
                {
                    this.food1XDiff = this.snake.segments[0].x -this.food1.position.x;
                    this.food1YDiff = this.snake.segments[0].y -this.food1.position.y;
                }
                else if(this.food1X > this.snake.segments[0].x)
                {
                    this.food1XDiff = this.food1.position.x -  this.snake.segments[0].x;
                    this.food1YDiff = this.food1.position.y -  this.snake.segments[0].y;
                }
                if(this.food2X < this.snake.segments[0].x)
                {
                    this.food2XDiff = this.snake.segments[0].x -this.food2.position.x;
                    this.food2YDiff = this.snake.segments[0].y -this.food2.position.y;
                }
                else if(this.food2X > this.snake.segments[0].x)
                {
                    this.food2XDiff = this.food2.position.x -  this.snake.segments[0].x;
                    this.food2YDiff = this.food2.position.y -  this.snake.segments[0].y;
                }
                this.foodDistance = this.food1XDiff + this.food1YDiff;
                this.foodDistace2 = this.food2XDiff + this.food2YDiff;
        
                if(this.food1XDiff < this.food2XDiff && this.food1YDiff < this.food2YDiff)//&& this.food1Y < this.food2Y)
                {
                    this.targetFood = this.game.newFood[0];
                }
                else if(this.food1XDiff > this.food2XDiff && this.food1YDiff > this.food2YDiff)
                {
                    this.targetFood = this.game.newFood[1];
                }
                else if (this.food1XDiff <= this.food2XDiff && this.food1YDiff >= this.food2YDiff)
                {
                    this.targetFood = this.game.newFood[0];
                }
                else if (this.food1XDiff >= this.food2XDiff && this.food1YDiff <= this.food2YDiff)
                {
                    this.targetFood = this.game.newFood[1];
                }
    
                else
                {
                    this.targetFood = this.game.newFood[0];
                }
    
                this.target = this.targetFood;
                this.targetPosition = { x : this.target.position.x, y : this.target.position.y};
            }
            
            var xDifference = this.target.position.x - this.snake.segments[0].x;
            var yDifference = this.target.position.y - this.snake.segments[0].y;
                
                
                if((xDifference > 0) && this.snake.direction != 0 && this.snake.direction != 1) {
                    this.snake.direction = 0;
                } else if((xDifference < 0) && this.snake.direction != 1 && this.snake.direction != 0) {
                    this.snake.direction = 1;
                } else if((yDifference < 0) && this.snake.direction != 2 && this.snake.direction != 3) {
                    this.snake.direction = 2;
                } else if((yDifference > 0) && this.snake.direction != 3 && this.snake.direction != 2) {
                    this.snake.direction = 3;
                }
            this.target = false;
        }
        this.lastDirection = this.snake.direction;
    }catch(e){
    }
}


/**
 * Returns true if about to collide with a collision cell
 **/
 
RoboSchnake.prototype.shouldDodge = function() {
    var returnBool = false;
    var collisionCellInFront;
    if(this.snake.direction == 0) { //AI gaat naar rechts
        var cellInFront = { x: this.snake.segments[0].x + 2, y: this.snake.segments[0].y };
        collisionCellInFront = new Collision(cellInFront.x - 1, cellInFront.y, cellInFront.x + 1 , cellInFront.y);
    } else if(this.snake.direction == 1) { //AI gaat naar links
        var cellInFront = { x: this.snake.segments[0].x - 2, y: this.snake.segments[0].y }; 
        collisionCellInFront = new Collision(cellInFront.x - 1, cellInFront.y, cellInFront.x + 1, cellInFront.y);
    } else if(this.snake.direction == 2) { //AI gaat naar boven
        var cellInFront = { x: this.snake.segments[0].x, y: this.snake.segments[0].y - 2 }; 
        collisionCellInFront = new Collision(cellInFront.x, cellInFront.y - 1, cellInFront.x, cellInFront.y + 1);
    } else if(this.snake.direction == 3) { //AI gaat naar beneden
        var cellInFront = { x: this.snake.segments[0].x, y: this.snake.segments[0].y + 2 }; 
        collisionCellInFront = new Collision(cellInFront.x , cellInFront.y - 1, cellInFront.x , cellInFront.y + 1 );
    }

    if(collisionCellInFront) {
        for(var i = 0; i < this.game.snakes.length; i++) {
            if(collisionCellInFront.CollisionWith(this.game.snakes[i], null, true)) {
                returnBool = true;
            }
        }
    }
    if(returnBool == true) {
       
    }
    return returnBool;
}

RoboSchnake.prototype.dodge = function(nextDirections) {
    this.snake.direction = this.nextDirections[0];
    
    // index 0 wordt verwijderd en 1 wordt vervolgens 0
    this.nextDirections.shift();
}
