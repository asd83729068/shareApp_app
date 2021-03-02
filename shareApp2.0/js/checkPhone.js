//$.cookie('tempUrl', "http://119.23.29.186:8096/", {path: '/'});
//$.cookie('tempUrl', "http://localhost:8096/", {path: '/'});
mui.back = function() {
	window.location.href="login.html?check";
};
$(function () {

    $("#headlinetitle").html("手机验证");

});


function check(obj){
	
	var phone=$("#mobile").val();
	var reg=/^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57]|19[8-9])[0-9]{8}$/;
	if (phone=="") {
        wcPop({
				content: '输入框不能空!',
				shade: true,
				style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
				time: 2
			});
		return;
    }
    if (!reg.test(phone)) {
        wcPop({
				content: '请输入正确的手机格式!',
				shade: true,
				style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
				time: 2
			});
		return;
    }
    
 
    
     		$.ajax({
                    url:  $.cookie("tempUrl")+"/common/sms/sendCaptcha",
                    type: "POST",
        			datatype: "application/json",
        			contentType: "application/json;charset=utf-8",
                    data: JSON.stringify({
                        mobile: phone,
						type: "3"
                    }),
                    success: function (result) {
                    	if(result.code==0){
                            getCheck(obj); 
                           }
                    	if(result.exception!=null){
                    		wcPop({
								content: result.exception,
								shade: true,
								style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
								time: 2
							});
                    	}
                      
                    },
                    error:function(result){
                    	var value=JSON.stringify(result);
                    	var value2=value.substring(value.indexOf("responseJSON"),value.length);
                    	var value3=value2.substring(value2.indexOf("message"),value2.indexOf("path"));
                    	wcPop({
								content: value3.substring(value3.lastIndexOf(":")+1,value3.length-3),
								shade: true,
								style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
								time: 2
							});
                    }
                });
}


var countdown=60;
function getCheck(obj){

if (countdown == 0) {   
        obj.removeAttribute("disabled");   
        $("#wz").removeClass("col");
        obj.value="重新发送";   
        countdown = 60;   
        return;  
    } else {   
        obj.setAttribute("disabled", true);
        $("#wz").addClass("col");
        obj.value="已发送(" + countdown + ")";   
        countdown--;   
    }   
setTimeout(function() {   
    getCheck(obj) }  
    ,1000)
}


$("#btnSubmit").click(function(){
	var phone=$("#mobile").val();
	var phoneCode=$("#checkCode").val();
	if(phoneCode==""){
		wcPop({
				content: "输入框不能为空",
				shade: true,
				style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
				time: 2
			});
	}
	if(phoneCode.length!=6){
		wcPop({
				content: "验证码长度为6！",
				shade: true,
				style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
				time: 2
			});
	}
	
	   		$.ajax({
                    url:  $.cookie("tempUrl")+"/Member/check.do",
                    type: "POST",
        			datatype: "application/json",
        			contentType: "application/json;charset=utf-8",
                    data: JSON.stringify({
                        captcha: phoneCode,
  						mobile: phone
                    }),
                    success: function (result) {
                    	
                        if(result.data){
                        	sessionStorage.setItem("phone",phone);
                        	window.location.href = "setNewPassword.html";
                        }
                    },
                    error:function(result){
                    	 var value=JSON.stringify(result);
                    	var value2=value.substring(value.indexOf("responseJSON"),value.length);
                    	var value3=value2.substring(value2.indexOf("message"),value2.indexOf("path"));
                    	wcPop({
								content: value3.substring(value3.lastIndexOf(":")+1,value3.length-3),
								shade: true,
								style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
								time: 2
							});
                    }
                });
	
	
});

