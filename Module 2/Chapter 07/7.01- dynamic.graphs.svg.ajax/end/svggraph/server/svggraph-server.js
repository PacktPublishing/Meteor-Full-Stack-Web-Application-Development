Meteor.publish("commentsStream", function (country) {
  var cursor = Comments.find({
    country: country
  });
  var initializing = true;
  cursor.observeChanges({
    added: function (id, doc) {
      if (initializing) return;
      var cTots = Meteor.call('totalsByCountry', doc.country);
      var sTots = Meteor.call('totalsByState', doc.country);
      var existingTots = CountryTotals.findOne({
        country: doc.
        country
      });
      if (!sTots || !cTots) return;
      sTots = _.map(sTots, function (s, i, d) {
        s._id.total = s.total;
        if (existingTots) {
          var existingState = _.findWhere(existingTots.states, {
            state: s._id.state
          });
          if (existingState) s._id.color = existingState.color ||
            randomColor({
              luminosity: 'light',
              hue: 'blue'
            });
          else s._id.color = randomColor({
            luminosity: 'light',
            hue: 'blue'
          });
        }
        return s._id;
      });
      var cObj = {
        country: doc.country,
        total: cTots[0].total,
        states: sTots
      };
      CountryTotals.upsert({
        country: cObj.country
      }, cObj);
    }
  });
  initializing = false;
  return cursor;
});

Meteor.publish("graphData", function (country) {
  return CountryTotals.find({
    country: country
  });
});


Meteor.methods({
  addMsg: function (msg) {
    var upMsg = {};
    try {
      upMsg.country = msg.group.country;
      upMsg.state = msg.group.state;
      upMsg.category = msg.group.category.name;
      upMsg.thumb = (msg.group.group_photo ?
        msg.group.group_photo.thumb_link : "");
      upMsg.createdAt = Date.now();
    } catch (e) {
      console.log(e.message);
      return null;
    }
    Comments.insert(upMsg);
  },
  totalsByState: function (country) {
    return Comments.aggregate([
      {
        $match: {
          country: country
        }
      },
      {
        $group: {
          _id: {
            state: "$state"
          },
          total: {
            $sum: 1
          }
        }
      },
      {
        $sort: {
          "total": -1
        }
      }
    ]);
  },
  totalsByCountry: function (country) {
    return Comments.aggregate([
      {
        $match: {
          country: country
        }
      },
      {
        $group: {
          _id: {},
          total: {
            $sum: 1
          }
        }
      }
    ]);
  },
  resetDB: function () {
    Comments.remove({});
    CountryTotals.remove({});
    console.log('Collections have been reset');
  }
});


