package bikramsambat

import spock.lang.*

class DevanagariDigitConverterSpec extends Specification {

	@Shared DevanagariDigitConverter devanagari = DevanagariDigitConverter.instance

	def 'toEuro() should handle null values without error'() {
		expect:
			devanagari.toEuro(null) == null
	}

	def 'toEuro() should translate Devanagari numerals to Western Arabic'() {
		expect:
			devanagari.toEuro('० १ २ ३ ४ ५ ६ ७ ८ ९') ==
			              '0 1 2 3 4 5 6 7 8 9'
	}

	def 'toEuro() should ignore irrelevant text'() {
		expect:
			devanagari.toEuro('irrelevant १२३ text') ==
			              'irrelevant 123 text'
	}

	def 'toEuro() should handle Numbers'() {
		expect:
			devanagari.toEuro('१२३') == '123'
	}

	def 'toDev() should handle null values without error'() {
		expect:
			devanagari.toDev(null) == null
	}

	def 'toDev() should translate Western Arabic numerals to Devanagari'() {
		expect:
			devanagari.toDev('0 1 2 3 4 5 6 7 8 9') ==
			              '० १ २ ३ ४ ५ ६ ७ ८ ९'
	}

	def 'toDev() should ignore irrelevant text'() {
		expect:
			devanagari.toDev('irrelevant 123 text') ==
			              'irrelevant १२३ text'
	}

	def 'toDev() should handle Numbers'() {
		expect:
			devanagari.toDev(123) == '१२३'
	}
}
