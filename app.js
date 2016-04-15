var express = require('express');
var app = express();
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var url = 'mongodb://localhost/todo';
var jsonParser = require('body-parser').json();

app.use(function(req, res, next) {
  req.user = 'Nathan';
  console.log(req.method + ':' + req.url);
  next();
});

app.get('/user', function(req, res) {
  var user = {
    name: 'Nathan',
    location: 'Newport Beach'
  }
  res.json(user);
});

app.get('/todos/:user', function(req, res) {
  if (req.params.user === 'Nathan') {
    var todos = ['Learn JavaScript.', 'Go Home.'];
    res.json(todos);
  }
  else {
    res.status(404).send('Sorry, I don\'t know that user');
  }
});

app.post('/add', jsonParser, function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (!err) {
      var todos = db.collection('todos');
      var additive = {
        'user': req.user,
        'text': req.body.newTodo,
        'finished': false
      }
      todos.insertOne(additive, function(err, result) {
        db.close();
        if (!err) {
          res.status(200).send(result.ops);
        }
        else {
          res.status(500).send(err);
        }
      })
    }
    else {
      res.status(500).send(err);
    }
  });
});

app.use(express.static('./public/'));

var port = process.env.PORT || 8080;
app.listen(port, function(req, res) {
  console.log('Listening on: ' + port + '...');
});
