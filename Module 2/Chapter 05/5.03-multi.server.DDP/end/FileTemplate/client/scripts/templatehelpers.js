Template.urls.helpers({
  bookmarks: function () {
    return URLs.find();
  },
  title: function () {
    return this.title || this.src;
  },
  editing: function () {
    return Session.equals('selMark', this._id) &&
      Session.equals('editMark', this._id);
  },
  selected: function () {
    return Session.equals('selMark', this._id) ? "panel-warning" :
    this.secType;
  },
  src: function () {
    return this.src || false;
  }
});

Template.urls.events({
  'click .bookmark': function (e) {
    Session.set('selMark', this._id);
  },
  'dblclick .bookmark': function (e) {
    Session.set('editMark', this._id);
  },
  'blur .panel-title > input': function (e) {
    if (e.currentTarget.value !== this.title) {
      Meteor.call('updateTitle', this._id, e.currentTarget.
                  value, function (err, succ) {
        console.log(succ);
      });
    }
    Session.set('editMark', null);
  },
  'keypress .panel-title > input': function (e) {
    if (e.keyCode == 13 && e.currentTarget.value !== this.title) {
      Meteor.call('updateTitle', this._id, e.currentTarget.
                  value, function (err, succ) {
        console.log(succ);
        Session.set('editMark', null);
      });
    }
  },
  'click #btnNewBM': function (e) {
    URLs.insert({
      title: 'new bookmark'
    });
  },
  'blur .input-group > input': function (e) {
    if (e.currentTarget.value !== this.src) {
      Meteor.call('updateSRC', this._id, e.currentTarget.value,
                  function (err, succ) {
        console.log(succ);
      });
    }
  },
  'keypress .input-group > input': function (e) {
    if (e.keyCode == 13 && e.currentTarget.value !== this.src) {
      Meteor.call('updateSRC', this._id, e.currentTarget.value,
                  function (err, succ) {
        console.log(succ);
      });
    }
  },
  'click .close': function (e) {
    Meteor.call('removeBM', this._id, function (err, succ) {
    });
  }
});

Template.linkcount.helpers({
  BMCount: function(){
    return BMCounts.findOne();
  }
});