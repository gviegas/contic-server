//
// Created by Gustavo Viegas on 2017/06
//

const Feed = require('./Feed').Feed;
const Supply = require('./Supply').Supply;

new Supply({'port': 80});
new Feed({'host': 'localhost', 'port': 45313});
