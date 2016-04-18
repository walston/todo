var app = angular.module('todo');

app.directive('add', add);

function add() {
  return {
    templateUrl: 'todo/add.directive.html'
  }
}
