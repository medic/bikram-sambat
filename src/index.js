var toDevanagari = require('eurodig/src/to_devanagari');

// TODO this would be stored more efficiently converted to a string using
// String.fromCharCode.apply(String, ENCODED_MONTH_LENGTHS), and extracted using
// ENC_MTH.charCodeAt(...).  However, JS seems to do something weird with the
// top bits.
var ENCODED_MONTH_LENGTHS = [
      8673005,5315258,5314298,9459438,8673005,5315258,5314298,9459438,8473322,5315258,5314298,9459438,5327594,5315258,5314298,9459438,5327594,5315258,5314286,8673006,5315306,5315258,5265134,8673006,5315306,5315258,9459438,8673005,5315258,5314490,9459438,8673005,5315258,5314298,9459438,8473325,5315258,5314298,9459438,5327594,5315258,5314298,9459438,5327594,5315258,5314286,9459438,5315306,5315258,5265134,8673006,5315306,5315258,5265134,8673006,5315258,5314490,9459438,8673005,5315258,5314298,9459438,8669933,5315258,5314298,9459438,8473322,5315258,5314298,9459438,5327594,5315258,5314286,9459438,5315306,5315258,5265134,8673006,5315306,5315258,5265134,5527290,5527277,5527226,5527226,5528046,5527277,5528250,5528057,5527277,5527277
    ];

var bikMonthNames = {
    1: 'बैशाख',
    2: 'जेष्ठ',
    3: 'आषाढ़',
    4: 'श्रावण',
    5: 'भाद्र',
    6: 'आश्विन',
    7: 'कार्तिक',
    8: 'मार्ग',
    9: 'पौष',
    10: 'माघ',
    11: 'फाल्गुन',
    12: 'चैत्र'
};

/**
 * Number of days in a given month in a given year. A given month can have different
 * numbers of days each year.
 * Magic numbers:
 *   2000 <- the first year encoded in ENCODED_MONTH_LENGTHS
 *   month #5 <- this is the only month which has a day variation of more than 1
 *   & 3 <- this is a 2 bit mask, i.e. 0...011
 */
function daysInMonth(year, month) {
  return 29 + ((ENCODED_MONTH_LENGTHS[year - 2000] >>>
      (((month-1) << 1))) & 3);
}

function zPad(x) { return x > 9 ? x : '0' + x; }

/*
 * Converts gregorian date string (any format parseable by Date.parse) to
 * bikram sambat.
 * Magic numbers:
 *   86400000 <- the number of miliseconds in a day
 *   2007 <- The year (BS) whose first day is our Bikram Sambat Epoch (BSE)
 *   -622359900000 <- Date.parse('1950-4-13') = unix timestamp of BSE
 */
function toBikramSambatValues(gregorianString) {
  var month, dM, year = 2007,
      days = Math.floor((Date.parse(gregorianString) + 622359900000) / 86400000) + 1;

  while (days > 0) {
    for (month=1; month<=12; ++month) {
      dM = daysInMonth(year, month);
      if (days <= dM) {
        return { year: year, month: month, day: days };
      }
      days -= dM;
    }
    ++year;
  }

  throw new Error('Date outside supported range: ' + gregorianString + ' AD');
}

/**
 * Converts gregorian date string (any format parseable by Date.parse) to
 * bikram sambat, in YYYY-MM-DD format with Western numerals ('2017-03-25').
 */
function toBikramSambatWestern(greg) {
  var values = toBikramSambatValues(greg);
  return values.year + '-' + zPad(values.month) + '-' + zPad(values.day);
}

/**
 * Converts gregorian date string (any format parseable by Date.parse) to
 * bikram sambat, in YYYY MMMM DD format with Devanagari ('२०७३ चैत्र १२').
 */
function toBikramSambatLetters(greg) {
  var values = toBikramSambatValues(greg);
  console.log(values);
  return toDevanagari(values.year) + ' ' + bikMonthNames[values.month] + ' ' + toDevanagari(values.day);
}

/**
 * Converts gregorian date string (any format parseable by Date.parse) to
 * bikram sambat, in YYYY-MM-DD format with Devanagari numerals ('२०७३-१२-१२').
 */
function toBikramSambat(greg) {
  return toDevanagari(toBikramSambatWestern(greg));
}

module.exports = {
  daysInMonth: daysInMonth,
  toBikramSambat:toBikramSambat,
  toBikramSambatLetters: toBikramSambatLetters,
  toBikramSambatWestern:toBikramSambatWestern
};
