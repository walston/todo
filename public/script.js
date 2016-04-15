var app = angular.module('todo', []);

app.controller('homeController', home);

app.$inject = ['$http'];

function home($http) {
  $http({
    method: 'GET',
    url: '/user'
  }).then(function(response) {
    console.log('Promised: ', response.data);
    vm.user = response.data
  });
  var vm = this;
  vm.message = "Welcome home"
}

app.controller('todoController', todo);

app.$inject = ['$http'];

function todo($http) {
  var vm = this;
  $http({
    method: 'GET',
    url: '/todos/Nathan'
  }).then(function(response) {
    vm.list = response.data
  });
}
