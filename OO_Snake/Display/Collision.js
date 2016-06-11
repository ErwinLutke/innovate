//Script Collision

//Create a static collision object
function Collision(startX, startY, endX, endY, name) {
    this.name = name || "Collision Object";
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.cells = this.getCellsOfCollision();
    }
//functie om collision te bepalen en returned collision als dat zo is
Collision.prototype.CollisionWith = function(snake, food, returnTrue) {
    returnTrue = returnTrue || false;
    snake = snake || 0;
    food = food || null;
    
    var collision;
    if(returnTrue == false) {
        if(snake != 0) {
            var shx = snake.segments[0].x;
            var shy = snake.segments[0].y;
            if((shx >= this.startX)  && (shx <= this.endX) && (shy >= this.startY)  && (shy <= this.endY)) {
                collision = true;
            } else {
                collision = false;
            }
        } 
        if (snake == 0 && food != null) {
            if((food.position.x >= this.startX)  && (food.position.x <= this.endX) && (food.position.y >= this.startY)  && (food.position.y <= this.endY)) {
                collision = true;
                if(collision == true){
                var randX = Math.floor((Math.random() * (97)) + 1);//79
                var randY = Math.floor((Math.random() * (49)) + 1);//49
                food.position.x = randX;
                food.position.y = randY;
                }
            }
            
        }
    } else { //deze returned gwn alleen true als hij collisie heeft
        if(snake != 0 && returnTrue == true) {
            for(var i = 0; i < snake.segments.length; i++) {
                if((snake.segments[i].x >= this.startX)  && (snake.segments[i].x <= this.endX) && (snake.segments[i].y >= this.startY)  && (snake.segments[i].y <= this.endY)) {
                    collision = true;
                    if(collision == true){
                        return collision;  
                    }
                } else {
                    collision = false;
                }
            }
        } 
    }
    return collision;
}

Collision.prototype.getCellsOfCollision = function() {
    var sX = this.startX;
    var eX = this.endX;
    var sY = this.startY;
    var eY = this.endY;
    var cellPositions = [];
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
    }
    return cellPositions;
}