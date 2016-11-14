// counter starts at 0
Session.setDefault('counter', 0);

Template.hello.helpers({
  counter: function () {
    return Session.get('counter');
  }
});

Template.hello.events({
  'click button' : function () {
    Router.current().route.getName()=='thing1'? Router.go('thing2'): Router.go('thing1');
  }
});
