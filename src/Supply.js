//
// Created by Gustavo Viegas on 2017/06
//

const EventEmitter = require('events');
const http = require('http');
const io = require('socket.io');
const da = require('./DataAccess').DataAccess;

class Supply extends EventEmitter {
  constructor(addr) {
    super();
    this.addr = addr;
    this.server = null;
    this.init();
  }

  init() {
    da.on('ready', () => {
      console.log('Ready on Supply');
      this.startServer();
    });
  }

  startServer() {
    this.server = http.createServer();

    io(this.server).on('connection', (s) => {
      s.on('message', (d) => this.processMessage(s, d));
      s.on('disconnect', () => console.log('disconnected'));
    });

    this.server.listen(this.addr.port);
  }

  processMessage(s, d) {
    switch(d.type) {
      case 'query':
        this.processQuery(s, d);
        break;
      default:
        console.log('Invalid data type:', d.type);
    }
  }

  processQuery(s, d) {
    switch(d.data) {
      case 'units':
        da.queryUnits((err, docs) => s.emit('units', docs));
        break;
      case 'consumption':
        if(d.target) {
          da.queryConsumption(d.target, (err, docs) =>
            s.emit('consumption', docs));
        }
        break;
      case 'latest':
        da.queryLatestData((err, docs) => s.emit('latest', docs));
        break;
      default:
        console.log('Invalid query data:', d.data);
    }
  }
}

exports.Supply = Supply;
