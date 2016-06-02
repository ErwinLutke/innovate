function Renderer (game) {
        this.game = game;
        this.ctx = game.ctx;
        this.ctx_bg = game.ctx_bg;
        
        this.imgSnakeHeads = [];
        this.imgSnakeBodies = [];
        
        this.loadSnakeImages();
        this.drawBackground();
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
        extra = 7; //4
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
            this.game.ctx_bg.drawImage(img, coordinates.x, coordinates.y, 64, 64);
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
        for (var j = snakes[i].segments.length -1; j >= 0; j--) {
            if (j === 0) {
                // head
                    this.ctx.drawImage(
                        this.imgSnakeHeads[snakes[i].color], 
                        snakes[i].segments[j].x * ( this.game.cellSize + 1) - 2,
                        snakes[i].segments[j].y * ( this.game.cellSize + 1) - 2,
                        19,
                        19
                    );
            }
            else {
                 this.ctx.drawImage(
                        this.imgSnakeBodies[snakes[i].color], 
                        snakes[i].segments[j].x * ( this.game.cellSize + 1),
                        snakes[i].segments[j].y * ( this.game.cellSize + 1),
                        15,
                        15
                    );
                // this.ctx.fillStyle = snakes[i].color;
                //     this.ctx.fillRect (
                //         snakes[i].segments[j].x * ( this.game.cellSize + 1) + 1,
                //         snakes[i].segments[j].y * ( this.game.cellSize + 1) + 1,
                //         this.game.cellSize,
                //         this.game.cellSize
                //     );
                // this.drawCell(snakes[i].segments[j], snakes[i].color);
            }    
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


Renderer.prototype.loadSnakeImages = function() {
    var dirHead = [];
    var dirBody = [];
    for (var i = 1; i <= 10; i++) {
        dirHead.push("../Display/img/snakes/snake_head_" + i + ".png");
        dirBody.push("../Display/img/snakes/snake_body_" + i + ".png");
    }
    
    for (var i = 0; i < dirHead.length; i++) {
        var path = dirHead[i];
        var img = new Image();
        img.onload = function() {
            //counter up
        };
        img.src = path;
        this.imgSnakeHeads.push(img);
    }    
    for (var i = 0; i < dirBody.length; i++) {
        var path = dirBody[i];
        var img = new Image();
        img.onload = function() {
            //counter up
        };
        img.src = path;
        this.imgSnakeBodies.push(img);
    }
};


Renderer.prototype.drawBackground = function() {
    var that = this;
    function drawImage(img, x, y){
        that.ctx_bg.drawImage(img, x + 64, y + 64, 64, 64);
    }
    
    //draw grid - temp
    // this.drawCells();
    
    // load all the textures
    var corner_TL = new Image(),
        corner_TR = new Image(),
        corner_BR = new Image(),
        corner_BL = new Image(),
        wall_T = new Image(),
        wall_R = new Image(),
        wall_B = new Image(),
        wall_L = new Image(),
        tile_stone = new Image(),
        tile_stone_moss = new Image();
        
        corner_TL.onload = function() { that.ctx_bg.drawImage(corner_TL,    0+ 64,   0+ 64, 108, 108); };
        corner_TR.onload = function() { that.ctx_bg.drawImage(corner_TR, 1557+ 64,   0+ 64, 108, 108); };
        corner_BR.onload = function() { that.ctx_bg.drawImage(corner_BR, 1557+ 64, 788+ 64, 108, 108); };
        corner_BL.onload = function() { that.ctx_bg.drawImage(corner_BL,    0+ 64, 788+ 64, 108, 108); };
        
        wall_T.onload = function() {
            var growX = 64;
            var growY = 0;
            for(var xAmount = 0; xAmount < 8; xAmount++) {
                for(var yAmount = 0; yAmount < 1; yAmount++ ) {
                    drawImage(wall_T, growX, growY);
                }
                growX += 64;
            }
            // growX += 8 * 64 + 1;
            for(var xAmount = 0; xAmount < 8; xAmount++) {
                for(var yAmount = 0; yAmount < 1; yAmount++ ) {
                    drawImage(wall_T, growX, growY);
                }
                growX += 64;
            }
            
            for(var xAmount = 0; xAmount < 8; xAmount++) {
                for(var yAmount = 0; yAmount < 1; yAmount++ ) {
                    drawImage(wall_T, growX, growY);
                }
                growX += 64;
            }
                  
            // temp draws border for passage
            for (var i = 0; i < 32; i++) {
                that.ctx_bg.fillStyle = "black";
                that.ctx_bg.fillRect(
                    (40 + i) * ( that.game.cellSize + that.game.cellSpacing ) + that.game.cellSpacing,
                    (7) * ( that.game.cellSize + that.game.cellSpacing ) + that.game.cellSpacing - 6,
                    that.game.cellSize + 1,
                    that.game.cellSize + 1
                );
            }
        };
        
        wall_B.onload = function() {
            var growX = 64;
            var growY = 832;
            //bottom left
            for(var xAmount = 0; xAmount < 8; xAmount++) {
                for(var yAmount = 0; yAmount < 1; yAmount++ ) {
                   drawImage(wall_B, growX, growY);
                }
                growX += 64;
            }
            
            // bottom middle
            for(var xAmount = 0; xAmount < 8; xAmount++) {
                for(var yAmount = 0; yAmount < 1; yAmount++ ) {
                    drawImage(wall_B, growX, growY);
                }
                growX += 64;
            }
            //bottom right
            // growX += 8 * 64 + 1;
            for(var xAmount = 0; xAmount < 8; xAmount++) {
                for(var yAmount = 0; yAmount < 1; yAmount++ ) {
                    drawImage(wall_B, growX, growY);
                }
                growX += 64;
            }
            
            // temp draws border for passage
            for (var i = 0; i < 32; i++) {
                that.ctx_bg.fillStyle = "black";
                that.ctx_bg.fillRect(
                    (40 + i) * ( that.game.cellSize + that.game.cellSpacing ) + that.game.cellSpacing,
                    (56) * ( that.game.cellSize + that.game.cellSpacing ) + that.game.cellSpacing + 4,
                    that.game.cellSize + 1,
                    that.game.cellSize + 1
                );
            }
        };
        
        wall_L.onload = function() {
            var growX = 0;
            var growY = 80;
            for(var xAmount = 0; xAmount < 1; xAmount++) {
                for(var yAmount = 0; yAmount < 4; yAmount++ ) {
                    drawImage(wall_L, growX, growY);
                    growY += 64;
                }
            }
            // growY += 3 * 64 + 33; 
            for(var xAmount = 0; xAmount < 1; xAmount++) {
                for(var yAmount = 0; yAmount < 4; yAmount++ ) {
                    drawImage(wall_L, growX, growY);
                    growY += 64;
                }
            }
            growY -= 33; 
            for(var xAmount = 0; xAmount < 1; xAmount++) {
                for(var yAmount = 0; yAmount < 4; yAmount++ ) {
                    drawImage(wall_L, growX, growY);
                    growY += 64;
                }
            } 
            
            // temp draws border for passage
            for (var i = 0; i < 14; i++) {
                that.ctx_bg.fillStyle = "black";
                that.ctx_bg.fillRect(
                    (7) * ( that.game.cellSize + that.game.cellSpacing ) + that.game.cellSpacing - 6,
                    (25 + i) * ( that.game.cellSize + that.game.cellSpacing ) + that.game.cellSpacing,
                    that.game.cellSize + 1,
                    that.game.cellSize + 1
                );
            }
        };
        
        wall_R.onload = function() {
            var growX = 1601;
            var growY = 80;
            for(var xAmount = 0; xAmount < 1; xAmount++) {
                for(var yAmount = 0; yAmount < 4; yAmount++ ) {
                    drawImage(wall_R, growX, growY);
                    growY += 64;
                }
            }
            // growY += 3 * 64 + 33;
            for(var xAmount = 0; xAmount < 1; xAmount++) {
                for(var yAmount = 0; yAmount < 4; yAmount++ ) {
                    drawImage(wall_R, growX, growY);
                    growY += 64;
                }
            }
            growY -= 33;
            for(var xAmount = 0; xAmount < 1; xAmount++) {
                for(var yAmount = 0; yAmount < 4; yAmount++ ) {
                    drawImage(wall_R, growX, growY);
                    growY += 64;
                }
            }
            // temp draws border for passage
            for (var i = 0; i < 14; i++) {
                that.ctx_bg.fillStyle = "black";
                that.ctx_bg.fillRect(
                    (104) * ( that.game.cellSize + that.game.cellSpacing ) + that.game.cellSpacing + 6,
                    (25 + i) * ( that.game.cellSize + that.game.cellSpacing ) + that.game.cellSpacing,
                    that.game.cellSize + 1,
                    that.game.cellSize + 1
                );
            }
        };   
        
        // draws the floor
        tile_stone.onload = function() {
            // change to "darken" the tile;
            that.ctx_bg.globalAlpha = 0.6;
            // change to resize the tile
            var size = 1.5;
            
            var growX = 64;
            var growY = 64;
            for(var xAmount = 0; xAmount < 48 / size; xAmount++) {
                for(var yAmount = 0; yAmount < 24 / size; yAmount++ ) {
                    that.ctx_bg.drawImage(tile_stone, growX+ 64, growY+ 64, 32 * size, 32 * size);
                    growY += 32 * size;
                }
                growY = 64;
                growX += 32 * size;
            }
            // growX = 576;
            // for (var xAmount = 0; xAmount < 8; xAmount++) {
            //     ctx_bg.drawImage(tile_stone, growX, 0, 64, 64);
            //     growX += 64;
            // }
            that.ctx_bg.globalAlpha = 1;
        };
        
        // tile_stone_moss.onload = function() {
        //     ctx_bg.globalAlpha = 0.6;
        //     ctx_bg.drawImage(tile_stone_moss, 192, 320, 32 * 1.5, 32 * 1.5);
        //     ctx_bg.globalAlpha = 1;
        // };
        
        corner_TL.src = "../Display/img/walls/corner_TL.png";
        corner_TR.src = "../Display/img/walls/corner_TR.png";
        corner_BR.src = "../Display/img/walls/corner_BR.png";
        corner_BL.src = "../Display/img/walls/corner_BL.png";
        wall_T.src = "../Display/img/walls/wall_T.png";
        wall_R.src = "../Display/img/walls/wall_R.png";
        wall_B.src = "../Display/img/walls/wall_B.png";
        wall_L.src = "../Display/img/walls/wall_L.png";
        tile_stone.src = "../Display/img/walls/tile_stone.png";
        tile_stone_moss.src = "../Display/img/walls/tile_stone_moss.png";
};

