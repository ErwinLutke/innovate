// Script Game.js, hier initialiseert hij het spel 

function Game (wGridth, hGridth) {
    this.snakeLength = 5;
    this.snakeGrow = 1;
    this.maxFood = 1;
    
    this.FPS_LIMIT = 1000/20;
    
    this.canvas1 = document.getElementById('canvas1');
    this.ctx = this.canvas1.getContext('2d');
        
    this.canvas_fg = document.getElementById('canvas_fg');
    this.ctx_fg = this.canvas_fg.getContext('2d');
        
    this.canvas_bg = document.getElementById('canvas_bg');
    this.ctx_bg = this.canvas_bg.getContext('2d');

    this.canvas1.height = window.innerHeight;
    this.canvas1.width = window.innerWidth;
    
    this.wGridth = 98;
    //this.canvas.width / 20 |0;
    this.hGridth = 50;
    //this.canvas.height / 20 |0;
    
    // this.sizeX =  100//80 ///2 | 0
    // this.sizeY =  50;//50 ///2 | 0    
    this.sizeX =  this.wGridth;//80 ///2 | 0
    this.sizeY =  this.hGridth;//50 ///2 | 0
    
    
    this.cellSize = 15;//16
    this.cellSpacing = 1;
    this.clearColor = "#4d4d4d"; //#838383
    this.solidsColor = '#EFEFEF';
    
    
    this.canvas1.height =  this.canvas_fg.height = this.sizeY * ( this.cellSize + this.cellSpacing ) + this.cellSpacing;
    this.canvas1.width = this.canvas_fg.width = this.sizeX * ( this.cellSize + this.cellSpacing ) + this.cellSpacing;
    
    // this.canvas_fg.height = this.sizeY * ( this.cellSize + this.cellSpacing ) + this.cellSpacing;
    // this.canvas_fg.width = this.sizeX * ( this.cellSize + this.cellSpacing ) + this.cellSpacing;
   
    this.canvas_bg.height = (14 + this.sizeY) * ( this.cellSize + this.cellSpacing) + this.cellSpacing;
    this.canvas_bg.width = (14 + this.sizeX) * ( this.cellSize + this.cellSpacing) + this.cellSpacing;
    
    this.canvas1.style.top  = this.canvas_fg.style.top = (window.innerHeight - this.canvas1.height) / 2 +"px";
    this.canvas1.style.left = this.canvas_fg.style.left = (window.innerWidth - this.canvas1.width) / 2 +"px";
    
    this.canvas_bg.style.top = (window.innerHeight - this.canvas_bg.height) / 2 +"px";
    this.canvas_bg.style.left = (window.innerWidth - this.canvas_bg.width) / 2 +"px";
        //teken een vierkant voor de border

}
