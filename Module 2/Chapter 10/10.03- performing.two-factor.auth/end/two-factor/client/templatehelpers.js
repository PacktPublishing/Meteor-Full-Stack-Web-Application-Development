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

Template.secondLogin.helpers({
  verified: function(){
    var curUser = Meteor.user();
    return (curUser&&curUser.services.twofactor.verified);
  },
  defaultPhone: function(){
    var curUser = Meteor.user();
    return curUser && curUser.services.twofactor.phone;
  }
});

Template.secondLogin.events({
  'click #btnChallenge' : function (e){
    var phoneNum = $('#phoneNum').val();
    if (!phoneNum.length)
      phoneNum = $('#phoneNum').attr('placeholder');
    if (!phoneNum.length==10) return;
    Meteor.call('sendChallenge',phoneNum);
  },
  'click #btnVerify' : function(e){
    var verCode = $('#verCode').val();
    if (!verCode.length==6) return;
    Meteor.call('verifyCode',verCode);
  }
});