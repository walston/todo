var chai = require('chai');
var assert = chai.assert;
var request = require('request');

var app = require('./app.js');
var RANDOMIZE = 0;
var server = app.listen(RANDOMIZE);
var port = server.address().port;

var testCase = {
  item: {
    text: 'Testing Testing 123',
    done: false
  }
}

describe('Todos can', function() {
  it('be added.', function(done) {
    request({
      method: 'POST',
      url: 'http://localhost:' + port + '/add',
      json: testCase
    }, function(error, response) {
      if (typeof response == 'string') {
        response = JSON.parse(response);
      }
      assert.equal(response.statusCode, 200);
      assert.equal(response.body[0].text, testCase.item.text);
      testCase.item = response.body[0];
      done();
    });
  });

  it('be returned.', function(done) {
    request('http://localhost:' + port + '/todos', function(error, response) {
      if (typeof response == 'string') {
        response = JSON.parse(response);
      }
      assert.equal(response.statusCode, 200);
      done();
    });
  });

  it('be updated.', function(done) {
    var finishedTodo = testCase;
    finishedTodo.item.done = true;
    request({
      method: 'PUT',
      url: 'http://localhost:' + port + '/update',
      json: finishedTodo
    }, function(error, response) {
      if (typeof response == 'string') {
        response = JSON.parse(response);
      }
      assert.equal(response.statusCode, 200);
      assert.equal(response.body[0].text, testCase.item.text);
      assert.equal(response.body[0].done, true);
      done();
    });
  });

  it('be deleted.', function(done) {
    request({
      method: 'DELETE',
      url: 'http://localhost:' + port + '/remove',
      json: testCase
    }, function(error, response) {
      if (typeof response == 'string') {
        response = JSON.parse(response);
      }
      assert.equal(response.statusCode, 200);
      done();
    });
  });

  after(function() {
    server.close();
  })
});
