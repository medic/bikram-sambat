package bikram.sambat;

import static android.util.Log.d;
import static android.util.Log.i;
import static android.util.Log.w;
import static bikram.sambat.BuildConfig.DEBUG;

public final class BsLog {
	private static final String LOG_TAG = "BikramSambat";

	private BsLog() {}

	public static void warn(String message, Object... extras) {
		message = String.format(message, extras);

		w(LOG_TAG, message);
	}

	public static void trace(Object caller, String message, Object... extras) {
		if(!DEBUG) return;
		message = String.format(message, extras);
		Class callerClass = caller instanceof Class ? (Class) caller : caller.getClass();
		d(LOG_TAG, String.format("%s :: %s", callerClass.getName(), message));
	}

	public static void logException(Exception ex, String message, Object... extras) {
		message = forException(ex, message, extras);

		i(LOG_TAG, message, ex);
	}

	public static void warn(Exception ex, String message, Object... extras) {
		message = String.format(message, extras);

		w(LOG_TAG, message, ex);
	}

	private static String forException(Exception ex, String message, Object... extras) {
		return String.format("%s :: %s",
				String.format(message, extras),
				ex);
	}
}

