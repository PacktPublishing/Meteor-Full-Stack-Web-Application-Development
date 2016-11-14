Template.picture.rendered = function () {
  // set the canvas we will be drawing on
  canvas = this.$('#picture');
  // set the context for the canvas
  ctx = canvas[0].getContext('2d');
  // need to properly size the canvas
  canvas.attr({
    width: 800, height: 600
    // ...AND set up tap listeners via hammer.js
  }).hammer();
  // we want to change the default threshold from 10 to 2
  canvas.data('hammer').get('pan').set({threshold:2});
  // we now set the line and line cap style
  ctx.lineJoin = ctx.lineCap = 'round';
  // Stops iOS from doing that bouncy, janky thing
  document.ontouchmove = function (event) {
    event.preventDefault();
  };

// Reactive function that reruns whenever
// preference are updated
this.autorun(function () {
  // if no prefs exist, return
  var prefs = Prefs.findOne({user:Meteor.userId()});
  if (!prefs) return;
  // set stroke color and width
  ctx.strokeStyle = prefs.color;
  ctx.lineWidth = prefs.size;
});
// Reactive function that reruns whenever
// User logs in, or our undo history position changes
this.autorun(function(){
  // if we're not logged in (no userId), return
  var userId = Meteor.userId();
  if (!userId){
    wipe();
    return;
  }
  // otherwise, paint the proper screen,
  // using the undo chain history position
  paintActivity(userId,Session.get('history')||0);
});
};

Template.picture.events({
  'panmove #picture': function (ev) {
    // we must be in drawing mode...
    if (Session.equals('drawing', true)
        && Meteor.userId()) {
      // find our cursor position
      to = getPosition(ev);
      // physically draw the stroke
      drawLine(from,to);
      // update our from position
      from = to;
    }
  },
  'panstart #picture': function (ev) {
    // get our from position, when we start drawing
    from = getPosition(ev);
    // tell everyone that we are in drawing mode
    Session.set('drawing', true);
  },
  'panend #picture': function (ev) {
    // drawing mode is over!
    Session.set('drawing', false);
    // we now record the screen, add to undo chain
    addSnapshot();
  },
  'doubletap #picture': function (ev) {
    // clear the screen
    wipe();
    // wipe out our undo history
    Meteor.call('clearActivity');
  }
});