import cors from "cors";
import * as url from "url";
import morgan from "morgan";
import express from "express";
import { dirname, join } from "path";
import { createServer } from "http";
import { Server as socketIO } from "socket.io";
import SocketController from "../controllers/socket.controller.js";
const socketController = new SocketController();

class Server {
  constructor() {
    this.app = express();
    this.port = 3000;
    this.server = createServer(this.app);
    this.io = new socketIO(this.server);
    this.middlewares();
    this.routes();
    this.sockets();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(
      express.static(
        join(dirname(url.fileURLToPath(import.meta.url)), "../public")
      )
    );
  }

  routes() {
    // this.app.get("/", (req, res) => {});
  }

  listen() {
    this.server.listen(this.port);
  }

  sockets() {
    this.io.on("connection", socketController.connect);
  }
}

export default Server;
