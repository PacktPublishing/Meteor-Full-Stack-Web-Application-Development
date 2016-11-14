Meteor.publish('urls',function(){
  return URLs.find();
});
Meteor.methods({
  updateTitle: function(id,title){
    var bmark = URLs.findOne(id);
    if (!bmark) return;
    if (title&& title!==bmark.title){
      URLs.update(id,{$set:{title:title}});
      return "updated";
    }
    return "same title";
  },
  updateSRC: function(id,src){
    var bmark = URLs.findOne(id);
    if (!bmark) return;
    if (src&& src!==bmark.src){
      //Adding the http if it doesn't already have it...
      src = src.startsWith('http')? src: 'http://'+src;
      URLs.update(id,{$set:{src:src}});
      return "updated";
    }
    return "same src";
  },
  removeBM: function(id){
    URLs.remove(id);
    return "removed";
  }
});

Meteor.publish('bmcounts', function (id) {
  var self = this;
  var count = 0;
  var secCount = 0;
  var initializing = true;
  var handle = URLs.find().observeChanges({
    //TODO: Added
    added: function (idx, doc) {
      if (doc.src && doc.src.toLowerCase().startsWith('https')) {
        secCount++;
        if (!initializing)
          self.changed("bmcounts", id, {
            secureCount: secCount
          });
      } else {
        count++;
        if (!initializing)
          self.changed("bmcounts", id, {
            unsecureCount: count
          });
      }
    },
    //TODO: Removed
    removed: function (idx, doc) {
      //really inefficient...
      var bms = URLs.find().fetch();
      secCount = _.filter(bms,function(bm){
        return bm.src && bm.src.toLowerCase().startsWith('https');
      }).length;
      count = bms.length - secCount;
      self.changed("bmcounts", id, {
        unsecureCount: count,
        secureCount: secCount
      });
    },
    //TODO: Changed
    changed: function (idx, doc) {
      if (doc.src && doc.src.toLowerCase().startsWith('https')) {
        secCount++;
        count--;
        self.changed("bmcounts", id, {
          unsecureCount: count,
          secureCount: secCount
        });
      }
    }
  });
  initializing = false;
  self.added("bmcounts", id, {
    unsecureCount: count,
    secureCount: secCount
  });
  self.ready();
  self.onStop(function () {
    handle.stop();
  });
});