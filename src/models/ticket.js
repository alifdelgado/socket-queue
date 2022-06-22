import { dirname, join } from "path";
import * as url from "url";
import * as fs from "fs";

class Ticket {
  constructor(number, desk) {
    this.number = number;
    this.desk = desk;
  }
}

class Control {
  constructor() {
    this.last = 0;
    this.today = new Date().getDate();
    this.tickets = [];
    this.lastFour = [];
    this.dbPath = join(
      dirname(url.fileURLToPath(import.meta.url)),
      "../db/data.json"
    );

    this.init();
  }

  get toJson() {
    return {
      last: this.last,
      today: this.today,
      tickets: this.tickets,
      lastFour: this.lastFour,
    };
  }

  init() {
    const { today, tickets, last, lastFour } = JSON.parse(
      fs.readFileSync(this.dbPath, {
        encoding: "utf-8",
      })
    );
    if (today === this.today) {
      this.last = last;
      this.today = today;
      this.tickets = tickets;
      this.lastFour = lastFour;
    } else {
      this.saveDB();
    }
  }

  saveDB() {
    fs.writeFileSync(this.dbPath, JSON.stringify(this.toJson));
  }

  next() {
    this.last += 1;
    const ticket = new Ticket(this.last, null);
    this.tickets.push(ticket);
    this.saveDB();
    return `Ticket ${ticket.number}`;
  }

  attendTicket(desk) {
    if (!this.tickets.length) return null;

    const ticket = this.tickets.shift();
    ticket.desk = desk;
    this.lastFour.unshift(ticket);
    if (this.lastFour.length >= 4) {
      this.lastFour.splice(-1, 1);
    }
    this.saveDB();
    return ticket;
  }
}

export default Control;
