import Server from "./models/server.js";

const server = new Server();

const main = () => {
  server.listen();
};

main();
