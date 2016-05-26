var dotenv = require('dotenv').config();
var pg = require('pg');
var url = process.env.DATABASE_URL;

module.exports.create = function(table) {
  var query =
  'CREATE TABLE users(id SERIAL PRIMARY KEY, username VARCHAR(16) NOT NULL, realname VARCHAR(60) NOT NULL );' +
  'CREATE TABLE items(id SERIAL PRIMARY KEY, userid INTEGER REFERENCES users (id), text VARCHAR(40) NOT NULL, date timestamp without time zone, done BOOLEAN );' +
  "INSERT INTO users(username, realname) VALUES ('testing', 'Android Xb11');" +
  "INSERT INTO users(username, realname) VALUES ('samasy', 'Samuel Walston');" +
  "INSERT INTO users(username, realname) VALUES ('treepeople', 'Nathan Walston');" +
  "INSERT INTO items(userid, text, date, done) VALUES (3, 'Insert an item on initialization', null, false);"
  ;
  pg.connect(url, function(err, client, done) {
    if (err) console.log(err);
    client.query(query, function(err, results) {
      if (err) console.log(err);
      else console.log(results);
      done();
    })
  });
}

module.exports.delete = function() {
  pg.connect(url, function(err, client, done) {
    client.query("DROP TABLE items; DROP TABLE users;", function() {
      done();
    });
  });
}
