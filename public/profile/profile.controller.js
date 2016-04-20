var app = angular.module('todo');

app.controller('profileController', profile);

profile.$inject = ['userFactory'];

function profile(userFactory) {
  var vm = this;
  userFactory.getUser().then(function(user) {
    vm.user = user;
  });
}
