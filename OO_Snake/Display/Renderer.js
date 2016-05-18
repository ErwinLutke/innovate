function Renderer (game) {
        this.game = game;
        this.ctx = game.ctx;
}

Renderer.prototype.drawCell = function(coordinates, color) {
    this.ctx.fillStyle = color;
    if (this.game.cellSpacing) {
        this.ctx.fillRect (
            coordinates.x * ( this.game.cellSize + this.game.cellSpacing ) + this.game.cellSpacing,
            coordinates.y * ( this.game.cellSize + this.game.cellSpacing ) + this.game.cellSpacing,
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
        //borderYData = coordinates.y * ( this.game.cellSize + 1) + 1;
        //borderXData = coordinates.x * ( this.game.cellSize + 1) + 1;
        //if(borderYdata ==1)
         //   var coordinate =0;
 //   if(this.game.coordinates.x ==coordinate || this.game.coordinates.y == 0)
  //  {
//       this.ctx.fillStyle = "#ff0000"; 
 //      coordinate++;
  //     if (coordinate == 80)
//       {
//           coordinate ==80;
//       }
    
//    }
    }
     

};

Renderer.prototype.drawCells = function() {
    for (var i = 0; i < this.game.sizeX; i++) {
        for (var j = 0; j < this.game.sizeY; j++) {
            this.drawCell({x:i,y:j}, this.game.clearColor);
        }
    }
};

Renderer.prototype.drawSnakes = function(snakes) {
    for (var i = 0; i < snakes.length; i++) {
        for (var j = snakes[i].length; j >= 0; j--) {
            if (j === snakes[i].length) {
                this.drawCell(snakes[i].segments[j], this.game.clearColor);   
            }  
            else {
                this.drawCell(snakes[i].segments[j], snakes[i].color);
            }
        }  
    }
};
