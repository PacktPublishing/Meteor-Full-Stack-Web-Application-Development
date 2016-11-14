BMCounts = new Mongo.Collection("bmcounts");
Meteor.subscribe('urls');
Meteor.subscribe('bmcounts', new Mongo.ObjectID());

// counter starts at 0
Session.setDefault('counter', 0);

Template.hello.helpers({
  counter: function () {
    return Session.get('counter');
  }
});

Template.hello.events({
  'click button': function () {
    // increment the counter when button is clicked
    Session.set('counter', Session.get('counter') + 1);
  }
});

