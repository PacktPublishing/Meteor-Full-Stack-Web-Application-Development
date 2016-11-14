Template.customLogin.helpers({
  profPic: function(){
    var loggedin = Meteor.user();
    return loggedin && 
      loggedin.services.twitter.profile_image_url;
  }
});

Template.customLogin.events({
  'click #login' : function(e){
    Meteor.loginWithTwitter();
  },
  'click #logout': function(e){
    Meteor.logout();
  }
});