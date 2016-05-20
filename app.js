require('dotenv').config();
var express = require('express');
var app = express();
var pg = require('pg');
var DATABASE_URL = process.env.DATABASE_URL;
var jsonParser = require('body-parser').json();

app.use(function(req, res, next) {
  req.user = 'Nathan';
  console.log(req.method + ':' + req.url);
  next();
});

app.get('/user', function(req, res) {
  // find user by name & return user data;
  // res.json(USER: {});
});

app.get('/todos', function(req, res) {
  // find todos by userId & return them as
  // as an array
  // res.json([{
  //   date: doc.date,
  //   text: doc.text,
  //   id: doc._id
  // }]);
});

app.post('/add', jsonParser, function(req, res) {
  // db.insert({
  //   'user': req.user,
  //   'text': req.body.text,
  //   'date': req.body.date
  // });
});

app.put('/update', jsonParser, function(req, res) {
  // db.update({
  //   '_id': ObjectID(req.params.id)
  // }, {
  //   'text': req.body.text,
  //   'finished': req.body.finished
  // });
});

app.delete('/remove', jsonParser, function(req, res) {
  // db.delete({
  //   '_id': ObjectID(req.params.id)
  // })
});

app.use(express.static('./public/'));

if (!require.main.loaded) {
  var port = process.env.PORT || 8080;
  app.listen(port, function(req, res) {
    console.log('Listening on: ' + port + '...');
  });
}

module.exports = app;
