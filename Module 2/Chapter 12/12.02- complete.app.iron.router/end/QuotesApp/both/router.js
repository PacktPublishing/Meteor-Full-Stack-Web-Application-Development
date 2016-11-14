Router.configure({ layoutTemplate: 'layout' });

Router.map(function(){
  this.route('main', {
    path: '/',
    template:'main'
  });
  this.route('detail', {
    path: '/quote/:_id',
    template:'detail',
    data: function () {
      return Quotes.findOne({_id: this.params._id});
    }
  });
});