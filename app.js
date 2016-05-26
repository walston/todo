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
  // find user by name & return user data;
  // res.json(USER: {});
  db.user.read(req.user, function(result) {
    res.json(result);
  })
});

app.get('/todos', function(req, res) {
  // find todos by userId & return them as
  // as an array
  // res.json([{
  //   date: doc.date,
  //   text: doc.text,
  //   id: doc._id
  // }]);
  db.item.read(req.user, function(items) {
    var payload = items;
    res.json(payload);
  });
});

app.post('/add', jsonParser, function(req, res) {
  // db.insert({
  //   'user': req.user,
  //   'text': req.body.text,
  //   'date': req.body.date
  // });
  var item = req.body.item;
  db.item.create(req.user, item, function(result) {
    res.json(result);
  });
});

app.put('/update', jsonParser, function(req, res) {
  // db.update({
  //   '_id': ObjectID(req.params.id)
  // }, {
  //   'text': req.body.text,
  //   'finished': req.body.finished
  // });
  var itemid = req.body.itemid;
  var update = req.body.item;
  db.item.update(req.user, itemid, update, function(result) {
    res.json(result);
  });
});

app.delete('/remove', jsonParser, function(req, res) {
  // db.delete({
  //   '_id': ObjectID(req.params.id)
  // })
  var itemid = req.body.itemid;
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
