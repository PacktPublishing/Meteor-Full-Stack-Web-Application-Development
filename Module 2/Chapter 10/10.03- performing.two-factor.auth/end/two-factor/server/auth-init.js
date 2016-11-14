ServiceConfiguration.configurations.upsert({
  service: "twitter"
}, {
  $set: {
    "consumerKey": "hM6Drus6nX9liSKJKES7MJybu",
    "secret": "YGsu7q8GRxyBpW2vjVxJdRR6otvhdfXQSyZHeOhir0j4PD5TZg"
  }
});

var verifiedField = ['services.twofactor.verified',
                     'services.twofactor.phone'];
Accounts.addAutopublishFields({
  forLoggedInUser: verifiedField,
  forOtherUsers: []
});

Accounts.onCreateUser(function(options,user) {
  check(options, Object);
  check(user, Object);
  user.services.twofactor = {};
  user.services.twofactor.code = Random.digits(6);
  user.services.twofactor.verified = false;
  user.profile = options.profile;
  return user;
});
Accounts.onLogin(function(options){
  if (options.type!=='resume'){
    Meteor.users.update(
      options.user._id,
      {$set:
       {"services.twofactor.verified":false,
        "services.twofactor.code":Random.digits(6)
       }
      }
    );
  }
});