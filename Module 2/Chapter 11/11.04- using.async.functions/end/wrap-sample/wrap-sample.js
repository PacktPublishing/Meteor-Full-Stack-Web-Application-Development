if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      var x = 0;
      while (x < 5) {
        x++;
        var q = "" + x + ". do work";
        Meteor.call('someCall', q, function (e, d) {
          console.log(d);
        });
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
