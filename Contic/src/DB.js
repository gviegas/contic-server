//
// Created by Gustavo Viegas on 2017/01
//

const EventEmitter = require('events');
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;

// class DbCollection {
//   constructor(db, collection) {
//     this.collection = db.collection(collection); 
//   }

//   query(filter, callback = null, method = 'toArray') {
//     if(callback) {
//       switch(method) {
//         case 'each': 
//           this.collection.find(filter).each(callback);
//           break;
//         case 'next':
//           this.collection.find(filter).next(callback);
//           break;
//         case 'toArray':
//           this.collection.find(filter).toArray(callback);
//           break;
//         default:
//           console.log(`Invalid query method "${method}"`);
//           return;
//       }
//     }
//     else
//       this.collection.find(filter).toArray((err, docs) => {
//         assert.equal(null, err);
//         console.log('Documents found:');
//         console.log(!docs.length ? 'none' : docs);
//       });
//   }
  
//   queryAll(callback = null) {
//     this.query({}, callback); 
//   }

//   insertOne(doc, callback = null) {
//     if(callback)
//       this.collection.insertOne(doc, callback);
//     else
//       this.collection.insertOne(doc, (err, res) => {
//         assert.equal(null, err);
//         assert.equal(1, res.result.n);
//         console.log('Document inserted');
//       });
//   }

//   insertMany(docs, callback = null) {
//     if(callback)
//       this.collection.insertMany(docs, callback);
//     else
//       this.collection.insertMany(docs, (err, res) => {
//         assert.equal(null, err);
//         assert.equal(docs.length, res.result.n);
//         assert.equal(docs.length, res.ops.length);
//         console.log(`${res.ops.length} documents inserted`);
//       });
//   }
  
//   updateOne(filter, value, operation = '$set', callback = null) {
//     let update = null;
//     switch(operation) {
//       case '$set':
//         update = {$set: value};
//         break;
//       case '$push':
//         update = {$push: value};
//         break;
//       default:
//         console.log(`Invalid update operation "${operation}"`);
//         return;
//     }
//     if(callback)
//       this.collection.updateOne(filter, update, callback);
//     else
//       this.collection.updateOne(filter, update, (err, res) => {
//         assert.equal(null, err);
//         assert.equal(1, res.result.n);
//         console.log('Document updated');
//       });
//   }

//   updateMany(filter, value, operation = '$set', callback = null) {
//     let update = null;
//     switch(operation) {
//       case '$set':
//         update = {$set: value};
//         break;
//       case '$push':
//         update = {$push: value};
//         break;
//       default:
//         console.log(`Invalid update operation "${operation}"`);
//         return;
//     }
//     if(callback)
//       this.collection.updateMany(filter, update, callback);
//     else
//       this.collection.updateMany(filter, update, (err, res) => {
//         assert.equal(null, err);
//         console.log(`${res.result.n} document(s) updated`);
//       });
//   }
  
//   deleteOne(filter, callback = null) {
//     if(callback)
//       this.collection.deleteOne(filter, callback);
//     else
//       this.collection.deleteOne(filter, (err, res) => {
//         assert.equal(null, err);
//         assert.equal(1, res.result.n);
//         console.log('Document deleted');
//       });
//   }

//   deleteMany(filter, callback = null) {
//     if(callback)
//       this.collection.deleteMany(filter, callback);
//     else
//       this.collection.deleteMany(filter, (err, res) => {
//         assert.equal(null, err);
//         console.log(`${res.result.n} document(s) deleted`);
//       });
//   }

//   deleteAll(callback = null) { 
//     this.deleteMany({}, callback); 
//   }

//   createIndex(field, callback = null) {
//     if(callback)
//       this.collection.createIndex(field, null, callback);
//     else 
//       this.collection.createIndex(field, null, (err, res) => {
//         console.log(`Index: ${res}`);
//       });
//   }
// }

// exports.DbCollection = DbCollection;

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