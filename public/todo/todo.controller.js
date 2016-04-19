var app = angular.module('todo');

app.controller('todoController', todo);

app.$inject = ['$http'];

function todo($http) {
  var vm = this;
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

  vm.add = function(content) {
    var todo = {
      newTodo: content
    };
    var added = $http.post('/add', todo);
    added.then(function() {
      getTodos();
    });
  }

  vm.remove = function(item) {
    var removed = $http.put('/remove', item)
    removed.then(function() {
      getTodos();
    })
  }

  vm.finished = function(item) {
    var position = vm.list.indexOf(item);
    vm.list.splice(position, 1);
  }
}