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
  // test
  // TEST_UNITS();
  // TEST_VDATA();

  console.log('Ready');
  
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
      da.collections.units.queryAllIgnoreData((err, docs) => {
        console.log('Fetched:'); // debug
        console.log(docs); // debug
        // setTimeout(() => socket.emit('units', docs), 3000); // test
        socket.emit('units', docs);
      });
      break;

    case 'consumption':
      if(!d.target) {
        console.log('No target especified');
        return;
      }
      da.collections.units.query(d.target, (err, docs) => {
        console.log('Fetched:');// debug
        console.log(docs); // debug
        socket.emit('consumption', docs);
      });
      break;

      case 'latest':
        da.collections.vdata.queryAll((err, docs) => {
          console.log('Fetched'); // debug
          console.log(docs); // debug
          socket.emit('latest', docs);
        });
        break;
      
    default:
      console.log(`Invalid query data: ${d.data}`);
  }
}

// test
function TEST_UNITS() {
  // da.collections.units.insert({
  //   id: 'a@units', 
  //   location: [40.6346711, -73.9612192], 
  //   data: [
  //     {time: '2016-10-10', value: 10},
  //     {time: '2016-10-11', value: 9},
  //     {time: '2016-10-12', value: 9.1},
  //     {time: '2016-10-13', value: 9.7},
  //     {time: '2016-10-14', value: 8.9},
  //     {time: '2016-10-15', value: 8.8},
  //     {time: '2016-10-16', value: 8.3},
  //     {time: '2016-10-17', value: 8.8},
  //     {time: '2016-10-18', value: 8.5},
  //     {time: '2016-10-19', value: 9.1}
  //   ]
  // });

  // da.collections.units.insert({
  //   id: 'b@units', 
  //   location: [40.6346752, -73.9634077], 
  //   data: [
  //     {time: '2016-10-10', value: 14.1},
  //     {time: '2016-10-11', value: 12},
  //     {time: '2016-10-12', value: 11.8},
  //     {time: '2016-10-13', value: 11.9},
  //     {time: '2016-10-14', value: 12.5},
  //     {time: '2016-10-15', value: 12.8}
  //   ]
  // });
  // da.collections.units.insert({
  //   id: 'c@units', 
  //   location: [40.634240, -73.961230], 
  //   data: [
  //     {time: '2016-10-10', value: 5.4},
  //     {time: '2016-10-11', value: 4},
  //     {time: '2016-10-12', value: 3.2}
  //   ]
  // });
  
  // da.collections.units.insert({
  //   id: 'd@units', 
  //   location: [40.633882, -73.961188], 
  //   data: [
  //     {time: '2016-10-17', value: 7.5},
  //     {time: '2016-10-18', value: 8.5},
  //     {time: '2016-10-19', value: 8.1}
  //   ]
  // });
  
  // da.collections.units.insert({
  //   id: 'e@units', 
  //   location: [40.633695, -73.961027], 
  //   data: [

  //   ]
  // });
  
  //da.collections.units.deleteAll();
  
  da.collections.units.queryIgnoreData(['d@units', 'b@units'], (err, docs) => {
    console.log('filtered units:');
    console.log(docs);
  });

  da.collections.units.queryAll((err, docs) => {
    console.log('units:');
    console.log(docs);
  });
}

function TEST_VDATA() {
  // da.collections.vdata.insert({
  //   id: 'a@units',
  //   location: [40.6346711, -73.9612192],
  //   data: [
  //     {time: '2016-10-10', value: 10},
  //     {time: '2016-10-11', value: 9},
  //     {time: '2016-10-12', value: 9.1},
  //     {time: '2016-10-13', value: 9.7},
  //     {time: '2016-10-14', value: 8.9},
  //     {time: '2016-10-15', value: 8.8},
  //     {time: '2016-10-16', value: 8.3},
  //     {time: '2016-10-17', value: 8.8},
  //     {time: '2016-10-18', value: 8.5},
  //     {time: '2016-10-19', value: 9.1}
  //   ]
  // });

  // da.collections.vdata.insert({
  //   id: 'b@units',
  //   location: [40.6346752, -73.9634077],
  //   data: [
  //     {time: '2016-10-10', value: 11},
  //     {time: '2016-10-11', value: 9.5},
  //     {time: '2016-10-12', value: 7.1},
  //     {time: '2016-10-13', value: 8.8},
  //     {time: '2016-10-14', value: 8.9},
  //     {time: '2016-10-15', value: 8.8},
  //     {time: '2016-10-16', value: 8.1},
  //     {time: '2016-10-17', value: 8.1},
  //     {time: '2016-10-18', value: 8.2},
  //     {time: '2016-10-19', value: 8.2}
  //   ]
  // });

  // da.collections.vdata.insert({
  //   id: 'c@units',
  //   location: [40.634240, -73.961230],
  //   data: [
  //     {time: '2016-10-10', value: 10},
  //     {time: '2016-10-11', value: 9},
  //     {time: '2016-10-12', value: 9.1},
  //     {time: '2016-10-13', value: 9.7},
  //     {time: '2016-10-14', value: 8.9},
  //     {time: '2016-10-15', value: 8.8},
  //     {time: '2016-10-16', value: 8.3},
  //     {time: '2016-10-17', value: 8.8},
  //     {time: '2016-10-18', value: 8.5},
  //     {time: '2016-10-19', value: 9.9}
  //   ]
  // });

  // da.collections.vdata.insert({
  //   id: 'd@units', 
  //   location: [40.633882, -73.961188],
  //   data: [
  //     {time: '2016-10-10', value: 10},
  //     {time: '2016-10-11', value: 9},
  //     {time: '2016-10-12', value: 9.1},
  //     {time: '2016-10-13', value: 9.7},
  //     {time: '2016-10-14', value: 8.9},
  //     {time: '2016-10-15', value: 8.8},
  //     {time: '2016-10-16', value: 8.3},
  //     {time: '2016-10-17', value: 8.8},
  //     {time: '2016-10-18', value: 8.5},
  //     {time: '2016-10-19', value: 8.7}
  //   ]
  // });

  // da.collections.vdata.insert({
  //   id: 'e@units',
  //   location: [40.633695, -73.961027],
  //   data: [
  //     {time: '2016-10-10', value: 10},
  //     {time: '2016-10-11', value: 9},
  //     {time: '2016-10-12', value: 9.1},
  //     {time: '2016-10-13', value: 9.7},
  //     {time: '2016-10-14', value: 8.9},
  //     {time: '2016-10-15', value: 8.8},
  //     {time: '2016-10-16', value: 8.3},
  //     {time: '2016-10-17', value: 8.8},
  //     {time: '2016-10-18', value: 8.5},
  //     {time: '2016-10-19', value: 7.5}
  //   ]
  // });
  
  // da.collections.vdata.deleteAll();

  da.collections.vdata.queryAll((err, docs) => {
    console.log('vdata:');
    console.log(docs);
  });
}
// end test