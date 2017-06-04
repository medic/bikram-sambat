(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var toDevanagari = require('eurodigit/src/to_non_euro').devanagari;

var MS_PER_DAY = 86400000;

// We have defined our own Epoch for Bikram Sambat: 1-1-2007 BS / 13-4-1950 AD
var BS_EPOCH_TS = -622359900000; // = Date.parse('1950-4-13')
var BS_YEAR_ZERO = 2007;

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

function toGreg(year, month, day) {
  var timestamp = BS_EPOCH_TS;
  while(year >= BS_YEAR_ZERO) {
    while(month >= 1) {
      while(day >= 1) {
        timestamp += MS_PER_DAY;
        --day;
      }
      --month;
      day = daysInMonth(year, month, day);
    }
    --year;
    month = 12;
    day = daysInMonth(year, month, day);
  }

  var d = new Date(timestamp);
  return {
    year: d.getUTCFullYear(),
    month: 1+d.getUTCMonth(),
    day: d.getUTCDate()
  };
}

module.exports = {
  daysInMonth: daysInMonth,
  toBik_dev: toBik_dev,
  toBik_euro: toBik_euro,
  toBik_text: toBik_text,
  toGreg: toGreg
};

},{"eurodigit/src/to_non_euro":5}],2:[function(require,module,exports){
"use strict";
module.exports = {
	to_euro: require('./to_euro'),
	to_int: require('./to_int'),
	to_non_euro: require('./to_non_euro')
};

},{"./to_euro":3,"./to_int":4,"./to_non_euro":5}],3:[function(require,module,exports){
'use strict';

function replacer(c) {
	c = c.charCodeAt(0);
	if(c < 1642) return c - 1632; // western arabic
	if(c < 1786) return c - 1776; // perso-arabic
	return c - 2406; // devanagari
}

module.exports = function(original) {
	return original && original.toString().replace(/[٠-٩۰-۹०-९]/g, replacer);
};

},{}],4:[function(require,module,exports){
var to_euro = require('./to_euro');

module.exports = function(s) {
	return Number.parseInt(to_euro(s));
};

},{"./to_euro":3}],5:[function(require,module,exports){
'use strict';

function from(base) {
	function replacer(c) { return String.fromCharCode(Number(c) + base); }
	return function(original) {
		return original && original.toString().replace(/[0-9]/g, replacer);
	};
}

module.exports = {
	devanagari: from(2406),
	eastern_arabic: from(1632),
	perso_arabic: from(1776)
};

},{}],6:[function(require,module,exports){
var bs = require('bikram-sambat');
var eurodig = require('eurodigit');
var from_dev = eurodig.to_int;
var to_dev = eurodig.to_non_euro.devanagari;


//> JQUERY SETUP

$('.devanagari-number-input')
  // event support:
  //   keypress: firefox
  //   input: chrome for android
  .on('input keypress', function() {
    var $this = $(this);
    $this.val(to_dev($this.val()));
  });

$('.bikram-sambat-input-group .dropdown-menu li a')
  .on('click', function() {
    var $this = $(this);
    $this.parents('.input-group').find('input[name=month]').val(1+$this.parent('li').index());
    $this.parents('.input-group-btn').find('.dropdown-toggle').html($this.text() + ' <span class="caret"></span>');
  });


//> HELPER FUNCTIONS

function fieldValue($parent, selecter) {
  return from_dev($parent.find(selecter).val());
}


//> EXPORTED FUNCTIONS

window.bikram_sambat_bootstrap = {
  getDate: function($inputGroup) {
    // TODO handle fields not set, out of bounds etc.
    var year = fieldValue($inputGroup, '[name=year]');
    var month = fieldValue($inputGroup, '[name=month]');
    var day = fieldValue($inputGroup, '[name=day]');
    return bs.toGreg(year, month, day);
  },
};

},{"bikram-sambat":1,"eurodigit":2}]},{},[6]);
