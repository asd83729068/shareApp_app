var shares = null;
// H5 plus事件处理
function plusReady() {
	updateSerivces();
}
if(window.plus) {
	plusReady();
} else {
	document.addEventListener('plusready', plusReady, false);
}

var url = "http://h5.izhenpinwang.com:8083?";
var href = ""
var cover = "";
var article_title = "";
var sharehrefDes = "【51纷享】App 随时随地分享，轻轻松松赚钱！更多佣金尽在'51纷享'@你";

function toshare(obj) {
	var id = $(obj).attr("articleId");

	$.ajax({
		url: $.cookie("tempUrl") + "/article/getInfo?id=" + id,
		type: "GET",
		success: function(result) {
			if(result.code == 0) {
				var obj = result.data;
				id = obj.id;
				cover = obj.cover;
				article_title = obj.articleTitle;
			}
		}
	});
	$.ajax({
		url: $.cookie("tempUrl") + "/newShare/articleShare.do?token=" + $.cookie("token") + "&articleId=" + id,
		type: "POST",
		success: function(result) {
			if(result.code == 0) {
				href = url + "shareId="+result.data;
				//alert(href);
				$(".am-share").addClass("am-modal-active");
				if($(".sharebg").length > 0) {
					$(".sharebg").addClass("sharebg-active");
				} else {
					$("body").append('<div class="sharebg"></div>');
					$(".sharebg").addClass("sharebg-active");
				}
				$(".sharebg-active,.share_btn").click(function() {
					$(".am-share").removeClass("am-modal-active");
					setTimeout(function() {
						$(".sharebg-active").removeClass("sharebg-active");
						$(".sharebg").remove();
					}, 300);
				})
			}
		},
		error: function() {
			sessionStorage.setItem("actionlogin","share");
			window.location.href = "login.html";
		}
	});

}
/**
 * 更新分享服务
 */
function updateSerivces() {
	plus.share.getServices(function(s) {
		shares = {};
		for(var i in s) {
			var t = s[i];
			shares[t.id] = t;
			//alert(t);
		}
	}, function(e) {
		alert('获取分享服务列表失败：' + e.message);
	});
}
/**
 * 调用系统分享
 */
function shareSystem(msg) {
	//outSet('调用系统分享');

	//	if(pic&&pic.realUrl){
	//		msg.pictures=[pic.realUrl];
	//	}
	if('iOS' == plus.os.name) { //iOS平台添加链接地址
		msg.href = href;
	}
	//alert(JSON.stringify(msg));
	plus.share.sendWithSystem ? plus.share.sendWithSystem(msg, function() {
		//outLine('Success');
//		console.log('Success');
	}, function(e) {
		//outLine('Failed: '+JSON.stringify(e));
		console.log('Failed: ' + JSON.stringify(e));
	}) : shareSystemNativeJS();
}

function shareSystemNativeJS() {
	if(plus.os.name !== 'Android') {
		plus.nativeUI.alert('此平台暂不支持系统分享功能!');
		return;
	}
	var intent = new Intent(Intent.ACTION_SEND);
	//	if(pic&&pic.realUrl){
	//		var p = '';
	//		p = pic.realUrl;
	//		if(p.substr(0,7)==='file://'){
	//			p=p.substr(7);
	//		}else if(p.sub(0)!=='/'){
	//			p=plus.io.convertLocalFileSystemURL(p);
	//		}
	//	}
	var f = new File(p);
	var uri = Uri.fromFile(f);
	if(f.exists() && f.isFile()) {
		console.log('image/*');
		intent.setType('image/*');
		intent.putExtra(Intent.EXTRA_STREAM, uri);
	} else {
		console.log('text/plain');
		intent.setType('text/plain');
	}
	intent.putExtra(Intent.EXTRA_SUBJECT, 'HelloH5');
	intent.putExtra(Intent.EXTRA_TEXT, sharecontent.value);
	intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
	main.startActivity(Intent.createChooser(intent, '系统分享HelloH5'));
}
/**
 * 分享操作
 * @param {JSON} sb 分享操作对象s.s为分享通道对象(plus.share.ShareService)
 * @param {Boolean} bh 是否分享链接
 */

function shareAction(sb, bh, msg) {
	//outSet('分享操作：');
	if(!sb || !sb.s) {
		alert('无效的分享服务！');
		return;
	}

	if(sb.s.authenticated) {
		//alert('---已授权---');
		shareMessage(msg, sb.s);
	} else {
		//alert('---未授权---');
		sb.s.authorize(function() {
			shareMessage(msg, sb.s);
		}, function(e) {
			//alert('认证授权失败：' + e.code + ' - ' + e.message);
		});
	}
}
/**
 * 发送分享消息
 * @param {JSON} msg
 * @param {plus.share.ShareService} s
 */
function shareMessage(msg, s) {
	//alert(JSON.stringify(msg));
	s.send(msg, function() {
		//alert('分享到"' + s.description + '"成功！');
	}, function(e) {
		//alert('分享到"' + s.description + '"失败: ' + JSON.stringify(e));
	});
}
/**
 * 解除所有分享服务的授权
 */
function cancelAuth() {
	try {
		//outSet('解除授权：');
		for(var i in shares) {
			var s = shares[i];
			if(s.authenticated) {
				outLine('取消"' + s.description + '"');
			}
			s.forbid();
		}
		// 取消授权后需要更新服务列表
		updateSerivces();
		outLine('操作成功！');
	} catch(e) {
		alert(e);
	}
}

//分享到qq 
$("#qqzone").click(function qq() {
	var ss = shares['qq'];
	var sb = {
		s: ss
	};
	var msg = {
		content: sharehrefDes,
		extra: {
			scene: sb.x
		},
		href: href +"&shareWay=0",
		title: article_title,
		thumbs: [cover],
		pictures: [cover]
	};

	shareAction(sb, true, msg);
})
//分享到微信 连接
function weixin1() {
	var ss = shares['weixin'];
	var sb = {
		s: ss,
		x: 'WXSceneSession'
	};
		var msg = {
			content: sharehrefDes,
			extra: {
				scene: sb.x
			},
			href: href +"&shareWay=1",
			title: article_title,
			thumbs: [cover+"?x-oss-process=image/resize,m_lfit,h_200,w_200"],
			pictures: [cover]
		};
	shareAction(sb, true,msg);
//	var msg = {
//		content: sharehrefDes + "网址" + href,
//		title: article_title
//	};
//	shareSystem(msg);
}

function weixin2() {
	var ss = shares['weixin'];
	var sb = {
		s: ss,
		x: 'WXSceneTimeline'
	};
		var msg = {
			content: sharehrefDes,
			extra: {
				scene: sb.x
			},
			href: href+"&shareWay=2",
			title: article_title,
			thumbs: [cover+"?x-oss-process=image/resize,m_lfit,h_200,w_200"],
			pictures: [cover]
		};
	shareAction(sb, true,msg);
}

//分享到新浪微博  文本
function sina() {
	var ss = shares['sinaweibo'];
	var sb = {
		s: ss
	};
	var msg = {
		content: article_title + href+"&shareWay=3"
//		extra: {
//			scene: sb.x
//		},
//		href: href,
//		title: article_title,
//		thumbs: [cover],
//		pictures: [cover]
	};
	shareAction(sb, true,msg);
}

//$("#sina").click(function() {
//	var _shareUrl = 'http://v.t.sina.com.cn/share/share.php?&appkey=895033136'; //真实的appkey，必选参数
//	var _url = href;
//	var _title = "快来看看我分享的文章";
//	var _source = "";
//	var _sourceUrl = "";
//	var _pic = cover;
//	var _width = "";
//	var _height = "";
//	var _blank = "_blank";
//	_shareUrl += '&url=' + (_url || document.location); //参数url设置分享的内容链接|默认当前页location，可选参数
//	_shareUrl += '&title=' + encodeURIComponent(_title || document.title); //参数title设置分享的标题|默认当前页标题，可选参数
//	_shareUrl += '&source=' + encodeURIComponent(_source || '');
//	_shareUrl += '&sourceUrl=' + (_sourceUrl || '');
//	_shareUrl += '&content=' + 'utf-8'; //参数content设置页面编码gb2312|utf-8，可选参数
//	_shareUrl += '&pic=' + encodeURIComponent(_pic || ''); //参数pic设置图片链接|默认为空，可选参数
//	mui.openWindow({
//		url: _shareUrl,
//		styles: { // 窗口参数 参考5+规范中的WebviewStyle,也就是说WebviewStyle下的参数都可以在此设置
//			titleNView: { // 窗口的标题栏控件
//				titleText: "标题栏", // 标题栏文字,当不设置此属性时，默认加载当前页面的标题，并自动更新页面的标题
//				titleColor: "#000000", // 字体颜色,颜色值格式为"#RRGGBB",默认值为"#000000"
//				titleSize: "17px", // 字体大小,默认17px
//				backgroundColor: "#F7F7F7", // 控件背景颜色,颜色值格式为"#RRGGBB",默认值为"#F7F7F7"
//				autoBackButton: true,
//				progress: { // 标题栏控件的进度条样式
//					color: "#00FF00", // 进度条颜色,默认值为"#00FF00"  
//					height: "2px" // 进度条高度,默认值为"2px"         
//				},
//				splitLine: { // 标题栏控件的底部分割线，类似borderBottom
//					color: "#CCCCCC", // 分割线颜色,默认值为"#CCCCCC"  
//					height: "1px" // 分割线高度,默认值为"2px"
//				}
//			}
//		}
//	})
//})

//复制链接
function jsCopy() {
	var copyUrl = href +"&shareWay=4";
	$("#copy-num").val(copyUrl);
	var e = document.getElementById("copy-num"); //对象是copy-num1
//	e.select(); //选择对象
//	document.execCommand("Copy"); //执行浏览器复制命令
//	window.clipboardData.setData("Text",e);
//	alert("复制成功");
	
//	var input = document.createElement("input");
//  e.value = message;
//  document.body.appendChild(e);
    e.select();
    e.setSelectionRange(0, e.value.length), document.execCommand('Copy');
    document.body.removeChild(e);
}

/* <![CDATA[ */
!
function() {
	try {
		var t = "currentScript" in document ? document.currentScript : function() {
			for(var t = document.getElementsByTagName("script"), e = t.length; e--;)
				if(t[e].getAttribute("data-cfhash")) return t[e]
		}();
		if(t && t.previousSibling) {
			var e, r, n, i, c = t.previousSibling,
				a = c.getAttribute("data-cfemail");
			if(a) {
				for(e = "", r = parseInt(a.substr(0, 2), 16), n = 2; a.length - n; n += 2) i = parseInt(a.substr(n, 2), 16) ^ r,
					e += String.fromCharCode(i);
				e = document.createTextNode(e),
					c.parentNode.replaceChild(e, c)
			}
			t.parentNode.removeChild(t);
		}
	} catch(u) {}
}()
/* ]]> */