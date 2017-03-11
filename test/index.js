var _ = require('lodash'),
    assert = require('chai').assert;

var bs = require('../src/index.js');

describe('bikram-sambat', function() {
  describe('#str_toGreg()', function() {
    _.forIn({
      // gregorian -> bikram
      '1944-04-13': '2001-1-1',
      '1944-06-19': '2001-3-6',
    }, function(gregorian, expectedBikram) {

      it('should convert ' + gregorian + ' => ' + expectedBikram, function() {

        // expect
        assert.equal(bs.str_toGreg(gregorian), expectedBikram);

      });

    });
  });

  describe('#daysInMonth()', function() {
    // TODO write some tests checking the days-per-month calculations are correct for different years
  });
});
