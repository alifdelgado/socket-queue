const socket = io();
const lblNuevoTicket = document.getElementById("lblNuevoTicket");
const btnNewTicket = document.getElementById("btn-new-ticket");

socket.on("connect", () => {
  btnNewTicket.disabled = false;
});

socket.on("disconnect", () => {
  btnNewTicket.disabled = true;
});

socket.on("server:last-ticket", (last) => {
  lblNuevoTicket.innerText = last;
});

btnNewTicket.addEventListener("click", () => {
  socket.emit("client:send-message", null, (ticket) => {
    lblNuevoTicket.innerText = ticket;
  });
});
