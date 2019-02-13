var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var getConnection = require('./services/dbService.js');

var app = express();

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//create a session
app.use(session({ secret: 'tuto hunt', cookie: { maxAge: 600000 }, resave: false, saveUninitialized: false}));

require('./routes')(app)

getConnection
	.then((db) => {
		app.listen(3000, ()=>console.log('Server listening on port 3000'))
	})
	.catch((err) => {
		console.log(err)
	})
