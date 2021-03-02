mui.init({
  gestureConfig:{
   longtap: true, //默认为false
  }
});

mui.back = function() {
		var proview = sessionStorage.getItem("articleview");
		if(proview == "articleview1"){
			plus.webview.currentWebview().close();
		}else if(proview == "articleview2"){
			sessionStorage.setItem("articleview","articleview1");
			proview = sessionStorage.getItem("productview");
			plus.webview.close( "yzx");
		}
	}
// 文章超链接---弹出层
mui('.articleinfo-content').on('tap','a',function(){
	sessionStorage.setItem("articleview","articleview2");
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

var temp = plus.webview.currentWebview();
var id = temp.articleId;
$("#another").attr("articleId",id);

sessionStorage.setItem("mycenterlogin","");
$(function () {
    $.cookie("jumpurl", window.location.href);
    $("#headlinetitle").html("文章详情");
	sessionStorage.setItem("articleview","articleview1");
    $("#foot_line_btn_2").addClass("on");
});

 $(function () {
 	//console.log(webview.articleId);
   	sessionStorage.setItem("article","article");
 	$("#another").attr("data",id);
        $.ajax({
            url:  $.cookie("tempUrl")+"/article/getInfo?id="+id,
            type: "GET",
            success: function (result) {
                if (result.code == 0) {
                    $(".articleinfo-title").append($("<span>"+result.data.articleTitle+"</span>"));
                    $(".mui-title").append(result.data.articleTitle);
                    $(".articleinfo-content").append($("<span>"+result.data.articleContent+"</span>"));
                    $(".articleinfo-date").append($("<span>"+result.data.createDate+"</span>"));
                    if(result.data.author==null || result.data.author ==""){
                    	$("#articleinfo-a").attr("style","display: none;");
                    }else{
                    	$("#articleinfo-a").attr("data",result.data.author);
                    }
                    
                    $(".articleinfo-content img").attr("data-preview-src","");
	                $(".articleinfo-content img").attr("data-preview-group","1");
	                $(".articleinfo-content img").addClass("longtap");
                } 
            }
        });
  });
  
function getArticleurl(obj) {
	var key = $(obj);
	var articleUrl = key.attr("data");
	//sessionStorage.setItem("id", bb);
	sessionStorage.setItem("articleview","articleview2");
	mui.openWindow({
		url: articleUrl,
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
//	      setCookie("jumpurl", "product_info.html");//自定义扩展参数，可以用来处理页面间传值
//	    }
	})
	//window.location.href = "articleinfo.html";
	
}


mui(".articleinfo-content").on('longtap','.longtap',function(){

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