//var action = location.search;
//action = action.substr(1);
//alert(action);
//if(action == 'myCenter') {
//	mui.back = function() {
//		window.location.href = "index.html";
//	}
//}
var old_back=mui.back;
var action=sessionStorage.getItem("actionlogin");
if(action=='myCenter'){
	mui.back = function() {
		window.location.href = "index.html";
	}
}
var port = "";
$.ajax({
		url: "http://47.106.189.124:8086",
		type: "GET",
		success: function(res) {
			
			port = res.port;
			$.cookie('tempUrl', "http://47.106.189.124:"+port+"/",{path: '/'});
		
		}
	});
//$.cookie('tempUrl', "http://119.23.29.186:8096/");
//$.cookie('tempUrl', "http://47.106.189.124:8099/", {path: '/'});

//      mui.init();
//      var old_back = mui.back;
//      mui.back=function(){
//              var btnArray = ['否', '是'];
//              mui.confirm('返回？', '返回上一页面', btnArray, function(e) {
//                  if (e.index == 1) {
//                      old_back();
//                  }
//              });
//      }


$(function() {

	$("#headlinetitle").html("登录");
	
});

$("#btnSubmit").click(function() {
	var uname = $("#username").val();
	var upwd = $("#password").val();
	var setpass = sessionStorage.getItem("setPass");
	var reg = sessionStorage.getItem("reg");
	var article = sessionStorage.getItem("article");
	var product = sessionStorage.getItem("product");
	var reg = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57]|19[8-9])[0-9]{8}$/;
	if(uname == "" || upwd == "") {
		wcPop({
			content: '输入框不能空!',
			shade: true,
			style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
			time: 2
		});
		return;
	}
	if(!reg.test(uname)) {
		wcPop({
			content: '请输入正确的手机格式!',
			shade: true,
			style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
			time: 2
		});
		return;
	}

	$(this).text("登录中...").attr("disabled", "disabled");
	setTimeout(function() {

		$.ajax({
			url: $.cookie("tempUrl") + "/Member/login.do",
			type: "POST",
			datatype: "application/json",
			contentType: "application/json;charset=utf-8",
			data: JSON.stringify({
				phone: uname,	
				password: upwd
			}),
			success: function(result) {
				if(result.code == 0) {
					wcPop({
						content: '登录成功!',
						shade: true,
						style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
						time: 2
					});
					$.cookie('truename', result.data.truename, {expires: 30,path: '/'});
					$.cookie('token', result.data.accessToken, {expires: 30,path: '/'});
					$.cookie('id', result.data.id, {expires: 30,path: '/'});
					$.cookie('phone', result.data.phone, {expires: 30,path: '/'});
					setTimeout(function() {
						//                          	$.cookie("tologin",""); 
//						if(setpass == "setPass" || reg == "reg") {
//							//alert("12121");
//							sessionStorage.setItem("setPass","");
//							sessionStorage.setItem("reg","");
							if(article == "article" || product == "product"){
								sessionStorage.setItem("article","");
								sessionStorage.setItem("product","");
								mui.currentWebview.close();
							}
							window.location.href = "index.html";
//						} else {
							//alert("22222");
//							old_back();
//							window.location.href = "index.html";
//						}
					}, 1000);
				} else {
					wcPop({
						content: '账号或密码错误!!!',
						shade: true,
						style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
						time: 2
					});
					$("#btnSubmit").text("登录");
				}
			}
		});
	}, 1000);
	return false;

});

$("#username").on('change', checkPhone);

function checkPhone() {
	var uname = $("#username").val();
	$.ajax({
		url: $.cookie("tempUrl") + "/Member/getInfoByPhone.do?phone=" + uname,
		type: "POST",
		datatype: "application/json",
		contentType: "application/json;charset=utf-8",
		success: function(result) {
			if(result.code == 0) {
				var icon = result.data;
				var count = icon.indexOf('?x-oss-process=image/resize,m_lfit,h_300,w_300/circle,r_300/format,png');
				if(count > 0) {
					var val = icon.substring(0, count) + "?x-oss-process=image/resize,m_fill,h_100,w_100";
					$("#touxi").attr("src", val);
				} else {
					$("#touxi").attr("src", "css/images/ShareAppLogo1.png");
				}

			} else {
				$("#touxi").attr("src", "css/images/ShareAppLogo1.png");
			}
		}
	});
}

$("#register").click(function() {
		window.location.href = "register.html"
})

$("#checkPhone").click(function() {
		window.location.href = "checkPhone.html"
})

//登陆页面跳转
function urlJump() {
	var url = $.cookie("jumpurl");
	if(url == "") {
		window.location.href = "index.html";
	} else {
		window.location.href = url;
	}
}