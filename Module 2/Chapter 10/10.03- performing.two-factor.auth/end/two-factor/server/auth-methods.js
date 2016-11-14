Meteor.methods({
  sendChallenge : function (phone){
    if (!this.userId) return;
    var newCode = Random.digits(6);
    if (phone!=null){
      Meteor.users.update(
        this.userId,
        {$set:
         {"services.twofactor.phone":phone,
          "services.twofactor.code":newCode}});
    } else {
      Meteor.users.update(
        this.userId,
        {$set:
         {"services.twofactor.code":newCode}});
    }
    var curUser = Meteor.users.findOne(this.userId);
    return sendTwilio(curUser.services.twofactor.phone, curUser.
                      services.twofactor.code);
  },
  verifyCode : function(code){
    if (!this.userId) return;
    var curUser = Meteor.users.findOne(this.userId);
    if (!curUser) return;
    if (curUser.services.twofactor.code == code){
      Meteor.users.update(
        this.userId,
        {$set:
         {"services.twofactor.verified":true}});
    }
  }
});