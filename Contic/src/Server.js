//
// Created by Gustavo Viegas on 2017/01
//

const io = require('socket.io')(80);
const da = require('./DataAccess').DataAccess;

const MsgTypes = Object.freeze({
    QUERY: 'query',
    INSERT: 'insert',
    UPDATE: 'update',
    DELETE: 'delete'
});

da.on('ready', () => {
  // da.collections.units.insert({id: 'a@units', location: [40.6346711, -73.9612192], data: []}, null);
  // da.collections.units.insert({id: 'b@units', location: [40.6346752, -73.9634077], data: []}, null);
  // da.collections.units.insert({id: 'c@units', location: [40.634240, -73.961230], data: []}, null);
  // da.collections.units.insert({id: 'd@units', location: [40.633882, -73.961188], data: []}, null);
  // da.collections.units.insert({id: 'e@units', location: [40.633695, -73.961027], data: []}, null);
  // da.collections.units.deleteAll();
  console.log('ready');
  
  io.on('connection', (socket) => {
    socket.on('message', (d) => {
      console.log('Message Received: '); // debug
      console.log(d); // debug
      processMessage(socket, d);
    });

    socket.on('disconnect', () => console.log('disconnected'));
  });
});

function processMessage(socket, d) {
  switch(d.type) {
    case 'query':
      da.collections.units.queryAllIgnoreData((err, docs) => {
        console.log('Fetched: '); // debug
        console.log(docs); // debug
        //socket.send(docs);
        //socket.emit('units', docs);
        setTimeout(() => socket.emit('units', docs), 5000);
      });
      break;
    default:
      console.log(`Invalid data type "${d.type}"`);
      break;
  }
}