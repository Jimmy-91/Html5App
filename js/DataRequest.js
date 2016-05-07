var DataRequest = {};
var geturl = function(url, requestParamArray) {
	if (requestParamArray !== null) {
		var sb = new StringBuffer();
		var validate = Common.getJson(Common.u_Validate_Key);
		var u_id = Common.getJson(Common.u_Id_Key);
		sb.append("token=" + "fbb9cfcba9d771e4b0c63599971cd77c&");
		sb.append("validate=" + validate + "&");
		sb.append("u_id=" + u_id + "&");
		for (var i = 0, leng = requestParamArray.length; i < leng; i++) {
			if (i == leng - 1) {
				sb.append(requestParamArray[i].key + "=" + requestParamArray[i].value);
			} else {
				sb.append(requestParamArray[i].key + "=" + requestParamArray[i].value + "&");
			}
		}
		if (Common.contains(url, "?")) {
			return url + sb.toString();
		}
		return url + "?" + sb.toString();
	} else {
		return url + "?token=" + "fbb9cfcba9d771e4b0c63599971cd77c";
	}
};

var postRequestParamArray = function(requestParamArray) {
	var requestParam = {};
	var validate = Common.getJson(Common.u_Validate_Key);
	var u_id = Common.getJson(Common.u_Id_Key);
	requestParam["token"] = "fbb9cfcba9d771e4b0c63599971cd77c";
	requestParam["validate"] = validate;
	requestParam["u_id"] = u_id;
	if (requestParamArray !== null) {
		for (var i = 0, leng = requestParamArray.length; i < leng; i++) {
			requestParam[requestParamArray[i].key] = requestParamArray[i].value;
		}
	}
	return requestParam;
};

DataRequest.getData = function(url, requestParamArray, successFN, failFN) {
	mui.plusReady(function() {
		console.log(geturl(url, requestParamArray));
		$.ajax({
			type: "get",
			url: geturl(url, requestParamArray),
			async: true,
			dataType: "text",
			success: successFN,
			error: failFN
		});
	});
};

DataRequest.postData = function(url, requestParamArray, successFN, failFN) {
	mui.plusReady(function() {
		var sobj = postRequestParamArray(requestParamArray);
		console.log(sobj['token']);
		for (var item in sobj) {
			console.log(item + "::" + sobj[item]);
		}
		$.ajax({
			type: "post",
			url: url,
			data: postRequestParamArray(requestParamArray),
			async: true,
			dataType: "text",
			success: successFN,
			error: failFN
		});
	});
};