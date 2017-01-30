//
// Created by Gustavo Viegas on 2017/01
//

const io = require('socket.io')(80);

io.on('connection', (socket) => {

  socket.on('message', (d) => {
    console.log(`message: ${d}`)
    socket.send('!!!');
  });

  socket.on('disconnect', () => console.log('disconnected'));

});