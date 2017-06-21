angular.module('reportsGames').component('reportsGames', {
  templateUrl: 'template/reports-games.template.html',
  controller: ReportsGamesController
})


function ReportsGamesController($http, Auth /*, $state*/, $scope) {
  this.userName = Auth.getUserName();

  this.getReport = function (params) {
    $http.get('reports/topGame',{params: params}).then(report => {
      this.reportGames = report.data;
      console.log(report.data);
    })
  }
  this.getReport();



  $scope.open1 = function() {
   $scope.popup1.opened = true;
 };

 $scope.open2 = function() {
   $scope.popup2.opened = true;
 };

 $scope.setDate = function(year, month, day) {
   $scope.dt = new Date(year, month, day);
 };

 $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
 $scope.format = $scope.formats[2];

 $scope.popup1 = {
   opened: false
 };

 $scope.popup2 = {
   opened: false
 };








}
