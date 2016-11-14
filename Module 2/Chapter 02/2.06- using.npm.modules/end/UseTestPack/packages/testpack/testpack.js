// Write your package code here!
TestPack = {
  log: function(msg){
    console.log(msg);
    Meteor.call('serverlog',msg);
  }
};
