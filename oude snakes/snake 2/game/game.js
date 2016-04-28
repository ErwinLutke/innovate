
var socket = io.connect('/display');

//listen for the 'somthing' event from the server
socket.on('message', function (data) {
  console.log(data);
});

// //send the 'somthing' event to the server
// socket.emit('something', function (data) {
//   //code
// });

function Snake(clientid) {
  this.length = 1;
  this.id = clientid;   
  this.ballX=70;
  this.ballY=75;
  this.ballRadius=15;
  this.speed = 5;
  this.color = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
};

var players = [];
var snakes = [];
var maxPlayers = 4;

function addUser(user) {
  var id = players.indexOf(null);
  if (id > -1) {
    // found an empty slot - use that
    players[id] = user;
    return id;
  } else {
    // no empty slots found, add to the end and return the index
    players.push(user);
    return players.length - 1;
  }
}

function removeUser(id) {
  players[id] = null;
}    

socket.on('playerNew', function (data) {
  if (players.length < maxPlayers) {
    var index = addUser(data.id);
    snakes[index] = new Snake(data.id);
    console.log('Player: ' + index + ' has entered. ' + data.id);
  } 
}); 

socket.on('playerLeft', function (data) {
  var index = players.indexOf(data.id)
  removeUser(index);
  snakes[index] = null;
});

var canvas = document.getElementById('mycanvas');  
var ctx = canvas.getContext('2d');  

function draw(){
  
  console.log('frame clear');
  // clear the canvas for the next frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < snakes.length; i++) {
    if(snakes[i] != null){
      ctx.beginPath();
      ctx.arc(snakes[i].ballX,snakes[i].ballY,snakes[i].ballRadius,0,Math.PI*2,false);
      ctx.closePath();
      ctx.fillStyle = snakes[i].color;
      ctx.fill();
    }
  }
  socket.emit('updateGameState', {snakeState: snakes, playerState: players});
}   

socket.on('updateStates', function(data) {
    players = data.playerState;
    snakes = data.snakeState;
});

//input
socket.on('up', function (clientID) {
  console.log(clientID + ' has pressed up');
  var index = players.indexOf(clientID);
  snakes[index].ballY -= snakes[index].speed;
  console.log(snakes[index].ballY);
  draw();
});
socket.on('down', function (clientID) {
  console.log(clientID + ' has pressed up');
  var index = players.indexOf(clientID);
  snakes[index].ballY += snakes[index].speed;
  console.log(snakes[index].ballY);
  draw();
});
  socket.on('left', function (clientID) {
  console.log(clientID + ' has pressed up');
  var index = players.indexOf(clientID);
  snakes[index].ballX -= snakes[index].speed;
  console.log(snakes[index].ballY);
  draw();
});
  socket.on('right', function (clientID) {
  console.log(clientID + ' has pressed up');
  var index = players.indexOf(clientID);
  snakes[index].ballX += snakes[index].speed;
  console.log(snakes[index].ballY);
  draw();
});