'use strict';

angular.module('myApp.result', ['ngRoute', 'googlechart'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/result/:testName', {
    templateUrl: 'result/result.html',
    controller: 'ResultCtrl'
  });
}])

.controller('ResultCtrl',
    ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {

  $scope.testName = $routeParams.testName;

  $scope.notFoundError = "";

  $scope.etResult = {};

  $http.get("http://localhost:8080/api/result/" + $scope.testName)
    .then(function onSuccess(response){
      console.log("OK");
      console.log(response);
      $scope.etResult = response.data;
      $scope.pieChart.data = response.data.pieChartData;
      $scope.statusBarChart.data = response.data.barChartData;
    }, function onError(response){
      console.log("Notfound");
      console.log(response);
      $scope.notFoundError = response.data;
    });

  $scope.responseInstancesChart = {};
  $scope.responseInstancesChart.type = "LineChart"
  $scope.responseInstancesChart.data = {"cols": [
    {id: 'Time', label: 'Time (minutes)', type: 'number'},
    {id: 'ResponseTime', label: 'Average Response Time (Milliseconds)', type: 'number'},
    {id: 'ServerInstances', label: 'Server Instances', type: 'number'}
  ], "rows": [
    {c: [{v: 1},  {v: 37.8}, {v: 1}]},
    {c: [{v: 12},  {v: 130.9}, {v: 11}]},
    {c: [{v: 13},  {v: 125.4}, {v: 11}]},
    {c: [{v: 14},  {v: 111.7}, {v: 11}]},
    {c: [{v: 15},  {v: 111.9}, {v: 11}]},
    {c: [{v: 16},   {v: 18.8}, {v: 11}]},
    {c: [{v: 17},   {v: 17.6}, {v: 13}]}
  ]};

  $scope.responseInstancesChart.options = {
    height: 400,
    series: {
      0: {axis : 'ResponseTime'},
      1: {axis : 'ServerInstances', targetAxisIndex: 4}
    },
    axes : {
      y: {
        ResponseTime : {label : 'Response Time (Milliseconds)'},
        ServerInstances : {label: 'Server Instances'}
      }
    }
  };

  $scope.statusBarChart = {};

  $scope.statusBarChart.type = "BarChart";

  $scope.statusBarChart.data = {"cols" : [], "rows" : []};

  // $scope.statusBarChart.data = {"cols" : [
  //   {id:'URI', label:'URI', type: 'string'},
  //   {id:'OK', label:'OK', type: 'number'},
  //   {id:'BadRequest', label:'BadRequest', type: 'number'},
  //   {id:'NotFound', label:'NotFound', type: 'number'}
  // ], "rows": [
  //   {c: [{v: "/load?cpu=30"}, {v: 1000}, {v: 400}, {v: 200}]},
  //   {c: [{v: "/load?cpu=50"}, {v: 1170}, {v: 460}, {v: 250}]},
  //   {c: [{v: "/load?cpu=70"}, {v: 660}, {v: 1120}, {v: 300}]}
  // ]};

  $scope.statusBarChart.options = {
    bars: 'horizontal' // Required for Material Bar Charts.
  };

  $scope.pieChart = {};

  $scope.pieChart.type = "PieChart";

  $scope.pieChart.data = {"cols" : [], "rows" : []};

  $scope.lineChart = {};

  $scope.lineChart.type = "LineChart";

  $scope.lineChart.data = {"cols": [
    {id: 't', type: 'number', label: 'Time'},
    {id: 'rt', type: 'number', label: 'Response Time in MS'},
    {id:'i0', type:'number', role:'interval'},
    {id:'i1', type:'number', role:'interval'},
    {id:'i2', type:'number', role:'interval'},
    {id:'i2', type:'number', role:'interval'},
    {id:'i2', type:'number', role:'interval'},
    {id:'i2', type:'number', role:'interval'}
  ], "rows": [
    {c : [{v : 1}, {v : 100}, {v : 90}, {v : 110}, {v : 85}, {v : 96}, {v : 104}, {v : 120}]},
    {c : [{v : 2}, {v : 120}, {v : 95}, {v : 130}, {v : 90}, {v : 113}, {v : 124}, {v : 140}]},
    {c : [{v : 3}, {v : 130}, {v : 105}, {v : 140}, {v : 100}, {v : 117}, {v : 133}, {v : 139}]},
    {c : [{v : 4}, {v : 90}, {v : 85}, {v : 95}, {v : 85}, {v : 88}, {v : 92}, {v : 95}]},
    {c : [{v : 5}, {v : 70}, {v : 74}, {v : 63}, {v : 67}, {v : 69}, {v : 70}, {v : 72}]}
  ]};

  $scope.lineChart.options = {
    curveType: 'function',
    series: [{'color':'#D9544C'}],
    intervals: {'style':'bars'}
  };

}]);
