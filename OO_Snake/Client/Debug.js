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
            speed += 1; 
        } else if ((e.keyCode === 109 || e.keyCode === 189) && speed > 2) { // -
            speed -= 1; 
        }
        if(e.keyCode === 53) { // 5
            snakes[0].addSegment(1);
        }
    /*} else {
        
        return;
    }*/
}