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

function userRead (id, callback) {
  var query = 'SELECT * FROM "users" ' +
  'WHERE id = ' + id + ';';
  pg.connect(url, function(err, client, done) {
    if (!err) {
      client.query(query, function(err, result) {
        done();
        if (!err) callback(result.rows[0]);
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

function itemCreate (userid, item, callback) {
  var userid = userid;
  var text = item.text;
  var date = item.date || null;
  var done = item.done || false;
  var query = 'INSERT INTO "items" ( "userid", "text", "date", "done" ) ' +
  'VALUES ( ' + userid + ', \'' + text + '\', ' + date + ', ' + done + ' );'
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

function itemRead (userid, callback) {
  var query = 'SELECT * FROM "items" ' +
  'WHERE "userid" = ' + userid + ';';
  pg.connect(url, function(err, client, done) {
    if (!err) {
      client.query(query, function(err, result) {
        done();
        if (!err) callback(result.rows);
        else callback(new Error(err));
      });
    }
  });
}

function itemUpdate (userid, id, update, callback) {
  // can you check if id belongs to userid?
  // maybe an auth parameter?
  var query = 'UPDATE items SET ' +
  'text=\'' + update.text + '\', ' +
  'date=' + update.date + ', ' +
  'done=' + update.done + ' ' +
  'WHERE id=' + id + ' AND userid=' + userid + ' ' +
  'RETURNING * ;';
  pg.connect(url, function(err, client, done) {
    if (!err) {
      client.query(query, function(err, result) {
        done();
        if (!err) callback(result.rows[0]);
        else callback(new Error(err));
      });
    }
  });
}

function itemDelete (userid, id, callback) {
    var query = 'DELETE FROM items WHERE ' +
    'id=' + id + 'AND userid=' + userid + ';';
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
