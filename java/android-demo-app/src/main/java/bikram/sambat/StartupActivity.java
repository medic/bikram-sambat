package bikram.sambat;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import static bikram.sambat.BsLog.trace;

public class StartupActivity extends Activity {
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		trace(this, "Started.");

		// TODO inflate a layout
	}
}
