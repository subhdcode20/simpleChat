module.exports = function(app,io){

  app.get('/', function(req, res) {
    res.render('home');
  });

  app.post('/chat', function(req, res) {
    var username = req.body.username;

    res.render('chat', {user: username});
  });



};
