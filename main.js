const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";

const axios = require("axios").default;
const fs = require("fs");
const path = require("path");
// let jsdom = require("jsdom").jsdom;

let responsePromise = axios.get(url);

responsePromise.then(function(response){
    console.log(response.data);
}).then(function(error){
    console.log("Encountered with an error");
})


