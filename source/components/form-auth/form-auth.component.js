angular.module('formAuth').component('formAuth', {
  templateUrl: 'components/form-auth/form-auth.template.html',
  controller: FormAuthController
})


function FormAuthController($http, Auth, $state) {

  var self = this;


  this.login = function(user) {
    console.log('Auth.getToken()');
    console.log(Auth.getToken());
  //  console.log('this.authError', this.authError);

    console.log('Данные пользователя: ', user);

  //  self.authError = "Ожидание данных от сервера";

    $http.post('/login', user).then(function(response) {

      let user = response.data

      self.authError = user;
      console.log('response');
      console.log(response);

      console.log(user.token);

      if(user.token) {
        Auth.setUser(user.name, user.isAdmin, user.token);
      }

      if(user.isAdmin == true) {
        return $state.go('lk-admin');
      }

      if(user.isAdmin == false) {
    //    Auth.setUser(response.data);
        return $state.go('lk-user');
      }

    }).catch(err => {
      console.log('err.data');
     console.log(err);
      self.authError = err.data;
    })
  }
}
