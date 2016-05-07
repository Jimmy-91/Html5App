var Symb = {};
Symb.SoftInputMode = function(mode) {
	document.addEventListener("plusready", function() {
		if (plus.os.vendor == "Google") {
			var Context = plus.android.importClass("android.content.Context");
			var Window = plus.android.importClass("android.view.Window");
			var main = plus.android.runtimeMainActivity();
			var MyWindow = plus.android.invoke(main, "getWindow");
			plus.android.invoke(MyWindow, "setSoftInputMode", mode);
		}
	}, false);
}

Symb.CloseInput = function() {
	document.addEventListener("plusready", function() {
		if (plus.os.vendor == "Google") {
			var Context = plus.android.importClass("android.content.Context");
			var InputMethodManager = plus.android.importClass("android.view.inputmethod.InputMethodManager");
			var IBinder = plus.android.importClass("android.os.IBinder");
			var main = plus.android.runtimeMainActivity();
			var context = plus.android.invoke(main, "getContext");
			var imm = plus.android.invoke(context, "getSystemService", "input_method");
			var isActive = plus.android.invoke(imm, "isActive");

			var view = plus.android.currentWebview();
			var viewIBinder = plus.android.invoke(view, "getApplicationWindowToken");
			if (isActive) {
				imm.hideSoftInputFromWindow(viewIBinder, 0);
				plus.android.invoke(imm, "hideSoftInputFromWindow", viewIBinder, 0);
			}
		}
	}, false);
}