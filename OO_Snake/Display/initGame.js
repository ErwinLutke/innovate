// http://jsfiddle.net/straker/bLBjn/
        // sounds.load([
        //   "../Client/lib/sounds/explosion.wav", 
        //   "../Client/lib/sounds/music.wav",
        // ]);
        
        // sounds.whenLoaded = setup;
        
        // var explosion;
        
        // function setup() {
        //   console.log("sounds loaded");
        
        //   //Create the sounds
        //   explosion = sounds["../Client/lib/sounds/explosion.wav"];
        //   //no music oke
          
        //   // hahahahaaaa, drives you craaaazy
        //   /*
        // var music = sounds["../Client/lib/sounds/music.wav"]; 
              
        //   music.loop = true;
        //   music.volume = 0.7; 
        //   music.play();
        //   */
        // }
        
        // function sfxEat() {
        //   soundEffect(
        //     523.25,       //frequency
        //     0.05,         //attack
        //     0.2,          //decay
        //     "sine",       //waveform
        //     1,            //volume
        //     0.8,          //pan
        //     0,            //wait before playing
        //     600,          //pitch bend amount
        //     true,         //reverse
        //     100,          //random pitch range
        //     0,            //dissonance
        //     undefined,    //echo: [delay, feedback, filter]
        //     undefined     //reverb: [duration, decay, reverse?]
        //   );
        // }
        
//initialiseer de objecten
// add socket for multiplayer: var game = new Game(socket);
var game = new Game();
game.loop();


//vierkantje voor spawnpoint
/*for(var i = 1; i < 5; i++) {
    for(var j = 1; j < 5; j++) {
        game.renderer.drawCell({x:i,y:j}, "red", "bg");
    }
}*/
// var newFood = [];

// var snakesToRemove = [];
// var tempSnakes = [];

// var snakeFood = [];
// // // hou de snakeobjecten bij
// var snakes = [];

// //hou AI snakes bij
// var AIs = [];
// var AIsToRemove = [];

// // var popperCount = 0;
// // @str = array met snake objecten
// function removeSnake(str) {
//     if(str.length > 0) {
//         for (var i = 0; i < str.length; i++) {
//             var pos = snakeByClientId(str[i].clientID);
//             if(pos !== false) {
//                 var rsnake = snakes[pos];
//                 var id = rsnake.clientID;
//                 tempSnakes.push(rsnake);
//                 snakes.splice(pos, 1);
//                 try {
//         	        socket.emit("spotOpen", id);
//                 } catch (e) { console.log("SP? - could not emit Socket.io: spotOpen" + "\n\rPunten: " + snake.points)}
//             }
//         }
//         snakesToRemove = [];
//     }
//     if (tempSnakes.length > 0) {
//         for (var i = 0; i < tempSnakes.length; i++) {
//             var tsnake = tempSnakes[i];
//             if (tsnake.segments.length > 0) {
               
//                 var delay=1000; //1 second
//                 setTimeout(function() {
//                 // if(popperCount === 5){
//                     tsnake.segments.pop();
//                 //     popperCount = 0;
//                 // }else {
//                 //     popperCount++;
//                 // }
//                 }, delay);
//             } else {
//                 tempSnakes.splice(i, 1);
//             }
//         }
//     }
// }

// function removeAI(AIstoRemove) {
//     for(var i = 0; i < AIsToRemove.length; i++) {
//         snakesToRemove.push(AIsToRemove[i].snake);
//         AIs.splice(i, 1);
//         //console.log("AI removed");
//         addAI();
//     }
//     //console.log(AIsToRemove);
//     AIsToRemove = [];
// }


/*doorwall_brick.onload = function() {
    renderer.drawAnImage({x: 394, y: -84},doorwall_brick);
};*/




//wanneer de server zegt dat iemand joint, wordt deze functie aangeroepen
//functie wordt aangeroepen door com.js (socket.io) data param wordt aut. meegegeven
// function addPlayer(data) {
//     console.log("new player: " + data.id);
//     snakes.push(new Snake(data.id));
//     var snake = snakes[snakes.length - 1];
//     // snake.color = "#1009f2";
//     snake.spawnSnake(1, 1);
//     console.log("snake: " + snakes[0].clientID);
//     console.log("snake: " + snakes[0].color);
// }


// function addAI() {
//     console.log("new AI");
//     var AISnake = new Snake();
//     AISnake.isAI = true;
//     var AI = new RoboSchnake(AISnake, game);
//     snakes.push(AI.snake);
//     AIs.push(AI);
//     //var snake = snakes[snakes.length - 1];
//     // snake.color = "#1009f2";
//     //snake.spawnSnake(6, 6);
//     AI.snake.isAI = true;
//     AI.snake.AIParent = AI;
 
//     console.log("snake AI: " + AI.snake.color);
// }

/*
for (var i = 0;snakes.length <5; i++) {
      if (snakes.length <5)
    {
        addAI();
    }
}
*/

// function addFood() {
//     //snake = snake || null;
//     while (newFood.length < 2) {
//      newFood.push(new Food());
//     }
    
// }



// var rasp = new Image();
// rasp.src = "../Display/img/rasp.png";

// function draw() {
//     game.renderer.clearLayer("fg");
//     //game.renderer.drawCell(food.position, food.color); // = randPosition()
    
//     game.renderer.drawSnakes(snakes);
    
//     game.renderer.ctx_fg.globalAlpha = 0.7;
//     game.renderer.drawSnakes(tempSnakes);
//     game.renderer.ctx_fg.globalAlpha = 1;
    
//      for (var i = 0; i < newFood.length; i++) {
//          game.renderer.ctx_fg.drawImage(
//                         rasp, 
//                         newFood[i].position.x * ( game.cellSize + 1) -4,
//                         newFood[i].position.y * ( game.cellSize + 1) -4,
//                         23,
//                         23
//                     );
//         //  game.renderer.drawCell(newFood[i].position, newFood[i].color); // = randPosition()
//     }
// }

// // var stats = new Stats();
// // stats.showPanel( 1 );
// // document.body.appendChild( stats.dom );

// var last = null;
// var speed = 15;  // FPS
// var interval = 1000 / speed;

// function gameLoop() { 
// // 	stats.begin();
	
//     // assign current time  
//     var now     =   (new Date()).getTime(),     // assign current time  
//         delta   =   (now - last);               // calculate the difference between last and current frame  
      
//     game.draw();  
    
//     if(delta > interval) { 
//         game.update();  
//         // collisionDetect();
        
//         // Lets say we set fps at 10 which means
//         // each frame must take 100ms
//         // Now frame executes in 16ms (60fps) so
//         // the loop iterates 7 times (16*7 = 112ms) until
//         // delta > interval === true
//         // Eventually this lowers down the FPS as
//         // 112*10 = 1120ms (NOT 1000ms).
//         // So we have to get rid of that extra 12ms
//         // by subtracting delta (112) % interval (100).
        
//         // assign last time   
//         last = now - (delta % interval);  
//     } 
//     // stats.end();
    
//     // setTimeout(function() {
//         requestAnimationFrame(gameLoop);
//     // }, 1000 / 10);
// }

// var YOpenWall = 20;
// var YSpace = 10;
// var XOpenWall = game.wGridth / 3;

// // var XSpace = 21 * csIndex;
// // console.log(XSpace);
// var wallLeftUp = new Collision(-1, 0, 0, YOpenWall - 3, "wall left upper half");
// var wallLeftDown = new Collision(-1, YOpenWall + YSpace + 2, 0, game.hGridth , "wall left bottom half");

// var wallRightUp = new Collision(game.wGridth -1, 0, game.wGridth, YOpenWall - 3, "wall right upper half");
// var wallRightDown = new Collision(game.wGridth -1, YOpenWall + YSpace + 2, game.wGridth, game.hGridth, "wall right bottom half");

// var wallTopLeft = new Collision(-1, -1, XOpenWall, 0, "wall top left");
// var wallTopRight = new Collision(Math.round(XOpenWall * 2), -1, game.wGridth, 0, "wall top right");

// var wallBottomLeft = new Collision(0, game.hGridth -1, XOpenWall, game.hGridth, "wall top left");
// var wallBottomRight = new Collision(Math.round(XOpenWall * 2), game.hGridth -1, game.wGridth, game.hGridth, "wall top");

// var collisions = [];
// collisions.push(wallLeftDown);
// collisions.push(wallLeftUp);
// collisions.push(wallRightDown);
// collisions.push(wallRightUp);
// collisions.push(wallTopLeft);
// collisions.push(wallTopRight);
// collisions.push(wallBottomLeft);
// collisions.push(wallBottomRight);

// //Food.randPosition(collisions);

// game.renderer.collisionDraw(collisions);


// function collisionDetect() { 
    
// // Get all snakes that are in the game
//     for(var i = 0; i < snakes.length; i++) {
    
//         wallTopLeft.CollisionWith(snakes[i]);
//         wallTopRight.CollisionWith(snakes[i]);
//         wallRightUp.CollisionWith(snakes[i]);
//         wallRightDown.CollisionWith(snakes[i]);
//         wallBottomRight.CollisionWith(snakes[i]);
//         wallBottomLeft.CollisionWith(snakes[i]);
//         wallLeftDown.CollisionWith(snakes[i]);
//         wallLeftUp.CollisionWith(snakes[i]);
        
//         wallTopLeft.CollisionWith(0,newFood[1]);
//         wallTopRight.CollisionWith(0,newFood[1]);
//         wallRightUp.CollisionWith(0,newFood[1]);
//         wallRightDown.CollisionWith(0,newFood[1]);
//         wallBottomRight.CollisionWith(0,newFood[1]);
//         wallBottomLeft.CollisionWith(0,newFood[1]);
//         wallLeftDown.CollisionWith(0,newFood[1]);
//         wallLeftUp.CollisionWith(0,newFood[1]);
        
//         for (var a = 0; a < newFood.length; a++) {
//           // console.log("newfood pos x="+newFood[a].position.x + "newfood pos y =" + newFood[a].position.y);
//         }
        
//         // Collision with self and other snakes
//         // var es;
//         for(var j = 0; j < snakes.length; j++) {
//             for(var s = 1; s < snakes[j].segments.length; s++) {
//                 // Check if head of snakes colides against any other seg
//                 // es = 0;
//                 // if(i === j) es = 1;
//                 if(snakes[i].segments[0].x == snakes[j].segments[s].x && snakes[i].segments[0].y == snakes[j].segments[s].y ) {
//                     if(snakes[i].isAI == true) {
//                         //console.log("collision AI!!!");
//                         //console.log(snakes[i].AIParent);
//                         AIsToRemove.push(snakes[i].AIParent);
//                     } else {
//                         snakesToRemove.push(snakes[i]);
//                         //console.log("erwin collision: TRUE");
//                         //console.log("Collision met normale snake");
//                     }
//                     //snakesToRemove.push(snakes[i]);
//                     // addSnakeFood(snakes[i]);
//                     explosion.play();
//                     console.log("snake position for removal: " + i);
//                     console.log("behaalde punten" + snakes[i].points)
//                 } 
//             }
//         }
//         /*
        
//             if(newFood[i].position.x == game.sizeX && newFood[i].position.y == game.sizeY){
//             else if ()
//         }
//         */
            
        
        
//         // collision with walls ( openparts )
//         if(snakes[i].segments[0].x >= game.sizeX) snakes[i].segments[0].x = 0;      //collision with canvas wall right
//         else if(snakes[i].segments[0].x <= -1) snakes[i].segments[0].x = game.sizeX - 1; //collision with canvas wall left
//         else if(snakes[i].segments[0].y >= game.sizeY)  snakes[i].segments[0].y = 0;     //collision with canvas wall bottom
//         else if(snakes[i].segments[0].y <= -1) snakes[i].segments[0].y = game.sizeY - 1; //collision with canvas wall top
        
//         //collision with Fruit
//         if (newFood.length >0){
//             for (var a = 0; a < newFood.length; a++) {
//             if(snakes[i].segments[0].x == newFood[a].position.x && snakes[i].segments[0].y == newFood[a].position.y) {
//             snakes[i].totalCaughtFood++;
//             snakes[i].points = snakes[i].length;
//             snakes[i].addSegment(4);
//             newFood.splice(a, 1);
//             addFood();
//             //addNewFood();
//             sfxEat();
//             sendScore(snakes[i]);
//           // console.log("newfood pos x="+newFood[i].position.x + "newfood pos y =" + newFood[i].position.y);
//             console.log("points=" + snakes[i].points);
//                 }       
//             }
//         }

            
//         //collision with snakeFood(snakeFood = fruit dat de snake achterlaat als hij kapot gaat)
//         if(tempSnakes.length > 0) {
//             for(var j = 0; j < tempSnakes.length; j++) {
//                 for(var s = 0; s < tempSnakes[j].segments.length; s++) {
//                     // Check if head of snakes colides against any other seg
//                     if(snakes[i].segments[0].x == tempSnakes[j].segments[s].x && snakes[i].segments[0].y == tempSnakes[j].segments[s].y ) {
//                         console.log("SNAKE FOOD: TRUE");
//                         snakes[i].addSegment(1);
//                         sendScore(snakes[i]);
//                         tempSnakes[j].segments.splice(s, 1);
//                         sfxEat();
//                     } 
//                 }
//             }
//         }
        
//     }
//     // Call function to remove the snakes that have died
//     removeSnake(snakesToRemove);
//     removeAI(AIsToRemove);

// }

// function update() {
//     for (var i = 0; i < snakes.length; i++) {
//         snakes[i].moveSnake();
//     }
//     //try{
//         for (var j = 0; j < AIs.length; j++) {
//             AIs[j].moveAI();
//           // AIs[j].shouldDodge();
//         }
//     //}
//     //catch(e) {
//         //console.log("Asta la vista, Snaky - AI snake not removed from array 'AIs'");
//         //console.log("Error: " + e);
//     //}
// }

// function snakeByClientId(clientSnakeId) {
//     for (var i = 0; i < snakes.length; i++) {
//         if (snakes[i].clientID == clientSnakeId) {
//             return i;
//         }
//     }
//     return false;
// }

// gameLoop();