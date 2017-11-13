package bikramsambat.chrono.android;

import java.time.Clock;
import java.time.DateTimeException;
import java.time.Instant;
import java.time.ZoneId;
import java.time.chrono.Chronology;
import java.time.chrono.ChronoLocalDateTime;
import java.time.chrono.ChronoPeriod;
import java.time.chrono.ChronoZonedDateTime;
import java.time.chrono.Era;
import java.time.format.ResolverStyle;
import java.time.format.TextStyle;
import java.time.temporal.ChronoField;
import java.time.temporal.TemporalAccessor;
import java.time.temporal.TemporalField;
import java.time.temporal.ValueRange;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

public class BikramSambatChronology implements Chronology {
	public int compareTo(Chronology other) {
		throw new RuntimeException("TODO");
	}

	public BsChronoLocalDate date(Era era, int yearOfEra, int month, int dayOfMonth) {
		throw new RuntimeException("TODO");
	}

	public BsChronoLocalDate date(int prolepticYear, int month, int dayOfMonth) {
		throw new RuntimeException("TODO");
	}

	public BsChronoLocalDate date(TemporalAccessor temporal) {
		throw new RuntimeException("TODO");
	}

	public BsChronoLocalDate dateEpochDay(long epochDay) {
		throw new RuntimeException("TODO");
	}

	public BsChronoLocalDate dateNow(Clock clock) {
		throw new RuntimeException("TODO");
	}

	public BsChronoLocalDate dateNow(ZoneId zone) {
		throw new RuntimeException("TODO");
	}

	public BsChronoLocalDate dateNow() {
		throw new RuntimeException("TODO");
	}

	public BsChronoLocalDate dateYearDay(Era era, int yearOfEra, int dayOfYear) {
		throw new RuntimeException("TODO");
	}

	public BsChronoLocalDate dateYearDay(int prolepticYear, int dayOfYear) {
		throw new RuntimeException("TODO");
	}

	public boolean equals(Object obj) {
		throw new RuntimeException("TODO");
	}

	public Era eraOf(int eraValue) {
		throw new RuntimeException("TODO");
	}

	public List<Era> eras() {
		throw new RuntimeException("TODO");
	}

	static Chronology from(TemporalAccessor temporal) {
		throw new RuntimeException("TODO");
	}


	static Set<Chronology> getAvailableChronologies() {
		throw new RuntimeException("TODO");
	}

	public String getCalendarType() {
		throw new RuntimeException("TODO");
	}

	public String getDisplayName(TextStyle style, Locale locale) {
		throw new RuntimeException("TODO");
	}

	public String getId() {
		throw new RuntimeException("TODO");
	}

	public int hashCode() {
		throw new RuntimeException("TODO");
	}

	public boolean isLeapYear(long prolepticYear) {
		throw new RuntimeException("TODO");
	}

	public ChronoLocalDateTime<BsChronoLocalDate> localDateTime(TemporalAccessor temporal) {
		throw new RuntimeException("TODO");
	}

	static Chronology of(String id) {
		throw new RuntimeException("TODO");
	}

	static Chronology ofLocale(Locale locale) {
		throw new RuntimeException("TODO");
	}

	public ChronoPeriod period(int years, int months, int days) {
		throw new RuntimeException("TODO");
	}

	public int prolepticYear(Era era, int yearOfEra) {
		throw new RuntimeException("TODO");
	}

	public ValueRange range(ChronoField field) {
		throw new RuntimeException("TODO");
	}

	public BsChronoLocalDate resolveDate(Map<TemporalField, Long> fieldValues, ResolverStyle resolverStyle) {
		throw new RuntimeException("TODO");
	}

	public String toString() {
		throw new RuntimeException("TODO");
	}

	public ChronoZonedDateTime<BsChronoLocalDate> zonedDateTime(Instant instant, ZoneId zone) {
		throw new RuntimeException("TODO");
	}

	public ChronoZonedDateTime<BsChronoLocalDate> zonedDateTime(TemporalAccessor temporal) {
		throw new RuntimeException("TODO");
	}
}
