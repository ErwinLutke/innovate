//Script Snake.js
function Snake(id) {
    id = id || null;
    this.length = 0;
    this.color = 1;
    this.direction = false;
    
    this.segments = [];
    this.moves = [];
    
    this.prevH = 0;
    this.prevT = 0;
    
    this.deathTime = 60;
    
    this.dead = false;
    
    this.clientID = id; //een snake is gekoppeld aan een client
    this.nextToCollision = ""; //kan zijn: right, left, front | Checkt bij elke beweging of hij ergens tegen aan botst
    this.points = 2;
    this.totalCaughtFood = 0;
    this.totalCaughtSnakeFood = 0;
    
    this.isAI = false;
    this.AIParent = false;
}

Snake.prototype.spawnSnake = function(startX, startY) {
    this.segments[0] = {x: startX, y: startY};
    
    // voeg alle segmenten toe aan de hand van "length"
    for (var i = 1; i <= this.length; i++) {
        // -1 hier is zodat alle segmenten op het tweede blokje staan (compacte slang)
        this.segments[i] = {x : (startX - 1), y : startY};
    }
};
//voegt een stuk van de snakebody toe
Snake.prototype.addSegment = function(amountOfSegments) {
    var sl = this.length;
    for (var i = 0; i < amountOfSegments; i++) {
        this.segments.push({ x: this.segments[sl], y: this.segments[sl] });
        this.length++;
    }
};



Snake.prototype.moveSnake = function() {
    // slaat hoofd posiie op van de slang
    this.prevH = this.segments[0];

    // zodra op een knop wordt gedrukt gaat de slang bewegen
    if(this.direction !== false) {
        if (this.moves.length > 0) {
            this.direction = this.moves.shift();
            if (this.moves.length > 0) {
                this.moves.splice(1, this.moves.length); 
            }
        }
        if(this.direction === 0) this.segments.unshift({x: this.prevH.x + 1, y: this.prevH.y});
        if(this.direction === 1) this.segments.unshift({x: this.prevH.x - 1, y: this.prevH.y});
        if(this.direction === 2) this.segments.unshift({x: this.prevH.x, y: this.prevH.y - 1});
        if(this.direction === 3) this.segments.unshift({x: this.prevH.x, y: this.prevH.y + 1});
        
        this.prevT = this.segments.pop();
    }   
};

