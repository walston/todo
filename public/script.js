var app = angular.module('todo', []);

app.controller('homeController', home);

function home() {
  var vm = this;
  vm.message = "Welcome home."
}
