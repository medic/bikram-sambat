var _ = require('lodash'),
    assert = require('chai').assert;

var bs = require('../src/index.js');

function test_data_for(forFn) {
  return require(`../../test-data/${forFn}`);
}

describe('bikram-sambat', function() {
  describe('#toBik_dev()', function() {
    _.forIn({
      // gregorian -> bikram
      '1950-04-13': '२००७-०१-०१',
    }, function(expectedBikram, gregorian) {

      it('should convert ' + gregorian + ' AD => ' + expectedBikram + ' BS', function() {

        // expect
        assert.equal(bs.toBik_dev(gregorian), expectedBikram);

      });
    });
  });

  describe('#toBik_text()', function() {
    _.forIn({
      // gregorian -> bikram
      '1950-04-13': '१ बैशाख २००७',
    }, function(expectedBikram, gregorian) {

      it('should convert ' + gregorian + ' AD => ' + expectedBikram + ' BS', function() {

        // expect
        assert.equal(bs.toBik_text(gregorian), expectedBikram);

      });
    });
  });

  describe('#toBik()', function() {
    _.forIn({
      // gregorian -> bikram
      '1950-04-13': { day: 1, month: 1, year: 2007 },
    }, function(expectedBikram, gregorian) {

      it('should convert ' + gregorian + ' AD => ' + expectedBikram + ' BS', function() {

        // expect
        assert.deepEqual(bs.toBik(gregorian), expectedBikram);

      });
    });
  });

  describe('#toDev()', function() {
    it('should convert 2050-2-1 to ', () => {
      assert.deepEqual(bs.toDev(2050, 2, 1), { day: '१', month: 'जेठ', year: '२०५०' });
    });
  });

  describe('#toBik_euro()', function() {
    _.forIn(test_data_for('toBik_euro'), function(expectedBikram, gregorian) {

      it('should convert ' + gregorian + ' AD => ' + expectedBikram + ' BS', function() {

        // expect
        assert.equal(bs.toBik_euro(gregorian), expectedBikram);

      });

    });
  });

  describe('#toGreg()', function() {
    const asDate = dateParts => dateParts.join('-');

    _.forIn(test_data_for('toGreg'), function(data) {

      const [year, month, day] = data.bs;
      const expectedGreg = data.expectedGreg;

      it(`should convert ${asDate(data.bs)} BS to ${asDate(expectedGreg)} AD`, function() {

        // when
        var actual = bs.toGreg(year, month, day);

        // then
        assert.deepEqual([actual.year, actual.month, actual.day], expectedGreg);

      });

    });

    it('should throw Error if year is too small', () => {

      assert.throw(() =>
        bs.toGreg(1969, 1, 1));

    });

    it('should throw Error if year is too big', () => {

      assert.throw(() =>
        bs.toGreg(9999, 1, 1));

    });

    it('should throw Error if year is NaN', () => {

      assert.throw(() =>
        bs.toGreg('', 1, 1));

    });

    it('should throw Error if month is too small', () => {

      assert.throw(() =>
        bs.toGreg(2033, 0, 1));

    });

    it('should throw Error if month is too big', () => {

      assert.throw(() =>
        bs.toGreg(2033, 13, 1));

    });

    it('should throw Error if month is NaN', () => {

      assert.throw(() =>
        bs.toGreg(2033, '', 1));

    });

    it('should throw Error if day is too small', () => {

      assert.throw(() =>
        bs.toGreg(2033, 1, 0));

    });

    it('should throw Error if day is too small', () => {

      assert.throw(() =>
        bs.toGreg(2033, 1, 0));

    });

    it('should throw Error if day is NaN', () => {

      assert.throw(() =>
        bs.toGreg(2033, 1, ''));

    });

  });

  describe('#toGreg()', function() {

    it('should translate a bikram date to a zero-padded string', () => {

      // expect
      assert.equal('1955-01-01', bs.toGreg_text(2011, 9, 17));

    });
  });

  describe('#daysInMonth()', function() {

    _.forIn(test_data_for('daysInMonth'), function(monthLengths, year) {

      describe(year + ' BS', function() {
        var month;

        for(month=1; month<=12; ++month) {
          var expectedDays = monthLengths[month-1];

          /*jshint loopfunc:true*/
          it('should have ' + expectedDays + ' days in month ' + month, (function(year, month, expectedDays) {
            return function() {

              // expect
              assert.equal(bs.daysInMonth(year, month), expectedDays);

            };

          }(year, month, expectedDays)));

        }

      });

    });

  });
});
