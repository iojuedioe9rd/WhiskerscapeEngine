import express from "express"

import dotenv from "dotenv"

import v from "../pathHTML"

var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");
import path from "path"


const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
})
dotenv.config();



const app = express();
const port = 8080;

app.use(connectLiveReload());
app.use(express.static(path.join(v, "../")));


app.get('/', (req, res) => {
  res.sendFile(v)
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
