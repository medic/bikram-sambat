package bikram.sambat;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.DialogInterface.OnClickListener;
import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;

import bikramsambat.BikramSambatDate;
import bikramsambat.BsCalendar;
import bikramsambat.BsException;
import bikramsambat.BsGregorianDate;
import bikramsambat.DevanagariDigitConverter;
import bikramsambat.android.BsDatePickerDialog;

import java.util.LinkedList;

import static android.content.DialogInterface.BUTTON_POSITIVE;
import static bikram.sambat.BsLog.logException;
import static bikram.sambat.BsLog.trace;
import static bikramsambat.android.BsDatePickerUtils.asDevanagariNumberInput;

public class StartupActivity extends Activity {
	private static final DevanagariDigitConverter convert = DevanagariDigitConverter.getInstance();

	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		trace(this, "Started.");

		setContentView(R.layout.main);

		asDevanagariNumberInput(this, R.id.txtDay);
		asDevanagariNumberInput(this, R.id.txtYear);
	}

//> CUSTOM EVENT HANDLERS
	public void click_convert(View v) {
		final AlertDialog.Builder dialog = new AlertDialog.Builder(this);
		LinkedList<String> content = new LinkedList<>();

		BikramSambatDate bsDate = getDate();

		String bikDate_euro = bsDate.day + "/" + bsDate.month + "/" + bsDate.year;
		String bikDate_bik = convert.toDev(bikDate_euro);

		String gregDate_str;
		try {
			BsGregorianDate gregDate = BsCalendar.getInstance().toGreg(bsDate);
			gregDate_str = gregDate.day + "/" + gregDate.month + "/" + gregDate.year;
		} catch(BsException ex) {
			gregDate_str = "Could not calculate gregorian date: " + ex.getMessage();
		}

		content.add("GREGORIAN DATE:");
		content.add("-- " + gregDate_str);
		content.add("BIKRAM DATE:");
		content.add("-- " + bikDate_euro);
		content.add("BIKRAM DATE (dev):");
		content.add("-- " + bikDate_bik);

		dialog.setItems(content.toArray(new String[content.size()]), null);
		dialog.create().show();
	}

	public void click_showDialog(View v) {
		final BsDatePickerDialog d = new BsDatePickerDialog(this);
		d.setButton(BUTTON_POSITIVE, "Okeyzi", new OnClickListener() {
			public void onClick(DialogInterface dialog, int which) {
				text(R.id.txtDialog_bik, (d.getDate_bs() + " BS"));
				try {
					text(R.id.txtDialog_greg, (d.getDate_greg() + " AD"));
				} catch(BsException ex) {
					logException(ex, "Could not calculate gregorian date.");
					text(R.id.txtDialog_greg, "Could not calculate: " + ex.getMessage());
				}
			}
		});
		d.show();
	}

//> PRIVATE HELPERS
	private BikramSambatDate getDate() {
		return new BikramSambatDate(getYear(), getMonth(), getDay());
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

	private void text(int componentId, String value) {
		TextView field = (TextView) findViewById(componentId);
		field.setText(value);
	}
}
