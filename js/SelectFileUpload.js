var SelectFileUpload = {};
var REQUESTCODE = 1000;
SelectFileUpload.files = {};
var server = "http://192.168.0.141/upload/upload_api.php?action=task";

SelectFileUpload.selectUpLoad = function(type, success, fail) {
	SelectFileUpload.success = success;
	SelectFileUpload.fail = fail;
	getFile(type);
}
var WaitingUi = null;
var upLoadTask = null;
var isEnd = false;
SelectFileUpload.upLoad = function(files, success, fail) {
	if (files.name == undefined) {
		plus.nativeUI.alert("没有添加上传文件！");
		return;
	}
	console.log("开始上传：" + files.path);

	plus.io.resolveLocalFileSystemURL(files.path, function(entry) {
		entry.file(function(file) {
			var fileSize = file.size;
			if (fileSize < 2 * 1024 * 1024) {
				SelectFileUpload.files = files;
				WaitingUi = plus.nativeUI.showWaiting();

				WaitingUi.onclose = function() {
					console.log("Waiting closed!");
					if (!isEnd) {
						isEnd = false;
						console.log("abort");
						upLoadTask.abort();
						fail(null);
					}
				};
				//添加文件
				console.log(files.path);
				addItem(files.path);
				isEnd = false;
				upLoadTask = plus.uploader.createUpload(server, {
						method: "POST",
						timeout: 5
					},
					function(t, status) { //上传完成
						isEnd = true;
						if (status == 200) {
							if (isEnd) {
								WaitingUi.close();
								success(t.responseText);
								console.log("上传成功");
							}
						} else {
							WaitingUi.close();
							fail(t.responseText);
							console.log("上传失败：" + status);
						}
					}
				);
				upLoadTask.addData("fileType", "att");
				upLoadTask.addData("objType", "task");
				upLoadTask.addData("token", "fbb9cfcba9d771e4b0c63599971cd77c");
				upLoadTask.addFile(files.path, {
					key: "upload"
				});
				upLoadTask.start();
			} else {
				mui.toast("文件大小过大不能上传");
			}
		});
	}, function(e) {
		console.log("读取拍照文件错误：" + e.message);
	});
}


var getFile = function(type) {
	mui.plusReady(function() {
		var main = plus.android.runtimeMainActivity();
		var Intent = plus.android.importClass('android.content.Intent');
		var intent = new Intent();
		intent.setAction(Intent.ACTION_PICK);
		intent.setType(type);
		main.startActivityForResult(intent, REQUESTCODE);
	})
}
var index = 0;
mui.plusReady(function() {
	plus.android.importClass('android.content.Intent');
	var main = plus.android.runtimeMainActivity();
	main.onActivityResult = function(requestCode, resultCode, data) {
		console.log("onActivityResult");
		if (REQUESTCODE == requestCode) {
			if (data != null) {
				var uri = data.getData();
				var path = plus.android.invoke(uri, "getPath");
				if (isSupportFileType(path)) {
					var file = {};
					file.name = "uploadkey" + index++;
					file.path = path;

					SelectFileUpload.upLoad(file, SelectFileUpload.success, SelectFileUpload.fail);
				} else {
					mui.toast("不支持该文件格式上传！");
				}
			}
		}
	};
});

var isSupportFileType = function(file) {
	var type = file.substring(file.lastIndexOf("."), file.length);
	console.log(type);
	var libType = [".pdf", ".doc", ".docx", ".xls", ".ppt", ".wps", ".zip", ".rar", ".txt", ".jpg", ".jpeg", ".gif", ".bmp", ".swf", ".png", ".mp4", ".rm", ".wma", ".rmvb", ".mp3"];
	for (var i = 0; i < libType.length; i++) {
		if (libType[i] == type) {
			return true;
		}
	}
	return false;
}

SelectFileUpload.compressImage = function(src, dst, qulity) {
	var path = null;

}