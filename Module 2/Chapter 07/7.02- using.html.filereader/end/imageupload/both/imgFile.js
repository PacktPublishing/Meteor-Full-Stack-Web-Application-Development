Images = new Mongo.Collection('images');

imgFile = function (d) {
  d = d || {};
  this.name = d.name;
  this.type = d.type;
  this.source = d.source;
  this.size = d.size;
};

imgFile.fromJSONValue = function (d) {
  return new imgFile({
    name: d.name,
    type: d.type,
    source: EJSON.fromJSONValue(d.source),
    size: d.size
  });
};
imgFile.prototype = {
  constructor: imgFile,
  typeName: function () {
    return 'imgFile'
  },
  equals: function (comp) {
    return (this.name == comp.name &&
            this.size == comp.size);
  },
  clone: function () {
    return new imgFile({
      name: this.name,
      type: this.type,
      source: this.source,
      size: this.size
    });
  },
  toJSONValue: function () {
    return {
      name: this.name,
      type: this.type,
      source: EJSON.toJSONValue(this.source),
      size: this.size
    };
  }
};
EJSON.addType('imgFile', imgFile.fromJSONValue);


if (Meteor.isClient){
  _.extend(imgFile.prototype, {
    read: function (f, callback) {
      var fReader = new FileReader;
      var self = this;
      callback = callback || function () {};
      fReader.onload = function() {
        self.source = new Uint8Array(fReader.result);
        callback(null,self);
      };
      fReader.onerror = function() {
        callback(fReader.error);
      };
      fReader.readAsArrayBuffer(f);
    }
  });
  _.extend (imgFile, {
    read: function (f, callback){
      return new imgFile(f).read(f,callback);
    }
  });
};
if (Meteor.isServer){
  var fs = Npm.require('fs');
  var path = Npm.require('path');
  _.extend(imgFile.prototype, {
    save: function(dirPath, options){
      var fPath = path.join(process.env.PWD,dirPath,this.name);
      var imgBuffer = new Buffer(this.source);
      fs.writeFileSync(fPath, imgBuffer, options);
    }
  });
};