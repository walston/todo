var dotenv = require('dotenv').config();
console.log(process.env.DATABASE_URL);
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

function userUpdate () {

}

function userDelete () {

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

function itemRead () {
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

function itemUpdate () {

}

function itemDelete () {

}
