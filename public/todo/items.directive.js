var app = angular.module('todo');

app.directive('items', items);

function items() {
  return {
    templateUrl: 'todo/items.directive.html'
  }
}
