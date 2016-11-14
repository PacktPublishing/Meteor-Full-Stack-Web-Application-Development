if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);
  weatherlist = new ReactiveVar;

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      if (Session.get("counter") <= 60)
        Session.set("counter", Session.get("counter") + 4);
      else
        Session.set("counter", 0)
      
      getWeather();
    }
  });
  
  Template.weather.helpers({
    reports: function () {
      if (!weatherlist) return false;
      return weatherlist.get();
    },
    severity: function () {
      if (this.weather && this.weather[0].main == "Clear")
        return "success";
      else
        return "warning";
    },
    description: function () {
      if (this.weather && this.weather[0])
        return this.weather[0].description;
      else
        return "";
    },
    temp: function () {
    if (this.main)
    return this.main.temp;
    else
    return "";
  },
                           humidity: function () {
    if (this.main)
      return this.main.humidity;
    else
      return "";
  }
});
  
  function getWeather() {
    var long1 = +Session.get("counter"),
        long2 = long1+5;
    HTTP.get("http://api.openweathermap.org/data/2.5/box/city?bbox=12,"
             +long1+",15,"+long2+",10&cluster=yes", harvestWeather);
             }
             function harvestWeather(error, data) {
      if (data && data.content) {
        var weather = EJSON.parse(data.content);
        weatherlist.set(weather.list);
      }
    }
  
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
