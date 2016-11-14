if (Meteor.isClient) {
  presses = new ReactiveVar;
  // counter starts at 0
  Session.setDefault("counter", 0);
  Template.hello.helpers({
    counter: function () {
      return Session.get("counter");
    },
    buttonPresses: function(){
      return presses.get();
    },
    btnRank: function(){
      return this.rank;
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
      var _presses = presses.get() || [];
      _presses.push({rank:Session.get("counter")});
      presses.set(_presses);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
