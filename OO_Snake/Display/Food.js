function Food(position) {
    //Stel dat we een highscore ofzo hebben en dat er staat "... Fruit gepakt" kunnen we deze aanpassen ipv alles anders
    this.name = "Fruit";
    //Position moet random gegenereerd worden
    //this.position = position;
    this.position = randPosition(); //{x : 20, y : 10}
    //color kan later miss door img worden vervangen
    this.color = "blue";
    this.caughtSnake = false;
    this.caughtFood = true;
    
}
function caughtSnake(pos){
    this.name = "snakeFood";
    this.position = pos;
    this.snakeFoodColor ="green";
    this.snakeFood =[];
    this.caughtFood = false;
    if(this.type == "caughtSnake")
    this.caughtSnake = true;
}

/*Food.prototype.spawnFood = function() {
    if(this.caughtFood == true) {
        if(!renderer.drawCell(this.position, this.color)) { console.log("can't render food") }
        this.caughtFood = false;
        console.log("total caught food: " + this.totalCaughtFood);
        console.log("caughtfood: " + this.caughtFood);
        return renderer.drawCell(this.position, this.color);
    }
}*/

//give food a random position inside the grid
function randPosition() {
    
    //random nummer tussen 1 en 10
    
    var randX = Math.floor((Math.random() * (game.sizeX - 1)) + 1);//79
    var randY = Math.floor((Math.random() * (game.sizeY - 1)) + 1);//49
  //  if(randX == initGame.collisions) 
    var position = {x : randX, y : randY};
    
    return position;

}
/*
Food.prototype.randPosition = function(collisions) {
    for (var i = 0; i < collisions.length; i++) {
        collisions[i]
    }
    //random nummer tussen 1 en 10
    
    var randX = Math.floor((Math.random() * (game.sizeX - 1)) + 1);//79
    var randY = Math.floor((Math.random() * (game.sizeY - 1)) + 1);//49
  //  if(randX == initGame.collisions) 
    var position = {x : randX, y : randY};
    
    return position;

}
*/
