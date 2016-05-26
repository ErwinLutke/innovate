//Script Snake.js
function Snake(id) {
    id = id || null;
    this.length = 0;
    this.color = false;
    this.direction = false;
    
    this.segments = [];
    this.moves = [];
    
    this.clientID = id; //een snake is gekoppeld aan een client
    this.nextToCollision = ""; //kan zijn: right, left, front | Checkt bij elke beweging of hij ergens tegen aan botst
    this.addColor();
    this.points = 2;
    this.totalCaughtFood = 0;
    this.totalCaughtSnakeFood = 0;
    this.isAI = false;
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



Snake.prototype.moveSnake = function(){
    if(!this.isAI) {
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
    }
};

// Snake.prototype.addSegment = function(AmountOfSegments) { //TO DO: moet 1 tile wachten voordat je een segment toevoegt
//     var lengthOfSnake = this.length;
//     for (var i = lengthOfSnake + 1; i <= (lengthOfSnake + AmountOfSegments); i++) {
//         if(this.segments[this.length - 1].x == this.segments[this.length].x) {
//           this.segments[i] = {x : (this.segments[this.length - 1].x), y : (this.segments[this.length - 1].y + 1)}; 
//         }
//         else if(this.segments[this.length - 1].y == this.segments[this.length].y) {
//             this.segments[i] = {x : (this.segments[this.length - 1].x + 1), y : (this.segments[this.length - 1].y)}; 
//         }
//         console.log(this.segments[i].x + " : " + this.segments[i].y);
//         this.length++;
//     }
//     console.log(this.length);
// }


Snake.prototype.addColor = function() {
    var rand = Math.floor((Math.random() * 8) + 1); // 1 t/m 8
    
    switch(rand) {
        case 1:
            this.color = "darkblue";
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
            this.color = "red";
            break;
        case 8:
            this.color = "darkgreen";
            break;
    }
};

//log de positie en lengte van de snake
//console.log(snake.segments[0], snake.length);
