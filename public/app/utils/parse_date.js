module.exports = function parseDate(date) {
  var newDate = date.split('-');
  var year = newDate[0];
  var month = newDate[1];
  var day = newDate[1].split('T')[0];

  return {
    year: year,
    month: month,
    day: day
  };
}