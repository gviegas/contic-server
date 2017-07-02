//
// Created by Gustavo Viegas on 2017/06
//

const EventEmitter = require('events');
const net = require('net');
const da = require('./DataAccess').DataAccess;

class Feed extends EventEmitter {
  constructor(addr) {
    super();
    this.addr = addr;
    this.server = null;
    this.init();
  }

  init() {
    da.on('ready', () => {
      console.log('Ready on Feed');
      this.startServer();
    });
  }

  startServer() {
    this.server = net.createServer((c) => {
      console.log('New connection from', c.address());
      c.on('data', (data) => {
        console.log('Got data:', data);
      });
      c.on('end', () => {
        console.log('Client disconnected');
      });
    }).on('error', (err) => { throw err; });

    this.server.listen(this.addr.port, this.addr.host, () => {
      console.log('Listening on', this.server.address());
    });
  }
}

new Feed({'host': 'localhost', 'port': 45313});
