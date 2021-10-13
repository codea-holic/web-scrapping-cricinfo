import * as fs from 'fs';

let teams = [];

function customizeData(){
    fs.readFile("./Raw-Data.json", "utf-8", function(err, data){
        if(err) throw err;
        let parsed = JSON.parse(data);
        putAllTeams(parsed);
        putMatchesTeamsWise(parsed);
    })
}

let teamsArray = [];

function putAllTeams(processedJSON){

    for(let i = 0; i < processedJSON.length; i++){
        let matchesCard = processedJSON[i];
        let teamName = matchesCard.team1;
        if(ifexists(teamName) == -1){
            let teamObj = {
                name : teamName,
                matches : []
            }
            teamsArray.push(teamObj);
        }
    }
}

function ifexists(teamName){

    for(let i = 0; i < teamsArray.length; i++){
        if(teamsArray[i].name == teamName){
            return i;
        }
    }
    return -1;
}

function putMatchesTeamsWise(parsedJSON){

    for(let i = 0; i < parsedJSON.length; i++){
        let tm1 = parsedJSON[i].team1;
        let vs = parsedJSON[i].team2;
        let dt = parsedJSON[i].date;
        let vnu = parsedJSON[i].venue;
        let t1Score = parsedJSON[i].t1Score;
        let t2Score = parsedJSON[i].t2Score;
        let status = parsedJSON[i].result.split("(")[0];

        let matchDetails = {
            date : dt,
            venue : vnu,
            opponent : vs,
            itsScore : t1Score,
            oppScore : t2Score,
            result : status
        }
        
        let idx = ifexists(tm1);    // Already exists because of above functions
        teamsArray[idx].matches.push(matchDetails);
        
        let tm2 = parsedJSON[i].team2;
        let opp = parsedJSON[i].team1;

        let matchDetail = {
            date : dt,
            venue : vnu,
            opponent : opp,
            itsScore : t2Score,
            oppScore : t1Score,
            result : status
        }

        idx = ifexists(tm2);
        teamsArray[idx].matches.push(matchDetail);
    }

    dataInFiles();
}

function dataInFiles(){
    let strData = JSON.stringify(teamsArray);
    fs.writeFile("teams.json", strData, "utf-8", (err) => {
        if(err) throw err;
        else {
            console.log("Data written Successfully");
        }
    });
}

export default customizeData;