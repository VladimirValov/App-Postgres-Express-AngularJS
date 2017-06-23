angular.module('reportsGames').component('reportsGames', {
  templateUrl: 'template/reports-games.template.html',
  controller: ReportsGamesController
})


function ReportsGamesController($http, $q, Auth /*, $state*/, $scope) {
  this.userName = Auth.getUserName();
  this.games = []; //таблица результатов


  this.getReportGames = function (params) {
    return $http.get('reports/topGame',{params: params}).then(report => {
      let games = report.data; //таблица результатов
      this.games = games;
  //    console.log('games', games);
      return games;
   })
  }

  this.getReportAllGames = function () {
    return $http.get('reports/topGame').then(report => {
      let allGames = report.data;
//      console.log('allGames', allGames);
      return allGames;
     })
  }

  this.refreshReport = function (params){
    console.log(params.users);

    if (!params.users) {
          console.log("111111");
      return this.getReportGames().then(result => {
        this.chartParams = makeChartParamsForOne(result);
      })
    }


    $q.all([this.getReportAllGames(), this.getReportGames(params)]).then(result => {
      this.chartParams = makeChartParamsForTwo(...result);
    }).catch(err => {
      console.log(err);
    })
  }

this.refreshReport({users: ""});


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



function makeChartParamsForTwo(fullList, userList, key = "count") {
  const fullData = [];
  const userData = [];

  fullList.forEach(game => {
    const userGame = userList.filter(item => item.name == game.name)[0];

    fullData.push(game[key]);
    userData.push(userGame && userGame[key] || 0);
  });

 return {
   labels: fullList.map(game => game.name),
   data: [fullData, userData],
   series: ["All Users", "Current User"],
   options: { legend: { display: true } }
 }
}

function makeChartParamsForOne(userList, key = "count") {
 return {
   labels: userList.map(game => game.name),
   data: [ userList.map(game => game[key]) ],
 }
}
