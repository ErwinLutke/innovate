//Script Snake.js
function Snake(id) {
    id = id || null;
    this.length = 0;
    this.color =  Math.floor((Math.random() * 9) + 1);
    this.direction = false;
    
    this.segments = [];
    this.moves = [];
    
    this.clientID = id; //een snake is gekoppeld aan een client
    this.nextToCollision = ""; //kan zijn: right, left, front | Checkt bij elke beweging of hij ergens tegen aan botst
    // this.addColor();
    this.points = 2;
    this.totalCaughtFood = 0;
    this.totalCaughtSnakeFood = 0;
    this.isAI = false;
    this.AIParent = false;
  //  this.remove = false;
}

Snake.prototype.spawnSnake = function(startX, startY) {
    this.segments[0] = {x: startX, y: startY};
    
    // voeg alle segmenten toe aan de hand van "length"
    for (var i = 1; i <= this.length; i++) {
        // -1 hier is zodat alle segmenten op het tweede blokje staan (compacte slang)
        this.segments[i] = {x : (startX - 1), y : startY};
    }
};

Snake.prototype.addSegment = function(amountOfSegments) {
    var sl = this.length;
    for (var i = 0; i < amountOfSegments; i++) {
        this.segments.push({ x: this.segments[sl], y: this.segments[sl] });
        this.length++;
    }
};



Snake.prototype.moveSnake = function() {
    // var speed = 1;
    // zodra op een toets wordt gedrukt gaat de slang bewegen
    var hx = this.segments[0].x;
    var hy = this.segments[0].y;

    if(this.direction !== false) {
        if (this.moves.length > 0) {
            this.direction = this.moves.shift();
            if (this.moves.length > 2) {
                this.moves.splice(2, this.moves.length); 
            }
        }
        
        if(this.direction === 0) this.segments.unshift({x: hx + 1, y: hy});
        if(this.direction === 1) this.segments.unshift({x: hx - 1, y: hy});
        if(this.direction === 2) this.segments.unshift({x: hx, y: hy - 1});
        if(this.direction === 3) this.segments.unshift({x: hx, y: hy + 1});
        this.segments.pop();

    }   
};

Snake.prototype.addColor = function() {
    var rand = Math.floor((Math.random() * 9) + 1); // 1 t/m 8
    this.color = rand;
    // switch(rand) {
    //     case 1:
    //         this.color = "red";
    //         break;
    //     case 2:
    //         this.color = "orange";
    //         break;
    //     case 3:
    //         this.color = "yellow";
    //         break;
    //     case 4:
    //         this.color = "cyan";
    //         break;
    //     case 5:
    //         this.color = "magenta";
    //         break;
    //     case 6:
    //         this.color = "pink";
    //         break;
    //     case 7:
    //         this.color = "greenyellow";
    //         break;
    //     case 8:
    //         this.color = "white";
    //         break;
    // }
};

//log de positie en lengte van de snake
//console.log(snake.segments[0], snake.length);
