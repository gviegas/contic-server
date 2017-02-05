//
// Created by Gustavo Viegas on 2017/02
//

const DbCollection = require('./DB').DbCollection;
const Db = require('./DB').Db;

const url = 'mongodb://localhost:27017/condata';
const db = new Db(url);
db.on('connection', onDbConnection);

var collections = {
  Users: null,
  Units: null,
  Zones: null,
  VData: null
};

function onDbConnection() {
  collections.Users = new DbCollection(db.db, 'users');
  collections.Units = new DbCollection(db.db, 'units');
  collections.Zones = new DbCollection(db.db, 'zones');
  collections.VData = new DbCollection(db.db, 'vdata');
}

// test
setTimeout(() => {
  collections.Units.deleteAll();
  collections.Users.queryAll();
  collections.Units.queryAll();
}, 3000);
//

/*
class UsersCollection {
  constructor(db, name) {
    this.collection = new DbCollection(db, name);
    this.collection.createIndex({'id' : 1});
  }

  insertPUser(id, name, pwd) {
    this.collection.insert({'id': id, 'name': name, 'pwd': pwd});
  }

  insertCUser(id, name, pwd, unit_id) {
    this.collection.insert(
      {'id': id, 'name': name, 'pwd': pwd, 'unit_id': unit_id});
  }

  queryUser(id, callback) {
    this.collection.query({'id': id}, callback);
  }

  queryAll(callback) {
    this.collection.queryAll(callback);
  }
}

class UnitsCollection {
  constructor(db, name) {
    this.collection = new DbCollection(db, name);
    this.collection.createIndex({id: 1});
    this.collection.createIndex({location: '2dsphere'});
  }

  insertUnit(id, location, data = {}) {
    this.collection.insert({id: id, location: location, data: data});
  }

  insertMany(ids, locations, data = null) {
    if(ids.length != locations.length) return;
    let docs = [];
    for(let i = 0; i < ids.length; ++i) {
      docs.push({
        'id': ids[i], 
        'location': locations[i], 
        'data': data && data[i] ? data[i] : {}
      });
    }
    this.collection.insertMany(docs);
  }

  queryUnit(id, callback) {
    this.collection.query({'id': id}, callback);
  }

  queryByLocation(location, callback) {
    this.collection.query({'location': location}, callback);
  }

  queryAll(callback) {
    this.collection.queryAll(callback);
  }
}

class ZonesCollection {
  constructor(db, name) {
    this.collection = new DbCollection(db, name);
  }

  insertZone(id, name, units) {

  }

  queryZone(id) {

  }

  queryAll() {}
}

class TDataCollection {
  constructor(db, name) {
    this.collection = new DbCollection(db, name);
  }

  insertData(id, unit, time, value) {

  }

  insertMany(ids, units, time, value) {

  }

  queryData(id) {

  }

  queryByValue(value) {

  }

  queryAll() {}
}

const url = 'mongodb://localhost:27017/condata';

const db = new Db(url);
db.on('connection', () => {
  let units = new UnitsCollection(db.db, 'units');
  //units.insertUnit('unit98', [-1,-2], {v: 1.4});
  //units.insertMany(['unit5', 'unit6', 'unit7'], [[7,7], [8,8], [9,9]], [{'v': 0.1}, {'v': 0.2}]);
  //units.queryUnit('unit98', (err, doc) => console.log(doc));
  db.end();
});
*/