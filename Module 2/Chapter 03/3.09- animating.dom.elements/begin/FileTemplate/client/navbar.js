Template.navshapes.events({
  'click button.btn': function(e,c){
    Session.set('curTemplate',e.currentTarget.textContent);  
  }
});
