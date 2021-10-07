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

    // for(let i = 0; i < cards.length; i++){
        let venueAndDate = cards[0].querySelector(".description").textContent;
        property.venue = venueAndDate.split(",")[1].trim();
        property.dt = venueAndDate.split(",")[2].trim();
        console.log(property.venue);
        console.log(property.dt);

        let teams = cards[0].querySelectorAll(".teams p.name");
        property.team1 = teams[0].textContent;
        property.team2 = teams[1].textContent;
        console.log(property.team1);
        console.log(property.team2);

        let status = cards[0].querySelector("div.status-text span");
        property.result = status.textContent;
        console.log(property.result);
        // console.log(status.textContent);

        allMatchesInfo.push(property);
    // }

    console.log(allMatchesInfo);
}