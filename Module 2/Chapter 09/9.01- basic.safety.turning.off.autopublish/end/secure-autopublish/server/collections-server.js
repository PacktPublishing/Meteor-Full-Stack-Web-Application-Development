Meteor.publish('open',function(){
  return Cards_open.find({});
});