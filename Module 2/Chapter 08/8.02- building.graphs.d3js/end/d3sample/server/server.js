Meteor.startup(function(){
  if (!Letters.find().fetch().length){
    Letters.insert({letter:'A',frequency:.08167});
    Letters.insert({letter:'B',frequency:.01492});
    Letters.insert({letter:'C',frequency:.02782});
    Letters.insert({letter:'D',frequency:.04253});
    Letters.insert({letter:'E',frequency:.12702});
    Letters.insert({letter:'F',frequency:.02288});
    Letters.insert({letter:'G',frequency:.02015});
    Letters.insert({letter:'H',frequency:.06094});
    Letters.insert({letter:'I',frequency:.06966});
    Letters.insert({letter:'J',frequency:.00153});
    Letters.insert({letter:'K',frequency:.00772});
    Letters.insert({letter:'L',frequency:.04025});
    Letters.insert({letter:'M',frequency:.02406});
    Letters.insert({letter:'N',frequency:.06749});
    Letters.insert({letter:'O',frequency:.07507});
    Letters.insert({letter:'P',frequency:.01929});
    Letters.insert({letter:'Q',frequency:.00095});
    Letters.insert({letter:'R',frequency:.05987});
    Letters.insert({letter:'S',frequency:.06327});
    Letters.insert({letter:'T',frequency:.09056});
    Letters.insert({letter:'U',frequency:.02758});
    Letters.insert({letter:'V',frequency:.00978});
    Letters.insert({letter:'W',frequency:.02360});
    Letters.insert({letter:'X',frequency:.00150});
    Letters.insert({letter:'Y',frequency:.01974});
    Letters.insert({letter:'Z',frequency:.00074});
  }
});

Meteor.methods({
  updateFrequency : function(letter,frequency){
    Letters.update({letter:letter},
                   {$set:{frequency:frequency}});
  }
});