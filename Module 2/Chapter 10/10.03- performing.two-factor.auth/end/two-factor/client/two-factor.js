if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    },
    btnState: function(){
      var curUser =Meteor.user();
      if (curUser && curUser.services.twofactor.verified)
        return 'btn-success';
      return 'btn-danger';
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      var curUser =Meteor.user();
      if (curUser && curUser.services.twofactor.verified) {
        Session.set('counter', Session.get('counter') + 1);
      } else {
        alert ('not authorized!');
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
