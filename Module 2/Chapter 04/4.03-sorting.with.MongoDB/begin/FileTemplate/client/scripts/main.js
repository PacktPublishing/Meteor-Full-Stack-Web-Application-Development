// counter starts at 0
Session.setDefault('counter', 0);

Template.hello.helpers({
  comments: function () {
    return Comments.find();
  },
  counter: function () {
    return Session.get('counter');
  }
});

Template.hello.events({
  'click button': function () {
    // increment the counter when button is clicked
    Session.set('counter', Session.get('counter') + 1);
    Comments.insert({
      text: 'This is comment #' + (Comments.find().count() + 1)
    });
  }
});