const express = require('express'); //include this, just like a php include
const app = express();
const io = require ('socket.io')();

//serve up static files
app.use(express.static('public'));

//add routes
app.use(require('./routes/index'));
app.use(require('./routes/contact'));
app.use(require('./routes/portfolio'));


//app.get('/contact', (req, res)=> {
//  res.sendFile(__dirname + '/contact.html');
//});

//app.get('/portfolio', (req, res)=> {
//  res.sendFile(__dirname + '/portfolio.html');
//});

const server = app.listen(3000, () => {
  console.log('listening on port 3000');
});

io.attach(server);

io.on('connection', socket => {
  console.log('a user has connected!');
  io.emit('chat message', { for : 'everyone', message : `${socket.id} is here!`});

  socket.on('disconnect', () => {
    console.log('a user has disconnected!');

    io.emit('disconnect message', `${socket.id} has left the building!`);
  });
});
