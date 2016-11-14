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
    Comments.insert({text:'This is comment #',
                     number:Random.hexString(3)});
  }
});