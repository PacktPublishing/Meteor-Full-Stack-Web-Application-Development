Template.navshapes.events({
  'click button.btn': function(e,c){
    Session.set('curTemplate',e.currentTarget.textContent);  
  }
});

Template.navoffset.events({
  'click button.btn': function(e,c){
    var shapes = ($('rect').length)? $('rect'):$('circle');
    if (shapes.length==0) return;
    var offset = e.currentTarget.dataset.offset;
    _.each(shapes,function(d,i){
      var randVal = Math.ceil(Math.random()*200)+'px';
      var randOffset = offset+randVal;
      var translate = ('translate('+randOffset+','+randOffset+')');
      $(d).css('transform',translate);
    });
  }
});
