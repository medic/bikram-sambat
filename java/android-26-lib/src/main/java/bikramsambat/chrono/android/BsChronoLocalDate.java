package bikramsambat.chrono.android;

import java.time.chrono.Chronology;
import java.time.chrono.ChronoLocalDate;
import java.time.chrono.ChronoPeriod;
import java.time.temporal.Temporal;
import java.time.temporal.TemporalField;
import java.time.temporal.TemporalUnit;

public class BsChronoLocalDate implements ChronoLocalDate {

	public Temporal adjustInto(Temporal temporal) {
		throw new RuntimeException("TODO");
	}

	public int compareTo(ChronoLocalDate other) {
		throw new RuntimeException("TODO");
	}

	public boolean equals(Object obj) {
		throw new RuntimeException("TODO");
	}

	public Chronology getChronology() {
		throw new RuntimeException("TODO");
	}

	public long getLong(TemporalField field) {
		throw new RuntimeException("TODO");
	}

	public int hashCode() {
		throw new RuntimeException("TODO");
	}

	public boolean isSupported(TemporalField field) {
		throw new RuntimeException("TODO");
	}

	public boolean isSupported(TemporalUnit unit) {
		throw new RuntimeException("TODO");
	}

	public int lengthOfMonth() {
		throw new RuntimeException("TODO");
	}

	public ChronoLocalDate plus(long amountToAdd, TemporalUnit unit) {
		throw new RuntimeException("TODO");
	}

	public String toString() {
		throw new RuntimeException("TODO");
	}

	public long until(Temporal endExclusive, TemporalUnit unit) {
		throw new RuntimeException("TODO");
	}

	public ChronoPeriod until(ChronoLocalDate endDateExclusive) {
		throw new RuntimeException("TODO");
	}

	public ChronoLocalDate with(TemporalField field, long newValue) {
		throw new RuntimeException("TODO");
	}
}
