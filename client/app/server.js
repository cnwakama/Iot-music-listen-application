// server.js
// where your node app starts

// init project
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var socket = require("socket.io");
const fs = require("fs");
const {getAudioDurationInSeconds} = require("get-audio-duration");
const tf = require('@tensorflow/tfjs');
const speechCommands = require('@tensorflow-models/speech-commands');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});

var io = socket(listener);

io.on("connection", function(socket) {
    console.log("server got a new connection");
    socket.on("time", function(data){  
      if (!data.note){
        data.note = 'Null';
      }
      else {
        data.note = data.note.split(" ")[1];
      }
      console.log(data.note);
      
      //processing
      socket.broadcast.emit('results', data);//note being sent out here, could be a JSON object
    });
  socket.on("join", function(data){
    console.log("Device: " + data);
    socket.broadcast.emit('return', "I got your message " + data);
  });
  socket.on("response", function(data){
    console.log("Device: " + data);
  });
});