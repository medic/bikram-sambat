package bikramsambat.android;

import android.view.View;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;

import bikramsambat.BsCalendar;
import bikramsambat.BsException;
import bikramsambat.BikramSambatDate;
import bikramsambat.BsGregorianDate;

import static bikramsambat.android.BsDatePickerUtils.asDevanagariNumberInput;

public class BsDatePicker {
	private final BsCalendar convert = BsCalendar.getInstance();
	private final Object parent;

	public BsDatePicker(Object parent) {
		this.parent = parent;
	}


//> PUBLIC API
	public void init() {
		asDevanagariNumberInput(parent, R.id.txtDay);
		asDevanagariNumberInput(parent, R.id.txtYear);
	}

	public BikramSambatDate getDate_bs() {
		return new BikramSambatDate(getYear(), getMonth(), getDay());
	}

	public BsGregorianDate getDate_greg() throws BsException {
		return convert.toGreg(getDate_bs());
	}

	public void setDate(BikramSambatDate bs) {
		setDate_bs(bs.year, bs.month, bs.day);
	}

	public void setDate(BsGregorianDate greg) throws BsException {
		setDate(convert.toBik(greg));
	}

	public void setDate_bs(int year, int month, int day) {
		setYear(year);
		setMonth(month);
		setDay(day);
	}

	public void setDate_greg(int year, int month, int day) throws BsException {
		BsGregorianDate greg = new BsGregorianDate(year, month, day);
		BikramSambatDate bik = convert.toBik(greg);
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

	private View findViewById(int id) {
		return BsDatePickerUtils.findViewById(parent, id);
	}
}
