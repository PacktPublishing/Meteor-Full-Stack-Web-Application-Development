Template.main.helpers({
  quotes: function(){
    return Quotes.find().fetch();
  },
  tagsFormatted: function(){
    var tags = this.tags;
    if (!tags) return [];
    return _.map(tags.split(','),function(d){
      var retTag = '#' + d;
      return {tag:retTag};
    });
  }
});
Template.main.events({
  'click .quote-title' : function(e){
    Router.go('/quote/'+this._id);
  },
  'click .add-quote' : function(e){
    if (!Meteor.userId()) return;
    Quotes.insert({owner:Meteor.userId()},
                  function(e,d){
      if (!e){
        Session.set('editing',true);
        Router.go('/quote/'+d);
      }
    });
  }
});