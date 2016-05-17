function Food() {
    //Stel dat we een highscore ofzo hebben en dat er staat "... Fruit gepakt" kunnen we deze aanpassen ipv alles anders
    this.name = "Fruit";
    //Position moet random gegenereerd worden
    this.position = randPosition(); //{x : 20, y : 10}
    //color kan later miss door img worden vervangen
    this.color = "red";
    this.points = 200;
}


//give food a random position inside the grid
function randPosition() {
    //random nummer tussen 1 en 10
    var randX = Math.floor((Math.random() * (game.sizeX - 1)) + 1);//79
    var randY = Math.floor((Math.random() * (game.sizeY - 1)) + 1);//49
    var position = {x : randX, y : randY};
    
    return position;
}