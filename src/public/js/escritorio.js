const socket = io();
const searchParams = new URLSearchParams(window.location.search);
const desk = searchParams.get("desk");
const deskTitle = document.getElementById("desk-title");
const btnAttendTicket = document.getElementById("btn-attend-ticket");
const labelAttended = document.getElementById("label-attended");
const alert = document.getElementsByClassName("alert")[0];

if (!searchParams.has("desk")) {
  window.location = "index.html";
  throw new Error("desk is required");
}

deskTitle.innerText = desk;
alert.style.display = "none";

socket.on("connect", () => {
  btnAttendTicket.disabled = false;
});

socket.on("disconnect", () => {
  btnAttendTicket.disabled = true;
});

btnAttendTicket.addEventListener("click", () => {
  socket.emit("client:attend-ticket", { desk }, ({ ok, ticket, msg }) => {
    if (!ok) {
      deskTitle.innerText = "Nobody";
      alert.style.display = "";
      return;
    }
    deskTitle.innerText = "Ticket " + ticket.number;
  });
  // socket.emit("client:next-ticket");
});
