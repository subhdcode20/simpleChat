// This is the main file of our chat app. It initializes a new
// express.js instance, requires the config and routes files
// and listens on a port. Start the application by running
// 'node app.js' in your terminal


var express = require('express'),
	app = express();

var bodyParser = require('body-parser');

// This is needed if the app is run on heroku:

var port = process.env.PORT || 8080;

// Initialize a new socket.io object. It is bound to
// the express app, which allows them to coexist.

var io = require('socket.io').listen(app.listen(port));

// Require the configuration and the routes files, and pass
// the app and io as arguments to the returned functions.

// This file handles the configuration of the app.
// It is required by app.js

//--

	// Set .html as the default template extension
	app.set('view engine', 'ejs');

	// Initialize the ejs template engine
	//app.engine('html', require('ejs').renderFile);

	// Tell express where it can find the templates
	app.set('views', __dirname + '/views');

	// Make the files in the public folder available to the world
	app.use(express.static(__dirname + '/public'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));


//require('./config')(app, io);
require('./routes')(app, io);

console.log('Your application is running on http://localhost:' + port);
