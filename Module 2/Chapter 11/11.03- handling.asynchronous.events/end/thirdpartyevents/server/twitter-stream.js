stream = {};
Meteor.methods({
  TwitterStream: function (query) {
    if (query == 'off') {
      if (stream.stop != null) stream.stop();
      Tweets.remove({});
      return;
    }
    stream = Twit.stream('statuses/filter', {
      track: query
    });
    stream.on('tweet', Meteor.bindEnvironment(
      function (tweet) {
        var simpleT = simplifyTweet(tweet);
        console.log(simpleT);
        Tweets.insert(simpleT);
      }));
  }
})