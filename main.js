const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";

// these two lines are used for available require 
// and import both in same file
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const axios = require("axios");
import * as fs from "fs";
// import * as path from "path";
import jsdom from 'jsdom';
import customizeData from './dataIntoJSON.mjs';

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

function withdrawInfo(document){
    let totalMatchCards = document.querySelectorAll("div.match-info.match-info-FIXTURES");

    setProperties(totalMatchCards);
}

let allMatchesInfo = [];

function setProperties(cards){

    for(let i = 0; i < cards.length; i++){

        let property = {};

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
    console.log(allMatchesInfo.length);
    let dataInJson = JSON.stringify(allMatchesInfo);
    fs.writeFile('Raw-Data.json', dataInJson, {encoding: "utf-8"}, (err) => {
        if(err) throw err;
    })
    // console.log("Done");
}

customizeData();