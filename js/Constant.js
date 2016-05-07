var Constant = {};
//Common.saveJson("login_uId", "284");
//Common.saveJson("login_uMoney", "10624.69");
//Common.saveJson("login_uPhone", "15623073205");
Constant.u_id = "login_uId"; //登录后的uid
Constant.login_uMoney = "login_uMoney"; //登录后的金额
Constant.login_uPhone = "login_uPhone"; //登录的用户手机号
Constant.allScreen_style = {
	top: '0px',
	bottom: '0px'
}
Constant.bottomBar_style = {
	top: '0px',
	bottom: '57px'
}
Constant.topBar_bottomBar_style = {
	top: '49px',
	bottom: '57px'
}



Constant.IP = "http://192.168.0.134/duorenwei/";
Constant.IP2 = "http://192.168.0.141/duorenwei/";


//接口IP
//首页接口
Constant.ShouYeApi = "api/sy.php";
//安全新闻详情
Constant.ShouYeNewsDetail = "api/safetynews.php";
//任务上拉加载数据接口
Constant.ShouYeSearchTaskListPullUpApi = "api/tasklist.php";
//任务下拉刷新加载数据接口
Constant.ShouYeSearchTaskListPullDownApi = "api/tasklistre.php";
//人才下拉刷新接口
Constant.RenCaiDownPull = "api/talentsre.php";
//人才上拉刷新接口
Constant.RenCaiUpPull = "api/talents.php";
//人才详细数据接口
Constant.RenCaiDetail = "api/pers.php";

//人才添加关注接口
Constant.RenCaiFollowAdd = "api/follow.php?action=add";
//人才取消关注接口
Constant.RenCaiFollowCancel = "api/follow.php?action=del";
//任务添加收藏接口
Constant.TaskCollectAdd = "api/favorite.php?action=add";
//任务取消收藏接口
Constant.TaskCollectCancel = "api/favorite.php?action=del";
//任务详情数据接口
Constant.TaskDetail = "api/task.php";
//悬赏任务报名
Constant.XuanTaskBaoming = "api/taskhandle.php?op=turnaround";
//竞标任务报名
Constant.JingTaskBaoming = "api/taskhandle.php?op=quote";

//我发布的任务数据接口
Constant.MyReleaseTask = "api/user.php?action=released";
//我承接的任务数据接口
Constant.MyAcceptTask = "api/user.php?action=undertake";

Constant.MyFollowPeople = "api/follow.php?action=focus";

//获取所有分类接口
Constant.Cate = "api/cate.php";
//获取任务列表
Constant.TaskList = "api/tasklist.php";
//获取系统消息接口
Constant.Message = "api/message.php";


//我发布的任务设置中标
Constant.MyReleaseSetZhongBiao = "api/taskhandle.php?op=workchoose";

//获取付款验证码接口
Constant.getCode = "index.php?do=ajax&view=checkcode&ac=pay&";
//悬赏模式下打款接口
Constant.XuanPay = "api/yepay.php?action=pay";
//竞标模式下打款接口
Constant.JingPay = "api/taskhandle.php?op=tuoguan";
//悬赏确认第一步签订协议
Constant.YanShouSetup1 = "api/agree.php?step=step1";

//悬赏确认第二步签订协议
Constant.YanShouSetup2 = "api/agree.php?step=step2";

//悬赏确认第三步签订协议
Constant.YanShouSetup3 = "api/agree.php?step=step3";

Constant.pingjia = "api/taskhandle.php?op=mark";

Constant.JingQueRenPay = "api/taskhandle.php?op=workOver";

Constant.JingApplyPay = "api/taskhandle.php?op=pubAgreement";
//用户信息
Constant.useinfo = "api/user.php";
//登录
Constant.login = "api/user.php?action=login";
//注册
Constant.register = "api/user.php?action=register";
//上传文件
Constant.uploadfile = "http://192.168.0.141/upload/upload_api.php?action=task&token=fbb9cfcba9d771e4b0c63599971cd77c&fileType=att&objType=task";
//发任务
Constant.pubtask = "api/pubtask.php?action=step1";

//根据文件id获取文件路径接口
Constant.getFileUrl = "api/attachment.php";
//获取各种认证状态
Constant.AccountAC = "api/pedata.php?action=auth";
//邮箱认证
Constant.EmailAC = "api/email_auth.php?action=emailAuth&";
//银行卡绑定列表
Constant.BankList = "api/bank_auth.php?action=bankList&";
//解除绑定
Constant.ACBankUN="api/bank_auth.php?action=unBind";
//实名认证
Constant.RealName="api/realname_auth.php?";

//收藏任务列表
Constant.CollectTaskList = "api/favorite.php?action=collect&";
//删除收藏任务列表
Constant.DelTaskList = "api/favorite.php?action=del&";

//提现
Constant.Reflect = "api/finance.php?action=withdraw&";

//交易流程
Constant.TradingProcess = "api/help.php?action=lc&token=fbb9cfcba9d771e4b0c63599971cd77c";
//关于我们
Constant.AboutUs = "http://www.duorenwei.com/api/help.php?action=about&token=fbb9cfcba9d771e4b0c63599971cd77c";
//建议意见
Constant.Advise = "api/suggest.php";
//我的标签
Constant.MyTips = "api/pedata.php?";
//注册验证码
//获取付款验证码接口
Constant.getRegisterCode = "index.php?do=ajax&view=checkcode&ac=get&";





$(function() {
	var height = $(".header-bar").height();
	$("#content").css("height", $(window).height() - height - 2);
	$("#content").css("width", $(window).width());
	$("#Screen-Width").css("width", $(window).width());
	$(".half-screen-1px").css("width", $(window).width() / 2 - 1);
	Common.initPager();

	$.ajaxSetup({
		type: "get",
		data: {
			token: "fbb9cfcba9d771e4b0c63599971cd77c"
		},
		dataType: "text",
		async: true,
	});
});