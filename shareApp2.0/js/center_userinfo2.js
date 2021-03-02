mui.back=function () {
               window.location.href="my_center.html"
        }
$(function () {

//  $.cookie("jumpurl", window.location.href, 30);
    $("#headlinetitle").html("我的信息");

	$("#foot_line_btn_4").addClass("on");

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
                $("#address").val(area);
                $("#address").attr("data-info",area);
                $("#alipayAccount").val(obj.alipayAccount);
                $("#alipay").val(obj.alipayName);
            }
        },
		error: function(){
			window.location.href="login.html";
		}
    });

});


$('#confirm').on('click', function () {
	window.location.href = "changeOwnInfo.html";
});




