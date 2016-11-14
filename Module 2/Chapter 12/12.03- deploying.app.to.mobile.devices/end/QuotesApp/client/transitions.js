Template.layout.helpers({
  transition: function () {
    return function (from, to, element) {
      if (to.template=="main") return 'left-to-right';
      return 'right-to-left';
    }
  }
});