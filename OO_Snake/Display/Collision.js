//Script Collision

//Create a static collision object
function Collision(startX, startY, endX, endY, name) {
    this.name = name || "Collision Object";
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.cells = this.getCellsOfCollision();
    //console.log("collision \"" + this.name + "\" added at " + this.startX + " : " + this.startY + " to " + this.endX + " : " + this.endY);
}

Collision.prototype.CollisionWith = function(snake, food, returnTrue) {
    returnTrue = returnTrue || false;
    snake = snake || 0;
    food = food || null;
    var collision;
    if(returnTrue == false) {
        if(snake != 0) {
            if((snake.segments[0].x >= this.startX)  && (snake.segments[0].x <= this.endX) && (snake.segments[0].y >= this.startY)  && (snake.segments[0].y <= this.endY)) {
                collision = true;
                console.log("collision \"" + this.name + "\" with Client " + snake.clientID);
                if(snake.isAI == true) {
                    //console.log("collision AI!!!");
                    AIsToRemove.push(snake.AIParent);
                } else {
                    snakesToRemove.push(snake);
                }
                explosion.play();
            } else {
                collision = false;
            }
        } 
        if (snake == 0 && food != null) {
            if((food.position.x >= this.startX)  && (food.position.x <= this.endX) && (food.position.y >= this.startY)  && (food.position.y <= this.endY)) {
                collision = true;
                if(collision == true){
                var randX = Math.floor((Math.random() * (game.sizeX - 1)) + 1);//79
                var randY = Math.floor((Math.random() * (game.sizeY - 1)) + 1);//49
                food.position.x = randX;
                food.position.y = randY;
                     //newFood.splice(3, 1);
                }
                //addFood();
                //newFood.push(new Food());
                //console.log("collision \"" + this.name + "\" with Client " + food.name);
                //Food.randPositionl();
            }
            
        }
    } else { //deze returned gwn alleen true als hij collisie heeft
        if(snake != 0 && returnTrue == true) {
            for(var i = 0; i < snake.segments.length; i++) {
                if((snake.segments[i].x >= this.startX)  && (snake.segments[i].x <= this.endX) && (snake.segments[i].y >= this.startY)  && (snake.segments[i].y <= this.endY)) {
                    collision = true;
                } else {
                    collision = false;
                }
            }
        } 
    }
    
    
    //console.log("x: " + snake.segments[0].x + "y: " + snake.segments[0].y);
    //console.log("startX: " + this.startX + "startY: " + this.startY + "endX: " + this.endX + "endY: " + this.endY);
    //console.log("collision check: " + collision);
    return collision;
}

Collision.prototype.getCellsOfCollision = function() {
    var sX = this.startX;
    var eX = this.endX;
    var sY = this.startY;
    var eY = this.endY;
    var cellPositions = [];
    
    // sX = 0, eX = 10
    // sY = 0, eY = 0
    var count = 0;
    
    while(sX <= eX || sY < eY) {
        //if there are more X cells than Y cells
        if(sX <= eX && sY >= eY) {
            cellPositions.push( { x: sX, y: sY } );
            sX++;
        } else if(sX >= eX && sY <= eY) { //if there are more Y cells than X cells
            cellPositions.push( { x: sX, y: sY  } );
            sY++;
        } else if(sX <= eX && sY <= eY) { //if both Y cells and X cells are needed
            while(sX <= eX) {
                cellPositions.push( { x: sX, y: sY } );
                sX++;
            }
            sX = this.startX;
            sY++;
        }
        /*
        for (var i = 0; i < cellPositions.length; i++) {
            console.log("col objects x:" + cellPositions[i].x + " y" + cellPositions[i].y);
        }
        /*
        
        //console.log("sX: " + sX + "eX: " + eX + "sY: " + sY + "eY" + eY);
        
        /*if(count > 100) {
            break;
        }
        count++;*/
    }
    return cellPositions;
}