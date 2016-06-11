function Renderer (game) {
        this.game = game;
        this.ctx = game.ctx;
        this.ctx_fg = game.ctx_fg;
        this.ctx_bg = game.ctx_bg;
        
        this.imgSnakeHeads = [];
        this.imgSnakeBodies = [];
        
        this.loadSnakeImages();
        
        // MAKE IT BEAUTIFUL
        this.drawBackground();
        // this.drawCells();
}

Renderer.prototype.clearLayer = function (canvas) {
    if(canvas === "bg") {
        this.game.ctx_bg.clearRect(0, 0, this.game.canvas_bg.width, this.game.canvas_bg.height);
    }
    else {
        this.game.ctx_fg.clearRect(0, 0, this.game.canvas_fg.width, this.game.canvas_fg.height);
    }
};

Renderer.prototype.drawCell = function(coordinates, color, canvas) {
    // canvas = canvas || null;
    var extra;
    var ctx;
    if(canvas === "bg") {
        ctx = this.game.ctx_bg;
        extra = 7; //4
    }
    else {
        extra = 0;
        ctx = this.game.ctx_fg;
    }
       
    ctx.fillStyle = color;
    
    if (this.game.cellSpacing) {
        ctx.fillRect (
            (coordinates.x + extra) * ( this.game.cellSize + this.game.cellSpacing ) + this.game.cellSpacing,
            (coordinates.y + extra) * ( this.game.cellSize + this.game.cellSpacing ) + this.game.cellSpacing,
            this.game.cellSize,
            this.game.cellSize
        );
    } 
    else {
        ctx.fillRect (
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
    // var ctx = this.game.ctx_bg;
    // for (var i = 0; i < this.game.sizeX; i++) {
    //     for (var j = 0; j < this.game.sizeY; j++) {
    //         // this.drawCell({x:i,y:j}, this.game.clearColor, "test");
    //         // ctx.clearRect(
    //         //     i * ( this.game.cellSize + this.game.cellSpacing ) + this.game.cellSpacing,
    //         //     j * ( this.game.cellSize + this.game.cellSpacing ) + this.game.cellSpacing,
    //         //     this.game.cellSize,
    //         //     this.game.cellSize
    //         // );
    //     }
    // }
    var context = this.game.ctx_bg;
    var p = 10
    for (var x = 0; x <= this.game.canvas_fg.width; x += 16) {
        context.moveTo(x + 128, 0 + 128);
        context.lineTo(x + 128, this.game.canvas_fg.height + 128);
    }
        
        
    for (var y = 0; y <= this.game.canvas_fg.height; y += 16) {
        context.moveTo(0 + 128, y + 128);
        context.lineTo(this.game.canvas_fg.width + 128, y + 128);
    }
        
    context.strokeStyle = "black";
    context.stroke();
};

Renderer.prototype.clearSnake = function(snake){
    for (var i = 0; i < snake.segments.length; i++) {
        this.ctx_fg.clearRect(
            snake.segments[i].x * ( this.game.cellSize + 1) - 2,   
            snake.segments[i].y * ( this.game.cellSize + 1) - 2, 
            19,
            19
        ); 
    }  
};

Renderer.prototype.drawSnakes = function(snakes) {
    for (var i = 0; i < snakes.length; i++) {
        var snake = snakes[i];
       
        if(snake.prevH) { 
            this.ctx_fg.clearRect(
                snake.prevH.x * ( this.game.cellSize + 1) - 2,   
                snake.prevH.y * ( this.game.cellSize + 1) - 2, 
                19,
                19
            );
        }
        for (var j = snake.segments.length -1; j >= 0; j--) { 
            var seg = snake.segments[j];                           
            
            //if(!snake.dead) {
                if (j === 0) {
                    // head
                    this.ctx_fg.drawImage(
                        this.imgSnakeHeads[snakes[i].color], 
                        seg.x * ( this.game.cellSize + 1) - 2,
                        seg.y * ( this.game.cellSize + 1) - 2,
                        19,
                        19
                    );
                }
                else {
                     this.ctx_fg.drawImage(
                            this.imgSnakeBodies[snakes[i].color], 
                            seg.x * ( this.game.cellSize + 1),
                            seg.y * ( this.game.cellSize + 1),
                            16,
                            16
                        );
                }    
            //}  
        }
        
        if(snake.prevT) {
            this.ctx_fg.clearRect(
                snake.prevT.x * ( this.game.cellSize + 1) - 2,   
                snake.prevT.y * ( this.game.cellSize + 1) - 2, 
                19,
                19
            ); 
        }
    }
};

Renderer.prototype.collisionDraw = function(collisions) {
    for(var i = 0; i < collisions.length; i++) {
        var collision = collisions[i];
        try {
            for(var j = 0; j < collision.cells.length; j++) {
                this.drawCell(collision.cells[j], "red", "bg"); 
            }
        } catch(e) {
            console.log("CAUGHT ERROR: " + e);
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
        corner_TR.onload = function() { that.ctx_bg.drawImage(corner_TR, 1556+ 64,   0+ 64, 108, 108); };
        corner_BR.onload = function() { that.ctx_bg.drawImage(corner_BR, 1556+ 64, 788+ 64, 108, 108); };
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
            var growX = 1600;
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
            growY -= 32;
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
        tile_stone.src = "../Display/img/walls/tile_stone_green.png";
        tile_stone_moss.src = "../Display/img/walls/tile_stone_moss.png";
};

