
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const xl = require("excel4node");
const fs = require("fs");
let wb = new xl.Workbook();

function insertData(){
    fs.readFile("./teams.json", "utf-8", function(err, data){
        if(err)
            throw err;

        let teams = JSON.parse(data);
        for(let i = 0; i < teams.length; i++){
            let ws = wb.addWorksheet(teams[i].name);
            let teamInfo = teams[i];
            insertHelper(ws, teamInfo);
        }

        wb.write("cric-info.csv");
        console.log("Added Successfully");
    });
}

insertData();

function insertHelper(ws, teamInfo){

    ws.cell(1, 1).string("Venue");
    ws.cell(1, 2).string("Opponent");
    ws.cell(1, 3).string("Our Score");
    ws.cell(1, 4).string("Opp Score");
    ws.cell(1, 5).string("Status");

    for(let i = 0; i < teamInfo.matches.length; i++){

        let obj = teamInfo.matches[i];
        ws.cell(3+i,1).string(obj.venue);
        ws.cell(3+i,2).string(obj.opponent);
        ws.cell(3+i,3).string(obj.itsScore);
        ws.cell(3+i,4).string(obj.oppScore);
        ws.cell(3+i,5).string(obj.result);

    }
}
