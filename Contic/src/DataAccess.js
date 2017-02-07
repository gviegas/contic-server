//
// Created by Gustavo Viegas on 2017/02
//

const EventEmitter = require('events');
const MongoClient = require('mongodb').MongoClient;
const DbCollection = require('./DB').DbCollection;//
const Db = require('./DB').Db;

const USER_DOC = {
  id: '',
  name: '',
  password: '',
  access: 0,
  unit_id: ''
};

const UNIT_DOC = {
  id: '',
  location: '',
  data: [{
    time: new Date(),
    value: 0
  }]
};

const VDATA_DOC = {
  id: '',
  unit_id: '',
  data: [{
    time: new Date(),
    value: 0
  }]
};

const ZONE_DOC = {
  id: '',
  name: '',
  units_id: ['']
};

const DATA_DOC = {
  time: new Date(), 
  value: 0
};

function userDoc(id, name, password, access, unit_id = '') {
  let doc = USER_DOC;
  doc.id = id;
  doc.name = name;
  doc.password = password;
  doc.access = access;
  doc.unit_id = unit_id;
  return doc;
}

function unitDoc(id, location, data = []) {
  let doc = UNIT_DOC;
  doc.id = id;
  doc.location = location,
  doc.data = data;
  return doc;
}

function vdataDoc(id, unit_id, data = []) {
  let doc = VDATA_DOC;
  doc.id = id;
  doc.unit_id = unit_id;
  doc.data = data;
  return doc;
}

function zoneDoc(id, name, units_id) {
  let doc = ZONE_DOC;
  doc.id = id;
  doc.name = name;
  doc.units_id = units_id;
  return doc;
}

function dataDoc(time, value) {
  let doc = DATA_DOC;
  doc.time = time;
  doc.value = value;
  return doc;
}

//todo
class UsersColl {}

class UnitsColl {
  constructor(db, name) {
    this.collection = db.collection(name);
  }

  query(id, callback) {
    this.collection.findOne({id: id}, callback);
  }

  queryByLocation(location, callback) {
    this.collection.find({loc: location}, callback);
  }

  queryIgnoreData(id, callback) {
    this.collection.findOne({id: id}, {data: 0}, callback);
  }

  queryByLocationIgnoreData(location, callback) {
    this.collection.find({loc: location}, {data: 0}, callback);
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

class VdataColl {
  constructor(db, name) {
    this.collection = db.collection(name);
  }
}

// todo
class ZonesColl {}

const URL = 'mongodb://localhost:27017/condata';

// todo
// - create indexes
// - db functions (presets for common operations)
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
      //this.collections.users = new DbCollection(db, 'users');
      this.collections.units = new UnitsColl(db, 'units');
      //this.collections.zones = new DbCollection(db, 'zones');
      //this.collections.vdata = new DbCollection(db, 'vdata');
      this.emit('ready');
    });
  }

  end() {
    if(this.db) {
      this.db.end();
      this.db = null;
    }
  }

  queryUser(id, callback) {
    if(Array.isArray(id)) {

    }
  }
  queryUnit(id, callback) {
    if(Array.isArray(id)) {
      
    }
  }
  queryZone(id, callback) {
    if(Array.isArray(id)) {
      
    }
  }
  queryVdataByUnit(unit_id, callback) {
    if(Array.isArray(id)) {
      
    }
  }
  queryUnitByLocation(location, callback) {
    if(Array.isArray(id)) {
      
    }
  }

  insertUser(id, name, password, access, unit_id, callback) {
  
  }
  insertUnit(id, location, data, callback) {

  }
  insertZone(id, name, units_id, callback) {

  }
  insertVdata(id, unit_id, data, callback) {

  }
  insertData(time, value, unit_id, callback) {

  }
}

exports.DataAccess = new DataAccess();