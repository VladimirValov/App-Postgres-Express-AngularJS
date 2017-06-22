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

    // this.getReportGames(params).then(userGames => {
    //   return this.getReportAllGames().then(allGames => {
    //     this.games = userGames;
    //     console.log('GAMES', this.games.length)
    //
    //     const chartUserGames = makeChartParams(userGames);
    //     const chartAllGames = makeChartParams(allGames);
    //
    //     console.log(chartAllGames.data, chartUserGames.data);
    //
    //     this.chartParams = {
    //       labels: chartAllGames.labels,
    //       data: [chartAllGames.data, [], chartUserGames.data]
    //     }
    //   })
    // })

    $q.all([this.getReportAllGames(), this.getReportGames(params)]).then(result => {


      this.chartParams = makeChartParams2(...result);

      console.log(this.chartParams);

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



// function makeChartParams(etalon, second) {
// //etalon  задает label
//   let index = 0;
//   let labels = []
//   let data1 = [];
//   let data2 = [];
//
//   for (var i = 0; i < etalon.length; i++) {
//     let el1 = etalon[i];
//     labels.push(el1.name);
//     data1.push(el1.count);
//
//     let el2 = {};
//
//     for (var j = 0; j < second.length; j++) {
//       if (second[j].name == el1.name ) el2 = second[j];
//     }
//
//     data2.push(el2.count || 0);
//   }
//
//     console.log('data1,data2');
//     console.log(labels, data1, data2);
//
//
//  return {
//    labels: labels,
//    data: [data1, [], data2]
//  }
// }

function makeChartParams2(fullList, userList, key = "count") {
  const fullData = [];
  const userData = [];

  fullList.forEach(game => {
    const userGame = userList.filter(item => item.name == game.name)[0];

    fullData.push(game[key]);
    userData.push(userGame && userGame[key] || 0);
  });

 return {
   labels: fullList.map(game => game.name),
   data: [fullData, [], userData]
 }
}

//
// function getChart(data) {
//   let chart = {
//     labels:[],
//     data: []
//   }
//
//  data.forEach(game => {
//    chart.labels.push(game.name);
//    chart.data.push(game.count);
//  })
//  return chart;
// }
