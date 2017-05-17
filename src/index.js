var toDevanagari = require('eurodigit/src/to_devanagari');

// TODO this would be stored more efficiently converted to a string using
// String.fromCharCode.apply(String, ENCODED_MONTH_LENGTHS), and extracted using
// ENC_MTH.charCodeAt(...).  However, JS seems to do something weird with the
// top bits.
var ENCODED_MONTH_LENGTHS = [
      8673005,5315258,5314298,9459438,8673005,5315258,5314298,9459438,8473322,5315258,5314298,9459438,5327594,5315258,5314298,9459438,5327594,5315258,5314286,8673006,5315306,5315258,5265134,8673006,5315306,5315258,9459438,8673005,5315258,5314490,9459438,8673005,5315258,5314298,9459438,8473325,5315258,5314298,9459438,5327594,5315258,5314298,9459438,5327594,5315258,5314286,9459438,5315306,5315258,5265134,8673006,5315306,5315258,5265134,8673006,5315258,5314490,9459438,8673005,5315258,5314298,9459438,8669933,5315258,5314298,9459438,8473322,5315258,5314298,9459438,5327594,5315258,5314286,9459438,5315306,5315258,5265134,8673006,5315306,5315258,5265134,5527290,5527277,5527226,5527226,5528046,5527277,5528250,5528057,5527277,5527277
    ],
    MONTH_NAMES = ['बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज', 'कार्तिक', 'मंसिर', 'पौष', 'माघ', 'फाल्गुन', 'चैत'];

/**
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

/**
 * Magic numbers:
 *   86400000 <- the number of miliseconds in a day
 *   2007 <- The year (BS) whose first day is our Bikram Sambat Epoch (BSE)
 *   -622359900000 <- Date.parse('1950-4-13') = unix timestamp of BSE
 */
function toBik(greg) {
  // TODO do not use Date.parse(), as per https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
  var m, dM, year = 2007,
      days = Math.floor((Date.parse(greg) + 622359900000) / 86400000) + 1;

  while(days > 0) {
    for(m=1; m<=12; ++m) {
      dM = daysInMonth(year, m);
      if(days <= dM) return { year:year, month:m, day:days };
      days -= dM;
    }
    ++year;
  }

  throw new Error('Date outside supported range: ' + greg + ' AD');
}

function toBik_euro(greg) {
  var d = toBik(greg);
  return d.year + '-' + zPad(d.month) + '-' + zPad(d.day);
}

function toBik_dev(greg) {
  return toDevanagari(toBik_euro(greg));
}

function toBik_text(greg) {
  var d = toBik(greg);
  return toDevanagari(d.day) + ' ' + MONTH_NAMES[d.month-1] + ' ' + toDevanagari(d.year);
}

module.exports = {
  daysInMonth: daysInMonth,
  toBik_dev: toBik_dev,
  toBik_euro: toBik_euro,
  toBik_text: toBik_text
};
