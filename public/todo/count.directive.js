var app = angular.module('todo');

app.directive('count', count);

function count() {
  return {
    templateUrl: 'todo/count.directive.html'
  }
}
