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
  //da.collections.units.insert({id: 'u@units', location: [12, 21], data: []}, null);
  //da.collections.units.insert({id: 'v@units', location: [0, 1], data: []}, null);

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
      da.collections.units.queryByLocation([0,1], (err, docs) => {
        console.log('Fetched: '); // debug
        console.log(docs); // debug
        socket.send(docs);
      });
      // da.collections.units.queryIgnoreData(d.data.id, (err, doc) => {
      //   console.log('Fetched: '); // debug
      //   console.log(doc); // debug
      //   socket.send(doc);
      // });
      break;
    default:
      console.log(`Invalid data type "${d.type}"`);
      break;
  }
}