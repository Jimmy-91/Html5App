$(function() {
	$("body").append($("<div class='md-modal md-effect-2' id='modal-2'></div>")
			.append($("<div class='md-content'></div>")
				.append($("<div></div>").append("<p id='message'>协议条款如下：</p>")
					.append("<div class='button'><div class='left-button font-size-17px left' style='float: left;'><span>确定</span>	</div><div class='right-button font-size-17px ' style='float: right;'><span>取消</span></div></div>"))))
		.append($("<div class='md-overlay'></div>"));
});
var Dialog = {};
Dialog.showDialog = function(msg, leftButtonFn, rightButtonFn) {
	$("#message").text(msg);
	$(".button .left-button").bind("click",leftButtonFn);
	$(".button .right-button").bind("click",rightButtonFn);
	$("#modal-2").addClass("md-show");
	document.ontouchmove = function() {
		return false;
	}
	return false;
};

//Dialog.showDialogObject = function(item) {
//	$("#message").text(item.msg);
//	$(".button .left-button").click(item.leftButtonFn());
//	$(".button .right-button").click(item.rightButtonFn());
//	$("#modal-2").addClass("md-show");
//	document.ontouchmove = function() {
//		return false;
//	}
//	return false;
//};


Dialog.closeDialog = function() {
	$(".button .left-button").unbind("click");
	$(".button .right-button").unbind("click");
	$("#modal-2").removeClass("md-show");
	document.ontouchmove = function() {
		return true;
	}
};