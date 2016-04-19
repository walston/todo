var app = angular.module('todo');

app.directive('name', name);

function name() {
  return {
    templateUrl: 'profile/name.directive.html'
  }
}
