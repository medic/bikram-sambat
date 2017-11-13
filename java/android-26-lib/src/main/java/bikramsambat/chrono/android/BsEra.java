package bikramsambat.chrono.android;

import java.time.chrono.Era;
import java.time.format.TextStyle;
import java.time.temporal.Temporal;
import java.time.temporal.TemporalField;
import java.time.temporal.TemporalQuery;
import java.time.temporal.ValueRange;
import java.util.Locale;

public class BsEra implements Era {
	public Temporal adjustInto(Temporal temporal) {
		throw new RuntimeException("TODO");
	}

	public String getDisplayName(TextStyle style, Locale locale) {
		throw new RuntimeException("TODO");
	}

	public long getLong(TemporalField field) {
		throw new RuntimeException("TODO");
	}

	public int getValue() {
		throw new RuntimeException("TODO");
	}

	public boolean isSupported(TemporalField field) {
		throw new RuntimeException("TODO");
	}

	public <R> R query(TemporalQuery<R> query) {
		throw new RuntimeException("TODO");
	}

	public ValueRange range(TemporalField field) {
		throw new RuntimeException("TODO");
	}
}
