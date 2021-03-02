//$.cookie('tempUrl', "http://119.23.29.186:8096/", {path: '/'});
//$.cookie('tempUrl', "http://localhost:8096/", {path: '/'});
mui.back = function() {
	window.location.href="checkPhone.html";
};


$(function () {
    $.ajax({
        url: '/tools_ajax/UserInfo.aspx/IsLogin',
        type: "POST",
        success: function (res) {
            if (res == "1") {
                window.location.href = "index.html";
            }
        }
    });
    $("#headlinetitle").html("设置新的密码");

  });
var phone=sessionStorage.getItem("phone");
$('#btnSubmit').on('click', function () {
    var reg = /^[A-Za-z]+[0-9]+[A-Za-z0-9]*|[0-9]+[A-Za-z]+[A-Za-z0-9]*$/;
	var pwd1=$("#pwd").val();
	var pwd2=$("#pwd2").val();
	if(pwd1==""||pwd2==""){
		wcPop({
				content: '输入框不能为空！',
				shade: true,
				style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
				time: 2
			});
		return;
	}
	if(!reg.test(pwd1)){
		wcPop({
				content: '密码必须包含字母与数字！',
				shade: true,
				style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
				time: 2
			});
		return;
	}
	if (pwd1.length<7 || pwd1.length>12) {
        wcPop({
				content: '密码长度为7-12位！',
				shade: true,
				style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
				time: 2
			});
        return;
    }
	if(pwd1!=pwd2){
		wcPop({
				content: '两次密码输入不相同！',
				shade: true,
				style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
				time: 2
			});
		return;
	}

$.ajax({
        url: $.cookie("tempUrl")+'/Member/changePwd.do',
        type: "POST",
        datatype: "application/json",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({
        	newPassword: pwd1,
  			phone: phone
        }),
        success: function (res) {
          		if ( res.code== 0){
                wcPop({
				content: '密码修改成功！',
				shade: true,
				style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
				time: 2
				});
                setTimeout(function () {
                				sessionStorage.setItem("setPass","setPass");
                                window.location.href = "login.html";
                        }, 1500);
            	}
            else {
          		wcPop({
					content: res.exception,
					shade: true,
					style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
					time: 2
					});
            	}
            }
        });
    });