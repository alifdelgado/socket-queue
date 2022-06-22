import Control from "../models/ticket.js";
const control = new Control();

class SocketController {
  connect(socket) {
    socket.emit("server:last-ticket", control.last);
    socket.on("client:send-message", (data, callback) => {
      const next = control.next();
      callback(next);
      // TODO: Notify about new ticket
    });
    socket.on("client:attend-ticket", ({ desk }, callback) => {
      if (!desk) return callback({ ok: false, msg: "The desk is required" });
      const ticket = control.attendTicket(desk);
      // TODO: Notify change on last fourth
      if (!ticket) {
        return callback({ ok: false, msg: "No tickets pending" });
      }
      return callback({ ok: true, ticket });
    });
  }
}

export default SocketController;
