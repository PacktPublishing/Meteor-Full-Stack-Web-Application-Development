Meteor.methods({
  dropTable: function(){
    Test.remove({});
  }
});