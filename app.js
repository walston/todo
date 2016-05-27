require('dotenv').config();
var express = require('express');
var app = express();
var jsonParser = require('body-parser').json();
var db = require('./modules/database.js');

app.use(function(req, res, next) {
  req.user = 3; // this should be a session hash read from the cookies
  console.log(req.method + ':' + req.url);
  next();
});

app.get('/user', function(req, res) {
  db.user.read(req.user, function(result) {
    res.json(result);
  })
});

app.get('/todos', function(req, res) {
  db.item.read(req.user, function(items) {
    var payload = items;
    res.json(payload);
  });
});

app.post('/add', jsonParser, function(req, res) {
  var item = req.body.item;
  db.item.create(req.user, item, function(result) {
    res.json(result);
  });
});

app.put('/update', jsonParser, function(req, res) {
  var itemid = req.body.item.id;
  var update = req.body.item;
  db.item.update(req.user, itemid, update, function(result) {
    res.json(result);
  });
});

app.delete('/remove', jsonParser, function(req, res) {
  var itemid = req.body.item.id;
  db.item.delete(req.user, itemid, function(result) {
    res.json(result);
  });
});

app.use(express.static('./public/'));

if (!require.main.loaded) {
  var port = process.env.PORT || 8080;
  app.listen(port, function(req, res) {
    console.log('Listening on: ' + port + '...');
  });
}

module.exports = app;
