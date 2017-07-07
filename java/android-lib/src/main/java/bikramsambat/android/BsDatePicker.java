package bikramsambat.android;

import bikramsambat.BsCalendar;
import bikramsambat.BsException;
import bikramsambat.BikramSambatDate;
import bikramsambat.BsGregorianDate;

public class BsDatePicker {
	private int year;
	private int month;
	private int day;

	public BikramSambatDate getDate_bs() {
		return new BikramSambatDate(year, month, day);
	}

	public void setDate_bs(int year, int month, int day) {
		this.year = year;
		this.month = month;
		this.day = day;
	}

	public BsGregorianDate getDate_greg() {
		return BsCalendar.getInstance().toGreg(getDate_bs());
	}

	public void setDate_greg(int year, int month, int day) throws BsException {
		BsGregorianDate greg = new BsGregorianDate(year, month, day);
		BikramSambatDate bik = BsCalendar.getInstance().toBik(greg);

		this.year = bik.year;
		this.month = bik.month;
		this.day = bik.day;
	}
}
