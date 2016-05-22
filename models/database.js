var dotenv = require('dotenv').config();
console.log(process.env.DATABASE_URL);
var pg = require('pg');
var url = process.env.DATABASE_URL;
var client = new pg.Client(url);

module.exports.create = function() {
  client.connect();
  var query = client.query(
    'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, date timestamp without time zone, done BOOLEAN)'
  , function() {
    client.end();
  });
}

module.exports.delete = function() {
  client.connect();
  var drop = client.query('DROP TABLE items', function() {
    client.end();
  });
}
