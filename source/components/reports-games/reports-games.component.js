angular.module('reportsGames').component('reportsGames', {
  templateUrl: 'template/reports-games.template.html',
  controller: ReportsGamesController
})


function ReportsGamesController($http, Auth /*, $state*/) {
  this.userName = Auth.getUserName();
  this.paramsReport = {}

  this.getReport = function () {
    $http.get('reports/topGame').then(report => {
      this.reportGames = report.data;
      console.log(report.data);
    })
  }
  this.getReport();
}
