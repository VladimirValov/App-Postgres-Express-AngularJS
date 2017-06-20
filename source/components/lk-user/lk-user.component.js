angular.module('lkUser').component('lkUser', {
  templateUrl: 'template/lk-user.template.html',
  controller: LkUserController
})


function LkUserController($http, Auth /*, $state*/) {
  this.userName = Auth.getUserName();

  console.log(this.user);
}
