var app = angular.module('todo');

app.directive('greeting', greeting);

function greeting() {
  return {
    templateUrl: 'home/greeting.directive.html'
  }
}
