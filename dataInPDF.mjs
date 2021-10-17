import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdf = require("pdf-lib");
const fs = require("fs");
const path = require("path");


// Directories
let __dirname = process.cwd();
let currPath = path.join(__dirname, 'Matches');
creatingDirectories();
function creatingDirectories(){
    if(fs.existsSync(currPath) == false){
        fs.mkdir(currPath, (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('Directory created successfully!');
        });
    }
    fs.readFile('./teams.json', 'utf-8', function(err, data){
        if(err) throw err;
        let jsoData = JSON.parse(data);

        for(let i = 0; i < jsoData.length; i++){
            let reqPath = path.join(currPath, jsoData[i].name);
            if(fs.existsSync(reqPath) == false){
                fs.mkdirSync(reqPath);
            }
        }
        creatingPDF(jsoData);
    });
}

function creatingPDF(jsoData){
    let templateBytes = fs.readFileSync("Template.pdf");
    for(let i = 0; i < jsoData.length; i++){
        let reqPath = path.join(currPath, jsoData[i].name);
        for(let j = 0; j < jsoData[i].matches.length; j++){
            let promise = pdf.PDFDocument.load(templateBytes);
            promise.then(function(pdfDoc){
                let page = pdfDoc.getPage(0);
                let TeamName = jsoData[i].name;
                let match = jsoData[i].matches[j];
                page.drawText(TeamName, {
                    x: 320,
                    y: 668,
                    size: 18,
                });
                page.drawText(match.opponent, {
                    x: 45,
                    y: 537,
                    size: 18,
                });
                page.drawText(match.itsScore, {
                    x: 300,
                    y: 537,
                    size: 18,
                });
                page.drawText(match.oppScore, {
                    x: 480,
                    y: 537,
                    size: 18,
                });
                page.drawText(match.result, {
                    x: 180,
                    y: 439,
                    size: 16,
                });
                let promisetoSave = pdfDoc.save();
                promisetoSave.then(function(newBytes){
                    fs.writeFileSync(path.join(reqPath, jsoData[i].matches[j].opponent + '.pdf'), newBytes);
                });
            });

        }
    }
}


