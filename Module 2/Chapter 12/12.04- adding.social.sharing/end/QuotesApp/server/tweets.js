Meteor.methods({
  twuote : function(id){
    if (!id || !this.userId) return;
    var quote = Quotes.findOne({_id:id});
    if (!quote || !quote.quote || !quote.author) return;
    var tweet = '"';
    if (quote.quote.length>138){
      tweet += quote.quote.slice(0,135);
      tweet += '..."';
    } else {
      tweet += quote.quote + '" --' + quote.author;
    }
    if (tweet.length>140){
      tweet = tweet.slice(0,137) + '...';
    }
    Twit.post('statuses/update', { status: tweet },
              Meteor.bindEnvironment(function(err, data, response) {
      Quotes.update({_id:id},{$set:{tweeted:true}});
    })
             );
    return tweet;
  }
});