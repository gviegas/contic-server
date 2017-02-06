//
// Created by Gustavo Viegas on 2017/01
//

const io = require('socket.io')(80);
const da = require('./DataAccess').DataAccess;

/*
da.on('ready', () => {
  console.log('ready');
});

io.on('connection', (socket) => {

  socket.on('message', (d) => {
    console.log(`message: ${d}`)
    socket.send('!!!');
  });

  socket.on('disconnect', () => console.log('disconnected'));

});
*/

da.on('ready', () => {
  io.on('connection', (socket) => {
    socket.on('message', (d) => {
      console.log('Message Received: '); // debug
      console.log(d); // debug
      processMessage(socket, d);
    });

    socket.on('disconnect', () => console.log('disconnected'));
  });
});

// doing
function processMessage(socket, d) {
  switch(d.type) {
    case 'query':
      da.collections.units.query({id: d.data.id}, (err, doc) => {
        console.log('Fetched: '); // debug
        console.log(doc); // debug
        socket.send(doc);
      });
      break;
    default:
      console.log(`Invalid data type "${d.type}"`);
      break;
  }
}