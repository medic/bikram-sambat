const assert = require('chai').assert;
const js = require('../js/src/index');
const java = require('./java-implementation-wrapper');

describe('Comparison of implementations', function() {

  describe('daysInMonth()', function() {
    const data = require('../test-data/daysInMonth');

    Object.keys(data).forEach(bsYear => {
      for(let month=1; month<=12; ++month) {

        it(`should return same value for month ${month} of year ${bsYear} BS`, function() {
          assert.equal(java.daysInMonth(bsYear, month),
                         js.daysInMonth(bsYear, month));
        });

      }
    });
  });

  describe('toBik_euro()', function() {
  });

  describe('toBik_dev()', function() {
  });

  describe('toGreg()', function() {
    const data = require('../test-data/toGreg');

    data.forEach(testCase => {

      const bs = testCase.bs;

      it(`should return same value for ${fmtArray(bs)}`, function() {

        // when
        const javaResult =      java.toGreg(...bs);
        const jsResult   = fmtObj(js.toGreg(...bs));

        // then
        assert.equal(javaResult, jsResult);

      });

    });
  });

});

function zPad(num, digits) {
  num = "" + num;
  while(num.length < digits) num = "0" + num;
  return num;
}

function fmtObj(d) { return `${d.year}-${zPad(d.month, 2)}-${zPad(d.day, 2)}`; }
function fmtArray(arr) { return arr.map(e => zPad(e, 2)).join('-'); }
