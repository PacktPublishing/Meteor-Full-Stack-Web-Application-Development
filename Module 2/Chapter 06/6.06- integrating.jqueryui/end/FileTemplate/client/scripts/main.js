Template.colors.helpers({
  swatches: function(){
    return Swatches.find({},{ sort: { rank:1}});
  }
})
Rankings = {
  beforeFirst: function(first) { return first - 1;},
  middle: function(before,after){ return (before+after)/2;},
  afterLast: function(last){ return last + 1; }
};

Template.colors.rendered = function(){
  this.$('#cList').sortable({
    stop: function (e,ui){
      var el = ui.item.get(0);
      var before = ui.item.prev().get(0);
      var after = ui.item.next().get(0);
      var newRank = null;
      if (!before){
        newRank = Rankings.beforeFirst(Blaze.
                                       getData(after).rank);
      } else if (!after) {
        newRank = Rankings.afterLast(Blaze.
                                     getData(before).rank);
      } else {
        newRank = Rankings.middle(Blaze.getData(before).
                                  rank,Blaze.getData(after).rank);
      }
      Swatches.update(Blaze.getData(el)._id,
                      {$set: {rank:newRank}});
    }
  });
  this.$('#btnNew').click(function(e){
    var newColor = randomColor({luminosity:'random',hue:'random'});
                                Swatches.insert({color:newColor, rank: Swatches.find().
                                count()+1});
  });
};