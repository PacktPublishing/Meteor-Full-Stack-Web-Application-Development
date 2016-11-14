if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    numcolor: function(){
      return colorsaurus.color();
    },
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
      colorsaurus.rainbowRoar();
    }
  });
  var colorDep = new Tracker.Dependency;
  colorsaurus = {
    color: function(){
      colorDep.depend();
      return randomColor();
    },
    rainbowRoar: function (){
      console.log('rawr');
      colorDep.changed();
    }
  };
  Tracker.autorun(function(){
    $('#btnColor').css('background-color' , colorsaurus.color());
    $('body').css('background-color', colorsaurus.color());
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
