mui.back = function() {
	window.location.href="index.html";
};

//var auths=$.cookie("auths");
//for(var i in auths){
//	alert(auths[i]);
//}

$(function() {

	$("#headlinetitle").html("我的");

	$("#foot_line_btn_4").addClass("on");

	$.ajax({
		url: $.cookie("tempUrl") + 'Member/getInfoById.do?token=' + $.cookie("token") + "&id=" + $.cookie("id"),
		type: "GET",
		success: function(res) {
			if(res != null && res != "" && res != "null") {
				var obj = res.data;

				$("#icon").attr("src", obj.icon);
				var count=obj.icon.indexOf('?x-oss-process=image/resize,m_lfit,h_300,w_300/circle,r_300/format,png');
				if(count<0) {
					if(obj.sex == 0) {
						$("#icon").attr("src", "images/icon_man.jpg");

					} else {
						$("#icon").attr("src", "images/icon_woman.jpg");

					}
				}
				if(obj.sex == 0) {
					$("#sex").attr("src", "images/boy.png");
				} else {
					$("#sex").attr("src", "images/woman.png");
				}
				$("#nickname").text(obj.nickname);
				$("#truename").text("姓名: " + obj.truename);
			}

		},
		error: function(res) {
			sessionStorage.setItem("actionlogin","myCenter");
			sessionStorage.setItem("mycenterlogin","mycenterlogin");
			window.location.href="login.html";



//			$(".judge").removeAttr("href");
//			$(".judge").click(function() {
//
//				wcPop({
//					content: '未登录',
//					shade: true,
//					style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
//					time: 2
//				});
//				setTimeout(function() {
//					window.location.href = "login.html";
//				}, 1000);
//			});
//			$("#icon_1").removeAttr("onclick");
//			$("#icon").attr("src", "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1518035560,3316332476&fm=27&gp=0.jpg");
//			$("#nickname").removeAttr("onclick");
//			$("#nickname").text("请点击登录");
//			$("#truename_1").removeAttr("onclick");
//			$("#truename").text("");
//			$("#reward").removeAttr("onclick");
//			$("#reward").html("");
//			$("#loginout").append("登录");
		}
	});

});

function info() {
	window.location.href = "center_userinfo.html";
}

function icon() {
	sessionStorage.setItem("icon", $("#icon").attr("src"));
	window.location.href = "changeIcon.html";
}

function reward() {
	window.location.href = "my_withdraw.html";
}

/*2018年6月12日 15:53:52*/
function loginout() {
//	var auths = sessionStorage.getItem("auth");

	$.ajax({
		url: $.cookie("tempUrl") + "/Member/loginout.do?token=" + $.cookie("token"),
		type: "POST",
		success: function(res) {
			//			clearCookie("truename");
			//			clearCookie("token");
			//			clearCookie("id");
			
			
			$.cookie("id", "", {path: '/'});
			$.cookie("token","", {path: '/'});
			$.cookie("truename","", {path: '/'});
			
			
//						// 注销登录
//			function logoutAll(){
//				for(var i in auths){
//					logout(auths[i]);
//				}
////				alert("注销成功！")
//			}
//			function logout(auth){
//				auth.logout(function(){
//					
//				},function(e){
//					
//				});
//			}
			
			window.location.href = "index.html";
		},
		error: function(res) {
			window.location.href = "login.html";
		}
	});

}

function clearCookie(name) {
	$.cookie = name + '=;  expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

$("#re2").click(function() {
	window.location.href = "center_userinfo.html";
})