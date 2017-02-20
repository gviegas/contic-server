//
// Created by Gustavo Viegas on 2017/01
//

const io = require('socket.io')(80);
const da = require('./DataAccess').DataAccess;

da.on('ready', () => {
  console.log('Ready');
  
  io.on('connection', (socket) => {
    socket.on('message', (d) => {
      console.log('Message Received.');
      processMessage(socket, d);
    });

    socket.on('disconnect', () => console.log('disconnected'));
  });
});

function processMessage(socket, d) {
  switch(d.type) {
    case 'query':
      processQuery(socket, d);
      break;
    default:
      console.log(`Invalid data type "${d.type}"`);
      break;
  }
}

function processQuery(socket, d) {
  switch(d.data) {
    case 'units':
      da.queryUnits((err, docs) => {
        console.log('Fetched:'); // debug
        console.log(docs); // debug
        socket.emit('units', docs);
      });
      break;

    case 'consumption':
      if(!d.target) {
        console.log('No target especified');
        return;
      }
      da.queryConsumption(d.target, (err, docs) => {
        console.log('Fetched:');// debug
        console.log(docs); // debug
        socket.emit('consumption', docs);
      });
      break;

      case 'latest':
        da.queryLatestData((err, docs) => {
          console.log('Fetched'); // debug
          console.log(docs); // debug
          socket.emit('latest', docs);
        });
        break;
      
    default:
      console.log(`Invalid query data: ${d.data}`);
  }
}