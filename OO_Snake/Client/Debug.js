//shift --- debug mode

var debugMode = false;
function EnableDebug() {
    if(debugMode === false) {
        debugMode = true;
        window.addEventListener('keydown', Debug);
        //Debug();
    } else {
        debugMode = false;
        removeEventListener('keydown', Debug);
        //Debug();
    }
}

function Debug(e) {
    //if(debugMode === true) {
        //speed
        if(e.keyCode === 107 || e.keyCode === 187) { // +
            game.speed += 1; 
        } else if ((e.keyCode === 109 || e.keyCode === 189) && speed > 2) { // -
            game.speed -= 1; 
        }
        // add a segment
        if(e.keyCode === 53) { // number 5
            game.snakes[0].addSegment(1);
            console.log(game.snakes[0].length)
        }
        
        
        // reverse snake... 
        if(e.keyCode === 88) { // x
            var snake = game.snakes[0];
            var ss = game.snakes[0].segments.length -1;
            if(snake.segments[ss -1].x == snake.segments[ss].x) {
                if(snake.segments[ss -1].y < snake.segments[ss].y) snake.direction = 3;
                else if(snake.segments[ss -1].y > snake.segments[ss].y) snake.direction = 2;   
            }           
            else if(snake.segments[ss -1].y == snake.segments[ss].y) {
                if(snake.segments[ss -1].x < snake.segments[ss].x) snake.direction = 0;
                else if(snake.segments[ss -1].x > snake.segments[ss].x) snake.direction = 1; 
            }
            snake.segments.reverse();
        }
        
        if (e.keyCode === 32) {
            var nplayer = {id:3};
            game.addPlayer({player:nplayer, color:0});
        }
    /*} else {
        
        return;
    }*/
}