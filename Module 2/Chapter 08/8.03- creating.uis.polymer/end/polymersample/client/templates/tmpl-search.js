Template.search.events({
  'keypress #sInput' : function(e){
    if (e.keyCode!=13) return;
    addAuthor();
  },
  'click paper-button': function(e){
    addAuthor();
  }
});
function addAuthor(){
  var sInput = $('#sInput'),
      sVal = sInput.val();
  sInput.blur();
  if (!sVal || (Authors.findOne({userid:sVal}))) return;
  sInput.val('');
  Authors.insert({userid:sVal});
}