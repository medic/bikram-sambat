package bikramsambat

import groovy.json.*
import spock.lang.*

class BsCalendarSpec extends Specification {

	@Shared BsCalendar bs = BsCalendar.instance

	@Unroll
	def 'toBik_dev() should convert #gregorian to #expectedBikram'(gregorian, expectedBikram) {
		expect:
			bs.toBik_dev(gregorian) == expectedBikram

		where:
			gregorian    | expectedBikram
			'1950-04-13' | '२००७-०१-०१'
	}

	@Unroll
	def 'toBik_text() should convert #gregorian to #expectedBikram'(gregorian, expectedBikram) {
		expect:
			bs.toBik_text(gregorian) == expectedBikram

		where:
			gregorian    | expectedBikram
			'1950-04-13' | '१ बैशाख २००७'
	}

	@Unroll
	def 'toBik_euro()'(testCase) {
		given:
			def gregorian = testCase.key
			def expectedBikram = testCase.value

		expect:
			bs.toBik_euro(gregorian) == expectedBikram

		where:
			testCase << testJson('toBik_euro')
	}

	@Unroll
	def 'daysInMonth() for #testCase'(testCase) {
		given:
			def year = Integer.parseInt(testCase.key)
			def monthLengths = testCase.value

		expect:
			(1..12).collect { bs.daysInMonth(year, it) } == monthLengths

		where:
			testCase << testJson('daysInMonth')
	}

	@Unroll
	def 'daysInMonth() should throw BsException if date not within supported range'(testCase) {
		when:
			bs.daysInMonth(testCase.year, testCase.month)

		then:
			thrown(BsException)

		where:
			testCase << testJson('daysInMonth-unsupported')
	}

	@Unroll
	def 'toGreg() for #testCase'(testCase) {
		given:
			def bsDate = new BikramSambatDate(testCase.bs[0], testCase.bs[1], testCase.bs[2])
			def expectedGreg = new BsGregorianDate(testCase.expectedGreg[0], testCase.expectedGreg[1], testCase.expectedGreg[2])
		expect:
			bs.toGreg(bsDate) == expectedGreg
		where:
			testCase << testJson('toGreg')
	}

	private def testJson(fnName) {
		new JsonSlurper().parseText(new File("../../test-data/${fnName}.json").text)
	}
}
