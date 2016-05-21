'use strict';

angular.module('myApp.main', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'main/main.html',
    controller: 'MainCtrl'
  });
}])

.controller('MainCtrl',
  ['$scope', '$http', '$location', function($scope, $http, $location) {

  // Error messages
  $scope.historyError = "";
  $scope.dslError = "";

  $scope.history = [];

  // retrieve history from api
  $http.get("http://localhost:8080/api/history")
    .then(function onSuccess(response) {
      $scope.history = response.data;
    }, function onError(response) {
      $scope.historyError = "Could not retrieve history!";
    });

  $scope.et = {};

  $scope.et.uris = [{
    "method" : "GET",
    "uri" : "/example",
    "interval" : "20, 30, 200",
    "body" : ""
  }];

  $scope.addUri = function() {
    $scope.et.uris.push({
      "method" : "GET",
      "uri" : "",
      "interval" : [],
      "body" : null
    });
  };

  $scope.deleteLastUri = function() {
    var lastUri = $scope.et.uris.length - 1;
    $scope.et.uris.splice(lastUri);
  }

  // Function for submitting the DSL (running the test)
  $scope.run = function() {
      if($scope.et.uris.length == 0){
        $scope.dslError = "There needs to be atleast 1 uri defined to create an ElasticityTest!"
      } else {
        $http.post("http://localhost:8080/api/dsl", JSON.stringify($scope.et))
          .then(function onSuccess(response) {
            $location.path("/current/" + response.data);
          }, function onError(response) {
            $scope.dslError = response.data;
          });
      }
  };

}]);
