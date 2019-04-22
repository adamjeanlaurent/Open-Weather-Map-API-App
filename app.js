const express = require('express');
const port = 3000;
const request = require('request');
const bodyParser = require('body-parser');
const app = express();
const apiKey = "f06d69d89a74e576af8825f26319c6c8";

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){

    var options = {
        url: "http://api.openweathermap.org/data/2.5/weather?zip=02919,us&units=imperial&appid=" + apiKey,
        method: "POST"
    }


    request(options,function(error,response,body){
        if(error){
            console.log(respnose.statusCode);
        }
        if(!error){
        var data = JSON.parse(body);
        console.log("It Is Currently " + data.main.temp +" Degrees Fahrenheit!");
        }
    });
});


app.listen(port,function(){
    console.log("Server Running On Port " + port);
});

//api key for weather f06d69d89a74e576af8825f26319c6c8
//api key  for youtube api AIzaSyDrleh-H310BeSbiMZ5lem4L_o3XZ4LYHI