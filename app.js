var express = require('express');
var app = express();
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var url = 'mongodb://localhost/todo';
var jsonParser = require('body-parser').json();
var ObjectID = mongo.ObjectID;

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
        docs = docs.map(function(doc) {
          return {
            date: doc.date,
            text: doc.text,
            id: doc._id
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
        'text': req.body.text,
        'date': req.body.date
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

app.put('/update', jsonParser, function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (!err) {
      var todos = db.collection('todos');
      var old = { '_id': ObjectID(req.params.id) };
      var updated = {
        'text': req.body.text,
        'finished': req.body.finished
      }
      todos.updateOne(old,
        {
          $set:{
            text: updated.text,
            finished: updated.finished
          }
        }, null, function(err, results) {
          db.close();
          if (!err) {
            res.sendStatus(results.result);
          }
          else {
            res.sendStatus(500)
          }
        }
      )
    }
    else {
      res.sendStatus(500);
    }
  });
});

app.put('/remove', jsonParser, function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (!err) {
      var todos = db.collection('todos');
      var subtractive = {
        'user': req.user
      }
      if (req.body.id) {
        subtractive._id = ObjectID(req.body.id);
      }
      else {
        subtractive.text = req.body.text;
      }
      todos.deleteOne(subtractive, function(err, results) {
        db.close();
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

if (!require.main.loaded) {
  var port = process.env.PORT || 8080;
  app.listen(port, function(req, res) {
    console.log('Listening on: ' + port + '...');
  });
}

module.exports = app;
