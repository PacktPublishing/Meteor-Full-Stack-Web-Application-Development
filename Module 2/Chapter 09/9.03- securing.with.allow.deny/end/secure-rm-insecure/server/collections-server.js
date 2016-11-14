Meteor.publish('open',function(){
  return Cards_open.find({});
});

Cards_open.allow({
  insert : function(userId,doc){
    return (userId!=null);
  },
  update : function(userId,doc,fieldNames,modifier){
    return (doc.owner==userId);
  },
  remove : function(userId,doc){
    return (doc.owner==userId);
  }
});