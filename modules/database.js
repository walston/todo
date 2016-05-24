var dotenv = require('dotenv').config();
var pg = require('pg');
var url = process.env.DATABASE_URL;

module.exports = {
  user: {
    create: userCreate,
    read: userRead,
    update: userUpdate,
    delete: userDelete
  },
  item: {
    create: itemCreate,
    read: itemRead,
    update: itemUpdate,
    delete: itemDelete
  }
};

function userCreate (user, callback) {
  var username = user.handle;
  var realname = user.name;
  var query = 'INSERT INTO "users" ( "username", "realname" ) ' +
  'VALUES ( \'' + username + '\', \'' + realname + '\' );'
  pg.connect(url, function(err, client, done) {
    if (!err) {
      client.query(query, function(err, result) {
        done();
        if (!err) callback(result);
        else callback(new Error(err));
      });
    }
  });
}

function userRead (username, callback) {
  var query = 'SELECT * FROM "users" ' +
  'WHERE "username" = \'' + username + '\'';
  pg.connect(url, function(err, client, done) {
    if (!err) {
      client.query(query, function(err, result) {
        done();
        if (!err) callback(result);
        else callback(new Error(err));
      });
    }
  });
}

function userUpdate (id, updates, callback) {
  var query = 'UPDATE users SET ' +
  'username=\'' + updates.username + '\' ' +
  'realname=\'' + updates.realname + '\' ' +
  'WHERE id=' + id + ';';
  pg.connect(url, function(err, client, done) {
    if (!err) {
      client.query(query, function(err, result) {
        done();
        if (!err) callback(result);
        else callback(new Error(err));
      });
    }
  });
}

function userDelete (id, callback) {
  var query = 'DELETE FROM users WHERE ' +
  'id=' + id + ';';
  pg.connect(url, function(err, client, done) {
    if (!err) {
      client.query(query, function(err, results) {
        done();
        if (!err) callback(results);
        else callback(new Error(err));
      });
    }
  });
}

function itemCreate (item, callback) {
  var username = item.username;
  var text = item.text;
  var date = item.date || null;
  var done = item.done || false;
  var query = 'INSERT INTO "users" ( "username", "text", "date", "done" ) ' +
  'VALUES ( \'' + username + '\', \'' + text + '\', \'' + date + '\', \'' + done + '\' );'
  pg.connect(url, function(err, client, done) {
    if (!err) {
      client.query(query, function(err, result) {
        done();
        if (!err) callback(result);
        else callback(new Error(err));
      });
    }
  });
}

function itemRead (username, callback) {
  var query = 'SELECT * FROM "items" ' +
  'WHERE "username" = \'' + username + '\'';
  pg.connect(url, function(err, client, done) {
    if (!err) {
      client.query(query, function(err, result) {
        done();
        if (!err) callback(result);
        else callback(new Error(err));
      });
    }
  });
}

function itemUpdate (id, updates, callback) {
  var query = 'UPDATE items SET ' +
  'userid=\'' + updates.userid + '\' ' +
  'text=\'' + updates.text + '\' ' +
  'date=\'' + updates.date + '\' ' +
  'done=\'' + updates.done + '\' ' +
  'WHERE id=' + id + ';';
  pg.connect(url, function(err, client, done) {
    if (!err) {
      client.query(query, function(err, result) {
        done();
        if (!err) callback(result);
        else callback(new Error(err));
      });
    }
  });
}

function itemDelete (id, callback) {
    var query = 'DELETE FROM users WHERE ' +
    'id=' + id + ';';
    pg.connect(url, function(err, client, done) {
      if (!err) {
        client.query(query, function(err, results) {
          done();
          if (!err) callback(results);
          else callback(new Error(err));
        });
      }
    });
}
