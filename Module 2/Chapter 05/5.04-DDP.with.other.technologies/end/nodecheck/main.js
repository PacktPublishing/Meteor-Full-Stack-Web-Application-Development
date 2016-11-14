var DDPClient = require("ddp");
var ddpclient = new DDPClient({
  host: "localhost",
  port: 3000,
  path: "websocket",
  ssl: false,
  autoReconnect: true,
  autoReconnectTimer: 500,
  maintainCollections: true,
  ddpVersion: '1'
});

ddpclient.connect(function (error) {
  if (error) {
    console.log(error);
  } else console.log('successful connection');
  ddpclient.subscribe('urls', [], function () {
    var urls = Object.keys(ddpclient.collections.urls);
    console.log(urls);
  })
});

ddpclient.on('message', function (msg) {
  var message = ddpclient.EJSON.parse(msg);
  switch (message.msg) {
    case "added":
    case "changed":
      var url = message.fields.src;
      if (url) {
        if (!url.startsWith('https')) {
          message.fields.src = url.replace('http:',
                                           'https:');
          ddpclient.call('updateSRC',
                         [message.id, message.fields.src],
                         function (err, success) {
            if (!err) console.log(success);
          })
        }
      }
      break;
    default:
      break;
  }
});
if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str) {
    return this.slice(0, str.length) == str;
  };
}