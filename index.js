module.exports = function(app,io){

  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/:room', function(req, res) {

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

/*   function findClientsSocketInRoom(roomid, namespace) {
      var res = [];
      var ns = io.of(namespace || "/");
      if(ns) {
        for(var id in ns.connected) {
          if(roomid) {
            var index = ns.connected[id].rooms.indexOf(roomid);
            if(index != -1) {
              res.push(ns.connected[id]);
            }
          } else {
            res.push(ns.connected[id]);
          }
        }
      }
      return res;
    }  */

    function findRooms() {
      var availableRooms = [];
      var rooms = io.sockets.adapter.rooms;
      if(rooms) {
        for (var room in rooms) {
          if(!rooms[room].sockets.hasOwnProperty(room)) {
            availableRooms.push(room);
          }
        }
      }
      return availableRooms;
    }

    function findx(roomsid) {
      var sockets = io.nsps['/'].adapter.rooms[roomid];
    }

    function findClientsInRoom(roomid) {
      var rooms = io.sockets.adapter.rooms;
      var clients = rooms[roomid].sockets;
      if(clients) {
        var sockets = Object.keys(clients);
      }
      var usersInRoom = [];
      for(var k in sockets) {
        usersInRoom.push(users[k]);
      }
      return usersInRoom;
    }


    socket.on('login', function(data) {
      socket.username = data;
      console.log(socket.username + ' logged in');
      if(users.indexOf(data) != -1) {
        socket.emit('showrooms', 'x');
      } else {
        users.push(data); //{socket.id : data}
        socket.emit('showrooms', 'rooomswrapper');
      }

      io.emit('updateRooms', findRooms());
    });

    socket.on('newroom', function(data) {
      //console.log('here chat');
      socket.join(data);
      socket.room = data;
      console.log(socket.username + 'joined: ' + socket.room);
      if(rooms.indexOf(data) != -1) {
        console.log('rooms already exists.');
        socket.emit('showchat', 'x');
      } else {
        console.log('rooms created: ' + socket.room);
        rooms.push(data);
        console.log(io.sockets.adapter.rooms);
        socket.emit('showchat', {segment: 'chatwrapper', room: socket.room});
      }

      io.emit('updateRooms', findRooms());

    });

    socket.on('joinroom', function(data) {
      socket.join(data);
      socket.room = data;
      console.log(socket.username + ' joined : ' + data);
      var clients =  findClientsInRoom(data);
// clients gives us the username of the users in room "data"
      //console.log('clients in room '+ data+ ': ' + clients);
// console gives us the rooms object of socket.io;
      //console.log(io.sockets.adapter.rooms);

      socket.emit('showchat', {segment: 'chatwrapper', room: socket.room});
      io.to(data).emit('updateUsers', clients);


      //console.log( 'sockets in room' + data + ': ' + io.nsps['/'].adapter.rooms[data]);
      //console.log('users in room ' + data + ' : ' + clients);
      //socket.emit('showchat', '');
    });

    socket.on('newMessage', function(data) {
      //save message
      io.to(socket.room).emit('showMessage', {sender: socket.username, msg: data});
      console.log('message recieved : ' + socket.username + " -> " + data + ' in room ' + socket.room);
      console.log(io.sockets.adapter.rooms);
    });




  });

};
