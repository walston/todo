var dotenv = require('dotenv').config();
console.log(process.env.DATABASE_URL);
var pg = require('pg');
var url = process.env.DATABASE_URL;

module.exports.create = function(table) {
  pg.connect(url, function(err, client, done) {
    client.query(
      'CREATE TABLE items(id SERIAL PRIMARY KEY, username VARCHAR(16) NOT NULL, text VARCHAR(40) NOT NULL, date timestamp without time zone, done BOOLEAN);' +
      'CREATE TABLE users(id SERIAL PRIMARY KEY, username VARCHAR(16) NOT NULL, realname VARCHAR(60) NOT NULL);'
    , function() {
      done();
    })
  });
}

module.exports.delete = function() {
  pg.connect(url, function(err, client, done) {
    client.query('DROP TABLE items; DROP TABLE users;', function() {
      done();
    });
  });
}
