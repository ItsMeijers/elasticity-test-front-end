'use strict';

angular.module('myApp.current', ['ngRoute', 'ngWebSocket', 'timer'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/current/:testName', {
    templateUrl: 'current/current.html',
    controller: 'CurrentCtrl'
  });
}])

.factory('TestData', function($websocket) {
  var dataStream = $websocket("ws://localhost:8080/api/status/current")

  var collection = [];

  dataStream.onMessage(function(message) {
    console.log("Message: " + message);
    collection.push(message.data);
  });

  var methods = {
    collection : collection,
    send: function(message) {
      dataStream.send(message)
    }
  };

  return methods;
})

.controller('CurrentCtrl', ['$scope', 'TestData', function($scope, TestData) {
  $scope.TestData = TestData;

  $scope.sendMessage = function(message) {
    $scope.TestData.send(message.text);
  }
}]);
