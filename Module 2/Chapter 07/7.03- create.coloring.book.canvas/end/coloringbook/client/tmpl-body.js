Template.body.events({
  'keydown' : function(ev){
    // if there's no undo history, no reason to continue,
    // so return.
    var histLength = Activities.find({user:Meteor.userId()}).
    fetch().length;
    if (!histLength) return;
    // If it's not a CTRL+Z or CMD+Z, we don't care, so
    // return.
    if ((!ev.metaKey && !ev.ctrlKey)||(ev.keyCode!==90))
      return;
    // find the current position in the undo chain, if any.
    var curHist = Session.get('history')||0;
    // if it was SHIFT+CMD+Z, it means redo, so decrement
    // the history
    if (ev.shiftKey)
      curHist--;
    // otherwise, increment the history
    else
      curHist++;
    // if we're past the boundaries of TIME and SPACE we
    // certainly don't care about JavaScript anymore, so
    // let's return.
    if(curHist<0 || curHist> histLength-1 ) return;
    // after all that, set the new undo chain position
    Session.set('history',curHist);
  }
});