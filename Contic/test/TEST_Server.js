//
// Created by Gustavo Viegas on 2017/02
//

function TEST_UNITS(da) {
  // da.collections.units.insert({
  //   id: 'a@units', 
  //   location: {type: 'Point', coordinates: [-73.9612192, 40.6346711]}, 
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
  //   location: {type: 'Point', coordinates: [-73.9634077, 40.6346752]}, 
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
  //   location: {type: 'Point', coordinates: [-73.961230, 40.634240]}, 
  //   data: [
  //     {time: '2016-10-10', value: 5.4},
  //     {time: '2016-10-11', value: 4},
  //     {time: '2016-10-12', value: 3.2}
  //   ]
  // });
  
  // da.collections.units.insert({
  //   id: 'd@units', 
  //   location: {type: 'Point', coordinates: [-73.961188, 40.633882]}, 
  //   data: [
  //     {time: '2016-10-17', value: 7.5},
  //     {time: '2016-10-18', value: 8.5},
  //     {time: '2016-10-19', value: 8.1}
  //   ]
  // });
  
  // da.collections.units.insert({
  //   id: 'e@units', 
  //   location: {type: 'Point', coordinates: [-73.961027, 40.633695]}, 
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

function TEST_VDATA(da) {
  // da.collections.vdata.insert({
  //   id: 'a@units',
  //   location: {type: 'Point', coordinates: [-73.9612192, 40.6346711]},
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
  //   location: {type: 'Point', coordinates: [-73.9634077, 40.6346752]},
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
  //   location: {type: 'Point', coordinates: [-73.961230, 40.634240]},
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
  //   location: {type: 'Point', coordinates: [-73.961188, 40.633882]},
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
  //   location: {type: 'Point', coordinates: [-73.961027, 40.633695]},
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

exports.TEST_UNITS = TEST_UNITS;
exports.TEST_VDATA = TEST_VDATA;