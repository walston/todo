var chai = require('chai');
var assert = chai.assert;
var request = require('request');

var app = require('./app.js');
var RANDOMIZE = 0;
var server = app.listen(RANDOMIZE);
var port = server.address().port;

var testCase = {
  text: 'Testing Testing 123',
}

describe('Todos can', function() {
  it('be added.', function(done) {
    request({
      method: 'POST',
      url: 'http://localhost:' + port + '/add',
      json: testCase
    }, function(error, response) {
      assert.equal(response.statusCode, 200);
      testCase._id = response.body._id;
      done();
    });
  });

  it('be returned.', function(done) {
    request('http://localhost:' + port + '/todos', function(error, response) {
      assert.equal(response.statusCode, 200);
      done();
    });
  });

  it('be deleted.', function(done) {
    console.log(testCase);
    request({
      method: 'PUT',
      url: 'http://localhost:' + port + '/remove',
      json: testCase
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
