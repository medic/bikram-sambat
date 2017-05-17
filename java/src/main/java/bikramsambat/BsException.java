package bikramsambat;

public class BsException extends Exception {
	public BsException(String message) {
		super(message);
	}

	public BsException(String message, Throwable cause) {
		super(message, cause);
	}
}
