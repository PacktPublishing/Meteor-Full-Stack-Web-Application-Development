if (Meteor.isClient) {
  presses = new ReactiveVar;
  counter = new ReactiveVar(0);
  Template.hello.helpers({
    counter: function () {
      return counter.get();
    },
    buttonPresses: function () {
      return presses.get();
    },
    btnRank: function () {
      return this.rank;
    },
    btnColor: function () {
      return this.color;
    }
  });

  Template.hello.events({
    'click #addBtn': function () {
      // increment the counter when button is clicked
      counter.set(counter.get() + 1);
      var _presses = presses.get() || [];
      var newBtn = {
        color: randomColor(),
        rank: counter.get()
      };
      _presses.push(newBtn);
      presses.set(_presses);
    },
    'click #chgColor': function () {
      var rndBtn = ~~(Math.random() * counter.get());
      $('.pressed')[rndBtn].style.backgroundColor = '';
    },
    'click .pressed': function (e, n) {
      e.currentTarget.style.backgroundColor = this.color;
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
