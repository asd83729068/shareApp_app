mui.init({
  gestureConfig:{
   longtap: true, //默认为false
  }
});

mui.back = function() {
		var proview = sessionStorage.getItem("productview");
		if(proview == "productview1"){
			plus.webview.currentWebview().close();
		}else if(proview == "productview2"){
			sessionStorage.setItem("productview","productview1");
			proview = sessionStorage.getItem("productview");
			plus.webview.close( "yzx");
		}
	}

var temp = plus.webview.currentWebview();
var id2 = temp.productId;
$("#another").attr("productId",id2);

sessionStorage.setItem("mycenterlogin","");

$(function () {
    $.cookie("jumpurl", window.location.href);
	sessionStorage.setItem("productview","productview1");
    $("#headlinetitle").html("商品详情");
    $("#foot_line_btn_3").addClass("on");
});

$(function(){
	sessionStorage.setItem("product","product");
	$.ajax({
        url:  $.cookie("tempUrl")+'/commodity/getInfo.do?id='+id2+"&token="+$.cookie("token"),
        type: "GET",
        datatype: "application/json",
        contentType: "application/json;charset=utf-8",
        success: function (res) {
        	var data=res.data;
            	if (res.code== 0){
            		var pro_cover=data.cover;
	        		if(data.cover==null){
	        			pro_cover="images/defaultP.png";
	        		}
	 				$(".mui-title").append(data.commodityName);
	                $("#cover").attr("src",pro_cover);
	                $("#commodity_name").text(data.commodityName);
	                $("#commodity_prices").text("￥"+data.commodityPrices);
	                
	                $("#commodityIntroduction").append(data.commodityIntroduction);
	                $("#product-a").attr("data",data.commodityLink);
	                
	                $("#commodityIntroduction img").attr("data-preview-src","");
	                $("#commodityIntroduction img").attr("data-preview-group","1");
	                $("#commodityIntroduction img").addClass("longtap");
	                $("#cover").attr("data-preview-src","");
	                $("#cover").attr("data-preview-group","1");
	                
	                sessionStorage.setItem("shareId",id2);
            	}else{
            	alert(res.exception);
         		 }
              }
          });
        });


//$("#product-a").click(function() {
//	var _shareUrl = 'https://www.baidu.com/'; //真实的appkey，必选参数
//	mui.openWindow({
//		url: _shareUrl,
//		styles: { // 窗口参数 参考5+规范中的WebviewStyle,也就是说WebviewStyle下的参数都可以在此设置
//			titleNView: { // 窗口的标题栏控件
//				titleText: "标题栏", // 标题栏文字,当不设置此属性时，默认加载当前页面的标题，并自动更新页面的标题
//			}
//		}
//	})
//})

function getProducturl(obj) {
	var key = $(obj);
	var productUrl = key.attr("data");
	//sessionStorage.setItem("id", bb);
	sessionStorage.setItem("productview","productview2");
	mui.openWindow({
		url: productUrl,
		id: "yzx",
		styles: { // 窗口参数 参考5+规范中的WebviewStyle,也就是说WebviewStyle下的参数都可以在此设置
			titleNView: { // 窗口的标题栏控件
				titleText: "臻品商城", // 标题栏文字,当不设置此属性时，默认加载当前页面的标题，并自动更新页面的标题
				titleColor: "#000000", // 字体颜色,颜色值格式为"#RRGGBB",默认值为"#000000"
				titleSize: "17px", // 字体大小,默认17px
				backgroundColor: "#F7F7F7", // 控件背景颜色,颜色值格式为"#RRGGBB",默认值为"#F7F7F7"
				autoBackButton: true,
				progress: { // 标题栏控件的进度条样式
					color: "#AFDEFA", // 进度条颜色,默认值为"#00FF00"  
					height: "2px" // 进度条高度,默认值为"2px"         
				},
				splitLine: { // 标题栏控件的底部分割线，类似borderBottom
					color: "#CCCCCC", // 分割线颜色,默认值为"#CCCCCC"  
					height: "1px" // 分割线高度,默认值为"2px"
				}
			}
		}
//		 extras:{
//	      $.cookie("jumpurl", "product_info.html");//自定义扩展参数，可以用来处理页面间传值
//	    }
	})
	//window.location.href = "articleinfo.html";
	
}

//商品超链接跳转---弹出层
mui('.productinfo-content').on('tap','a',function(){
	sessionStorage.setItem("productview","productview2");
	mui.openWindow({
		url: this.href,
		id: "yzx",
		styles: { // 窗口参数 参考5+规范中的WebviewStyle,也就是说WebviewStyle下的参数都可以在此设置
			titleNView: { // 窗口的标题栏控件
				titleText: "51纷享", // 标题栏文字,当不设置此属性时，默认加载当前页面的标题，并自动更新页面的标题
				titleColor: "#000000", // 字体颜色,颜色值格式为"#RRGGBB",默认值为"#000000"
				titleSize: "17px", // 字体大小,默认17px
				backgroundColor: "#F7F7F7", // 控件背景颜色,颜色值格式为"#RRGGBB",默认值为"#F7F7F7"
				autoBackButton: true,
				progress: { // 标题栏控件的进度条样式
					color: "#AFDEFA", // 进度条颜色,默认值为"#00FF00"  
					height: "2px" // 进度条高度,默认值为"2px"         
				},
				splitLine: { // 标题栏控件的底部分割线，类似borderBottom
					color: "#CCCCCC", // 分割线颜色,默认值为"#CCCCCC"  
					height: "1px" // 分割线高度,默认值为"2px"
				}
			}
		}
	})
});

mui(".productinfo-content").on('longtap','.longtap',function(){

	var actionList = {
		title: '操作',
		cancel: "取消",
		buttons: [{
			title: "保存图片到相册"
		}]
	};
	var imgSrc = this.src;
	//弹出actionSheet选项
	plus.nativeUI.actionSheet(actionList, function(e) {
		if(e.index == 1) {
			//创建一个下载任务
			var imgDtask = plus.downloader.createDownload(imgSrc, {
				method: "GET"
			}, function(d, status) {
				//下载完成的回调函数
				if(status == 200) {
					plus.gallery.save(d.filename, function() { //保存到相册
						plus.io.resolveLocalFileSystemURL(d.filename, function(entry) {
							entry.remove(); //删除临时文件
						});
						return alert('图片已保存至相册');
					});
				} else {
					alert("保存失败!" + status);
				}
			});
			imgDtask.start(); //开始下载任务
		}
	});
});