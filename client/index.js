const recordAudio = () =>
    new Promise(async resolve => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks = [];

        mediaRecorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data);
        });

        const start = () => mediaRecorder.start();

        const stop = () =>
            new Promise(resolve => {
                mediaRecorder.addEventListener("stop", () => {
                    const audioBlob = new Blob(audioChunks);
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const audio = new Audio(audioUrl);
                    const play = () => audio.play();
                    resolve({ audioBlob, audioUrl, play });
                });

                mediaRecorder.stop();
            });

        resolve({ start, stop });
    });

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

const handleAction = async () => {
    const recorder = await recordAudio();
    const actionButton = document.getElementById('action');
    actionButton.disabled = true;
    recorder.start();
    await sleep(3000);
    const audio = await recorder.stop();
    audio.play();
    await sleep(3000);
    actionButton.disabled = false;

    const request = require('request');

    request.post(
        'https://sudo-server-music.glitch.me/new_note',
        { json: { todo:  'hello world'} },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }
    );
}

// audio and timestamp send
//Date.now() + 'audio' + Date.now()
// var request = require('request');
//
// request.post(
//     'https://sudo-server-music.glitch.me/new_note',
//     { json: { todo:  'hello world'} },
//     function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//             console.log(body);
//         }
//     }
// );

// const express = require("express");
// const bodyParser = require("body-parser");
// const app = express();
// const fs = require("fs");
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
//
// fetch("/new_note", {
//     method: "POST",
//     body: "helloooo",
//     //headers: { "Content-Type": "application/json" },
//     url: "https://sudo-server-music.glitch.me/new_note"
// })
//     .then(res => res.json())
//     .then(response => {
//         console.log(JSON.stringify(response));
//     });
// // get dream value and add it to the list
// dreams.push(dreamInput.value);
// appendNewDream(dreamInput.value);
//
// // reset form
// dreamInput.value = "";
// dreamInput.focus();
//};

// const axios = require('axios')
//
// axios.post('https://sudo-server-music.glitch.me/new_note', {
//     todo: 'Buy the milk'
// })
//     .then((res) => {
//         console.log(`statusCode: ${res.statusCode}`)
//         console.log(res)
//     })
//     .catch((error) => {
//         console.error(error)
//     })