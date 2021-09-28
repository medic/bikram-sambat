var toDevanagari = require('eurodigit/src/to_non_euro').devanagari;
var MS_PER_DAY = 86400000;
var MONTH_NAMES = ['बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज', 'कार्तिक', 'मंसिर', 'पौष', 'माघ', 'फाल्गुन', 'चैत'];

// ------ TO UPDATE THESE HARDCODED VALUES USE /scripts/encode-days-in-month.js
// We have defined our own Epoch for Bikram Sambat: 1970-1-1 BS or 1913-4-13 AD
var BS_EPOCH_TS = -1789990200000; // = Date.parse('1913-4-13')
var BS_YEAR_ZERO = 1970;
var ENCODED_MONTH_LENGTHS = [
  5315258,5314490,9459438,8673005,5315258,5315066,9459438,8673005,5315258,5314298,9459438,5327594,5315258,5314298,9459438,5327594,5315258,5314286,9459438,5315306,5315258,5314286,8673006,5315306,5315258,5265134,8673006,5315258,5315258,9459438,8673005,5315258,5314298,9459438,8673005,5315258,5314298,9459438,8473322,5315258,5314298,9459438,5327594,5315258,5314298,9459438,5327594,5315258,5314286,8673006,5315306,5315258,5265134,8673006,5315306,5315258,9459438,8673005,5315258,5314490,9459438,8673005,5315258,5314298,9459438,8473325,5315258,5314298,9459438,5327594,5315258,5314298,9459438,5327594,5315258,5314286,9459438,5315306,5315258,5265134,8673006,5315306,5315258,5265134,8673006,5315258,5314490,9459438,8673005,5315258,5314298,9459438,8669933,5315258,5314298,9459438,8473322,5315258,5314298,9459438,5327594,5315258,5314286,9459438,5315306,5315258,5265134,8673006,5315306,5315258,5265134,5527290,5527277,5527226,5527226,5528046,5527277,5528250,5528057,5527277,5527277
];

// TODO ENCODED_MONTH_LENGTHS would be stored more efficiently converted to a string using
// String.fromCharCode.apply(String, ENCODED_MONTH_LENGTHS), and extracted using
// ENC_MTH.charCodeAt(...).  However, JS seems to do something weird with the
// top bits.

/**
 * Magic numbers:
 *   BS_YEAR_ZERO <- the first year (BS) encoded in ENCODED_MONTH_LENGTHS
 *   month #5 <- this is the only month which has a day variation of more than 1
 *   & 3 <- this is a 2 bit mask, i.e. 0...011
 */
function daysInMonth(year, month) {
  if(month < 1 || month > 12) throw new Error('Invalid month value ' + month);
  var delta = ENCODED_MONTH_LENGTHS[year - BS_YEAR_ZERO];
  if(typeof delta === 'undefined') throw new Error('No data for year: ' + year + ' BS');
  return 29 + ((delta >>>
      (((month-1) << 1))) & 3);
}

function zPad(x) { return x > 9 ? x : '0' + x; }

function toBik(greg) {
  // TODO do not use Date.parse(), as per https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
  var m, dM, year = BS_YEAR_ZERO,
      days = Math.floor((Date.parse(greg) - BS_EPOCH_TS) / MS_PER_DAY) + 1;

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

function toDev(year, month, day) {
  return {
    day: toDevanagari(day),
    month: MONTH_NAMES[month-1],
    year: toDevanagari(year)
  };
}

function toBik_euro(greg) {
  var d = toBik(greg);
  return d.year + '-' + zPad(d.month) + '-' + zPad(d.day);
}

function toBik_dev(greg) {
  return toDevanagari(toBik_euro(greg));
}

function toBik_text(greg) {
  var bik = toBik(greg);
  var dev = toDev(bik.year, bik.month, bik.day);
  return dev.day + ' ' + dev.month + ' ' + dev.year;
}

function toGreg(year, month, day) {
  // TODO month bounds-checking should be handled in daysInMonth()
  if(month < 1) throw new Error('Invalid month value ' + month);
  if(year < BS_YEAR_ZERO) throw new Error('Invalid year value ' + year);
  if(day < 1 || day > daysInMonth(year, month)) throw new Error('Invalid day value', day);

  var timestamp = BS_EPOCH_TS + (MS_PER_DAY * day);
  month--;

  while (year >= BS_YEAR_ZERO) {
    while (month > 0) {
      timestamp += (MS_PER_DAY * daysInMonth(year, month));
      month--;
    }
    month = 12;
    year--;
  }

  var d = new Date(timestamp);
  return {
    year: d.getUTCFullYear(),
    month: 1+d.getUTCMonth(),
    day: d.getUTCDate()
  };
}

function toGreg_text(year, month, day) {
  var d = toGreg(year, month, day);
  return d.year + '-' + zPad(d.month) + '-' + zPad(d.day);
}

module.exports = {
  daysInMonth: daysInMonth,
  toBik: toBik,
  toDev: toDev,
  toBik_dev: toBik_dev,
  toBik_euro: toBik_euro,
  toBik_text: toBik_text,
  toGreg: toGreg,
  toGreg_text: toGreg_text
};
