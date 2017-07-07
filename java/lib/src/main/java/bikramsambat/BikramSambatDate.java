package bikramsambat;

import static bikramsambat.BsUtils.zPad;

public final class BikramSambatDate {
	public final int year;
	public final int month;
	public final int day;

	public BikramSambatDate(int year, int month, int day) {
		this.year = year;
		this.month = month;
		this.day = day;
	}

	public int hashCode() {
		int result = 3;
		result = 37 * result + year;
		result = 37 * result + month;
		result = 37 * result + day;
		return result;
	}

	public boolean equals(Object that) {
		if(that == null) return false;
		if(!(that instanceof BikramSambatDate)) return false;

		BikramSambatDate tother = (BikramSambatDate) that;

		return
				tother.year == this.year &&
				tother.month == this.month &&
				tother.day == this.day;
	}

	public String toString() {
		return year + "-" + zPad(month) + "-" + zPad(day);
	}
}
