Meteor.methods({
  addURL: function (uri) {
    Images.insert({
      src: uri
    });
  },
  uploadIMG: function (iFile) {
    iFile.save('.images', {});
    Images.insert({
      src: 'images/' + iFile.name
    });
  }
});

var fs = Npm.require('fs');
WebApp.connectHandlers.use(function (req, res, next) {
  var re = /^\/images\/(.*)$/.exec(req.url);
  if (re !== null) {
    var filePath = process.env.PWD + '/.images/' + re[1];
    var data = fs.readFileSync(filePath, data);
    res.writeHead(200, {
      'Content-Type': 'image'
    });
    res.write(data);
    res.end();
  } else {
    next();
  }
});