var app = angular.module('todo');

app.controller('profileController', profile);

app.$inject = ['$http'];

function profile($http) {
  var vm = this;
  activate();

  function activate() {
    getUser();
  }

  function getUser() {
    var userInfo = $http.get('/user');
    userInfo.then(function(user) {
      vm.user = user.data;
    });
  }
}
