package bikramsambat.android;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface.OnCancelListener;
import android.content.DialogInterface.OnClickListener;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup.LayoutParams;
import android.widget.EditText;
import android.widget.FrameLayout;
import android.widget.Spinner;
import android.widget.TextView;

import bikramsambat.BsCalendar;
import bikramsambat.BsException;
import bikramsambat.BikramSambatDate;
import bikramsambat.BsGregorianDate;

import static android.view.ViewGroup.LayoutParams.MATCH_PARENT;
import static android.view.ViewGroup.LayoutParams.WRAP_CONTENT;
import static bikramsambat.android.BsDatePickerUtils.asDevanagariNumberInput;

public class BsDatePickerDialog extends AlertDialog {

//> CONSTRUCTORS
	public BsDatePickerDialog(Context ctx) { super(ctx); initLayout(); }
	public BsDatePickerDialog(Context ctx, boolean cancelable, OnCancelListener l) { super(ctx, cancelable, l); initLayout(); }
	public BsDatePickerDialog(Context ctx, int themeResId) { super(ctx, themeResId); initLayout(); }

//> AlertDialog OVERRIDES
	@Override public void onCreate(Bundle b) {
		super.onCreate(b);

		asDevanagariNumberInput(this, R.id.txtDay);
		asDevanagariNumberInput(this, R.id.txtYear);
	}

//> PUBLIC API
	public BikramSambatDate getDate_bs() {
		return new BikramSambatDate(getYear(), getMonth(), getDay());
	}

	public BsGregorianDate getDate_greg() {
		return BsCalendar.getInstance().toGreg(getDate_bs());
	}

	public void setDate(BikramSambatDate bs) {
		setDate_bs(bs.year, bs.month, bs.day);
	}

	public void setDate_bs(int year, int month, int day) {
		setYear(year);
		setMonth(month);
		setDay(day);
	}

	public void setDate_greg(int year, int month, int day) throws BsException {
		BsGregorianDate greg = new BsGregorianDate(year, month, day);
		BikramSambatDate bik = BsCalendar.getInstance().toBik(greg);
		setDate(bik);
	}

//> PRIVATE HELPERS
	private int getDay() {
		try {
			return Integer.parseInt(text(R.id.txtDay));
		} catch(NumberFormatException ex) {
			return 0;
		}
	}

	private int getMonth() {
		return 1 + ((Spinner) findViewById(R.id.spnMonth)).getSelectedItemPosition();
	}

	private int getYear() {
		try {
			return Integer.parseInt(text(R.id.txtYear));
		} catch(NumberFormatException ex) {
			return 0;
		}
	}

	private void setDay(int day) { text(R.id.txtDay, Integer.toString(day)); }
	private void setMonth(int month) {
		Spinner s = (Spinner) findViewById(R.id.spnMonth);
		s.setSelection(month - 1);
	}
	private void setYear(int year) { text(R.id.txtYear, Integer.toString(year)); }

	private String text(int componentId) {
		EditText field = (EditText) findViewById(componentId);
		return field.getText().toString();
	}

	private void text(int componentId, String value) {
		TextView field = (TextView) findViewById(componentId);
		field.setText(value);
	}

	private void initLayout() {
		LayoutInflater inflater = getLayoutInflater();
		View v = inflater.inflate(R.layout.picker_dialog, null);
		setView(v);
	}
}
