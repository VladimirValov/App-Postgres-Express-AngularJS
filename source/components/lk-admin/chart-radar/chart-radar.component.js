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
