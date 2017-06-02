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

  describe('#toBik_euro()', function() {
    _.forIn(test_data_for('toBik_euro'), function(expectedBikram, gregorian) {

      it('should convert ' + gregorian + ' AD => ' + expectedBikram + ' BS', function() {

        // expect
        assert.equal(bs.toBik_euro(gregorian), expectedBikram);

      });

    });
  });

  describe('#toEuro_timestamp()', function() {
    _.forIn(test_data_for('toEuro_timestamp'), function(data) {

      const [year, month, day] = data.bs;
      const expectedTimestamp = data.expectedTimestamp;

      it(`should convert ${year}-${month}-${day}BS to ${expectedTimestamp}`, function() {

        // expect
        assert.equal(bs.toEuro_timestamp(year, month, day), expectedTimestamp);

      });

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
