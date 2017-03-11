var _ = require('lodash'),
    assert = require('chai').assert;

var bs = require('../src/index.js');

describe('bikram-sambat', function() {
  describe('#str_toBik()', function() {
    _.forIn({
      // gregorian -> bikram
      '1944-04-13': '2001-01-01',
      '1944-06-19': '2001-03-06',
    }, function(expectedBikram, gregorian) {

      it('should convert ' + gregorian + ' AD => ' + expectedBikram + ' BS', function() {

        // expect
        assert.equal(bs.str_toBik(gregorian), expectedBikram);

      });

    });
  });

  describe('#daysInMonth()', function() {

    _.forIn({
      // year => days in each month (Baishakh - Chaitra)
      2001: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2002: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    }, function(monthLengths, year) {

      describe(year + ' BS', function() {
        var month;

        for(month=1; month<=12; ++month) {
          var expectedDays = monthLengths[month-1];

          it('should have ' + expectedDays + ' days in month ' + month, function() {

            // expect
            assert.equal(bs.daysInMonth(year, month), expectedDays);

          });

        }

      });

    });

  });
});
