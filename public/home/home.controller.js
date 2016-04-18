var app = angular.module('todo');

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
  vm.message = "Hi"
}
