const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const zipCodes = require('zipcodes');
const unixTime = require('./public/unixFunctions.js');
const app = express();
const apiKey = "f06d69d89a74e576af8825f26319c6c8";
const port = 3000;

// Arrays For The Temperatures Of The Next 3 Days
let firstDayTemps = [];
let secondDayTemps = [];
let thirdDayTemps = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");      

app.get("/", function(req,res){
    res.render("index", {wrongZip: false});
});

app.post("/",function(req,res){     
    // Check To See If The User Inputed Zip-Code is Valid
    let zipCode = zipCodes.lookup(req.body.zipcode);
        if(zipCode === undefined){
            return res.render("index", {wrongZip: true});
    }
    let options = {
        url: `https://api.openweathermap.org/data/2.5/forecast?zip=${req.body.zipcode},us&units=Imperial&appid=` + apiKey,
        method: "POST"
    }
    // Makes API Call To openweathermap's API
    request(options,function(error,response,body){
        // Sends The User Back To The Index Page If There Is An Error With The API Response
        if(error){
            console.log(respnose.statusCode);
            return res.render("index", {wrongZip: false});
        }
        if(!error){
            let data = JSON.parse(body);
            for(let i = 0; i < data.list.length; i++){
                /* Because The API's Response Is Different Depending On The Time Of The Call, 
                This Loops Finds When The Day After The Current Day Starts
                */
                if(unixTime.convertUnixToAMPM(data.list[i].dt) === '11:00 PM'){
                    var startIndex = i + 1;
                    break;
                }
            }
            // Storing The Temperatures Of The Next Three Days
            for(let i = 0; i < 8; i++){
                firstDayTemps.push(data.list[startIndex + i].main.temp);
            }

            for(let i = 0; i < 8; i++){
                secondDayTemps.push(data.list[startIndex + i + 8].main.temp);
            }

            for(let i = 0; i < 8; i++){
                thirdDayTemps.push(data.list[startIndex + i + 16].main.temp);
            }

            // Gets The Date Of Current And Following Three Days
            let currentDate = unixTime.convertUnixToDayMonth(data.list[0].dt);
            let firstDayDate = unixTime.convertUnixToDayMonth(data.list[startIndex].dt);
            let secondDayDate = unixTime.convertUnixToDayMonth(data.list[startIndex + 8].dt);
            let thirdDayDate = unixTime.convertUnixToDayMonth(data.list[startIndex + 16].dt);

            // Renders With Data For EJS
            res.render("dashboard", {firstDayTemps: firstDayTemps, 
                secondDayTemps: secondDayTemps, 
                thirdDayTemps: thirdDayTemps,
                currentTemp: data.list[0].main.temp,
                currentDate: currentDate,
                currentDesc: data.list[0].weather[0].description,
                firstDayDate: firstDayDate,
                secondDayDate: secondDayDate,
                thirdDayDate: thirdDayDate,
                cityName: data.city.name
            });
        }

    });
});

app.listen(port,function(){ 
    console.log("Server Running On Port " + port);
});

//api key for weather f06d69d89a74e576af8825f26319c6c8

//https://api.openweathermap.org/data/2.5/forecast?zip=02919,us&units=imperia&appid=f06d69d89a74e576af8825f26319c6c8
//forecast api call



