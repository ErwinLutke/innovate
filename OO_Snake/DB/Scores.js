
var fs = require('fs');
var obj;
var player = { Naam: "henk", Score: 2, Nummer: "0612345678" };


exports.ReadJson = function(file){
    obj = JSON.parse(fs.readFileSync(file, 'utf8'));
}

function write(){
    var jsonInput = JSON.stringify(obj, null, 2);
    fs.writeFile('score.json', jsonInput, 'utf8', function(err) {
        if(err) {
            console.log(err);
        }
    });
}

function updateScore(playerToUpdate){
    if(player.Score > obj.Player1.Score){
        obj.Player3 = obj.Player2;
        obj.Player2 = obj.Player1;
        obj.Player1 = playerToUpdate;
    }
    else if(player.Score > obj.Player2.Score || player.Score == obj.Player1.Score){
        obj.Player3 = obj.Player2;
        obj.Player2 = playerToUpdate;
    }
    else if(player.Score > obj.Player3.Score || player.Score == obj.Player2.Score){
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

exports.isInTop3 = function(playerInTop3){
    if(player.score > obj.Player3.Score){
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









