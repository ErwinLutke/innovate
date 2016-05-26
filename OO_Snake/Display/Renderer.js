function Renderer (game) {
        this.game = game;
        this.ctx = game.ctx;
}

Renderer.prototype.clearLayer = function (canvas) {
    if(canvas === "bg") {
        this.ctx = this.game.ctx_bg;
    }
    else {
        this.ctx = this.game.ctx;
    }
    
    this.game.ctx.clearRect(0, 0, this.game.canvas1.width, this.game.canvas1.height);
}

Renderer.prototype.drawCell = function(coordinates, color, canvas) {
    // canvas = canvas || null;
    var extra;
    if(canvas === "bg") {
        this.ctx = this.game.ctx_bg;
        extra = 3; //4
    }
    else {
        extra = 0;
        this.ctx = this.game.ctx;
    }
       
    this.ctx.fillStyle = color;
    
    if (this.game.cellSpacing) {
        this.ctx.fillRect (
            (coordinates.x + extra) * ( this.game.cellSize + this.game.cellSpacing ) + this.game.cellSpacing,
            (coordinates.y + extra) * ( this.game.cellSize + this.game.cellSpacing ) + this.game.cellSpacing,
            this.game.cellSize,
            this.game.cellSize
        );
    } 
    else {
        this.ctx.fillRect (
            coordinates.x * ( this.game.cellSize + 1) + 1,
            coordinates.y * ( this.game.cellSize + 1) + 1,
            this.game.cellSize + 1,
            this.game.cellSize + 1
        );
    }
};

//wall_brick_forward.png
Renderer.prototype.drawAnImage = function(coordinates, img) {
    if (this.game.cellSpacing) {
        //img.src = "../Display/img/wall_brick_forward.png";
        //img.onload = function() {
            this.game.ctx_bg.drawImage(img, coordinates.x, coordinates.y);
        //}
        //img.src = "../Display/img/wall_brick_forward.png";
    }
};


Renderer.prototype.drawCells = function() {
    for (var i = 0; i < this.game.sizeX; i++) {
        for (var j = 0; j < this.game.sizeY; j++) {
            this.drawCell({x:i,y:j}, this.game.clearColor, "bg");
        }
    }
};

Renderer.prototype.drawSnakes = function(snakes) {
    for (var i = 0; i < snakes.length; i++) {
        for (var j = 0; j < snakes[i].segments.length; j++) {
            // if (j === snakes[i].length) {
            //     this.drawCell(snakes[i].segments[j], this.game.clearColor);   
            // }  
            // else if (j === 0) {
            //     // head
            //     this.drawCell(snakes[i].segments[j], "green");
            // }
            // else {
            this.ctx.fillStyle = snakes[i].color;
                    this.ctx.fillRect (
                        snakes[i].segments[j].x * ( this.game.cellSize + 1) + 1,
                        snakes[i].segments[j].y * ( this.game.cellSize + 1) + 1,
                        this.game.cellSize,
                        this.game.cellSize
                    );
                // this.drawCell(snakes[i].segments[j], snakes[i].color);
            // }    
        }  
    }
};

Renderer.prototype.collisionDraw = function(collisions) {
    for(var i = 0; i < collisions.length; i++) {
        var collision = collisions[i];
        for(var j = 0; j < collision.cells.length; j++) {
            this.drawCell(collision.cells[j], "red", "bg"); 
        }
    }
    
   /* 
    collisions.forEach(function(collision) {
        collision.cells.forEach(function(cell) {
            //console.log(cell.x + " : " + cell.y);
            this.drawCell(cell, "red");
        });
        
    });  */
}