const express = require("express");
const cors = require("cors");

const server = express();

const { RouterCharacter } = require("./routes/character");
const { RouterUser } = require("./routes/user");
const { RouterFav } = require("./routes/favorito");
const { RouterLogin } = require("./routes/login");

server.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
server.use(express.json());

server.use("/rickandmorty/character", RouterCharacter);
server.use("/rickandmorty/user", RouterUser);
server.use("/rickandmorty/favorito", RouterFav);
server.use("/rickandmorty", RouterLogin);

module.exports = server;
