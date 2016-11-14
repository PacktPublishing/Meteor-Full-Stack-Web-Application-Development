if (Meteor.isClient) {
  presses = new ReactiveVar;
  counter = new ReactiveVar(0);
  Template.hello.helpers({
    counter: function () {
      return counter.get();
    },
    buttonPresses: function () {
      return presses.get();
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
    }
  });
  
  Template.helloBtn.rendered = function () {
    this.$('.pressed').click(function (e) {
      e.currentTarget.style.backgroundColor = Blaze.getData(this).
      color;
    });
  };
  
  Template.helloBtn.helpers({
    btnRank: function () {
      return this.rank;
    },
    btnColor: function () {
      return this.color;
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
