Template.display.helpers({
  imgs: function () {
    return Images.find();
  }
});
Template.display.events({
  'dblclick .display-image': function (e) {
    Images.remove({
      _id: this._id
    });
  }
});

Template.dropzone.helpers({
  dropcloth: function () {
    return Session.get('dropcloth');
  }
});
Template.dropzone.events({
  'dragover #dropzone': function (e) {
    e.preventDefault();
    Session.set('dropcloth', 'active');
  },
  'dragleave #dropzone': function (e) {
    e.preventDefault();
    Session.set('dropcloth');
  },
  'drop #dropzone': function (e) {
    e.preventDefault();
    Session.set('dropcloth');
    var files = e.originalEvent.dataTransfer.files;
    var images =
      $(e.originalEvent.dataTransfer.getData('text/html'))
      .find('img');
    var fragment = _.findWhere(e.originalEvent.dataTransfer.items, {
      type: 'text/html'
    });
    if (files.length) {
      _.each(files, function (e, i, l) {
        imgFile.read(e, function (error, imgfile) {
          Meteor.call('uploadIMG', imgfile, function (e) {
            if (e) {
              console.log(e.message);
            }
          });
        })
      });
    } else if (images.length) {
      _.each(images, function (e, i, l) {
        Meteor.call('addURL', $(e).attr('src'));
      });
    } else if (fragment) {
      fragment.getAsString(function (e) {
        var frags = $(e);
        var img = _.find(frags, function (e) {
          return e.hasAttribute('src');
        });
        if (img) Meteor.call('addURL', img.src);
      });
    }
  }
});