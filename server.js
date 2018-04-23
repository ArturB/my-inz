// Module dependencies
var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var mongoose = require('mongoose');
const config = require('./server/config/database');

var debug = require('debug')('node-rest:server');

// Get our API routes
var videoRoutes = require('./server/routes/videos');
var acVideoRoutes = require('./server/routes/acvideos');
var userRoutes = require('./server/routes/user');
var profileRoutes = require('./server/routes/profile');

var app = express();

mongoose.connect(config.uri, (err) => {
  if (err) {
    console.log('Połączenie z bazą danych jest niemożliwe ', err);
    return res.status(500).json({
        title: 'Nie ma połączenia z bazą danych',
        error: {message: 'Spróbuj później'}
    });
  } 
  else {
    console.log('Połączenie z bazą danych ' + config.db);
  }
});

// Provide static directory for frontend
//app.use(express.static(__dirname + '/dist/'));

// Parsers to get POST requests for API use
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//to log requests to console
app.use(morgan('dev'));

// Point static path to dist
app.use(express.static(__dirname + '/dist/')); // Provide static directory for frontend


// Seting up server to accept cross-origin browser requests
app.use(function (req, res, next) { //allow cross origin requests
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

// Set our api routes
app.use('/videos', videoRoutes);
app.use('/acvideos', acVideoRoutes);
app.use('/user', userRoutes);
app.use('/profile', profileRoutes);

// Connect server to Angular 2 Index.html // Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});


//Get port from environment and store in Express
var port = process.env.PORT || '3000';
app.set('port', port);

//Create HTTP server
var server = http.createServer(app);

//Listen on provided port, on all network interfaces
server.listen(port, () => console.log(`Server running on localhost:${port}`));

server.on('error', onError);
server.on('listening', onListening);


//Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

//Event listener for HTTP server "listening" event.
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

