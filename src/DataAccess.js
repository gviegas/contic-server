//
// Created by Gustavo Viegas on 2017/02
//

const EventEmitter = require('events');
const MongoClient = require('mongodb').MongoClient;
const DataBase = require('./DataBase').DataBase;
const UnitsColl = require('./Collections').UnitsColl
const VdataColl = require('./Collections').VdataColl

const URL = 'mongodb://localhost:27017/condata';

class DataAccess extends EventEmitter {
  constructor(url = URL) {
    super();
    this.db = null;
    this.collections = {users: null, units: null, zones: null, vdata: null};
    this.init(url);
  }

  init(url) {
    this.db = new DataBase(url);
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

  insertUnit(unit_id, coords) {
    this.collections.units.insert({
      id: unit_id,
      location: {type: 'Point', coordinates: [coords.lng, coords.lat]},
      data: []
    });
    this.collections.vdata.insert({
      id: unit_id,
      location: {type: 'Point', coordinates: [coords.lng, coords.lat]},
      data: []
    });
  }

  insertData(unit_id, data) {
    this.collections.vdata.pushInner(unit_id, {data}); // TODO: data...
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
