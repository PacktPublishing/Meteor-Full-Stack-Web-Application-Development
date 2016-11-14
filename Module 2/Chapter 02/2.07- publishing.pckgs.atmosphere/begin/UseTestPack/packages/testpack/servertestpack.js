var colors = Npm.require('colors');

Meteor.methods({
  serverlog : function(msg){
    console.log(msg.rainbow);
  }
});
