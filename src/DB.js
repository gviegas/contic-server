//
// Created by Gustavo Viegas on 2017/01
//

const EventEmitter = require('events');
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;

class Db extends EventEmitter {
  constructor(url) {
    super();
    this.db = null;
    this.url = url;
    this.init(url);
  }

  init(url = this.url) {
    if(!this.db) {
      MongoClient.connect(url, (err, db) => {
        assert.equal(null, err);
        this.db = db;
        console.log('Connected successfully to server');
        this.emit('connection', db);
      });
    } else
      this.emit('connection', this.db);
  }

  end() {
    this.db.close();
    this.db = null;
  }

  log() { console.log(this.db); }
}

exports.Db = Db;
