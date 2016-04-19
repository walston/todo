var app = angular.module('todo');

app.directive('city', city);

function city() {
  return {
    templateUrl: 'profile/city.directive.html'
  }
}
