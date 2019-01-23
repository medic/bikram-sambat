const daysInMonth = require('../test-data/daysInMonth.json');

/*
INSTRUCTIONS:

1) Update `/test-data/daysInMonth.json` as required
2) The first entry in `/test-data/daysInMonth.json` as the BS Epoch. Take this
    and convert it to AD and update the bsEpoch constant below.
3) Run the script: node ./encode-days-in-month.js
4) Copy the output code into the files overwriting the existing hardcoded values

*/

// const bsEpoch = false; // eg: '1913-4-13';
const bsEpoch = '1913-4-13';

if (!bsEpoch) {
  console.error('Read the instructions at the top of this file before executing.');
  process.exit(1);
}

const processMonth = decimal => {
  const delta = decimal - 29;
  const binary = delta.toString(2);
  const padded = binary.length === 1 ? '0' + binary : binary;
  return padded;
};

const processYear = months => {
  const binary = months.map(processMonth);
  const combined = binary.reverse().join('');
  const decimal = parseInt(combined, 2);
  return decimal;
};

const encodedLengths = Object.values(daysInMonth).map(processYear);
const yearZero = Object.keys(daysInMonth)[0];
const bsEpochTs = Date.parse(bsEpoch);

console.log(`
// JavaScript - copy into js/src/index.js

// ------ TO UPDATE THESE HARDCODED VALUES USE /scripts/encode-days-in-month.js
// We have defined our own Epoch for Bikram Sambat: ${yearZero}-1-1 BS or ${bsEpoch} AD
var BS_EPOCH_TS = ${bsEpochTs}; // = Date.parse('${bsEpoch}')
var BS_YEAR_ZERO = ${yearZero};
var ENCODED_MONTH_LENGTHS = [
  ${encodedLengths.join(',')}
];
`);

console.log(`
// Java - copy into java/lib/src/main/java/bikramsambat/BsCalendar.java

// ------ TO UPDATE THESE HARDCODED VALUES USE /scripts/encode-days-in-month.js
// We have defined our own Epoch for Bikram Sambat: ${yearZero}-1-1 BS or ${bsEpoch} AD
private static final long BS_EPOCH_TS = ${bsEpochTs}L; // ${bsEpoch} AD
private static final int BS_YEAR_ZERO = ${yearZero};
private static final long[] ENCODED_MONTH_LENGTHS = {
  ${encodedLengths.map(length => length + 'L').join(',')}
};
`);
