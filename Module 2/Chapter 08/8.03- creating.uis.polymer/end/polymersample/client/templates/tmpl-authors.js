Template.authors.helpers({
  authors: function () {
    return Authors.find().fetch();
  }
});

Template.authors.events({
  'dblclick polymer-github-card': function(e){
    Authors.remove({_id:this._id});
  }
});