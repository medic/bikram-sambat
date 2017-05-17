package bikramsambat;

public final class DevanagariDigitConverter {
	private static final DevanagariDigitConverter instance = new DevanagariDigitConverter();

	private DevanagariDigitConverter() {}

	public static DevanagariDigitConverter getInstance() { return instance; }

	public String toDev(long from) {
		return toDev(Long.toString(from));
	}

	public String toDev(CharSequence from) {
		if(from == null) return null;

		StringBuilder bob = new StringBuilder();
		for(int len=from.length(), i=0; i<len; ++i) {
			char c = from.charAt(i);
			if(c >= 48 && c < 58) c += 2358;
			bob.append(c);
		}
		return bob.toString();
	}

	public String toEuro(CharSequence from) {
		if(from == null) return null;

		StringBuilder bob = new StringBuilder();
		for(int len=from.length(), i=0; i<len; ++i) {
			char c = from.charAt(i);
			if(c >= 2406 && c < 2416) c -= 2358;
			bob.append(c);
		}
		return bob.toString();
	}
}
