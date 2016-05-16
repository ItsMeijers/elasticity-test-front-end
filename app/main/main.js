'use strict';

angular.module('myApp.main', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'main/main.html',
    controller: 'MainCtrl'
  });
}])

.controller('MainCtrl', ['$scope', function($scope) {
  $scope.history = [];
  $scope.history[0] = {
    'testName': 'frontEndTest',
    'uriCount': 23,
    'dateAdded': '123-232-123',
    'lastRun': '123-231-12',
    'status': 'Running'
  };
  $scope.history[1] = {
    'testName': 'frontEndTest',
    'uriCount': 23,
    'dateAdded': '123-232-123',
    'lastRun': '123-231-12',
    'status': 'Successful'
  };
  $scope.history[2] = {
    'testName': 'frontEndTest',
    'uriCount': 23,
    'dateAdded': '123-232-123',
    'lastRun': '123-231-12',
    'status': 'Successful'
  };
  $scope.history[3] = {
    'testName': 'frontEndTest',
    'uriCount': 23,
    'dateAdded': '123-232-123',
    'lastRun': '123-231-12',
    'status': 'Error'
  };
  $scope.history[4] = {
    'testName': 'frontEndTest',
    'uriCount': 23,
    'dateAdded': '123-232-123',
    'lastRun': '123-231-12',
    'status': 'Error'
  };
}]);
