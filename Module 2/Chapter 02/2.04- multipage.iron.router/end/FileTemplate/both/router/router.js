Router.configure({
  layout:'routeexample'
});

Router.map(function (){
  this.route('thing1', {
    path: '/'
  });
  this.route('thing2', {
    path: '/second'
  });
});
