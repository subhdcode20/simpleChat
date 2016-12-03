module.exports = function(app,io){

  app.get('/', function(req, res) {
    res.render('index');
  });

  var users = [];
  var rooms = [];
/*
  app.get('/rooms', function(req, res) {
    //console.log(io.sockets.adapter.rooms);
    res.render('rooms', {user: "req.session.username", rooms: io.sockets.adapter.rooms});
  })

  app.post('/rooms', function(req, res) {
    var username = req.body.username;
    users.push(username);

    res.render('rooms', {user: username, rooms: io.sockets.adapter.rooms});
  });

  app.post('/create', function(req, res) {
    var room = req.body.newroom;

    res.redirect('/chat/' + room);

  });

  app.get('/chat/:id', function(req, res) {
    var room = req.params.id;
    console.log('room= ' + room);
    res.render('chat', {room: room});
  });
*/
  io.on('connection', function(socket) {


    socket.on('login', function(data) {
      console.log('here rooms');
      socket.username = data;
      if(users.indexOf(data) != -1) {
        socket.emit('showrooms', 'x');
      } else {
        users.push(data);
        socket.emit('showrooms', 'rooomswrapper');
      }

    });

    socket.on('newroom', function(data) {
      console.log('here chat');
      socket.room = data;
      if(rooms.indexOf(data) != -1) {
        console.log('rooms already exists.');
        socket.emit('showchat', 'x');
      } else {
        console.log('rooms created.');
        rooms.push(data);
        console.log(rooms);
        socket.emit('showchat', 'chatwrapper');
      }
    });

  });

};
