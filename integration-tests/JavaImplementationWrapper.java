import bikramsambat.*;

public class JavaImplementationWrapper {
	private static final BsCalendar cal = BsCalendar.getInstance();

	public static void main(String... args) {
		String methodName = args[0];

		try {
			if(methodName.equals("daysInMonth")) {
				print(daysInMonth(args));
			} else if(methodName.equals("toGreg")) {
				print(toGreg(args));
			} else {
			}
		} catch(Exception ex) {
			err(1, "Exception caught while trying to execute " + methodName + "(): " + ex);
		}
		err(2, "Method not supported: " + methodName + "()");

	}

	private static void print(Object s) {
		System.out.print(s);
		System.exit(0);
	}

	private static void err(int status, Object s) {
		System.err.println("JavaImplementationWrapper threw a fatal error: " + s);
		System.exit(status);
	}

	private static int daysInMonth(String... args) throws Exception {
		int year = intFrom(args, 1);
		int month = intFrom(args, 2);

		return cal.daysInMonth(year, month);
	}

	private static BsGregorianDate toGreg(String... args) throws Exception {
		int year = intFrom(args, 1);
		int month = intFrom(args, 2);
		int day = intFrom(args, 3);

		return cal.toGreg(new BikramSambatDate(year, month, day));
	}

	private static int intFrom(String[] args, int idx) {
		return Integer.parseInt(args[idx]);
	}
}
