Meteor.startup(function () {
  // code to run on server at startup
});

Meteor.methods({
  commentUpsert: function(newC){
    Comments.upsert({number:newC.number},{$set:newC});
  }
});

Meteor.publish ('comments',function(){
  return Comments.find({} , {fields:{text:false}});
});
