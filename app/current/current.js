'use strict';

angular.module('myApp.current', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/current', {
    templateUrl: 'current/current.html',
    controller: 'CurrentCtrl'
  });
}])

.controller('CurrentCtrl', [function() {

}]);
