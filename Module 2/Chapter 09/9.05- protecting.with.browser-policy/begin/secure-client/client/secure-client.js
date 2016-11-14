if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      try {
        var x = Test.find().count();
        Session.set('counter', eval("x*2"));
      } catch (err) {
        console.log('ERROR: ', err);
      }
      return x;
    },
    dblCounter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Test.insert({action:'click'});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
