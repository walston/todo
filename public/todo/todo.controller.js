var app = angular.module('todo');

app.controller('todoController', todo);

app.$inject = ['$http'];

function todo($http) {
  var vm = this;
  var showDateInput = false;
  activate();

  function activate() {
    getTodos();
  }

  function getTodos() {
    var todos = $http.get('/todos');
    todos.then(function(todo) {
      vm.list = todo.data;
    })
  }

  vm.add = function(todo) {
    var payload = {
      item: {
        text: todo.text,
        date: todo.date,
        done: false
      }
    };
    var added = $http.post('/add', payload);
    added.then(function() {
      getTodos();
    });
  }

  vm.remove = function(todo) {
    var payload = {
      item: todo
    }
    var removed = $http.delete('/remove', payload)
    removed.then(function() {
      getTodos();
    })
  }

  vm.finished = function(item) {
    var position = vm.list.indexOf(item);
    vm.list.splice(position, 1);
  }
}
