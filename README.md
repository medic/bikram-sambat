bikram-sambat
=============

Javascript and Java utilities for converting between the Nepali Bikram Sambat (Vikram Samvat) and Gregorian (standard European) calendars.

# Javascript

## Installation

	npm install bikram-sambat

## Usage

	var bs = require('bikram-sambat');

	var days_in_baisakh_2000 = bs.daysInMonth(2000, 1);

	console.log(bs.toBik_euro('2017-03-28'));
	> 2073-12-15

	console.log(bs.toBik_dev('2017-03-28'));
	> २०७३-१२-१५

	console.log(bs.toBik_text('2017-03-28'));
	> १५ चैत २०७३


# Java

Java utilities for converting between the Nepali Bikram Sambat (Vikram Samvat) and Gregorian (standard European) calendars.

## Installation

	// TODO include gradle config here

## Usage

	BsCalendar bs = BsCalendar.getInstance();

	int daysInBaisakh2000 = bs.daysInMonth(2000, 1);

	System.out.println(bs.toBik_euro('2017-03-28'));
	> 2073-12-15

	System.out.println(bs.toBik_dev('2017-03-28'));
	> २०७३-१२-१५

	System.out.println(bs.toBik_text('2017-03-28'));
	> १५ चैत २०७३


# Android

Re-usable Android widgets for date inputs using Bikram Sambat calendar.

See usage examples in `java/android-demo-app`.
