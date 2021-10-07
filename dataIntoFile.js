
const fs = require("fs");

let teams = [];
fs.readFile("./Raw-Data.json", "utf-8", function(err, data){
    if(err) throw err;
    let parsed = JSON.parse(data);
    putAllTeams(parsed);
})

let teamsArray = [];

function putAllTeams(processedJSON){

    for(let i = 0; i < processedJSON.length; i++){
        let matchesCard = processedJSON[i];
        let t = matchesCard.team1;
        if(teamsArray.includes(t)){
            // console.log(t);
        } else {

    console.log(teamsArray);
    // console.log(teamsArray.length);
    for (let keys in teamsArray.keys()){
        console.log(keys);
    }
}