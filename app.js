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
  MongoClient.connect(url, function(err, db) {
    if (!err) {
      var users = db.collection('users');
      users.find({'name': req.user}).limit(1).toArray(function(err, docs) {
        db.close();
        if (!err) {
          res.send(docs[0]);
        }
        else {
          res.sendStatus(500);
        }
      });
    }
    else {
      res.sendStatus(500);
    }
  });
});

app.get('/todos', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (!err) {
      var todos = db.collection('todos');
      todos.find({user: req.user}).toArray(function(err, docs) {
        db.close();
        debugger;
        docs = docs.map(function(doc) {
          return {
            text: doc.text,
            finished: doc.finished
          }
        })
        if (!err) {
          res.json(docs);
        }
        else {
          res.sendStatus(500);
        }
      });
    }
    else {
      res.sendStatus(500);
    }
  });
});

app.post('/add', jsonParser, function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (!err) {
      var todos = db.collection('todos');
      var additive = {
        'user': req.user,
        'text': req.body.newTodo
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

app.put('/remove', jsonParser, function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (!err) {
      var todos = db.collection('todos');
      var subtractive = {
        'user': req.user,
        'text': req.body.text
      }
      todos.deleteOne(subtractive, function(err, results) {
        if (!err) {
          res.json(results.result);
        }
        else {
          res.sendStatus(500);
        }
      });
    }
    else {
      res.sendStatus(500);
    }
  });
})

app.use(express.static('./public/'));

var port = process.env.PORT || 8080;
app.listen(port, function(req, res) {
  console.log('Listening on: ' + port + '...');
});
