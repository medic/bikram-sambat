package bikramsambat;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

import static java.util.Arrays.asList;
import static java.util.Collections.unmodifiableList;

public final class BsCalendar {
	private static final BsCalendar instance = new BsCalendar();

	private static final long[] ENCODED_MONTH_LENGTHS = {
	      8673005L,5315258L,5314298L,9459438L,8673005L,5315258L,5314298L,9459438L,8473322L,5315258L,5314298L,9459438L,5327594L,5315258L,5314298L,9459438L,5327594L,5315258L,5314286L,8673006L,5315306L,5315258L,5265134L,8673006L,5315306L,5315258L,9459438L,8673005L,5315258L,5314490L,9459438L,8673005L,5315258L,5314298L,9459438L,8473325L,5315258L,5314298L,9459438L,5327594L,5315258L,5314298L,9459438L,5327594L,5315258L,5314286L,9459438L,5315306L,5315258L,5265134L,8673006L,5315306L,5315258L,5265134L,8673006L,5315258L,5314490L,9459438L,8673005L,5315258L,5314298L,9459438L,8669933L,5315258L,5314298L,9459438L,8473322L,5315258L,5314298L,9459438L,5327594L,5315258L,5314286L,9459438L,5315306L,5315258L,5265134L,8673006L,5315306L,5315258L,5265134L,5527290L,5527277L,5527226L,5527226L,5528046L,5527277L,5528250L,5528057L,5527277L,5527277L,
	};
	private static final String[] _MONTH_NAMES = { "बैशाख", "जेठ", "असार", "साउन", "भदौ", "असोज", "कार्तिक", "मंसिर", "पौष", "माघ", "फाल्गुन", "चैत" };
	public static final List<String> MONTH_NAMES = unmodifiableList(asList(_MONTH_NAMES));

	private DevanagariDigitConverter devanagari;

	private BsCalendar() { devanagari = DevanagariDigitConverter.getInstance(); }

	public static BsCalendar getInstance() { return instance; }

	/**
	 * Magic numbers:
	 *   2000 <- the first year encoded in ENCODED_MONTH_LENGTHS
	 *   month #5 <- this is the only month which has a day variation of more than 1
	 *   & 3 <- this is a 2 bit mask, i.e. 0...011
	 */
	public int daysInMonth(int year, int month) {
		return 29 + (int) ((ENCODED_MONTH_LENGTHS[year - 2000] >>>
				(((month-1) << 1))) & 3);
	}

	public BikramSambatDate toBik(BsGregorianDate greg) {
		// TODO
		return null;
	}

	public BsGregorianDate toGreg(BikramSambatDate bik) {
		// TODO
		return null;
	}

	public String toBik_euro(String greg) throws BsException {
		BikramSambatDate d = toBik(greg);
		return d.year + "-" + zPad(d.month) + "-" + zPad(d.day);
	}

	public String toBik_dev(String greg) throws BsException {
		return devanagari.toDev(toBik_euro(greg));
	}

	public String toBik_text(String greg) throws BsException {
		BikramSambatDate d = toBik(greg);
		return devanagari.toDev(d.day) + " " + _MONTH_NAMES[d.month-1] + " " + devanagari.toDev(d.year);
	}

	/**
	 * Magic numbers:
	 *  86400000 <- the number of miliseconds in a day
	 *  2007 <- The year (BS) whose first day is our Bikram Sambat Epoch (BSE)
	 *  -622359900000 <- unix timestamp of BSE ('1950-4-13')
	 */
	private BikramSambatDate toBik(String greg) throws BsException {
		int year = 2007;
		int days;
		try {
			days = (int) Math.floor((parseDate(greg) + 622359900000L) / 86400000L) + 1;
		} catch(ParseException ex) {
			throw new BsException("Unable to parse gregorian date: " + greg, ex);
		}

		while(days > 0) {
			for(int m=1; m<=12; ++m) {
				int dM = daysInMonth(year, m);
				if(days <= dM) return new BikramSambatDate(year, m, days);
				days -= dM;
			}
			++year;
		}

		throw new BsException("Date outside supported range: " + greg + " AD");
	}

	private String zPad(int x) { return x > 9 ? Integer.toString(x) : "0" + x; }

	private long parseDate(String date) throws ParseException {
		return new SimpleDateFormat("yyyy-MM-dd").parse(date).getTime();
	}
}
