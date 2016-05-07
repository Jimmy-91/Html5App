var isexist = function(url, i, exist, no_exist) {
	console.log(url);
	plus.io.resolveLocalFileSystemURL(url, function() {
		exist(url, i);
	}, function() {
		no_exist(url, i);
	});
}
var getFileType = function(str) {
	var type = str.substring(str.lastIndexOf("."), str.length);
	return type;
}
var getFileSimpleName = function(str) {
	console.log(str);
	var name = str.substring(str.lastIndexOf("/") + 1, str.length);
	return name;
}
var localFile = function(url_str) {
	var file_name = getFileSimpleName(url_str);
	console.log("file_name::" + file_name);
	return '_downloads/file/' + file_name;
}
var localImg = function(url_str) {
	var img_md5 = $.md5(url_str);
	var file_type = getFileType(url_str);
	return '_downloads/img/' + img_md5 + file_type;
}

var getFileMime = function(str) {
	var fileMime = {};
	var file_type = getFileType(str);
	if (file_type == ".pdf") { //pdf
		fileMime.type = "application/pdf";
		fileMime.style = "pdf";
	} else if (file_type == ".doc" || file_type == ".docx") { //word
		fileMime.type = "application/msword";
		fileMime.style = "word";
	} else if (file_type == ".xls") { //excel
		fileMime.type = "application/vnd.ms-excel";
		fileMime.style = "excel";
	} else if (file_type == ".ppt") {
		fileMime.type = "application/vnd.ms-powerpoint";
		fileMime.style = "ppt";
	} else if (file_type == ".txt") {
		fileMime.type = "text/plain";
		fileMime.style = "txt";
	} else if (file_type == ".jpg" || file_type == ".jpeg" || file_type == ".bmp" || file_type == ".gif" || file_type == "png") {
		fileMime.type = "image/*";
		fileMime.style = "pic";
	} else if (file_type == ".wma" || file_type == ".wav") {
		fileMime.type = "audio/*";
		fileMime.style = "mic";
	} else if (file_type == ".mp4" || file_type == ".rm" || file_type == ".rmvb") {
		fileMime.type = "video/*";
		fileMime.style = "video";
	} else if (file_type == ".txt") {
		fileMime.type = "text/plain";
		fileMime.style = "txt";
	} else {
		fileMime.type = undefined;
		fileMime.style = "wenhao"
	}
	return fileMime;
}

var openFile = function(filePath, fileType) {
	// 直接创建android.content.Intent类的示例对象
	var mActivity = plus.android.runtimeMainActivity();
	var Intent = plus.android.importClass("android.content.Intent");
	var Uri = plus.android.importClass("android.net.Uri");
	var Environment = plus.android.importClass("android.os.Environment");
	var File = plus.android.importClass('java.io.File');
	var intent = new Intent();
	var uri = Uri.fromFile(new File(filePath));
	console.log(uri);
	plus.android.invoke(intent, "setAction", "android.intent.action.VIEW");
	plus.android.invoke(intent, "setDataAndType", uri, fileType);
	plus.android.invoke(mActivity, "startActivity", intent);
}

var deleteFile = function(local_image_url) {
	if (local_image_url != null) {
		plus.io.resolveLocalFileSystemURL(local_image_url, function(entry) {
			entry.remove(function(entry) {
				console.log("临时文件删除成功" + local_image_url);
				// 重新下载图片
			}, function(e) {
				console.log("临时文件删除失败" + local_image_url);
			});
		});
	}
}