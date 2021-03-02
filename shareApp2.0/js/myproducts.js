mui.back = function() {
				window.location.href = "my_center.html"
			}


$(function() {
	$("#headlinetitle").html("我分享的商品");

	$("#foot_line_btn_4").addClass("on");
});

$(function() {
	$.ajax({
		url: $.cookie("tempUrl") + "/commodity/getCommodityGroupByTypeId?token=" + $.cookie("token") + "&memberId=" + $.cookie("id") + "&pageNum=1&pageSize=99",
		type: "GET",
		success: function(result) {
			var list = result.content;
			var total = result.totalElements;
			if(total != 0) {
				$.each(list, function(index, item) {
					var title = $("<div class='myproducts-title'></div>");
					var products_img = $("<div class='myproducts-img' onclick='getproductinfo(this)' data='" + item.commodityName + "'></div>");
					var img = $("<img src='" + item.cover + "'>");
					var products_name = $("<div class='myproducts-name' onclick='getproductinfo(this)' data='" + item.commodityName + "'></div>").append($("<span>" + item.commodityName + "</span>"));
					title.append(products_img.append(img)).append(products_name);

					var times = $("<div class='myproducts-times'></div>").append($("<span>" + item.tradedCounts + "次</span>"));
					var withdraw = $("<div class='myproducts-withdraw'></div>").append($("<span>" + item.reward.toFixed(2) + "元</span>"));
					$("<li></li>").append(title).append(times).append(withdraw).appendTo(".myproducts-ul");
				})

			} else {
				//      		var none=$("<div class='myproducts-none'></div>");
				//      		none.append($("<span>没有我分享的商品.</span>")).appendTo(".myproducts-body");
				back();
			}
		}
	});
});

function getproductinfo(obj) {
	var key = $(obj);
	var commodityName = key.attr("data");
	sessionStorage.setItem("commodityName", commodityName);
	toinfo();
}

function toinfo() {
	var commodityName = sessionStorage.getItem("commodityName");
	$.ajax({
		url: $.cookie("tempUrl") + "/Image/selectInfo.do",
		type: "POST",
		datatype: "application/json",
		contentType: "application/json;charset=utf-8",
		data: JSON.stringify({
			"type": 2,
			"imagename": commodityName
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

function back() {
	//创建MeScroll对象,内部已默认开启下拉刷新,自动执行up.callback,刷新列表数据;
	var mescroll = new MeScroll("body", { //id固定"body"
		down: {
			use: false
		},
		//上拉加载的配置项
		up: {
			auto: true,
			isBounce: true,
			offset: 20,
			htmlNodata: '<p class="upwarp-nodata">-- END --</p><div style="height:40px"></div>',
			htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中...</p><div style="height:40px"></div>',
			callback: getListData, //上拉回调,此处可简写; 相当于 callback: function (page) { getListData(page); }
			noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
			empty: {
				icon: "images/mescroll-empty.png", //图标,默认null
				tip: "暂无相关数据~", //提示
				btntext: "去分享商品>", //按钮,默认""
				btnClick: function() { //点击按钮的回调,默认null
					window.location.href = "productslist.html";

				}
			},
			clearEmptyId: "dataList", //相当于同时设置了clearId和empty.warpId; 简化写法;默认null
			toTop: { //配置回到顶部按钮
				src: "images/mescroll-totop.png", //默认滚动到1000px显示,可配置offset修改
				//html: null, //html标签内容,默认null; 如果同时设置了src,则优先取src
				//						offset : 1000
			}

		}
	});

	/*初始化菜单*/
	var pdType = 0; //全部商品0; 奶粉1; 面膜2; 图书3;
	//			$(".nav p").click(function(){
	//				var i=$(this).attr("i");
	//				if(pdType!=i) {
	//					//更改列表条件
	//					pdType=i;
	//					$(".nav .active").removeClass("active");
	//					$(this).addClass("active");
	//					//重置列表数据
	//					mescroll.resetUpScroll();
	//				}
	//			})

	/*联网加载列表数据  page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
	function getListData(page) {
		//联网加载数据
		getListDataFromNet(pdType, page.num, page.size, function(curPageData) {
			//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
			//mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
			//console.log("pdType="+pdType+", page.num="+page.num+", page.size="+page.size+", curPageData.length="+curPageData.length);

			//方法一(推荐): 后台接口有返回列表的总页数 totalPage
			//mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)

			//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
			//mescroll.endBySize(curPageData.length, totalSize); //必传参数(当前页的数据个数, 总数据量)

			//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
			//mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)

			//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据,如果传了hasNext,则翻到第二页即可显示无更多数据.
			mescroll.endSuccess(curPageData.length);

			//设置列表数据
			setListData(curPageData);
		}, function() {
			//联网失败的回调,隐藏下拉刷新和上拉加载的状态;
			mescroll.endErr();
		});
	}

	/*设置列表数据*/
	function setListData(curPageData) {
		var listDom = document.getElementById("dataList");
		for(var i = 0; i < curPageData.length; i++) {

		}
	}

	/*联网加载列表数据
	 在您的实际项目中,请参考官方写法: http://www.mescroll.com/api.html#tagUpCallback
	 请忽略getListDataFromNet的逻辑,这里仅仅是在本地模拟分页数据,本地演示用
	 实际项目以您服务器接口返回的数据为准,无需本地处理分页.
	 * */
	function getListDataFromNet(pdType, pageNum, pageSize, successCallback, errorCallback) {
		//延时一秒,模拟联网
		setTimeout(function() {
			$.ajax({
				type: 'GET',
				url: $.cookie("tempUrl") + "commodity/getCommodityGroupByTypeId?pageNum=1&pageSize=22&token=" + $.cookie("token") + "&memberId=" + $.cookie("id"),
				//		                url: '../res/pdlist1.json?pdType='+pdType+'&num='+pageNum+'&size='+pageSize,
				dataType: 'json',
				success: function(data) {
					var listData = [];
					//		                	alert(data.data);
					//pdType 全部商品0; 奶粉1; 面膜2; 图书3;
					var len = 0;
					if(data.content == null) {
						len = 0;

					} else {
						len = data.content.length;
					}
					if(pdType == 0) {
						//全部商品 (模拟分页数据)
						for(var i = (pageNum - 1) * pageSize; i < pageNum * pageSize; i++) {
							if(i == len) break;
							listData.push(data.content[i]);
						}

					}

					//回调
					successCallback(listData);
				},
				error: errorCallback
			});
		}, 1);
	}

}