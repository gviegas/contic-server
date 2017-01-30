//
// Created by Gustavo Viegas on 2017/01
//

const EventEmitter = require('events');
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/condata';

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

        // test
        //new DbCollection(db, 'temp').insert({t: 20000});
        //new DbCollection(db, 'temp').insertMany([{q: 300}, { q: 400}, {q: 500}]);
        //new DbCollection(db, 'temp').query({'q': 300});
        //new DbCollection(db, 'temp').update({'q': 200}, {'r': 700});
        //new DbCollection(db, 'temp').updateMany({'q': 200}, {'s': 1000});
        //new DbCollection(db, 'temp').delete({'q': 400});
        //new DbCollection(db, 'temp').deleteMany({'s': 1000});
        //new DbCollection(db, 'temp').deleteAll();
        
        new DbCollection(db, 'temp').queryAll();

        console.log('Connected successfully to server');
        this.emit('connection');
      });
    } else {
      this.emit('connection');
    }
  }

  end() {
    this.db.close();
    this.db = null;
  }

  log() { console.log(this.db); }
}

class DbCollection {
  constructor(db, collection) {
    this.collection = db.collection(collection); 
  }

  insert(doc) {
    this.collection.insertOne(doc, (err, res) => {
      assert.equal(null, err);
      assert.equal(1, res.result.n);
      console.log('Document inserted');
    });
  }

  insertMany(docs) {
    this.collection.insertMany(docs, (err, res) => {
      assert.equal(null, err);
      assert.equal(docs.length, res.result.n);
      assert.equal(docs.length, res.ops.length);
      console.log(`${res.ops.length} documents inserted`);
    });
  }

  query(filter) {
    this.collection.find(filter).toArray((err, docs) => {
      assert.equal(null, err);
      console.log('Documents found:');
      console.log(!docs.length ? 'none' : docs);
    });
  }
  
  queryAll() { this.query({}); }
  
  update(filter, value) {
    this.collection.updateOne(filter, { $set : value}, (err, res) => {
      assert.equal(null, err);
      assert.equal(1, res.result.n);
      console.log('Document updated');
    });
  }

  updateMany(filter, value) {
    this.collection.updateMany(filter, { $set: value}, (err, res) => {
      assert.equal(null, err);
      console.log(`${res.result.n} document(s) updated`);
    });
  }
  
  delete(filter) {
    this.collection.deleteOne(filter, (err, res) => {
      assert.equal(null, err);
      assert.equal(1, res.result.n);
      console.log('Document deleted');
    });
  }

  deleteMany(filter) {
    this.collection.deleteMany(filter, (err, res) => {
      assert.equal(null, err);
      console.log(`${res.result.n} document(s) deleted`);
    });
  }

  deleteAll() { this.deleteMany({}); }
}

class UsersCollection {}
class DataCollection {}

var db = new Db(url);
//db.on('connection', () => db.log());