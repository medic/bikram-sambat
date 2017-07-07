package bikramsambat;

import static bikramsambat.BsUtils.zPad;

public final class BsGregorianDate {
	public final int year;
	public final int month;
	public final int day;

	public BsGregorianDate(int year, int month, int day) {
		this.year = year;
		this.month = month;
		this.day = day;
	}

	public int hashCode() {
		int result = 5;
		result = 31 * result + year;
		result = 31 * result + month;
		result = 31 * result + day;
		return result;
	}

	public boolean equals(Object that) {
		if(that == null) return false;
		if(!(that instanceof BsGregorianDate)) return false;

		BsGregorianDate tother = (BsGregorianDate) that;

		return
				tother.year == this.year &&
				tother.month == this.month &&
				tother.day == this.day;
	}

	public String toString() {
		return year + "-" + zPad(month) + "-" + zPad(day);
	}
}
