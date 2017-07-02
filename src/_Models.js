//
// Created by Gustavo Viegas on 2017/02
//

const UNIT_DOC = {
  id: '',
  location: {type: 'Point', coordinates: [0,0]},
  data: [{
    time: new Date(),
    value: 0
  }]
};

const VDATA_DOC = {
  id: '', // == unit id
  location: {type: 'Point', coordinates: [0,0]}, // == unit location
  data: [{
    time: new Date(),
    value: 0
  }]
};

const USER_DOC = {
  id: '',
  name: '',
  password: '',
  access: 0,
  unit_id: ''
};

const ZONE_DOC = {
  id: '',
  name: '',
  units_id: ['']
};
