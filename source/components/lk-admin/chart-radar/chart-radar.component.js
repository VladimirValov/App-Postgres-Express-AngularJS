angular.module('chartRadar').component('chartRadar', {
  templateUrl: 'template/chart-radar.template.html',
  controller: ChartRadarController
});

function ChartRadarController($scope) {
  this.labels =["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];

  this.data = [
   [65, 59, 90, 81, 56, 55, 40],
   [28, 48, 40, 19, 96, 27, 100]
 ];

}
// <div ng-controller="RadarCtrl">
//    <canvas id="area" class="chart chart-radar" chart-data="data"
//      chart-series="series" chart-labels="labels" chart-options="options" chart-legend = "true"></canvas>
//
//  </div>

// 'http://plnkr.co/edit/386pA8?p=preview'

// angular.module("app", ["chart.js"])
//
//   .config(['ChartJsProvider', function (ChartJsProvider) {
//     // Configure all charts
//     ChartJsProvider.setOptions({
//       chartColors: ['#FF5252', '#FF8A80', '#80b6ff', '#c980ff'],
//       responsive: true
//     });
//   }])
//
//   .controller("RadarCtrl", function($scope) {
//
//   $scope.labels = ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];
//   $scope.options = { legend: { display: true } };
//   $scope.series = ["Series A", "Series B", "Series C", "Series D"];
//
//   $scope.data = [
//     [65, 59, 90, 81, 56, 55, 40],
//     [28, 48, 40, 19, 96, 27, 100],
//     [65, 96, 37, 28, 56, 30, 27],
//     [48, 28, 30, 59, 26, 37, 60]
//   ];
//
//
// });
