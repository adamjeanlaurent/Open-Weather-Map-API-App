const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const zipCodes = require('zipcodes');
const port = 3000;
const app = express();
const apiKey = "f06d69d89a74e576af8825f26319c6c8";

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");      

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){     
    let zipCode = zipCodes.lookup(req.body.zipcode);
        if(zipCode === undefined){
            return res.redirect("/");
    }
    let options = {
        url: `http://api.openweathermap.org/data/2.5/weather?zip=${req.body.zipcode},us&units=imperial&appid=` + apiKey,
        method: "POST"
    }

    request(options,function(error,response,body){
        if(error){
            console.log(respnose.statusCode);
        }
        if(!error){
            let data = JSON.parse(body);
            console.log("It Is Currently " + data.main.temp +" Degrees Fahrenheit!");
        }
    });
});

app.listen(port,function(){
    console.log("Server Running On Port " + port);
});

//api key for weather f06d69d89a74e576af8825f26319c6c8
//api key  for youtube api AIzaSyDrleh-H310BeSbiMZ5lem4L_o3XZ4LYHI


//https://api.openweathermap.org/data/2.5/forecast?zip=02919&appid=f06d69d89a74e576af8825f26319c6c8
//forecast api call