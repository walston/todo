var app = angular.module('todo', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/todo', {
    templateUrl: 'todo/todo.view.html',
    controller: 'todoController',
    controllerAs: 'todo'
  })
  .when('/profile', {
    templateUrl: 'profile.html',
    controller: 'profileController',
    controllerAs: 'profile'
  })
}])
