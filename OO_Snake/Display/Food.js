function Food(position) {
    this.name = "Fruit";
    //Position moet random gegenereerd worden
    //this.position = position;
    this.position = randPosition(); //{x : 20, y : 10}
    //color kan later miss door img worden vervangen
    this.color = "blue";
    this.caughtSnake = false;
    this.caughtFood = true;
    
}
//give food a random position inside the grid
function randPosition() {
    
    //random nummer tussen 1 en 10
    
    var randX = Math.floor((Math.random() * (94)) + 2);
    var randY = Math.floor((Math.random() * (46)) + 2);
    var position = {x : randX, y : randY};
    
    return position;

}