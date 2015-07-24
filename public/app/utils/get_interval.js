'use strict';

module.exports = function getInterval(from, until, sort) {
  var i;
  var interval = [];

  for(i = from; i <= until; i++) {
    interval.push(i);
  }

  if (sort) {
    return interval.sort(function(a, b){ return b - a});
  }

  return interval;

};
