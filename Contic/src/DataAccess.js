//
// Created by Gustavo Viegas on 2017/02
//

const EventEmitter = require('events');
const DbCollection = require('./DB').DbCollection;
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
const ZONE_DOC = {
  id: '',
  name: '',
  units_id: ['']
};
const VDATA_DOC = {
  id: '',
  unit_id: '',
  data: [{
    time: new Date(),
    value: 0
  }]
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
function zoneDoc(id, name, units_id) {
  let doc = ZONE_DOC;
  doc.id = id;
  doc.name = name;
  doc.units_id = units_id;
  return doc;
}
function vdataDoc(id, unit_id, data = []) {
  let doc = VDATA_DOC;
  doc.id = id;
  doc.unit_id = unit_id;
  doc.data = data;
  return doc;
}
function dataDoc(time, value) {
  let doc = DATA_DOC;
  doc.time = time;
  doc.value = value;
  return doc;
}

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
      this.collections.users = new DbCollection(db, 'users');
      this.collections.units = new DbCollection(db, 'units');
      this.collections.zones = new DbCollection(db, 'zones');
      this.collections.vdata = new DbCollection(db, 'vdata');
      this.emit('ready');
    });
  }

  end() {
    if(this.db) {
      this.db.end();
      this.db = null;
    }
  }
}

exports.DataAccess = new DataAccess();

/*
var da = new DataAccess();
da.on('ready', () => {
  //da.collections.units.deleteAll();
  //da.collections.units.insertOne(unitDoc('t@units', [10,10]));
  //da.collections.units.updateOne({id: 't@units'}, {location: [0, 1]});
  //da.collections.units.updateOne({id: 't@units'}, {data: dataDoc(new Date(Date.now()), 2.2)}, '$push');
  //for(let key in da.collections)
  //  da.collections[key].queryAll();
  da.collections.units.query({id: 't@units'}, (err, doc) => console.log(doc));
  da.end();
});
*/