
var fs = require('fs');
var obj;
// var player = { Naam: "henk", Score: 2, Nummer: "0612345678" };

exports.readAllScores = function(){
    var scores = JSON.parse(fs.readFileSync('./scores.json', 'utf8'));
    return scores;
};

exports.saveAllScores = function(scores) {
    var jsonInput = JSON.stringify(scores, null, 2);
    fs.writeFile('./scores.json', jsonInput, 'utf8', function(err) {
        if(err) {
            console.log(err);
        }
    });
};

exports.ReadJson = function(){
    obj = JSON.parse(fs.readFileSync('./DB/score.json', 'utf8'));
};

function write(){
    var jsonInput = JSON.stringify(obj, null, 2);
    fs.writeFile('./DB/score.json', jsonInput, 'utf8', function(err) {
        if(err) {
            console.log(err);
        }
    });
}

exports.updateScore = function(playerToUpdate){
    var player3 = obj.Player3;
    var player2 = obj.Player2;
    var player1 = obj.Player1;
    
    if(playerToUpdate.Score > player1.Score){
        obj.Player3 = player2;
        obj.Player2 = player1;
        obj.Player1 = playerToUpdate;
    }
    else if(playerToUpdate.Score > player2.Score || playerToUpdate.Score == player1.Score){
        obj.Player3 = player2;
        obj.Player2 = playerToUpdate;
    }
    else if(playerToUpdate.Score > player3.Score || playerToUpdate.Score == player2.Score){
        obj.Player3 = playerToUpdate;
    }
    write();
}

exports.getScores = function(){
    var highScores = [[obj.Player1.Naam, obj.Player1.Score], [obj.Player2.Naam, obj.Player2.Score], [obj.Player3.Naam, obj.Player3.Score]];
    return highScores;
}

exports.getNummers = function(){
    var playerNummers = [[obj.Player1.Naam, obj.Player1.Nummer], [obj.Player2.Naam, obj.Player2.Nummer], [obj.Player3.Naam, obj.Player3.Nummer]];
    return playerNummers;
}

exports.isInTop3 = function(player){
    if(player.Score > obj.Player3.Score){
        return true;
    }
    else{
        return false;
    }
}


//ReadJson moet zowiezo als eerste worden aangeroepen
//ReadJson();
//isInTop3(player);
//updateScore(player);
//getScores();
//getNummers();









