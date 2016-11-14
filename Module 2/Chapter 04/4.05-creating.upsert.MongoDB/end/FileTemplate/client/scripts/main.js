// counter starts at 0
Session.setDefault('counter', 0);

Template.hello.helpers({
  comments: function () {
    return Comments.find({},{sort:{number:-1}});
  },
  counter: function () {
    return Session.get('counter');
  }
});

Template.hello.events({
  'click button' : function () {
    // template data, if any, is available in 'this'
    if (typeof console !== 'undefined')
      console.log("You pressed the button");
    Session.set('counter', Session.get('counter') + 1);
    var newC = {
      text:'This is comment #',
      number:Random.hexString(1),
      time: moment().format('ll, hh:mm:ss')
    };
    Meteor.call('commentUpsert',newC);
  }
});