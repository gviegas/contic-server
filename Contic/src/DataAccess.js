//
// Created by Gustavo Viegas on 2017/02
//

const EventEmitter = require('events');
const MongoClient = require('mongodb').MongoClient;
const Db = require('./DB').Db;

class Coll {
  constructor(db, name) {
    this.collection = db.collection(name);
    this.collection.ensureIndex({id: 1}, {unique: true});
  }

  query(id, callback) {
    if(Array.isArray(id))
      this.collection.find({id: {$in: id}}).project({_id: 0}).toArray(callback);
    else
      this.collection.findOne({id: id}, {_id: 0}, callback);
  }

  queryAll(callback) {
    this.collection.find({}).project({_id: 0}).toArray(callback); // use 'next' or 'each' instead
  }

  insert(doc, callback = null) {
    this.collection.insert(doc, callback);
  }

  pushInner(id, doc, callback = null) {
    this.collection.updateOne({id: id}, {$push: doc}, callback);
  }

  delete(id, callback = null) {
    this.collection.deleteOne({id: id}, callback);
  }

  deleteAll(callback = null) {
    this.collection.deleteMany({}, callback);
  }

}

class UnitsColl extends Coll {
  constructor(db, name) {
    super(db, name);
    this.collection.ensureIndex({location: '2dsphere'});
  }

  queryByLocation(location, callback) {
    this.collection.find({location: location}).project({_id: 0}).toArray(callback);
  }

  queryIgnoreData(id, callback) {
    if(Array.isArray(id))
      this.collection.find({id: {$in: id}}).project({_id: 0, data: 0}).toArray(callback);
    else
      this.collection.findOne({id: id}, {_id: 0, data: 0}, callback);
  }

  queryByLocationIgnoreData(location, callback) {
    this.collection.find({location: location}).project({_id: 0, data: 0}).toArray(callback);
  }

  queryAllIgnoreData(callback) {
    this.collection.find({}).project({_id: 0, data: 0}).toArray(callback); // use 'next' or 'each' instead
  }
}

class VdataColl extends Coll {
  constructor(db, name) {
    super(db, name);
    this.collection.ensureIndex({'data.time': -1});
  }

  // Note: This query only works if the data array is sorted by time.
  // If the data is being updated using the pushInner() method to add
  // the most recent connsumption value, it should work correctly.
  queryAllFilterLatestData(callback) {
    this.collection.find({}).project({_id: 0, data: {$slice: -1}}).toArray(callback);
  }
}

// todo
class UsersColl extends Coll {}
class ZonesColl extends Coll {}

const URL = 'mongodb://localhost:27017/condata';

// doing
class DataAccess extends EventEmitter {
  constructor(url = URL) {
    super();
    this.db = null;
    this.collections = {users: null, units: null, zones: null, vdata: null};
    this.init(url);
  }

  init(url) {
    this.db = new Db(url);
    this.db.on('connection', (db) => {
      this.collections.units = new UnitsColl(db, 'units');
      this.collections.vdata = new VdataColl(db, 'vdata');
      //this.collections.users = new UsersColl(db, 'users');
      //this.collections.zones = new ZonesColl(db, 'zones');
      this.emit('ready');
    });
  }

  end() {
    if(this.db) {
      this.db.end();
      this.db = null;
    }
  }

  queryUnits(callback) {
    this.collections.units.queryAllIgnoreData(callback);
  }

  queryConsumption(unit_ids, callback) {
    this.collections.units.query(unit_ids, callback);
  }

  queryLatestData(callback) {
    this.collections.vdata.queryAllFilterLatestData(callback);
  }
}

exports.DataAccess = new DataAccess();