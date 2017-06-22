angular.module('gameList').component('gameList', {
  templateUrl: 'template/game-list.template.html',
  controller: GameListController
});

function GameListController($http, $animate ) {
//  $http.defaults.headers.common.Authorization = 'Basic YmVlcDpib29w';

  this.getGames = function () {
    $http.get('/games').then(games => {
      this.games = games.data;
      this.targetGame = {};
    });
  }
  this.getGames();

  this.chooseGame = function(index, game) {
    this.targetGame = Object.assign({}, game);
    this.targetGame.status = "Выбор игры";
  }

  this.createGame = function (game) {
    if(game) {
        $http.post('/games', game).then(result => {
          console.log(result.data);
          this.games.unshift(result.data);
        }).catch(err => { console.log(err);})
    }
  }

  this.deleteGame = function() {
    this.targetGame.status = "Отправлен запрос на удаление";
    $http.delete('/games/' + this.targetGame.id).then(result => {
      this.getGames();
    }).catch(err => {
      this.targetGame.status = err.data;
    })
  }

  this.changeGame = function() {
    this.targetGame.status = "Отправлен запрос на изменение";
    let params = {
      name: this.targetGame.name,
      code: this.targetGame.code
    }
     $http.put('/games/' + this.targetGame.id, params).then(result => {
       console.log(result.data);
       this.getGames();
     })
  }
}
