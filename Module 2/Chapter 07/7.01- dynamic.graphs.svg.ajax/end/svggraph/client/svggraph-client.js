Session.setDefault("country", "us");
Session.setDefault("msgComment", "No comments yet");
Session.setDefault("msgPic",
  "https://d14jjfgstdxsoz.cloudfront.net/meteor-logo.png");

Tracker.autorun(function () {
  Meteor.subscribe("graphData", Session.get('country'));
  Meteor.subscribe("commentsStream",
    Session.get('country'));
});

Template.cPic.helpers({
  curPic: function () {
    return Session.get('msgPic');
  },
  curComment: function() {
    return Session.get('msgComment');
  },
  stateStats: function () {
    var ct = CountryTotals.findOne({country:Session.
                                    get('country')});
    if (!ct) return [];
    var stateTotals = ct.states;
    var ctotal = ct.total;
    var SVGWidth = 800;
    var SVGHeight = 600;
    return _.map(stateTotals, function(s,i,l){
      var retObj = {};
      retObj.state = s.state;
      retObj.index = i;
      retObj.total = s.total;
      retObj.width = ~~(SVGWidth * (s.total/ctotal));
      retObj.stackHeight = ~~(SVGHeight/l.length);
      retObj.stackPosition = i*retObj.stackHeight;
      retObj.color = s.color;
      return retObj;
    });
  }
});

Template.stateStat.helpers({
  textYPos: function () {
    return this.stackPosition + ~~(this.stackHeight/2);
  },
  textXPos : function(){
    return this.width - ~~(this.width*.2);
  },
  color : function(){
    if (Session.equals('lastState',this.state)) return '#2ecc71';
    return this.color;
  }
});

Template.cPic.rendered = function(){
  MStream = new MeetupsStream();
  MStream.connect();
  this.autorun(function(){
    var last = Comments.findOne(
      {country:Session.get('country')},
      {sort:{createdAt:-1}});
    if (last) Session.set('lastState',last.state);
  });
}

function MeetupsStream() {
  var ms = {};
  var ws;
  var sURL = "ws://stream.meetup.com/2/event_comments";
  ms.connect = function (url) {
    sURL = url || sURL;
    ws = new WebSocket(sURL);
    ws.onopen = ms.onopen;
    ws.onmessage = ms.onmessage;
    ws.onclose = ms.onclose;
    return ms;
  };
  ms.disconnect = function () {
    ws && ws.close();
  };
  ms.onopen = function () {
    console.log("Meetup stream started...");
  };
  ms.onmessage = function (e) {
    var rec_msg = EJSON.parse(e.data);
    if (rec_msg.group.group_photo)
      Session.set('msgPic',
                  rec_msg.group.group_photo.photo_link);
    Session.set('msgComment', rec_msg.comment);
    Meteor.call('addMsg', rec_msg);
    //
  };
  ms.onclose = function () {
    console.log("Meetup stream closed.");
  };
  return ms;
}