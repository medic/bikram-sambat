package bikramsambat.android;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface.OnCancelListener;
import android.content.DialogInterface.OnClickListener;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup.LayoutParams;

import bikramsambat.BsException;
import bikramsambat.BikramSambatDate;
import bikramsambat.BsGregorianDate;

import static android.view.ViewGroup.LayoutParams.MATCH_PARENT;
import static android.view.ViewGroup.LayoutParams.WRAP_CONTENT;

public class BsDatePickerDialog extends AlertDialog {
	private BsDatePicker picker;

//> CONSTRUCTORS
	public BsDatePickerDialog(Context ctx) { super(ctx); initLayout(); }
	public BsDatePickerDialog(Context ctx, boolean cancelable, OnCancelListener l) { super(ctx, cancelable, l); initLayout(); }
	public BsDatePickerDialog(Context ctx, int themeResId) { super(ctx, themeResId); initLayout(); }

//> AlertDialog OVERRIDES
	@Override public void onCreate(Bundle b) {
		super.onCreate(b);

		picker.init();
	}

//> PUBLIC API
	public BikramSambatDate getDate_bs() { return picker.getDate_bs(); }
	public BsGregorianDate getDate_greg() throws BsException { return picker.getDate_greg(); }
	public void setDate(BikramSambatDate bs) { picker.setDate(bs); }
	public void setDate_bs(int year, int month, int day) { picker.setDate_bs(year, month, day); }
	public void setDate_greg(int year, int month, int day) throws BsException { picker.setDate_greg(year, month, day); }

//> PRIVATE HELPERS
	private void initLayout() {
		LayoutInflater inflater = getLayoutInflater();
		View v = inflater.inflate(R.layout.bikram_sambat_date_picker, null);
		setView(v);

		picker = new BsDatePicker(this);
	}
}
