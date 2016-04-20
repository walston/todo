var app = angular.module('todo');

app.controller('homeController', home);

home.$inject = ['userFactory'];

function home(userFactory) {
  var vm = this;
  vm.message = "Hi"
  userFactory.getUser().then(function(user) {
    vm.user = user
  });
}
