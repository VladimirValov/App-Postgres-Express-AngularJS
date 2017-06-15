angular.module('lkAdmin').component('lkAdmin', {
  templateUrl: 'components/lk-admin/lk-admin.template.html',
  controller: LkAdminController
})


function LkAdminController($http, Auth /*, $state*/) {
  this.userName = Auth.getUserName();

  console.log(this.user);
}
