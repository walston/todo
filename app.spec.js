var chai = require('chai');
var assert = chai.assert;
var request = require('request');

var app = require('./app.js');
var RANDOMIZE = 0;
var server = app.listen(RANDOMIZE);
var port = server.address().port;

describe('Todos can', function() {
  it('be returned.', function(done) {
    request('http://localhost:' + port + '/todos', function(error, response) {
      assert.equal(response.statusCode, 200);
      done();
    });
  });

  it('be added.', function(done) {
    request({
      method: 'POST',
      url: 'http://localhost:' + port + '/add',
      json: { text: '1c0uamb8;ahdgjpsyun3mvbi-a' }
    }, function(error, response) {
      assert.equal(response.statusCode, 200);
      done();
    });
  });

  it('be deleted.', function(done) {
    request({
      method: 'PUT',
      url: 'http://localhost:' + port + '/remove',
      json: { text: '1c0uamb8;ahdgjpsyun3mvbi-a' }
    }, function(error, response) {
      assert.equal(response.statusCode, 200);
      assert.isAbove(response.body.n, 0);
      done();
    });
  });

  after(function() {
    server.close();
  })
});
