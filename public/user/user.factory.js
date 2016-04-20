var app = angular.module('todo');

app.factory('userFactory', userFactory);

userFactory.$inject = ['$http']

function userFactory($http) {
  var service = {
    getUser: getUser
  };
  return service;

  function getUser() {
    return $http.get('/user').then(function(response) {
      return response.data;
    }, function(error) {
      console.log(error.data);
      return error.data;
    });
  }
}
