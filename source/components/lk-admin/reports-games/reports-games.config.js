angular.module('reportsGames')
.config(['ChartJsProvider', function (ChartJsProvider) {
   // Configure all charts
   ChartJsProvider.setOptions({
     chartColors: ['#80b6ff', '#FF5252', '#FF8A80', '#c980ff'],
     responsive: true
   });
 }])
;
