Router.route('/api', {
  where: 'server'
})
  .get(function () {
  //write headers
  writeHeaders(this);
  //send our response...
  this.response.end('GET not supported\n');
})
  .post(function () {
  writeHeaders(this);
  var user = this.request.body.owner;
  console.log (this.request.body);
  if (!user) {
    this.response.end('No user specified...\n');
    return;
  }
  var quotes = Quotes.find({
    owner: user
  }).fetch();
  this.response.end(JSON.stringify(quotes));
})
  .put(function () {
  writeHeaders(this)
  var upQuote = this.request.body.update;
  if (!upQuote) {
    this.response.end('nothing to update');
  }
  var update = Quotes.upsert({
    _id: upQuote.id
  }, {
    $set: upQuote.changes
  });
  this.response.end('Quote accepted!...\n');
});

function writeHeaders(self) {
  self.response.statusCode = 200;
  self.response.setHeader('Content-type',
    'application/json');
  self.response.setHeader('Access-Control-Allow-Origin',
    '*');
  self.response.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
}