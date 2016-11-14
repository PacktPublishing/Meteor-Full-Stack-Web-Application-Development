// counter starts at 0
Session.setDefault('counter', 0);

Template.hello.helpers({
  greeting: function() {
    return Session.get('greeting')||'Welcome to Chapter 4';
  },
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