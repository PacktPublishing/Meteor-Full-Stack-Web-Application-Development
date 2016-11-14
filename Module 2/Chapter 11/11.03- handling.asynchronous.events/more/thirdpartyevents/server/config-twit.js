Twitter = Meteor.npmRequire('twit');
Twit = new Twitter({
  consumer_key: 'egrdttfakeconsumerkeyFMx42339eMR8',
  consumer_secret: 'fR2r02CthisnJCDtVisMij2WjNiafakeo6QPqsecretnxztb',
  access_token: 'q8thisnEkn3xMiscUhafake9I5EOAtoken3DvDZM',
  access_token_secret: '7mel7Kr8fakeaccesstokensecretdzpiDuaqtRaij914'
});
simplifyTweet = function(tweet){
  var retObj = {};
  if (!tweet) return retObj;
  retObj.created_at = tweet.created_at;
  retObj.text = tweet.text;
  retObj.user = '@' + tweet.user.screen_name;
  return retObj;
}