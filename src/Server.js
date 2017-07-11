#! /usr/bin/env node

//
// Created by Gustavo Viegas on 2017/06
//

const Feed = require('./Feed').Feed;
const Supply = require('./Supply').Supply;

new Supply({'port': 4080});
new Feed({'host': 'localhost', 'port': 43313});
