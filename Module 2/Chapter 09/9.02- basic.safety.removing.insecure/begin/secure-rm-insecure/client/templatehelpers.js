Template.open.helpers({
  opens: function(){
    return Cards_open.find({},{sort:{text:1}}).fetch();
  },
  shared: function(){
    return (this.shared? 'shared':null);
  }
});
Template.open.events({
  'dblclick #new-open' : function(e){
    e.preventDefault();
    var txt = 'open card# ' + Cards_open.find({}).count();
    Cards_open.insert({text:txt});
  },
  'click .text' : function(e){
    e.preventDefault();
    var shrd = (!this.shared);
    Cards_open.update({_id:this._id},{$set:{shared:shrd}});
  },
  'dblclick .id' : function(e){
    e.preventDefault();
    Cards_open.remove({_id:this._id});
  }
});