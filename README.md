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


# Bootstrap

twitter-bootstrap widget [available from `npm`](https://www.npmjs.com/package/bikram-sambat-bootstrap):

	require('bikram-sambat-bootstrap');

For usage example, see `bootstrap/dist`.

# Development

## Run tests

1. Install android sdk
2. Execute `make test`

## Update compressed days in month data

1. Update `/test-data/daysInMonth.json` as required
2. The first entry in `/test-data/daysInMonth.json` as the BS Epoch. Take this
    and convert it to AD and update the bsEpoch constant below.
3. Run the script: node ./scripts/encode-days-in-month.js
4. Copy the output code into the files overwriting the existing hardcoded values

## Publish

### Java

1. Make a tag called `java-${version}`, eg: `java-1.0.0`
2. Push your tag
3. Wait for travis to publish to [our maven repo](https://staging.dev.medicmobile.org/_couch/maven-repo/bikramsambat)

### JavaScript

1. Make a tag called `js-${version}`, eg: `js-1.5.1`
2. Run `make release-js`
3. Push your tag

### Bootstrap

1. If you've made changes to the JavaScript library, publish it first and update the `/bootstrap/package.json` file to depend on the updated libary
2. Make a tag called `bootstrap-${version}`, eg: `bootstrap-1.4.3`
3. Run `make release-bootstrap`
4. Push your tag
