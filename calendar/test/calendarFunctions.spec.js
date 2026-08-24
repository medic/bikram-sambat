const assert = require('chai').assert;

// Mock global jQuery since the IIFE expects it (even though we only test calendarFunctions)
global.jQuery = {
  extend: function (target, source) {
    return Object.assign(target, source);
  },
  each: function (obj, callback) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        callback(key, obj[key]);
      }
    }
  },
  fn: {}
};

// Require our refactored module
const { calendarFunctions } = require('../src/nepaliDatePicker.js');

describe('Bikram Sambat Calendar Functions', () => {
  describe('#getNepaliNumber()', () => {
    it('should return equivalent nepali number', () => {
      assert.equal(calendarFunctions.getNepaliNumber(2072), '२०७२');
      assert.equal(calendarFunctions.getNepaliNumber(1234567890), '१२३४५६७८९०');
    });

    it('should throw error for invalid values', () => {
      assert.throws(() => calendarFunctions.getNepaliNumber(), /Parameter number is required/);
      assert.throws(() => calendarFunctions.getNepaliNumber('2072'), /Number should be positive integer/);
      assert.throws(() => calendarFunctions.getNepaliNumber(-2072), /Number should be positive integer/);
    });
  });

  describe('#getNumberByNepaliNumber()', () => {
    it('should return equivalent number from NepaliNumber', () => {
      assert.equal(calendarFunctions.getNumberByNepaliNumber('२०७२'), 2072);
      assert.equal(calendarFunctions.getNumberByNepaliNumber('१२३४५६७८९०'), 1234567890);
    });

    it('should throw error for invalid nepali number strings', () => {
      assert.throws(() => calendarFunctions.getNumberByNepaliNumber(), /Parameter nepaliNumber is required/);
      assert.throws(() => calendarFunctions.getNumberByNepaliNumber(1256), /Parameter nepaliNumber should be in string/);
      assert.throws(() => calendarFunctions.getNumberByNepaliNumber('२३D71'), /Invalid nepali number/);
    });
  });

  describe('#getBsMonthDays()', () => {
    it('should delegate to bikram-sambat to return correct month lengths', () => {
      // 2082 Mansir should have 29 days (where Leapfrog's hardcoded table had 30)
      assert.equal(calendarFunctions.getBsMonthDays(2082, 8), 29);
      // 2083 Shrawan should have 31 days
      assert.equal(calendarFunctions.getBsMonthDays(2083, 4), 31);
      // Valid months and boundary years
      assert.equal(calendarFunctions.getBsMonthDays(1970, 1), 31);
      assert.equal(calendarFunctions.getBsMonthDays(2090, 12), 30);
    });

    it('should throw RangeError for years outside supported 1970-2090 range', () => {
      assert.throws(() => calendarFunctions.getBsMonthDays(1969, 1), RangeError);
      assert.throws(() => calendarFunctions.getBsMonthDays(2091, 1), RangeError);
    });
  });

  describe('#getAdDateByBsDate()', () => {
    it('should correctly convert BS to Gregorian Date object', () => {
      // BS 1970-01-01 -> AD 1913-04-13
      const date1 = calendarFunctions.getAdDateByBsDate(1970, 1, 1);
      assert.equal(date1.getFullYear(), 1913);
      assert.equal(date1.getMonth(), 3); // April is 3
      assert.equal(date1.getDate(), 13);

      // BS 2083-04-25 -> AD 2026-08-10
      const date2 = calendarFunctions.getAdDateByBsDate(2083, 4, 25);
      assert.equal(date2.getFullYear(), 2026);
      assert.equal(date2.getMonth(), 7); // August is 7
      assert.equal(date2.getDate(), 10);
    });

    it('should clamp the day to maximum days in the month if exceeded', () => {
      // Mansir 2082 has 29 days. Day 30 should clamp to 29.
      const date = calendarFunctions.getAdDateByBsDate(2082, 8, 30);
      assert.isNotNull(date);
      assert.equal(date.getFullYear(), 2025);
      assert.equal(date.getMonth(), 11); // December = 11
      assert.equal(date.getDate(), 15); // 2082 Mansir 29 is 2025 Dec 15
    });
  });

  describe('#getBsDateByAdDate()', () => {
    it('should correctly convert Gregorian to BS object', () => {
      // AD 1913-04-13 -> BS 1970-01-01
      const bsDate1 = calendarFunctions.getBsDateByAdDate(1913, 4, 13);
      assert.deepEqual(bsDate1, { bsYear: 1970, bsMonth: 1, bsDate: 1 });

      // AD 2026-08-10 -> BS 2083-04-25
      const bsDate2 = calendarFunctions.getBsDateByAdDate(2026, 8, 10);
      assert.deepEqual(bsDate2, { bsYear: 2083, bsMonth: 4, bsDate: 25 });
    });
  });

  describe('#getBsMonthInfoByBsDate()', () => {
    it('should return complete month info including weekday and formatted string', () => {
      const info = calendarFunctions.getBsMonthInfoByBsDate(2083, 4, 25, '%D, %M %d, %y');
      assert.equal(info.bsYear, 2083);
      assert.equal(info.bsMonth, 4);
      assert.equal(info.bsDate, 25);
      assert.equal(info.formattedDate, 'सोम, साउन २५, २०८३'); // 2083-04-25 is Monday (Monday = 2)
      assert.equal(info.weekDay, 2); // 2 = Monday
    });

    it('should clamp the date to the maximum days in the month if it exceeds it', () => {
      // Mansir 2082 has 29 days. Day 30 should clamp to 29.
      const info = calendarFunctions.getBsMonthInfoByBsDate(2082, 8, 30, '%D, %M %d, %y');
      assert.equal(info.bsYear, 2082);
      assert.equal(info.bsMonth, 8);
      assert.equal(info.bsDate, 29);
      assert.equal(info.formattedDate, 'सोम, मंसिर २९, २०८२'); // Monday, Mansir 29 (2025-12-15 is Monday)
      assert.equal(info.weekDay, 2); // Monday = 2
    });
  });

  describe('Formatting boundary tests', () => {
    it('should not crash when bsDateFormat is called with an out of bounds day', () => {
      // Mansir 2082 has 29 days. Day 30 clamps to 29.
      const formatted = calendarFunctions.bsDateFormat('%D, %M %d, %y', 2082, 8, 30);
      assert.equal(formatted, 'सोम, मंसिर २९, २०८२'); // 2025-12-15 is Monday
    });
  });
});
