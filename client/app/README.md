# Music Listen IoT – Server and Client

## Overview

This is nodejs application that listen to music and send info throughout socket io package to local database and android app.

### Client

- listen to sound for note
- classifies note using teachable machine audio
- sends infomation (audio recording and classified note)

### Server

- receives info from client
- receives other connects from socket io and communicate infomation throughout the small secure environment

### Packages

- @tensorflow-models/speech-commands
- @tensorflow/tfjs
- body-parser
- bufferutil
- express
- socket.io

## Made by [Glitch](https://glitch.com/)

\ ゜ o ゜)ノ
