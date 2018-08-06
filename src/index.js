var express = require('express');
var bodyParser = require("body-parser");
var request = require('request');

var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())
app.use(express.static(__dirname + '/view'));

var server = app.listen(process.env.PORT || 8000, function () {
var port = server.address().port;
console.log("App now running on port", port);
});
