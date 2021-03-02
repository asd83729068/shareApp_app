mui.back=function () {
               window.location.href="center_userinfo.html"
        }
$(function () {

//  $.cookie("jumpurl", window.location.href, 30);
    $("#headlinetitle").html("我的信息");

	$("#foot_line_btn_4").addClass("on");

    $.ajax({
        url: '/tools_ajax/UserInfo.aspx/IsLogin',
        type: "POST",
        success: function (res) {
            if (res != "1") {
                location.href = "login.html";
            }
        }
    });



    var selectArea = new MobileSelectArea();
    selectArea.init({
        trigger: '#area',
        value: $('#area').data('value'),
        data: 'js/address.js',
        eventName: 'click'
    });

    $.ajax({
        url: $.cookie("tempUrl")+'/Member/getInfoById.do?token=' + $.cookie("token") + "&id=" + $.cookie("id"),
        type: "GET",
        success: function (res) {
            if (res != null && res != "" && res != "null") {
                var obj = res.data;

				
                $("#icon").attr("src",obj.icon);
				var count=obj.icon.indexOf('?x-oss-process=image/resize,m_lfit,h_300,w_300/circle,r_300/format,png');
				if(count<0){
					if(obj.sex==0){
						$("#icon").attr("src","https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528115932841&di=952aa24f53f5379eb40cfeeded09251c&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F016a1955ed02cc32f875a13291fb8b.png");
					}else{
						$("#icon").attr("src","https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528116003388&di=6cd84713a9e2150c2f928ebf71b3fdfb&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F011e1855ed01ce6ac7251df877053e.png");
					}
				}
                $("#nickname").val(obj.nickname);
                $("#nickname").css("font-size:20px")
                $("#truename").val(obj.truename);
                $("#sex").val(obj.sex==0?"男":"女");
                $("#sex").attr("data",obj.sex);
                var area=obj.address.split("-");
                area=area.join(" ");
                $("#area").val(area);
                $("#area").attr("data-info",area);
                $("#alipayAccount").val(obj.alipayAccount);
                $("#alipay").val(obj.alipayName);
            }
        }
    });

});



function turn(){
	sessionStorage.setItem("icon",$("#icon").attr("src"));
	window.location.href = "changeIcon.html";
}



//保存信息
$('#change').on('click', function () {

    var address = $("#area").val();
    var alipayAccount = $("#alipayAccount").val();
    var alipayName = $("#alipay").val();
    var nickname = $('#nickname').val();
    var sex = $('#sex').attr("data");
    var truename = $('#truename').val();
    var icon=$('#icon').attr("src");

    if (address != "") {
        var result = address.split(" ");
        address=result.join("-");
    }

    $.ajax({
        url: $.cookie("tempUrl")+'/Member/update.do?token=' + $.cookie("token"),
        type: "POST",
        datatype: "application/json",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({
        	id:$.cookie("id"),
            address: address,
            alipayAccount: alipayAccount,
            alipayName: alipayName,
            icon: icon,
            nickname:nickname ,
            sex: sex,
            truename: truename
        }),
        
        success: function (res) {
        	
            if ( res.code== 0){
                wcPop({
				content: '信息更新成功！',
				shade: true,
				style: 'background: rgba(17,17,17,.7); color: #fff;font-size:13px;width:200px',
				time: 2
				});
                
                setTimeout(function () {
                                window.location.href = "my_center.html";
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
    })

});





