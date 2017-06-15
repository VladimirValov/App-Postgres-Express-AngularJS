angular.module('gameApp').config(function($stateProvider) {

  const loginState = {
    name: 'login',
    url: '/login',
    component: 'formAuth'
  }

  const lkAdminState = {
    name: 'lk-admin',
    url: '/lk-admin',
    component: 'lkAdmin',
    onEnter: checkAdmin
  }

  const lkUserState = {
    name: 'lk-user',
    url: '/lk-user',
    component: 'lkUser',
    onEnter: checkAuth
  }


  $stateProvider.state(loginState);
  $stateProvider.state(lkAdminState);
  $stateProvider.state(lkUserState);
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
