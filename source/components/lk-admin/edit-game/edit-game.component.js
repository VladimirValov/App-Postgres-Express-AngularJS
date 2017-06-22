angular.module('editGame').component('editGame', {
  templateUrl: 'components/home-page/invite-detail/myModalContent.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: ModalComponentController
});

function ModalComponentController ($http) {
  var self = this;

  self.$onInit = function () {
    self.invite = self.resolve.invite;
    self.answer = {};
  };

  self.ok = function () {
    let inviteId = self.invite.invites[0]._id;

    if(!self.answer.isReady){
      self.answer.drinks = [];
    }

    if(self.answer.isReady){
      delete self.answer.drinks._id;
      console.log(self.answer.drinks);
    }


    $http.post('/invite/' + inviteId, self.answer).then(function (response) {
      console.log(response.data);
    });

    self.close({$value: self.answer});
  };

  self.cancel = function () {
    self.dismiss({$value: 'cancel'});
  };
}
