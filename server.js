/// <reference path="typings/node/node.d.ts"/>
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = require('./config');
var router = require('./routes/index');

var app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(session({
    secret: config.cookie_secret,
    resave: false,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(router);

mongoose.connection.on('error',function (err) { 
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () { 
  console.log('Mongoose disconnected'); 
});
mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to: %s', config.mongoURI);

	app.listen(config.port).on('listening', function() {
	    console.log('Server listening on: %d', config.port);
	});
}); 
mongoose.connect(config.mongoURI);
