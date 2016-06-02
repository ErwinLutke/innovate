function RoboSchnake(snake) {
    //alert("HIJ ZIET DE AI OMGOMGOMGOMGOMGOMG");
    this.posX = Math.floor((Math.random() * 50) + 1);
    this.posY = Math.floor((Math.random() * 50) + 1);
    snake.spawnSnake(this.posX, this.posY);
    this.snake = snake;
    this.snake.isAI = true;
    this.snake.direction = 0; //0 1 2 3 right left up down
    this.target = false;
    this.targetPosition = [];
    this.nextDirections = [];
    this.nextDirections[0] = false;
}

RoboSchnake.prototype.moveAI = function() {
    try {
        
    if(this.nextDirections[0] != false) {
        this.snake.direction = this.nextDirections[0];
        
        if(this.nextDirections[1] != false) {
            this.nextDirections[0] = this.nextDirections[1];
            this.nextDirections[1] = false;
        } /*else {
            console.log("SECOND DIRECTION");
            this.nextDirections[0] = null;
        }*/
    } else if(this.shouldDodge()) {
        if (this.snake.direction == 0) { //AI gaat naar rechts
            this.snake.direction = 2; //up
            this.nextDirections[0] = 1; //left
            this.nextDirections[1] = 2; //up
        } else if(this.snake.direction == 1) { //AI gaat naar links
            this.snake.direction = 3; //down
            this.nextDirections[0] = 0; //right
            this.nextDirections[1] = 3; //down
        } else if(this.snake.direction == 2) { //AI gaat naar boven
            this.snake.direction = 0; //right
            this.nextDirections[0] = 3; //down
            this.nextDirections[1] = 0; //right
        } else if(this.snake.direction == 3) { //AI gaat naar beneden
            this.snake.direction = 1; //left
            this.nextDirections[0] = 2; //up
            this.nextDirections[1] = 1; //left
        }
    }

    else {
        if(this.target == false || (this.target.position.x != this.targetPosition.x && this.target.position.y != this.targetPosition.y)) {
        this.target = true;
        
        //closest food testing crap werkt nog niet goed.
        
        this.food1 = newFood[0];
        this.food2 = newFood[1];
        //this.food3 = newFood[2];
        
        this.food1X = this.food1.position.x;//- this.snake.segments[0].x;
        this.food1Y = this.food1.position.y;// - this.snake.segments[0].y;
        
        this.food2X = this.food2.position.x;// - this.snake.segments[0].x;
        this.food2Y = this.food2.position.y;// - this.snake.segments[0].y;
        
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
        //console.log("dif value 1X = "+this.food1XDiff +"dif value 1Y =" + this.food1YDiff + "diff value 2X =" + this.food2XDiff + "diff value 2Y = " + this.food2YDiff);
        this.foodDistance = this.food1XDiff^2 + this.food1YDiff^2;
        this.foodDistace2 = this.food2XDiff^2 + this.food2YDiff^2;
        //console.log("test value=" + this.foodDistance + "testvalue2 =" + this.foodDistace2);
        
       // this.calcFood1 = Math.sqrt()
        /*
        
        this.food1XDiff =  this.snake.segments[0].x -this.food1.position.x;
        this.food1YDiff =  this.snake.segments[0].y -this.food1.position.y;
        
        this.food2XDiff = this.snake.segments[0].x - this.food2.position.x;
        this.food2YDiff = this.snake.segments[0].y - this.food2.position.y;
        */
        /*
        i
        */
        
        
        //console.log("snakehead X = " + this.snake.segments[0].x + "snakehead Y =" + this.snake.segments[0].y );
        //console.log("food1X = " + this.food1X + "food1Y=" + this.food1Y + "food2X=" + this.food2X + "food2Y =" + this.food2Y);
        //console.log("difference snakehead &snakefood1X=" + this.food1XDiff + "difference snakehead &snakefood1Y=" + this.food1YDiff + "difference snakehead &snakefood2X=" + this.food2XDiff + "difference snakehead &snakefood2Y="+this.food2YDiff);
        
        /*
        this.food3X = this.food3.position.x;- this.snake.segments[0].x;
        this.food3Y = this.food3.position.y;- this.snake.segments[0].y;
        */

  
        if(this.food1XDiff < this.food2XDiff && this.food1YDiff < this.food2YDiff)//&& this.food1Y < this.food2Y)
        {
            this.targetFood = newFood[0];
            //console.log("targetted food 1: this.food1XDiff < this.food2XDiff && this.food1YDiff < this.food2YDiff");
        }
   
        else if(this.food2XDiff < this.food1XDiff && this.food2YDiff < this.food1YDiff)
        {
            this.targetFood = newFood[1];
            //console.log("targetted food 2: this.food2XDiff < this.food1XDiff && this.food2YDiff < this.food1YDiff");
        }
        else if (this.food1XDiff < this.food2XDiff && this.food1YDiff > this.food2YDiff)
        {
            this.targetFood = newFood[0];
            //console.log("targetted food 1: this.food1XDiff < this.food2XDiff && this.food1YDiff > this.food2YDiff");
        }
        else if (this.food2XDiff < this.food1XDiff && this.food2YDiff > this.food1YDiff)
        {
            this.targetFood = newFood[1];
            //console.log("targetted food 2: this.food2XDiff < this.food1XDiff && this.food2YDiff > this.food1YDiff");
        }
        else
        {
            this.targetFood = newFood[0];
            console.log("targetted food by default");
        }
        //if(this.target.position.x == this.snake.segments[0].x && this.target.position.y == this.snake.segments[0].y)
        //{
        this.target = this.targetFood;
        //}
       
        
        console.log("target food x =" + this.target.position.x + "target food y =" + this.target.position.y);
      
      //console.log(this.target);
        
        
        
    
        //this.target = newFood[2];
       // console.log("New target AI " + this.snake.color + ": " + this.target);
        this.targetPosition = { x : this.target.position.x, y : this.target.position.y };
       // console.log(this.target.position.x + " : " + this.target.position.y);
        
        }
        //console.log("AI hunting for " + this.target.position.x + " : " + this.target.position.y);
        
        
        var xDifference = this.target.position.x - this.snake.segments[0].x;
        var yDifference = this.target.position.y - this.snake.segments[0].y;
        
        
        // minder OP controls probeer versie 1.3421
      //  if(this.snake.segments[0].x == this.target.position.x && this.snake.direction !=1)
        //{
            
        //}
        
        
        
        if((xDifference > 0) && this.snake.direction != 0 && this.snake.direction != 1) {// && (xDifference > yDifference)
            this.snake.direction = 0;
            //console.log("going right");
        } else if((xDifference < 0) && this.snake.direction != 1 && this.snake.direction != 0) {
            this.snake.direction = 1;
            //console.log("going left");
        } else if((yDifference < 0) && this.snake.direction != 2 && this.snake.direction != 3) {
            this.snake.direction = 2;
            //console.log("going up");
        } else if((yDifference > 0) && this.snake.direction != 3 && this.snake.direction != 2) {
            this.snake.direction = 3;
            //console.log("going down");
        } /*else {
            this.snake.direction = Math.floor((Math.random() * 4));
        }*/
    }
    }catch(e){
        console.log("AI Fail: " + e);// + e);
    }
    this.target = false;
}

/**
 * Returns true if about to collide with a collision cell
 **/
 
RoboSchnake.prototype.shouldDodge = function() {
    var returnBool = false;
    
    if(this.snake.direction == 0) { //AI gaat naar rechts
        var cellInFront = { x: this.snake.segments[0].x + 2, y: this.snake.segments[0].y };
        collisionCellInFront = new Collision(cellInFront.x - 1, cellInFront.y - 1, cellInFront.x + 1, cellInFront.y + 1);
    } else if(this.snake.direction == 1) { //AI gaat naar links
        var cellInFront = { x: this.snake.segments[0].x - 2, y: this.snake.segments[0].y }; 
        collisionCellInFront = new Collision(cellInFront.x - 1, cellInFront.y - 1, cellInFront.x + 1, cellInFront.y + 1);
    } else if(this.snake.direction == 2) { //AI gaat naar boven
        var cellInFront = { x: this.snake.segments[0].x, y: this.snake.segments[0].y - 2 }; 
        collisionCellInFront = new Collision(cellInFront.x - 1, cellInFront.y - 1, cellInFront.x + 1, cellInFront.y + 1);
    } else if(this.snake.direction == 3) { //AI gaat naar beneden
        var cellInFront = { x: this.snake.segments[0].x, y: this.snake.segments[0].y + 2 }; 
        collisionCellInFront = new Collision(cellInFront.x - 1, cellInFront.y - 1, cellInFront.x + 1, cellInFront.y + 1);
    }
    
    if(typeof(collisionCellInFront) != 'undefined') {
        for(var i = 0; i < snakes.length; i++) {
            if(collisionCellInFront.CollisionWith(snakes[i], null, true)) {// || collisionCellInFront2.CollisionWith(snakes[i], null, true)
                returnBool = true;
            }
        }
    }
        
    //console.log("snake direction: " + this.snake.direction);
    //console.log("snake position, x:" + this.snake.segments[0].x + "y:" + this.snake.segments[0].y);
    //console.log("cellInFrontX: " + cellInFront.x + "cellInFrontY: " + cellInFront.y);
    //console.log("returnBool(should dodge?): " + returnBool);
    if(returnBool == true) {
        alert("returnBool(should dodge?): " + returnBool);
    }
    return returnBool;
}
