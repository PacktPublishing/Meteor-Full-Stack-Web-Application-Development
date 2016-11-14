Meteor.startup(function(){
  Inject.rawModHtml('addUnresolved',function(html){
    return html = html.replace('<body>', '<body unresolved>');
  })
});