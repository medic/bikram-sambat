bikram-sambat.js
================

JS utilities for converting between the Nepali Bikram Sambat (Vikram Samvat) and Gregorian (standard European) calendars.

# Installation

	npm install bikram-sambat

# Usage

	var bs = require('bikram-sambat');

	var days_in_baisakh_2000 = bs.daysInMonth(2000, 1);

	console.log(bs.str_toBik_euro('2017-03-28'));
	> 2073-12-15

	console.log(bs.str_toBik_dev('2017-03-28'));
	> २०७३-१२-१५

	console.log(bs.str_toBik_text('2017-03-28'));
	> १५ चैत २०७३
