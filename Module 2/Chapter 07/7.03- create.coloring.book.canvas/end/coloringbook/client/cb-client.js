Session.setDefault('drawing', false);
Session.setDefault('color', '#e74c3c');

// **drawLine** -- helper function to draw / erase lines
drawLine = function (from, to, color,size) {
  if (size)
    ctx.lineWidth = size;
  if (color)
    ctx.strokeStyle = color;
  if (Session.get('erase')){
    ctx.globalCompositeOperation = 'destination-out';
  } else {
    ctx.globalCompositeOperation = 'source-over';
  }
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.closePath();
  ctx.stroke();
}

// **getPosition** -- helper function to calculate cursor position
getPosition = function (event) {
  return {
    x: parseInt(event.gesture.center.x - event.currentTarget.
                offsetLeft),
    y: parseInt(event.gesture.center.y - event.currentTarget.
                offsetTop)
  };
}
// **wipe** -- function to clear the painting area
wipe = function (emitAlso) {
  ctx.clearRect(0, 0, canvas.attr('width'),
                canvas.attr('height'));
}

// **addSnapshot** -- helper function to save strokes and updateundo history
addSnapshot = function(){
  var userId = Meteor.userId();
  if (!userId) return;
  //Convert Canvas into a Picture
  ctx.globalCompositeOperation = 'source-over';
  var canvasPic = canvas[0].toDataURL();
  var timestamp = Date.now();
  // check current history. if we are in undo-land, need to clean
  // up snapshots
  var curHist = Session.get('history');
  if (curHist){
    var curSnap = Session.get('currentSnapshot');
    Meteor.call('breakHistory',curSnap);
    Session.set('history',0);
  }
  // Save it to our Activities History
  Activities.insert({
    user:userId,
    canvas:canvasPic,
    createdAt:timestamp
  });
};

// **paintActivity** -- helper function to redraw screen on undo/
// redo/draw
paintActivity = function(userId,idx){
  var latestActs = Activities.find({user:userId},
  {sort:{createdAt:-1}}).fetch();
  if (!latestActs.length) {
    return;
  }
  if(!latestActs[idx]) idx = latestActs.length-1;
  wipe();
  var imageObj = new Image();
  imageObj.onload = function () {
    ctx.drawImage(this, 0, 0);
  };
  Session.set('currentSnapshot',latestActs[idx]);
  imageObj.src = latestActs[idx].canvas;
};