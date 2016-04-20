var app = angular.module('todo');

app.factory('userFactory', userFactory);

userFactory.$inject = ['$http']

function userFactory($http) {
  var user;
  return {
    getUsername: getUsername,
    getUserLocation: getUserLocation,
    getUserPic: getUserPic
  }

  $http.get('/user').then(function(response) {
    user = response.data;
  });

  function getUsername() {
    return user.name;
  }

  function getUserPic() {
    return user.pic;
  }

  function getUserLocation() {
    return user.location;
  }
}
