//var readJSON = "{ Player1: [ naam: henk, score: 2] }";

//var scoreArray = JSON.parse(readJSON);

// scoreArray.speler1[naam] == henk

/*function WriteToJson(username, score, cellNumber){
    
    if(score => scoreArray.speler1[score] ){
        //schrijf cell mee
        
    }
}
*/

var scoreToInput = 500;

var fs = require('fs');

//  http://stackoverflow.com/questions/5726729/how-to-parse-json-using-node-js
fs.readFile('score.json', 'utf8', function (err, data) {
    if (err) throw err;
    var obj = JSON.parse(data);
    
    console.log(obj);
});
