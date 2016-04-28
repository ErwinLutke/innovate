var socketio = require('socket.io');

// requires server to listen on
module.exports = function(server){
    var io = socketio(server);
    
    var nspDisplay = io.of('/display');
    var nspClient = io.of('/client');
    
    var players = [];
    var snakes = [];
    
    // Display connections and input    
    nspDisplay.on('connection', function (display) {
        console.log('\t nspDisplay.io:: host ' + display.id + ' Connected');
        display.emit('message', 'yes you are connected ' + display.id);
        display.emit('updateStates', {snakeState: snakes, playerState: players});
        
        display.on('updateGameState', function(data) {
            players = data.playerState;
            snakes = data.snakeState;
            display.emit('updateStates', {snakeState: snakes, playerState: players});
        });
        
        display.on('disconnect', function () {
            console.log('\t nspDisplay.io:: host ' + display.id + ' Disconnected');
        });
    });
    

    // Client connections and input
    nspClient.on('connection', function (client) {
        console.log('\t nspClient.io:: new client ' + client.id);
        nspDisplay.emit('playerNew', {id: client.id});
        // nspDisplay.on('playerID', function (data) {
        //     nspDisplay.emit('up', client.id);
        // });
        
        // INPUT HANDLING
        client.on('up', function () {
            nspDisplay.emit('up', client.id);
        });
        client.on('down', function () {
            nspDisplay.emit('down', client.id);
        });   
        client.on('left', function () {
            nspDisplay.emit('left', client.id);
        });   
        client.on('right', function () {
            nspDisplay.emit('right', client.id);
        });     
        // END INPUT HANDLING
        
        client.on('disconnect', function () {
            nspDisplay.emit('playerLeft', {id: client.id});
            console.log('\t nspClient.io:: disconnected client ' + client.id);
        }); // end disconnect
    }); // end connection
    
    return io;
}