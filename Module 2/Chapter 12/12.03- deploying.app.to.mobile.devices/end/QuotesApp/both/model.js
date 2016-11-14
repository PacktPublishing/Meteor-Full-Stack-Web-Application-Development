Quotes = new Mongo.Collection('quotes');
if (Meteor.isClient) {
  Meteor.subscribe('quotes');
} else {
  Meteor.publish('quotes', function () {
    return Quotes.find({
      owner: this.userId
    });
  })
}