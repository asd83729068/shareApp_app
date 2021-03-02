mui.back = function() {
	window.location.href = "login.html"
};

$(function() {
	$("#headlinetitle").html("手机绑定");
});

function check(obj) {

	var phone = $("#mobile").val();
	var password = $("#password").val();
	var pwdcomfirm = $("#pwdcomfirm").val();
	var reg2 = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57]|19[8-9])[0-9]{8}$/;
	var reg = /^[A-Za-z]+[0-9]+[A-Za-z0-9]*|[0-9]+[A-Za-z]+[A-Za-z0-9]*$/;
	if(phone == "" || password == "" || pwdcomfirm == "") {
		wcPop({
			content: '输入框不能空!',
			shade: true,
			style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
			time: 2
		});
		return;
	}
	if(!reg2.test(phone)) {
		wcPop({
			content: '请输入正确的手机格式!567678678',
			shade: true,
			style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
			time: 2
		});
		return;
	}
	if (!reg.test(password)) {
        wcPop({
				content: '密码必须包含字母与数字！',
				shade: true,
				style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
				time: 2
			});
        return;
    }
	if (password.length<7 || password.length>12) {
        wcPop({
				content: '密码长度为7-12位！',
				shade: true,
				style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
				time: 2
			});
        return;
    }
    if (password != pwdcomfirm) {
        wcPop({
				content: '两次密码不相同！',
				shade: true,
				style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
				time: 2
			});
        return;
    }
//	alert(phone);
	$.ajax({
		url: $.cookie("tempUrl") + "/common/sms/sendCaptcha",
		type: "POST",
		datatype: "application/json",
		contentType: "application/json;charset=utf-8",
		data: JSON.stringify({
			mobile: phone,
			type: "1"
		}),
		success: function(result) {
			if(result.code == 0) {
				getCheck(obj);
			}
			if(result.exception != null) {
				wcPop({
					content: result.exception,
					shade: true,
					style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
					time: 2
				});
			}
		},
		error: function(result) {
			var value = JSON.stringify(result);
			var value2 = value.substring(value.indexOf("responseJSON"), value.length);
			var value3 = value2.substring(value2.indexOf("message"), value2.indexOf("path"));
			wcPop({
				content: value3.substring(value3.lastIndexOf(":") + 1, value3.length - 3),
				shade: true,
				style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
				time: 2
			});
		}
	});
}
var countdown = 60;

function getCheck(obj) {

	if(countdown == 0) {
		obj.removeAttribute("disabled");
		$("#wz").removeClass("col");
		obj.value = "重新发送";
		countdown = 60;
		return;
	} else {
		obj.setAttribute("disabled", true);
		$("#wz").addClass("col");
		obj.value = "已发送(" + countdown + ")";
		countdown--;
	}
	setTimeout(function() {
		getCheck(obj)
	}, 1000)
}

$("#btnSubmit").click(function() {
	
	var pwdcomfirm = $("#pwdcomfirm").val();
	var reg2 = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57]|19[8-9])[0-9]{8}$/;
	var reg = /^[A-Za-z]+[0-9]+[A-Za-z0-9]*|[0-9]+[A-Za-z]+[A-Za-z0-9]*$/;
	var password2 = $("#password").val();
	var phone = $("#mobile").val().trim();
//	alert(phone);
	var phoneCode = $("#checkCode").val().trim();
//	alert(phoneCode);
//	alert($.cookie("openId"));
if(phone == "" || password2 == "" || phoneCode == "") {
		wcPop({
			content: '输入框不能空!',
			shade: true,
			style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
			time: 2
		});
		return;
	}
	
	
	if(!reg2.test(phone)) {
		wcPop({
			content: '请输入正确的手机格式!567678678',
			shade: true,
			style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
			time: 2
		});
		return;
	}
	if (!reg.test(password2)) {
        wcPop({
				content: '密码必须包含字母与数字！',
				shade: true,
				style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
				time: 2
			});
        return;
    }
	if (password2.length<7 || password2.length>12) {
        wcPop({
				content: '密码长度为7-12位！',
				shade: true,
				style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
				time: 2
			});
        return;
    }
    if (password2 != pwdcomfirm) {
        wcPop({
				content: '两次密码不相同！',
				shade: true,
				style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
				time: 2
			});
        return;
    }
	
	
	if(phoneCode.length != 6) {
		wcPop({
			content: "验证码长度为6！",
			shade: true,
			style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
			time: 2
		});
	}

	$.ajax({
		url: $.cookie("tempUrl") + "/Member/PhoneBinding.do",
		type: "POST",
		datatype: "application/json",
		contentType: "application/json;charset=utf-8",
		data: JSON.stringify({
			captcha: phoneCode,
  			memberId: $.cookie("id"),
  			openId: $.cookie("openId"),
  			password: password2,
  			phone: phone
		}),
		success: function(result) {
			//alert(result.code);
			
			if(result.code==0) {
				
			$.cookie('truename', sessionStorage.getItem("v1"), {expires: 30,path: '/'});
                $.cookie('token', result.data.accessToken, {expires: 30,path: '/'});
                $.cookie('id', sessionStorage.getItem("v3"), {expires: 30,path: '/'});
                $.cookie('openId', sessionStorage.getItem("v4"), {expires: 30,path: '/'});
                $.cookie('phone', result.data.phone, {expires: 30,path: '/'});
				window.location.href = "index.html";
			}
			if(result.exception!=null){
				alert(result.exception);
			}
		},
		error: function(result) {
			var value = JSON.stringify(result);
			var value2 = value.substring(value.indexOf("responseJSON"), value.length);
			var value3 = value2.substring(value2.indexOf("message"), value2.indexOf("path"));
			wcPop({
				content: value3.substring(value3.lastIndexOf(":") +2, value3.length - 3),
				shade: true,
				style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
				time: 2
			});
		}
	});

});