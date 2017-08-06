'use strict';

var express = require('express');
var app = express();

app.use(
	"/", // Root directory
	express.static(__dirname + '/dist/') // Static content
);

app.get('*', function (req, res) {
	res.sendFile(__dirname + '/dist/index.html'); // For angular route
})

app.listen(3000, function () {
	console.log('Check out pizza-rating on port 3000!')
})