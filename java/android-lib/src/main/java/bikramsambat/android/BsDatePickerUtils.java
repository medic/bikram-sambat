package bikramsambat.android;

import android.app.Activity;
import android.app.Dialog;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.EditText;

import bikramsambat.DevanagariDigitConverter;

public final class BsDatePickerUtils {
	private static final DevanagariDigitConverter convert = DevanagariDigitConverter.getInstance();

	public static void asDevanagariNumberInput(Object parent, int id) {
		final EditText e = (EditText) findViewById(parent, id);

		e.addTextChangedListener(new TextWatcher() {
			public void afterTextChanged(Editable s) {}
			public void beforeTextChanged(CharSequence s, int start, int count, int after) {}
			public void onTextChanged(CharSequence s, int start, int before, int count) {
				int caret = start + count;

				String translated = convert.toDev(s);
				
				if(!s.toString().equals(translated)) {
					e.setText(translated);
					e.setSelection(caret);
				}
			}
		});
	}

	public static View findViewById(Object parent, int id) {
		if(parent instanceof Activity) {
			return ((Activity) parent).findViewById(id);
		} else if(parent instanceof Dialog) {
			return	((Dialog) parent).findViewById(id);
		} else if(parent instanceof View) {
			return ((View) parent).findViewById(id);
		} else throw new IllegalArgumentException("No handling for parent of type: " + parent.getClass());
	}

}
