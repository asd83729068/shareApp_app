//$.cookie('tempUrl', "http://119.23.29.186:8096/", {path: '/'});
//$.cookie('tempUrl', "http://localhost:8096/", {path: '/'});
mui.back = function() {
	window.location.href="register.html";
};

$(function () {


    $("#headlinetitle").html("注册2");

});


$("#btnSubmit").click(function(){
	var phone=sessionStorage.getItem("phone2");
	var reg = /^[A-Za-z]+[0-9]+[A-Za-z0-9]*|[0-9]+[A-Za-z]+[A-Za-z0-9]*$/;
    var nickname = $("#nickname").val();
    var password = $("#password").val();
    var pwdcomfirm = $("#pwdcomfirm").val();
    if(getByteLen(nickname)>30||getByteLen(nickname)<4){
    	 wcPop({
				content: '昵称的长度不正确！',
				shade: true,
				style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
				time: 2
			});
        return;
    }

    if (nickname==""||password==""||pwdcomfirm=="") {
        wcPop({
				content: '输入框不能为空！',
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
    		$.ajax({
                    url: $.cookie("tempUrl")+"/Member/register.do",
                    type: "POST",
        			datatype: "application/json",
        			contentType: "application/json;charset=utf-8",
                    data: JSON.stringify({
                        nickname: nickname,
  						password: password,
  						phone: phone
                    }),
                    success: function (result) {
                        if (result.code == 0) {
                        	wcPop({
								content: '注册成功!',
								shade: true,
								style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
								time: 2
							});
							setTimeout(function () {
								sessionStorage.setItem("reg","reg");
                                window.location.href = "login.html";
                            }, 1000);
                            
                        } else {
                            wcPop({
								content: '注册失败!',
								shade: true,
								style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
								time: 2
							});
                    		
                        }
                    }
                });

});


function getByteLen(val) {
            var len = 0;
            for (var i = 0; i < val.length; i++) {
                 var a = val.charAt(i);
                 if (a.match(/[^\x00-\xff]/ig) != null) 
                {
                    len += 2;
                }
                else
                {
                    len += 1;
                }
            }
            return len;
        }