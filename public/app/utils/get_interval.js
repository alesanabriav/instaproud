module.exports = function getInterval(from, until, sort) {
  var i;
  var interval = [];

  for(i = 1; i <= 31; i++) {
    interval.push(i);
  }

  if (sort) {
    return interval.sort(function(a, b){ return b-a } )
  }

  return interval;

}