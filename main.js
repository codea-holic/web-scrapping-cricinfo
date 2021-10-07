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
    let title = document.querySelector("title").textContent;
    console.log(title);

}).catch(function(error){
    
    console.log("Encountered with an error");
})


