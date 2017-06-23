angular.module('reportsUsers').component('reportsUsers', {
  templateUrl: 'template/reports-users.template.html',
  controller: ReportsUsersController
});

function ReportsUsersController($http, $q) {

  this.players =[];
  this.games = []

  this.usersList = [];
  this.chartParamsAvg ={}
  this.chartParamsCount ={}

  //Запрос списка пользователей
  $http.get('/users').then(users => {
      this.usersList=users.data;
  })




  this.refreshReport = function (params) {

    console.log(params);

    if(!params.users) {
      //Результаты по всем Игрокам
      return $http.get('/reports/topUser').then(players => {
        this.players = players.data;
        this.games = [];
        this.chartParamsAvg = makeChartParamsOne(this.players, 'avgscore');
        this.chartParamsCount = makeChartParamsOne(this.players, 'count');
      })
    }

    //Результаты по выбранному игроку
    $http.get('reports/topGame', {params: params}).then(games => {
      this.games = games.data;
      this.players = [];
      this.chartParamsAvg = makeChartParamsOne(this.games, 'avgscore');
      this.chartParamsCount = makeChartParamsOne(this.games, 'count');
    })
  }

  this.refreshReport({users: ""});

}



function makeChartParamsOne(players, key) {
  return {
    labels: players.map(el => el.name),
    data: [ players.map(el => el[key]) ]
  }
}
