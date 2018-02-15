const express = require('express');
const app = express();
const io = require('socket.io')(); //activate the chat plugin

//serve up static files
app.use(express.static('public'));

//ad routes
app.use(require('./routes/index'));
app.use(require('./routes/contact'));
app.use(require('./routes/portfolio'));

const server = app.listen(3000,() => {
  console.log('listening in port 3000');
});

io.attach(server);


io.on('connection', socket => {
  //console.log('a user has connected!')
  
function sendTimeMessage(socket) {
  var now = new Date();

  var timestamp = now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

  socket.emit('notification', {'message': timestamp});

 }

  io.emit('chat message', { for : 'everyone', message : `A new user has entered the chat`});

  socket.on('chat message', msg => {
    io.emit('chat message', { for : 'everyone', message : msg});
    sendTimeMessage(socket);
  });

  socket.on('disconnect', () => {
    //console.log('a user disconnected');

    io.emit('disconnect message', `A user has left the chat!`);
  });
});



// const express = require('express'); //include this, just like a php include
// const app = express();
// const io = require ('socket.io')();
//
// //serve up static files
// app.use(express.static('public'));
//
// //add routes
// app.use(require('./routes/index'));
// app.use(require('./routes/contact'));
// app.use(require('./routes/portfolio'));
//
//
// //app.get('/contact', (req, res)=> {
// //  res.sendFile(__dirname + '/contact.html');
// //});
//
// //app.get('/portfolio', (req, res)=> {
// //  res.sendFile(__dirname + '/portfolio.html');
// //});
//
// const server = app.listen(3000, () => {
//   console.log('listening on port 3000');
// });
//
//TRIED TO INCORPORATE ROOMS HERE but... FAILED
// // // rooms which are currently available in chat
// // var rooms = ['room1','room2','room3'];
//
// io.attach(server);
//
// io.on('connection', socket => {
//   console.log('a user has connected!');
//   io.emit('chat message', { for : 'everyone', message : `${socket.id} is here!`});
//   socket.on('adduser', username => {
//
//
// //   		// store the username in the socket session for this client
// //   		socket.username = username;
// //   		// store the room name in the socket session for this client
// //   		socket.room = 'room1';
// //   		// add the client's username to the global list
// //   		usernames[username] = username;
// //   		// send client to room 1
// //   		socket.join('room1');
// //   		// echo to client they've connected
// //   		socket.emit('updatechat', 'SERVER', 'you have connected to room1');
// //   		// echo to room 1 that a person has connected to their room
// //   		socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
// //   		socket.emit('updaterooms', rooms, 'room1');
// //   	});
// //
// //
// //   //handle messages sent from client
// //   socket.on('chat message', msg => {
// //   io.emit('chat message', { for : 'everyone', message : msg});
// //   socket.broadcast.emit('chat message', msg); //now two local hosts will see the same messages
// //
// // });
// //
// // // when the client emits 'sendchat', this listens and executes
// //   socket.on('sendchat', data => {
// //     // we tell the client to execute 'updatechat' with 2 parameters
// //     io.sockets.in(socket.room).emit('updatechat', socket.username, data);
// //   });
// //
// //   socket.on('switchRoom', newroom => {
// //   		// leave the current room (stored in session)
// //   		socket.leave(socket.room);
// //   		// join new room, received as function parameter
// //   		socket.join(newroom);
// //   		socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
// //   		// sent message to OLD room
// //   		socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');
// //   		// update socket session room title
// //   		socket.room = newroom;
// //   		socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
// //   		socket.emit('updaterooms', rooms, newroom);
// //   	});
//
//
//   socket.on('disconnect', () => {
//     console.log('a user has disconnected!');
//
//     io.emit('disconnect message', `${socket.id} has left the building!`);
//   });
// });
