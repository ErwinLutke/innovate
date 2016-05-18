//Script Collision

//Create a static collision object
function Collision(startX, startY, endX, endY) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
}

Collision.prototype.CollisionWith = function(snake) {
    var collision;
    if(snake.segments[0].x >= this.startX  && snake.segments[0].x <= this.endX && snake.segments[0].y <= this.startY  && snake.segments[0].y >= this.endY) {
        collision = true;
    }
    collision = false;
    return collision;
}