angular.module('gameApp').config(function($stateProvider) {

  const loginState = {
    name: 'login',
    url: '/login',
    component: 'formAuth'
  }

  const lkAdminState = {
    name: 'lk-admin',
    url: '/lk-admin',
    component: 'lkAdmin'/*,
    onEnter: checkAdmin*/
  }

  const reportsGamesState = {
    name: 'lk-admin.reports-games',
    url: '/reports-games',
    component: 'reportsGames'
  }
  const reportsUsersState = {
    name: 'lk-admin.reports-users',
    url: '/reports-users',
    component: 'reportsUsers'
  }

  const gameListState = {
    name: 'lk-admin.game-list',
    url: '/game-list',
    component: 'gameList'
  }

  const lkUserState = {
    name: 'lk-user',
    url: '/lk-user',
    component: 'lkUser',
    onEnter: checkAuth
  }

  const logoutState = {
    name: 'logout',
    url: '/logout',
    template: '<h2>Вы покинули сайт</h2> <a ui-sref="login">Войти</a>',
    onEnter: logoutFunc
  }


  $stateProvider.state(loginState);

  $stateProvider.state(lkAdminState);
  $stateProvider.state(reportsGamesState);
  $stateProvider.state(reportsUsersState );
  $stateProvider.state(gameListState);
  
  $stateProvider.state(lkUserState);
  $stateProvider.state(logoutState);
});


function checkAuth( Auth, $state ) {
  console.log("Token: ", Auth.getToken());

  if (!Auth.getToken()) {
    console.log("Не авторизованный пользователь");
    return $state.go('login');
  }
}

function checkAdmin( Auth, $state ) {
  console.log("checkAdmin");

  if ( !(Auth.getToken() && Auth.isAdmin()) ) {
    console.log("Пользователь не администратор!");
     return $state.go('lk-user');
  }
}

function logoutFunc(Auth) {
  Auth.logout();
}
