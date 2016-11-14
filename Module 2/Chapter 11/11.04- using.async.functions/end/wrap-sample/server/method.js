asyncCall = function(query,cb){
  var ranLen = ~~(Math.random()*3000);
  setTimeout(function(){
    cb && cb(null,query + " complete!");
  },ranLen);
};

Meteor.methods({
  someCall: function (query) {
    console.log('performing: '+query);
    this.unblock();
    var syncCall = Meteor.wrapAsync(asyncCall);
    var result = syncCall(query);
    return result;
  }
});