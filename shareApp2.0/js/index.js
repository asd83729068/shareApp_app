//$.cookie('tempUrl', "http://119.23.29.186:8096/");
var port = "";
$.ajax({
		url: "http://47.106.189.124:8086",
		type: "GET",
		success: function(res) {
			
			port = res.port;
			$.cookie('tempUrl', "http://47.106.189.124:"+port+"/", {path: '/'});
		}
	});
//$.cookie('tempUrl', "http://47.106.189.124:8099/", {path: '/'});

var first = null;
mui.back = function() {
	//首次按键，提示‘再按一次退出应用’
	if(!first) {
		first = new Date().getTime();
		mui.toast('再按一次退出应用');
		setTimeout(function() {
			first = null;
		}, 1000);
	} else {
		if(new Date().getTime() - first < 1000) {
			plus.runtime.quit();
		}
	}
};
//sessionStorage.setItem("article","");
//sessionStorage.setItem("product","");

$(function() {

	$("#headlinetitle").html("首页");

	$.cookie("jumpurl", window.location.href, 30);

	//首页轮播
	$("#foot_line_btn_1").addClass("on");

	//  var z = "";
	//      z += '<div class="swiper-slide"><a href="#"><img src="http://swdknew.oss-cn-beijing.aliyuncs.com/uploadfiles/201805/29/201805291245226590.jpg"></a></div>';
	//      $('.swiper .swiper-wrapper').html(z);
	//  //加载轮播插件
	//  var mySwiper = new Swiper('.swiper-container', {
	//      autoplay: 3000,
	//      calculateHeight: true,
	//      loop: true,
	//      pagination: '.swiper-pagination',
	//      paginationClickable: true,
	//      slidesPerView: 1
	//  });

	$.ajax({
		url: $.cookie("tempUrl") + "/Image/getImage.do",
		type: "GET",
		success: function(res) {
			var banners = res.data;
			var z = "";
			for(var i = 0; i < banners.length; i++) {
				z += '<div class="swiper-slide" onclick="getinfo(this)" data="' + banners[i].imagename + "&" + banners[i].type + '"><img src="' + banners[i].imageurl + '" ></div>';
			}
			$('.swiper .swiper-wrapper').html(z);
			//加载轮播插件
			var mySwiper = new Swiper('.swiper-container', {
				autoplay: 3000,
				calculateHeight: true,
				loop: true,
				pagination: '.swiper-pagination',
				paginationClickable: true,
				slidesPerView: 1
			});
		}
	});
});

function getinfo(obj) {
	var key = $(obj);
	var data = key.attr("data");
	var str = data.split("&");
	var title = str[0];
	var type = str[1];
	sessionStorage.setItem("title", title);
	if(type == 1) {
		toartilcle();
	} else {
		toproduct();
	}
}

/*轮播-跳转接口*/
function toartilcle() {
	var title = sessionStorage.getItem("title");
	$.ajax({
		url: $.cookie("tempUrl") + "/Image/selectInfo.do",
		type: "POST",
		datatype: "application/json",
		contentType: "application/json;charset=utf-8",
		data: JSON.stringify({
			"type": 1,
			"imagename": title
		}),
		success: function(result) {
			if(result.data == null) {
				alert("该文章已失效！");
			} else {
				var id = result.data.id;
				mui.openWindow({
					url: 'articleinfo.html',
					id: 'articleinfo.html',
					extras: {
						articleId: id //扩展参数
					}
				})
			}
		}
	});
};

/*轮播-跳转接口*/
function toproduct() {
	var title = sessionStorage.getItem("title");
	$.ajax({
		url: $.cookie("tempUrl") + "/Image/selectInfo.do",
		type: "POST",
		datatype: "application/json",
		contentType: "application/json;charset=utf-8",
		data: JSON.stringify({
			"type": 2,
			"imagename": title
		}),
		success: function(result) {
			if(result.data == null) {
				alert("该商品已失效！");
			} else {
				var id2 = result.data.id;
				mui.openWindow({
					url: 'product_info.html',
					id: 'product_info.html',
					extras: {
						productId: id2 //扩展参数
					}
				})
			}
		}
	});
};

/*文章*/
$(function() {

	$.ajax({
		url: $.cookie("tempUrl") + "/article/getAllByStatus?pageNum=10&pageSize=3&token=" + $.cookie("token"),
		type: "GET",
		success: function(result) {
			var list = result.data;
			$.each(list, function(index, item) {
//				<img src='http://share-app.oss-cn-qingdao.aliyuncs.com/2018052313286e693c-77f5-4e68-8a99-792962af4d7e.png?x-oss-process=image/resize,h_200'>
				var imgcover = $("<img src='images/defaultP.png'>"); /*默认图片*/
				var icon_img = $("<div class='article_icon-img'></div>");
				if(item.cover == null) {
					icon_img.append(imgcover);
				} else {
					icon_img.append($("<img src='" + item.cover + "'>"));
				}
				var icon = $("<div class='article_icon' onclick='getarticleinfo(this)'  data='" + item.id + "'></div>").append(icon_img);
				var span = $("<div class='article_span' onclick='getarticleinfo(this)'  data='" + item.id + "'></div>").append($("<div class='article_h1'>" + item.articleTitle + "</div>")).append($("<span>" + getSynopsis(item.articleContent) + "</span>"));
				var info = $("<div class='article_info index_article'></div>");
				var aaa = $("<a class='articleId' ></a>");
				info.appendTo(".article_list");
				aaa.append(icon).append(span).appendTo(info);

				if(index == 1) {
					return false;
				}
			});
		}
	});
});

function getSynopsis(html) {
	var re1 = new RegExp("<.+?>", "g"); //匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
	var msg = html.replace(re1, ''); //执行替换成空字符
	var synopsis = msg.substring(0, 30);
	return synopsis;
}

function getarticleinfo(obj) {
	var key = $(obj);
	var bb = key.attr("data");
	mui.openWindow({
		url: 'articleinfo.html',
		id: 'articleinfo.html',
		extras: {
			articleId: bb //扩展参数
		}
	})
}

function getproductinfo(obj) {
	var key = $(obj);
	var bb = key.attr("data");
	mui.openWindow({
		url: 'product_info.html',
		id: 'product_info.html',
		extras: {
			productId: bb //扩展参数
		}
	})

}
/*头三个彩色--菜单*/
function getArticlelist() {
	window.location.href = "articleslist.html";
}

function getProductlist() {
	window.location.href = "productslist.html";
}

function getMine() {
	window.location.href = "my_center.html";
}

/*商品*/
$(function() {

	$.ajax({
		url: $.cookie("tempUrl") + "/commodity/getAllByStatus.do?token=" + $.cookie("token"),
		type: "GET",
		success: function(result) {
			var list = result.data;
			$.each(list, function(index, item) {
				var yong = (item.commission*item.commodityPrices).toFixed(2);
				var imgcover = $("<img src='images/defaultP.png'>"); /*默认图片*/
				var icon_img = $("<div class='m-lazyload'></div>");
				if(item.cover == null) {
					icon_img.append(imgcover);
				} else {
					icon_img.append($("<img src='" + item.cover + "'>"));
				}
				var it = $("<li class='index_item' onclick='getproductinfo(this)'  data='" + item.id + "'></li>");
				var hd = $("<div class='hd'></div>").append(icon_img);

				var good_bottom = $("<div class='good-bottom'></div>").append($("<img src='css/images/heng.png'>"));
				var name = $("<div class='name'></div>").append($("<span>" + item.commodityName + "</span>"));
				

				it.append(hd).append(good_bottom.append(name)).appendTo("#prolist");

				if(index == 1) {
					return false;
				}
			})
		}
	});
});

//$(function() {
//	$.ajax({
//			url: $.cookie("tempUrl") + 'Member/getInfoById.do?token=' + $.cookie("token") + "&id=" + $.cookie("id"),
//			type: "GET",
//			success: function(res) {
//				$.cookie("tologin","",30);
//				},
//			error: function(res) {
//				$.cookie("tologin","tologin",30);
//			}
//		});
//});