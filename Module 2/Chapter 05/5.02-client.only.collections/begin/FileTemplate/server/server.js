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