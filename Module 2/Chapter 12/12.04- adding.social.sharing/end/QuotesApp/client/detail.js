Template.detail.helpers({
  tagsFormatted: function () {
    var tags = this.tags;
    if (!tags) return [];
    return _.map(tags.split(','), function (d) {
      var retTag = '#' + d;
      return {
        tag: retTag
      };
    });
  },
  editbuttonstate: function () {
    return (Session.get('editing')) ?
      'glyphicon-ok' : 'glyphicon-pencil';
  },
  editing: function () {
    return (Session.equals('editing', true));
  },
  tweetText: function (){
    return (this.tweeted)?'shared':'share...';
  },
  tweetColor: function (){
    return (this.tweeted)?'btn-success':'btn-info';
  }
});

Template.detail.events({
  'click .toggle-edit': function (e) {
    e.preventDefault();
    var editflag = Session.equals('editing', true);
    if (editflag && Meteor.userId()) {
      var upQuote = {};
      upQuote.title = $('#input-title').val();
      upQuote.quote = $('#input-quote').val();
      upQuote.author = $('#input-author').val();
      upQuote.tags = $('#input-tags').val();
      upQuote.owner = Meteor.userId();
      Quotes.upsert({
        _id: this._id
      }, {
        $set: upQuote
      });
    }
    if (!editflag && !Meteor.userId()) return;
    Session.set('editing', (!editflag));
  },
  'click #btn-tweet' : function (e) {
    if (this.tweeted) return;
    Meteor.call('twuote',this._id);
  }
});