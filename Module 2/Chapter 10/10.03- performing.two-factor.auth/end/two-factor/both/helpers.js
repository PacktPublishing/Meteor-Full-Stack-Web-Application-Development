Random.digits = function(len){
  var numArr = [0,1,2,3,4,5,6,7,8,9];
  var ret = '';
  while(ret.length<len){
    ret+=Random.choice(numArr);
  }
  return ret;
};