module.exports = function(app,io){

  app.get('/', function(req, res) {
    res.render('home');
  });

  var users = [];
  var rooms = [];

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

  io.on('connection', function(socket) {


    socket.on('new-message', function(data) {
      io.to('').emit('showmsg', data);
    });

  });

};
