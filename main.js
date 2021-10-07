const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";

const axios = require("axios").default;
const fs = require("fs");
const path = require("path");
const jsdom = require("jsdom");

let responsePromise = axios.get(url);

responsePromise.then(function(response){

    let html = response.data;
    let DOM = new jsdom.JSDOM(html);
    let document = DOM.window.document;
    withdrawInfo(document);

}).catch(function(error){
    console.log(error);
    console.log("Encountered with an error");
})

let allMatchesInfo = [];

function withdrawInfo(document){
    let totalMatchCards = document.querySelectorAll("div.match-info.match-info-FIXTURES");

    let matchProperties = {
    }
    setProperties(matchProperties, totalMatchCards);
}

function setProperties(property, cards){

    for(let i = 0; i < cards.length; i++){
        let venueAndDate = cards[i].querySelector(".description").textContent;
        property.venue = venueAndDate.split(",")[1].trim();
        property.dt = venueAndDate.split(",")[2].trim();

        let teams = cards[i].querySelectorAll(".teams p.name");
        property.team1 = teams[0].textContent;
        property.team2 = teams[1].textContent;

        let status = cards[i].querySelector("div.status-text span");
        property.result = status.textContent;

        let scores = cards[i].querySelectorAll(".teams .score");
        property.t1Score = scores[0].textContent;
        property.t2Score = scores[1].textContent;
        allMatchesInfo.push(property);
    }
    // console.log(allMatchesInfo);
    let dataInJson = JSON.stringify(allMatchesInfo);
    fs.writeFile('Raw-Data.json', dataInJson, {encoding: "utf-8"}, (err) => {
        if(err)
            console.log(err);
        else{
            console.log("File written successfully");
        }
    })
    // console.log("Done");
}