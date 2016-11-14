Meteor.publish('open', function () {
  return Cards_open.find({
    $or: [{
        shared: true
      },
      {
        owner: this.userId
      }
                          ]
  }, {
    fields: {
      owner: 0
    }
  });
});

Cards_open.allow({
  insert: function (userId, doc) {
    return (userId != null);
  },
  update: function (userId, doc, fieldNames, modifier) {
    return (doc.owner == userId);
  },
  remove: function (userId, doc) {
    return (doc.owner == userId);
  }
});

Cards_open.deny({
  insert: function (userId, doc) {
    return (doc.owner != userId);
  },
  update: function (userId, doc, fieldNames, modifier) {
    return (fieldNames.length != 1 || !(~fieldNames.indexOf('shared')));
  }
});