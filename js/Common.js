var Common = {};
Common.u_Id_Key = "uid";
Common.u_Validate_Key = "validate";
Common.u_Id = undefined;
Common.u_phone = undefined;
Common.validate = undefined;
Common.flag;
Common.task = {};
Common.xuanMoney = new Array();
Common.xuanMoney[0] = "1-1千";
Common.xuanMoney[1] = "1千-3千";
Common.xuanMoney[2] = "3千-6千";
Common.xuanMoney[3] = "6千-1万";
Common.xuanMoney[4] = "1万-2万";
Common.xuanMoney[5] = "2万-3万";
Common.xuanMoney[6] = "3万-5万";
Common.xuanMoney[7] = "5万-6万";

//数据本地化
Common.saveJson = function(key, value) {
	plus.storage.setItem(key, value);
};
//从数据本地化中获取
Common.getJson = function(key) {
	return plus.storage.getItem(key);
};
//从数据本地化中移除
Common.removeJson = function(key) {
	plus.storage.removeItem(key);
};

function StringBuffer() {
	this._strs = [];
}
StringBuffer.prototype.append = function(str) {
	this._strs.push(str);
	return this;
};
StringBuffer.prototype.toString = function() {
	return this._strs.join("");
};

Common.contains = function(Str, subString) {
	if (Str.indexOf(subString) > 0) {
		return true;
	} else {
		return false;
	}
}

Common.urlParam = function(url) {
	console.log(url);
	var params = {};
	var array = url.toString().split("?"); //用"?"作为分隔符
	if (array.length >= 2) {

		var arrayParam = array[1].split("&");
		for (param in arrayParam) {
			if (arrayParam[param].constructor == String) {
				var keyValue = arrayParam[param].split("=");
				params[keyValue[0]] = keyValue[1];
			}
		}
	}
	return params;
}

Common.createWeb = function(html, title, ViewSize) {
	var targetTab = plus.webview.create(html, title, ViewSize);
	var aniShow = {};
	aniShow[targetTab] = "true";
	mui.extend(aniShow, aniShow);
	return targetTab;
}

Common.residue_time = function(beginTime, endTime) {
	var residue_time = endTime - beginTime;
	var day = parseInt(residue_time / 86400000);
	var hour = parseInt((residue_time - day * 86400000) / 3600000);
	var minute = parseInt((residue_time - day * 86400000 - hour * 3600000) / 60000);
	var second = parseInt((residue_time - day * 86400000 - hour * 3600000 - minute * 60000) / 1000);
	return day + "天" + hour + "时" + minute + "分" + second + "秒";
}

/**********************************线性垂直居中布局**********************/
Common.left_right_layout = function($father) {
	$father.children(".vertical-center").each(function() {
		var totalHeight = 0;
		$(this).children().each(function() {
			var top = parseInt($(this).css("padding-top"));
			var margintop = parseInt($(this).css("margin-top"));
			var bottom = parseInt($(this).css("padding-bottom"));
			var marginbottom = parseInt($(this).css("margin-bottom"));
			//			var border = parseInt($(this).css("border-width")) * 2;
			totalHeight += $(this).height() + top + bottom + margintop + marginbottom;
		});
		$(this).css("height", totalHeight + "px");
	});
	var leftMaxWidth = 0;
	$left = $father.children(".left");
	$left.children().each(function() {
		var width = $(this).width();
		leftMaxWidth = width > leftMaxWidth ? width : leftMaxWidth;
	});
	var leftLimitWidth = $father.width() * 0.75;

	var leftWidth = leftLimitWidth;
	$left.css("width", leftWidth + "px");
	$left.children().css("width", leftWidth + "px");

	var $task_title = $left.find("#task-title");
	var $task_user_title = $left.find("#task-user-title");
	var taskTitleWidth = $task_title.width();
	var taskTitleLimitWidth = leftWidth * 0.60;
	$task_title.css("width", taskTitleWidth > taskTitleLimitWidth ? taskTitleLimitWidth : taskTitleWidth + "px");
	var flag = taskTitleWidth > taskTitleLimitWidth ? taskTitleLimitWidth : taskTitleWidth;
	//	alert($task_user_title);
	//	if ($task_user_title != undefined) {
	var user_name_width = $father.width() * 0.25;
	$task_user_title.css("width", user_name_width + "px");
	//	}


	var leftOffset = 0;
	if ($left.prev().offset() == undefined) {
		$left.css("left", 15 + "px");
	} else {
		leftOffset = $left.prev().offset().left + $left.prev().width();
		if (leftOffset >= 360) {
			leftOffset = 0;
		}
		$left.css("left", leftOffset + 15 + "px");
	}
	var rightMaxWidth = 0;
	$right = $father.children(".right");
	if ($right.children(".task-right-button") === undefined) {
		$right.children().each(function() {
			var width = $(this).width();
			rightMaxWidth = width > rightMaxWidth ? width : rightMaxWidth;
		});
		var rightLimitWidth = $(window).width() * 0.25;
		$right.css("width", rightMaxWidth > rightLimitWidth ? rightLimitWidth : rightMaxWidth);
		$right.children().css("width", rightMaxWidth > rightLimitWidth ? rightLimitWidth : rightMaxWidth);
	}
};
/**********************************线性垂直居中布局**********************/

Array.prototype.insert = function(index, item) {
	this.splice(index, 0, item);
};

Date.prototype.Format = function(fmt) { //author: meizz 
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"H+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

/**********************************创建星评级**********************************/
Common.creatStarBar = function(StarBar, enable) {
	var starOn = StarBar.starOn;
	var starOff = StarBar.starOff;
	var starMargin = StarBar.starMargin;
	var starNumber = StarBar.starNumber;
	var starHeight = StarBar.starHeight;
	var starWidth = StarBar.starWidth;
	var starOnNumber = StarBar.starOnNumber - 1;
	var $StarBar = $("<ul class='starBar'></ul>").css("height", starHeight);
	for (var i = 0; i < starNumber; i++) {
		var $StarBarItem = $("<li class='starBar-item'></li>").css("width", starWidth).css("background", starOff + " no-repeat").css("background-size", starHeight + " " + starHeight);
		if (enable) {
			$StarBarItem.hover(function() {
				$(this).parent().children().css("background", starOff + " no-repeat");
				$(this).css("background", starOn + " no-repeat");
				$(this).prevAll().css("background", starOn + " no-repeat");
				$(this).parent().children(":odd").css("margin-right", starMargin).css("background-position", "100% 50%").css("background-size", starHeight + " " + starHeight);
				$(this).parent().children(":even").css("margin-left", starMargin).css("background-position", "0% 50%").css("background-size", starHeight + " " + starHeight);
				$(this).parent().attr("star_on", $(this).prevAll().length / 2 + 0.5);
			});
		}
		$StarBar.parent().children().css("background", starOff + " no-repeat");
		if (starOnNumber > 0) {
			$StarBar.children().eq(starOnNumber)
			$StarBar.children().eq(starOnNumber).css("background", starOn + " no-repeat");
			$StarBar.children().eq(starOnNumber).prevAll().css("background", starOn + " no-repeat");
		}

		$StarBar.append($StarBarItem);
	}
	$StarBar.children(":odd").css("margin-right", starMargin).css("background-position", "100% 50%").css("background-size", starHeight + " " + starHeight);
	$StarBar.children(":even").css("margin-left", starMargin).css("background-position", "0% 50%").css("background-size", starHeight + " " + starHeight);
	return $StarBar;
};
/**********************************创建星评级**********************************/
/************************操作成功后下一个状态**************************************/
//who:1表示雇主，2表示威客
Common.changedState = function(who, intTaskStatus, currentState) {
		var mIntTaskStatus = parseInt(intTaskStatus);
		var mCurrentstate = parseInt(currentState);
		var changedstate = {};
		if (who == 1) { //作为发布方
			switch (mIntTaskStatus) {
				case 0: //悬赏模式待付款
					break;
				case 1: //待审核
					break;
				case 2: //招标中
					break;
				case 4: //招标模式下的待付款
					intTaskStatus = 5;
					changedstate.msg = "确认打款";
					changedstate.functionName = "JingQueRenPay";
					changedstate.enable = true;
					break;
				case 5:
					intTaskStatus = 7;
					changedstate.msg = "评价";
					changedstate.functionName = "pingjia";
					changedstate.enable = true;
					break;
				case 6:
					switch (mCurrentstate) {
						case 1:
							currentState = 2;
							changedstate.msg = "威客操作";
							changedstate.enable = false;
							break;
						case 2:
							currentState = 3;
							changedstate.msg = "确认验收";
							changedstate.functionName = "buyer_Confirm_Check";
							changedstate.enable = true;
							break;
						case 3:
							currentState = currentState;
							intTaskStatus = 7;
							changedstate.msg = "评价";
							changedstate.functionName = "pingjia";
							changedstate.enable = true;
							break;
					}
					break;
			}
		} else if (who == 2) { //作为承接方
			switch (mIntTaskStatus) {
				case 2: //已报名
					break;
				case 4:
					currentState = 1;
					intTaskStatus = 5;
					changedstate.msg = "申请打款";
					changedstate.functionName = "JingApplyPay";
					changedstate.enable = true;
					break;
				case 5:
					switch (mCurrentstate) {
						case 1:
							currentState = 2;
							changedstate.msg = "雇主打款";
							changedstate.enable = false;
							break;
						case 2:
							break;
					}
					break;
				case 6:
					switch (mCurrentstate) {
						case 11:
							currentState = 21;
							changedstate.msg = "雇主确认";
							changedstate.enable = false;
							break;
						case 12:
							currentState = 22;
							changedstate.msg = "上传附件";
							changedstate.functionName = "uploader";
							changedstate.enable = true;
							break;
						case 21:
							break;
						case 22:
							currentState = 33;
							changedstate.msg = "雇主验收";
							changedstate.enable = false;
							break;
						case 33:
							break;
					}
					break;
				case 7:
					changedstate.msg = "评价";
					changedstate.functionName = "pingjia";
					changedstate.enable = true;
					break;
			}
		}
		changedstate.intTaskStatus = intTaskStatus;
		changedstate.state = currentState;
		return changedstate;
	}
	//Common.changedState = function(who, intTaskStatus, currentState) {
	//		if (intTaskStatus != undefined) {
	//			var mIntTaskStatus = parseInt(intTaskStatus);
	//		}
	//		if (currentState != undefined) {
	//			var mCurrentstate = parseInt(currentState);
	//		}
	//
	//		var changedstate = {};
	//		switch (mIntTaskStatus) {
	//			case 4: //竞标模式下的付款
	//				changedstate.state = currentState;
	//				changedstate.intTaskStatus = 5;
	//				changedstate.msg = "确认打款";
	//				changedstate.functionName = "JingQueRenPay";
	//				changedstate.enable = true;
	//				break;
	//				//			case 0: //悬赏模式下的付款
	//				//				changedstate.state = currentState;
	//				//				changedstate.msg = "威客操作";
	//				//				changedstate.enable = false;
	//				//				break;
	//			case 5:
	//				changedstate.state = currentState;
	//				changedstate.intTaskStatus = 7;
	//				changedstate.msg = "评价";
	//				changedstate.functionName = "pingjia";
	//				changedstate.enable = true;
	//				break;
	//			case 6:
	//				if (who == 1) {
	//					switch (mCurrentstate) {
	//						case 1:
	//							changedstate.state = 2;
	//							changedstate.msg = "威客操作";
	//							changedstate.enable = false;
	//							break;
	//						case 2:
	//							changedstate.state = 3;
	//							changedstate.msg = "确认验收";
	//							changedstate.functionName = "buyer_Confirm_Check";
	//							changedstate.enable = true;
	//							break;
	//					}
	//				} else {
	//					switch (mCurrentstate) {
	//						case 11:
	//							changedstate.state = 21;
	//							changedstate.msg = "雇主确认";
	//							changedstate.enable = false;
	//
	//							break;
	//						case 12:
	//							changedstate.state = 22;
	//							changedstate.msg = "上传附件";
	//							changedstate.functionName = "seller_Update";
	//							changedstate.enable = true;
	//							break;
	//						case 22:
	//							changedstate.state = 33;
	//							changedstate.msg = "雇主验收";
	//							changedstate.enable = false;
	//							break;
	//					}
	//				}
	//				break;
	//		}
	//		return changedstate;
	//	}
	//Common.changedState = function(who, currentstate) {
	//	var state = parseInt(currentstate);
	//	var changedstate = {};
	//	if (who == 1) {
	//		switch (state) {
	//			case 1:
	//				changedstate.state = 2;
	//				changedstate.msg = "威客操作";
	//				changedstate.enable = false;
	//				break;
	//			case 2:
	//				changedstate.state = 3;
	//				changedstate.msg = "确认验收";
	//				changedstate.functionName = "buyer_Confirm_Check";
	//				changedstate.enable = true;
	//				break;
	//		}
	//	} else {
	//		switch (state) {
	//			case 11:
	//				changedstate.state = 21;
	//				changedstate.msg = "雇主确认";
	//				changedstate.enable = false;
	//
	//				break;
	//			case 12:
	//				changedstate.state = 22;
	//				changedstate.msg = "上传附件";
	//				changedstate.functionName = "seller_Update";
	//				changedstate.enable = true;
	//				break;
	//			case 22:
	//				changedstate.state = 33;
	//				changedstate.msg = "雇主验收";
	//				changedstate.enable = false;
	//				break;
	//		}
	//	}
	//	return changedstate;
	//}
Common.getState = function(who, intTaskStatus, currentstate) {
		var mIntTaskStatus = parseInt(intTaskStatus);
		var state = parseInt(currentstate);
		var changedstate = {};
		if (who == 1) { //作为发布方
			switch (mIntTaskStatus) {
				case 0: //待付款
					changedstate.msg = "付款";
					changedstate.functionName = "pay";
					changedstate.enable = true;
					break;
				case 1: //待审核
					changedstate.msg = "待审核";
					changedstate.enable = false;
					break;
				case 2: //招标中
					break;
				case 4: //招标模式下的待付款
					changedstate.msg = "付款";
					changedstate.functionName = "pay";
					changedstate.enable = true;
					break;
				case 5:
					changedstate.msg = "确认打款";
					changedstate.functionName = "JingQueRenPay";
					changedstate.enable = true;
					break;
				case 6:
					switch (state) {
						case 1:
							changedstate.msg = "确认协议";
							changedstate.functionName = "buyer_Confirm_Agreement";
							changedstate.enable = true;
							break;
						case 2:
							changedstate.msg = "威客操作";
							changedstate.enable = false;
							break;
						case 3:
							changedstate.msg = "确认验收";
							changedstate.functionName = "buyer_Confirm_Check";
							changedstate.enable = true;
							break;
					}
					break;
				case 7: //待评价
					changedstate.msg = "评价";
					changedstate.functionName = "pingjia";
					changedstate.enable = true;
					break;
			}
		} else if (who == 2) { //作为承接方
			switch (mIntTaskStatus) {
				case 2: //已报名
					break;
				case 4:
					changedstate.msg = "托管赏金";
					changedstate.enable = false;
					break;
				case 5:
					switch (state) {
						case 1:
							changedstate.msg = "申请打款";
							changedstate.functionName = "JingApplyPay";
							changedstate.enable = true;
							break;
						case 2:
							changedstate.msg = "雇主打款";
							changedstate.enable = false;
							break;
					}
					break;
				case 6:
					switch (state) {
						case 11:
						case 12:
							changedstate.msg = "确认协议";
							changedstate.functionName = "seller_Confirm_Agreement";
							changedstate.enable = true;
							break;
						case 21:
							changedstate.msg = "雇主确认";
							changedstate.enable = false;
							break;
						case 22:
							changedstate.msg = "上传附件";
							changedstate.functionName = "uploader";
							changedstate.enable = true;
							break;
						case 33:
							changedstate.msg = "雇主验收";
							changedstate.enable = false;
							break;
					}
					break;
				case 7:
					changedstate.msg = "评价";
					changedstate.functionName = "pingjia";
					changedstate.enable = true;
					break;
			}
		}
		return changedstate;
	}
	//Common.getState = function(who, intTaskStatus, currentstate) {
	//	var mIntTaskStatus = parseInt(intTaskStatus);
	//	var state = parseInt(currentstate);
	//	var changedstate = {};
	//	switch (mIntTaskStatus) {
	//		case 4:
	//			if (who == 2) {
	//				changedstate.msg = "托管赏金";
	//				changedstate.enable = false;
	//				break;
	//			}
	//		case 0:
	//			changedstate.msg = "付款";
	//			changedstate.functionName = "pay";
	//			changedstate.enable = true;
	//			break;
	//		case 1:
	//			changedstate.msg = "待审核";
	//			changedstate.enable = false;
	//			break;
	//		case 5:
	//			if (who == 1) {
	//				changedstate.msg = "确认打款";
	//				changedstate.functionName = "JingQueRenPay";
	//				changedstate.enable = true;
	//			} else if (who == 2) {
	//				changedstate.msg = "申请打款";
	//				changedstate.functionName = "JingApplyPay";
	//				changedstate.enable = true;
	//			}
	//			break;
	//		case 6: //悬赏模式
	//			if (who == 1) {
	//				switch (state) {
	//					case 1:
	//						changedstate.msg = "确认协议";
	//						changedstate.functionName = "buyer_Confirm_Agreement";
	//						changedstate.enable = true;
	//						break;
	//					case 2:
	//						changedstate.msg = "威客操作";
	//						changedstate.enable = false;
	//						break;
	//					case 3:
	//						changedstate.msg = "确认验收";
	//						changedstate.functionName = "buyer_Confirm_Check";
	//						changedstate.enable = true;
	//						break;
	//				}
	//			} else {
	//				switch (state) {
	//					case 11:
	//					case 12:
	//						changedstate.msg = "确认协议";
	//						changedstate.functionName = "seller_Confirm_Agreement";
	//						changedstate.enable = true;
	//						break;
	//					case 21:
	//						changedstate.msg = "雇主确认";
	//						changedstate.enable = false;
	//						break;
	//					case 22:
	//						changedstate.msg = "上传附件";
	//						changedstate.functionName = "seller_Update";
	//						changedstate.enable = true;
	//						break;
	//					case 33:
	//						changedstate.msg = "雇主验收";
	//						changedstate.enable = false;
	//						break;
	//				}
	//			}
	//			break;
	//		case 7: //待评价
	//			changedstate.msg = "评价";
	//			changedstate.functionName = "pingjia";
	//			changedstate.enable = true;
	//			break;
	//	}
	//	return changedstate;
	//}

Common.initPager = function() {
		if ($(".table-menu-item" !== undefined)) {
			var length = $(".table-menu-item[id!=none]").length;
			var margin = ($(".header-bar-bottom-menu").width() / length - $(".menu-action").children().width()) / 2;
			$(".menu-action-flag").css("margin", "0px " + margin + "px");
			var index = $(".table-menu-item[id!=none]").index($(".menu-action"));
			var menuWidth = $(".menu-action").width();
			$(".menu-action-flag").css("left", index * menuWidth + "px");
			$(".table-menu-item").click(function() {
				$(this).parent().children().removeClass("menu-action");
				$(this).addClass("menu-action");
				var margin = ($(".header-bar-bottom-menu").width() / length - $(this).children().width()) / 2;
				$(".menu-action-flag").css("margin", "0px " + margin + "px");

				var index = $(".table-menu-item[id!=none]").index(this);
				var menuWidth = $(this).width();
				$(".menu-action-flag").css("width", $(this).children().width());
				$(".menu-action-flag").css("left", index * menuWidth + "px");
			});
		}
	}
	//身份证判断
Common.isIDCard = function(idcard) {
		var pattern = /\d{15}|\d{17}[0-9Xx]/;
		return pattern.test(idcard);
	} //邮箱判断
Common.isEmail = function(mail) {
		var pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return pattern.test(mail);
	}
	//手机号判断
Common.isPhone = function(phone) {
	var pattern = /(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7}/;
	return pattern.test(phone);
}