Template.navcolor.events({
  'click #bgCheck': function (e, c) {
    Session.set('useBG', e.currentTarget.checked);
  },
  'change #bgColor, keyup #bgColor': function (e, c) {
    if (!Session.equals('bgColor', e.currentTarget.value)) {
      Session.set('bgColor', e.currentTarget.value);
    }
  }
});
