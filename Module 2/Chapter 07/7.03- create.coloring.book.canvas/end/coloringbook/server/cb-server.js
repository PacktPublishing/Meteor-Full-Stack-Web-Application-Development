Meteor.methods({
  initSwatches : function(userId){
    // no user = nothing to do. return.
    if (!userId) return;
    // if we already have swatches, return.
    if (Swatches.findOne({user:userId})) return;
    // add initial swatches
    Swatches.insert({color: '#ecf0f1', user:userId});
    Swatches.insert({color: '#ccc', user:userId});
    Swatches.insert({color: '#f1c40f', user:userId});
    Swatches.insert({color: '#e67e22', user:userId});
    Swatches.insert({color: '#e74c3c', user:userId});
    Swatches.insert({color: '#2ecc71', user:userId});
    Swatches.insert({color: '#2980b9', user:userId});
    Swatches.insert({color: '#000', user:userId});
  },
  addSwatch : function (color){
    // no user = nothing to do. return.
    if (!this.userId) return;
    // if it doesn't already exist, add the swatch
    if (!Swatches.findOne({color:color})){
      Swatches.insert({color:color, user:this.userId});
    }
  },
  clearActivity : function(){
    // no user, return.
    if (!this.userId) return;
    // clear the undo history from Activities collection
    Activities.remove({user:this.userId});
  },
  breakHistory : function(snapShot){
    // if we don't have a valid snapshot,
    // or user isn't logged in, return.
    if (!snapShot||!this.userId) return;
    // remove all snapshots after this one in the undo chain
    Activities.remove({$and: [{createdAt:{$gt:snapShot.
                                          createdAt}},{user:this.userId}]})
  }
});

Accounts.onLogin(function(login){
  // first, confirm that we have a valid userId
  userId = login.user._id;
  if (!userId) return;
  // if so, and if we don't have preferences, let's initialize
  if (!Prefs.findOne({user:userId})){
    Prefs.insert({user:userId, size:11, color:'#e74c3c'});
  }
  // likewise, let's initialize swatches
  Meteor.call('initSwatches', userId);
});