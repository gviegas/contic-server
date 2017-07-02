//
// Created by Gustavo Viegas on 2017/06
//

const EventEmitter = require('events');
const io = require('socket.io');
const da = require('./DataAccess').DataAccess;

const tests = require('../test/test');

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

      // test
      da.collections.units.deleteAll();
      da.collections.vdata.deleteAll();
      tests.testData(da);
      //

      this.startServer();
    });
  }

  startServer() {
    this.server = io(this.addr.port).on('connection', (s) => {
      s.on('message', (d) => {
        console.log('Message Received.');
        this.processMessage(s, d);
      });
      s.on('disconnect', () => console.log('disconnected'));
    });
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
        da.queryUnits((err, docs) => {
          s.emit('units', docs);
        });
        break;
      case 'consumption':
        if(d.target) {
          da.queryConsumption(d.target, (err, docs) => {
            s.emit('consumption', docs);
          });
        }
        break;
      case 'latest':
        da.queryLatestData((err, docs) => {
          s.emit('latest', docs);
        });
        break;
      default:
        console.log('Invalid query data:', d.data);
    }
  }
}

new Supply({'port': 4080});
