var express = require('express');
var app = express();
var path    = require("path");

app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/js'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Resizer app listening at http://%s:%s', host, port);
});
