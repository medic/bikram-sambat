package bikram.sambat;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.EditText;
import android.widget.Spinner;

import bikramsambat.DevanagariDigitConverter;

import java.util.LinkedList;

import static bikram.sambat.BsLog.trace;
import static bikram.sambat.BsLog.warn;

public class StartupActivity extends Activity {
	private static final DevanagariDigitConverter convert = DevanagariDigitConverter.getInstance();

	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		trace(this, "Started.");

		setContentView(R.layout.main);

		asDevanagariNumberInput(R.id.txtDay);
		asDevanagariNumberInput(R.id.txtYear);
	}

//> CUSTOM EVENT HANDLERS
	public void click_ok(View v) {
		final AlertDialog.Builder dialog = new AlertDialog.Builder(this);
		LinkedList<String> content = new LinkedList<>();

		int day = getDay(), month = getMonth(), year = getYear();

		content.add("GREGORIAN DATE:");
		content.add("-- TODO");
		content.add("BIKRAM DATE:");
		content.add("-- " + day + "/" + month + "/" + year);
		content.add("BIKRAM DATE (dev):");
		content.add("-- TODO");

		dialog.setItems(content.toArray(new String[content.size()]), null);
		dialog.create().show();
	}

//> PRIVATE HELPERS
	private void asDevanagariNumberInput(int id) {
		final EditText e = (EditText) findViewById(id);
		e.addTextChangedListener(new TextWatcher() {
			public void afterTextChanged(Editable s) {
			}
			public void beforeTextChanged(CharSequence s, int start, int count, int after) {}
			public void onTextChanged(CharSequence s, int start, int before, int count) {
				warn("asDevanagariNumberInput() :: len=%s, start=%s, before=%s, count=%s", s.length(), start, before, count);

				int caret = start + count;

				s = e.getText();
				String translated = convert.toDev(s);
				//if(!s.equals(translated)) e.setText(translated);
				warn("asDevanagariNumberInput() :: s=%s; translated=%s; equals=%s", s, translated, s.toString().equals(translated));
				
				if(!s.toString().equals(translated)) {
					e.setText(translated);
					e.setSelection(caret);
				}
			}
		});
	}

	/** @return day of month, or {@code 0} if value could not be read */
	private int getDay() {
		try {
			return Integer.parseInt(text(R.id.txtDay));
		} catch(NumberFormatException ex) {
			return 0;
		}
	}

	/** @return 1-indexed month, or {@code 0} if value could not be read */
	private int getMonth() {
		return 1 + ((Spinner) findViewById(R.id.spnMonth)).getSelectedItemPosition();
	}

	/** @return year, or {@code 0} if value could not be read */
	private int getYear() {
		try {
			return Integer.parseInt(text(R.id.txtYear));
		} catch(NumberFormatException ex) {
			return 0;
		}
	}

	private String text(int componentId) {
		EditText field = (EditText) findViewById(componentId);
		return field.getText().toString();
	}
}
