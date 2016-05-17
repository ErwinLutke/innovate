function Renderer (game) {
        this.game = game;
        this.ctx = game.ctx;
}

Renderer.prototype.drawCell = function(coordinates, color) {
    this.ctx.fillStyle = color;
    if (this.game.cellSpacing) {
        this.ctx.fillRect (
            coordinates.x * ( this.game.cellSize + this.game.cellSpacing ) + this.game.cellSpacing + (this.game.wGridth / 2 | 0),
            coordinates.y * ( this.game.cellSize + this.game.cellSpacing ) + this.game.cellSpacing + (this.game.hGridth / 2 | 0),
            this.game.cellSize,
            this.game.cellSize
        );
    } 
    else {
        this.ctx.fillRect (
            coordinates.x * ( this.game.cellSize + 1) + 1 + (this.game.wGridth / 2 | 0),
            coordinates.y * ( this.game.cellSize + 1) + 1 + (this.game.hGridth / 2 | 0),
            this.game.cellSize + 1,
            this.game.cellSize + 1
        );
    }
}

Renderer.prototype.drawCells = function() {
    for (var i = 0; i < this.game.sizeX; i++) {
        for (var j = 0; j < this.game.sizeY; j++) {
            this.drawCell({x:i,y:j}, this.game.clearColor);
        }
    }
} 

//still working on this one
Renderer.prototype.drawSnakes = function(snakes) {
    for (var i = 0; i < snakes.length; i++) {
        for (var j = snakes[i].length; j >= 0; j--) {
            if (j === snakes[i].length) {
                this.drawCell(snakes[i].segments[j],  this.game.clearColor);   
            }  
            if (j === 0) {
                switch(snakes[i].direction) {
                    case 0: // Right
                        snakes[i].segments[0] = { x: snakes[i].segments[0].x + 1, y: snakes[i].segments[0].y }
                        break;
                    case 1: // Left
                        snakes[i].segments[0] = { x: snakes[i].segments[0].x - 1, y: snakes[i].segments[0].y }
                        break;
                    case 2: // Up
                        snakes[i].segments[0] = { x: snakes[i].segments[0].x, y: snakes[i].segments[0].y - 1 }
                        break;
                    case 3: // Down
                        snakes[i].segments[0] = { x: snakes[i].segments[0].x, y: snakes[i].segments[0].y + 1 }
                        break;
                }
            } 
            else {                      
                snakes[i].segments[j] = { x:  snakes[i].segments[j - 1].x, y:  snakes[i].segments[j - 1].y } 
            }
            this.drawCell( snakes[i].segments[j],  snakes[i].color);
        }  
    }

}
