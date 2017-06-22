angular.module('reportsGames').component('reportsGames', {
  templateUrl: 'template/reports-games.template.html',
  controller: ReportsGamesController
})





function ReportsGamesController($http, Auth /*, $state*/, $scope) {
  this.userName = Auth.getUserName();

  this.getReportGames = function (params) {
    this.games = []; //таблица результатов
    this.chartParams = {
      labels: [],
      data:[[], [], []],
      options: {}
    };

    const userGames = $http.get('reports/topGame',{params: params}).then(report => {
      this.games = report.data; //таблица результатов

      let params = getChartParams(this.games);
      this.chartParams.labels= params.labels;
      this.chartParams.data[2] = params.data; // параметры графика по текущим условиям
      return params;
   })


   const allGames = $http.get('reports/topGame').then(report => {
     let allGames = report.data;

     let params = getChartParams(allGames);
     this.chartParams.data[0] = params.data.map(el => (el > 5 && el < 10) ? +el +5: +el +15); // параметры графика по текущим условиям

     return params;
   })
   console.log(userGames);
   console.log(allGames);

   Promise.all(userGames, allGames).then(result => {})






}


  this.getReportGames ();




  this.getUsers = function() {
    $http.get('/users').then(users => {
      this.usersList=users.data;
    })
  }
  this.getUsers();


  // компонент выбора даты

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

function getChartParams(data) {
  let chart = {
    labels:[],
    data: []
  }

 data.forEach(game => {
   chart.labels.push(game.name);
   chart.data.push(game.count);
 })
 return chart;
}
