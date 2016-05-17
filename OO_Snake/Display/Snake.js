//Script Snake.js
function Snake(id) {
    this.length = 5;
    this.color = false;
    this.direction = 0;
    this.segments = [];
    this.clientID = id; //een snake is gekoppeld aan een client
    this.nextToCollision = "" //kan zijn: right, left, front | Checkt bij elke beweging of hij ergens tegen aan botst
    this.addColor();
    this.spawnSnake();
}

Snake.prototype.spawnSnake = function(startX, startY) {
    for (var i = this.length; i >= 0; i--) {
        this.segments[i] = {x : (startX - i), y : startY};
    }
}

Snake.prototype.addSegment = function(AmountOfSegments) { //TO DO: moet 1 tile wachten voordat je een segment toevoegt
    var lengthOfSnake = this.length;
    for (var i = lengthOfSnake + 1; i <= (lengthOfSnake + AmountOfSegments); i++) {
        if(this.segments[this.length - 1].x == this.segments[this.length].x) {
           this.segments[i] = {x : (this.segments[this.length - 1].x), y : (this.segments[this.length - 1].y + 1)}; 
        }
        else if(this.segments[this.length - 1].y == this.segments[this.length].y) {
            this.segments[i] = {x : (this.segments[this.length - 1].x + 1), y : (this.segments[this.length - 1].y)}; 
        }
        console.log(this.segments[i].x + " : " + this.segments[i].y);
        this.length++;
    }
    console.log(this.length);
}

Snake.prototype.addColor = function() {
    var rand = Math.floor((Math.random() * 8) + 1); // 1 t/m 8
    
    switch(rand) {
        case 1:
            this.color = "blue";
            break;
        case 2:
            this.color = "orange";
            break;
        case 3:
            this.color = "yellow";
            break;
        case 4:
            this.color = "white";
            break;
        case 5:
            this.color = "green";
            break;
        case 6:
            this.color = "purple";
            break;
        case 7:
            this.color = "pink";
            break;
        case 8:
            this.color = "darkgreen";
            break;
    }
}

//log de positie en lengte van de snake
//console.log(snake.segments[0], snake.length);
