
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const xl = require("excel4node");
const fs = require("fs");
let wb = new xl.Workbook();
let header = wb.createStyle({
    font: {
      bold: true,
	  name: 'Times New Roman',
      size: 14
    },
    alignment: {
      wrapText: true,
      horizontal: 'center',
    },
  });

  let content = wb.createStyle({
	font : {
		size : 14,
		name : 'Sans serif'
	}
});

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

function insertHelper(ws, teamInfo){

    ws.cell(1, 1).string("VENUE").style(header);
    ws.cell(1, 2).string("OPPONENT").style(header);
    ws.cell(1, 3).string("OUR SCORE").style(header);
    ws.cell(1, 4).string("OPP SCORE").style(header);
    ws.cell(1, 5).string("STATUS").style(header);
	ws.column(1).setWidth(20);
	ws.column(2).setWidth(30);

    for(let i = 0; i < teamInfo.matches.length; i++){

        let obj = teamInfo.matches[i];
        ws.cell(3+i,1).string(obj.venue).style(content);
        ws.cell(3+i,2).string(obj.opponent).style(content);
        ws.cell(3+i,3).string(obj.itsScore).style(content);
        ws.cell(3+i,4).string(obj.oppScore).style(content);
        ws.cell(3+i,5).string(obj.result).style(content);
    }
}

export default insertData;