var app = angular.module('todo', []);

app.controller('homeController', home);

app.$inject = ['$http'];

function home($http) {
  $http({
    method: 'GET',
    url: '/user'
  }).then(function(response) {
    vm.user = response.data
  });
  var vm = this;
  vm.message = "Welcome home"
}

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

  vm.finished = function(item) {
    var position = vm.list.indexOf(item);
    vm.list.splice(position, 1);
  }
}
