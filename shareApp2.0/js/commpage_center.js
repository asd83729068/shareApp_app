$(function () {
	
	var indexhtml=$("#indexhtml").attr("data");//首页
	var myhtml=$("#backcolor").attr("data");//我的
	var prolisthtml=$("#productshtml").attr("data");//商品列表
	var artlisthtml=$("#box").attr("data");//文章列表
	
	var reg1html=$("#reg1").attr("data");//注册1
	var reg2html=$("#reg2").attr("data");//注册2
	var checkhtml=$("#checkPhone").attr("data");//忘记密码1
	var setPasshtml=$("#setPass").attr("data");//忘记密码2
	
	var myarticlehtml=$("#myarticle").attr("data");//我的文章
	var myproducthtml=$("#myproduct").attr("data");//我的商品
	var mywithhtml=$("#mywithdraw").attr("data");//我的提现
	
	var loginhtml=$("#dologin").attr("data");//登录
//	var tologin=getCookie("tologin");
	var mycenterlogin=sessionStorage.getItem("mycenterlogin");
	
    var strHtml="";

    strHtml+="<div class=\"header\">";
    strHtml+="<div class=\"row\">";
    
    //首页、我的不返回箭头
    if(indexhtml=="index.html"||myhtml=="mycenter.html"){
    }else{
    	//文章、商品后退到首页
    	if(prolisthtml=="produtlist.html"||artlisthtml=="articleslist.html"){
    		strHtml += "<div class=\"menuback\"  onclick=\"backtoindex();\"><img src=\"images/icon/backto.png\"></div>";
    	}else{
    		if(loginhtml=="login.html"){
    			if(mycenterlogin=="mycenterlogin"){
    				strHtml += "<div class=\"menuback\"  onclick=\"backtoindex();\"><img src=\"images/icon/backto.png\"></div>";   				
    			}else{
    				strHtml += "<div class=\"menuback\"  onclick=\"closetoindex();\"><img src=\"images/icon/backto.png\"></div>";
    			}
    		}else{
    			strHtml += "<div class=\"menuback\"  onclick=\"window.history.back();\"><img src=\"images/icon/backto.png\"></div>";
    		}
    	}
    	
    }
    
    strHtml+="<i class=\"logo u-icon u-icon-logo\" id=\"headlinetitle\"></i>";

    strHtml+="</div>";
    strHtml+="</div>";
    strHtml+="<div class=\"headerline\"></div>";

    $("#headerbox").html(strHtml);

    var strmenu = "";
	var article_info=$("#article_info").attr("data");
	var product_info=$("#product_info").attr("data");
	if(article_info=="ui_bottom"||product_info=="ui_bottom"){
	    $("#comm_menu").html(strmenu);
	}else{
		strmenu += "<li class=\"item\"><a id=\"foot_line_btn_1\" href=\"index.html\" class=\"\"><div class=\"nav\"><div class=\"ih ispr\"></div><p>首页</p></div></a></li>";
	    strmenu += "<li class=\"item\"><a id=\"foot_line_btn_2\" href=\"articleslist.html\" class=\"\"><div class=\"nav\"><div class=\"ic ispr\"></div><p>文章</p></div></a></li>";
	    strmenu += "<li class=\"item\"><a id=\"foot_line_btn_3\" href=\"productslist.html\" class=\"\"><div class=\"nav\"><div class=\"is ispr\"></div><p>产品</p></div></a></li>";
//	    if(tologin=="tologin"){
//	    	strmenu += "<li class=\"item\"><a id=\"foot_line_btn_4\" href=\"login.html\" class=\"\"><div class=\"nav\"><div class=\"if ispr\"></div><p>我的</p></div></a></li>";
//	    }else{
	    	strmenu += "<li class=\"item\"><a id=\"foot_line_btn_4\" href=\"my_center.html\" class=\"\"><div class=\"nav\"><div class=\"if ispr\"></div><p>我的</p></div></a></li>";
//	    	setCookie("tologin","");
//	    }
		$("#comm_menu").html(strmenu);
	}



});


var _hmt = _hmt || [];
(function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?c724558598bf73235da32b0b288c6ad7";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();


function backtoindex(){
	window.location.href="index.html";
}
function backtocenter(){
	window.location.href="my_center.html";
}
function closetoindex(){
//	mui.currentWebview.close();
//  window.location.href="index.html";
	window.history.back();
}
////登陆页面跳转
//function urlJump() {
//  var url = getCookie("jumpurl");
//  if (url == "") {
//      window.location.href = "index.html";
//  }
//  else {
//      window.location.href = url;
//  }
//}