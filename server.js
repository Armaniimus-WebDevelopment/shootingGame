const WebSocket = require("ws");
const wss = new WebSocket.Server({port: 8080});
const express = require('express');
const app = express();
const PORT = 3000;

class Game {
  constructor(hash) {
    this.hash = hash;
    this.players = [];
    this.zombies = [];
    this.bullets = [];
  }
}

const games = {}; // contains all the games

app.use(express.static('client'));

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}!`);
});

wss.on('connection', (ws, req) => {
  console.log(req.connection.remoteAddress);
  ws.on('message', (message) => {
    message = JSON.parse(message);
    switch (message.type) {
      case "hash":
        connect(message.hash);
        break;
      default:

    }
  });

  ws.on("close", () => {
    console.log("connection closed!");
    disconnect();
  });
});

// connects a player to a game
function connect(hash) {
  if (games[hash]) {
    console.log("add player to the game!");
  } else {
    console.log("create a game!");
    console.log(hash);
    games[hash] = new Game(hash);
  }
}

function disconnect() {

}
