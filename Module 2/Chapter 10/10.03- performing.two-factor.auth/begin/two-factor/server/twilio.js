sendTwilio = function (phone, message) {
  return Meteor.wrapAsync(function (phone, message, callback) {
    var Twilio = Meteor.npmRequire('twilio')
    ('[YOUR AccountSID GOES HERE]',
     '[YOUR AuthToken GOES HERE]');
    var phoneNum = '+1' + phone;
    var twilioPhone = '[TWILIO NUMBER PATTERN: +1NUMBER]';
    Twilio.sendMessage({
      to: phoneNum,
      from: twilioPhone,
      body: message
    }, function (err, msg) {
      if (err) {
        callback && callback(err);
      } else {
        callback && callback(null, msg);
      }
    });
  })(phone, message);
};