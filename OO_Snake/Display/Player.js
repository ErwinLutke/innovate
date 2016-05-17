//Script Player.js | Client (NOTE: IS OVERBODIG, WORDT NIET MEER GEBRUIKT) (zie Snake.js)
function player(id, playername, snake) 
{
    this.id = id;
    this.name = playername;
    this.snake = snake;
}

/*
player.prototype.controls = function() 
{
        window.addEventListener('keydown', function(e) {
        if (e.keyCode === 38 && snake.direction !== 3) {
            snake.direction = 2; // Up
        } else if (e.keyCode === 40 && snake.direction !== 2) {
            snake.direction = 3; // Down
        } else if (e.keyCode === 37 && snake.direction !== 0) {
            snake.direction = 1; // Left
        } else if (e.keyCode === 39 && snake.direction !== 1) {
            snake.direction = 0; // Right
        }
    });
}
    */