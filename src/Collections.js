//
// Created by Gustavo Viegas on 2017/06
//

const MongoClient = require('mongodb').MongoClient;

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
    // TODO: use 'next' or 'each' instead
    this.collection.find({}).project({_id: 0}).toArray(callback);
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
    this.collection.find({location: location}).project({_id: 0})
      .toArray(callback);
  }

  queryIgnoreData(id, callback) {
    if(Array.isArray(id))
      this.collection.find({id: {$in: id}}).project({_id: 0, data: 0})
        .toArray(callback);
    else
      this.collection.findOne({id: id}, {_id: 0, data: 0}, callback);
  }

  queryByLocationIgnoreData(location, callback) {
    this.collection.find({location: location}).project({_id: 0, data: 0})
      .toArray(callback);
  }

  queryAllIgnoreData(callback) {
    // TODO: use 'next' or 'each' instead
    this.collection.find({}).project({_id: 0, data: 0}).toArray(callback);
  }
}

class VdataColl extends Coll {
  constructor(db, name) {
    super(db, name);
    this.collection.ensureIndex({'data.time': -1});
  }

  // NOTE: This query only works if the data array is sorted by time.
  // If the data is being updated using the pushInner() method to add
  // the most recent connsumption value, it should work correctly.
  queryAllFilterLatestData(callback) {
    this.collection.find({}).project({_id: 0, data: {$slice: -1}})
      .toArray(callback);
  }
}

class UsersColl extends Coll {} // TODO
class ZonesColl extends Coll {} // TODO

exports.UnitsColl = UnitsColl;
exports.VdataColl = VdataColl;
