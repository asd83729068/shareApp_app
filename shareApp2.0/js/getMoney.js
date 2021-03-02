mui.back = function() {
	window.location.href = "my_withdraw.html"
}

$(function() {

	$("#headlinetitle").html("提现奖励金");

	$.cookie("jumpurl", window.location.href, 30);

	$("#foot_line_btn_4").addClass("on");

	var alipayAccount = sessionStorage.getItem("alipayAccount");
	var availMoney = parseFloat(sessionStorage.getItem("availMoney"));
	var disableMoney = parseFloat(sessionStorage.getItem("disableMoney"));
	var sum = parseFloat(availMoney) + parseFloat(disableMoney);

	$("#alipayAccount").val(alipayAccount);
	$("#availMoney").text(availMoney.toFixed(2));
	$("#totalMoney").text(sum.toFixed(2));
});

//var judge = null;
//
//$(function() {
//	alert("asd");
//	$.ajax({
//		url: $.cookie("tempUrl") + '/Member/clock.do?token=' + $.cookie("token") + "&phone=" + $.cookie("phone"),
//		type: "POST",
//		datatype: "application/json",
//		contentType: "application/json;charset=utf-8",
//		success: function(res) {
//
//			if(res.code == 0) {
//				judge = res.data;
//			} else {
//				wcPop({
//					content: res.exception,
//					shade: true,
//					style: 'background: rgba(17,17,17,.7); color: #fff;font-size:15px;width:200px',
//					time: 2
//				});
//			}
//		}
//	});
//	setTimeout(function() {}, 500);
//
//});

$('#btnSubmit').on('click', function() {
	var reg = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
	var alipayAccount = $("#alipayAccount").val();
	var money = $("#money").val();
	//	if(alipayAccount==""){
	//		wcPop({
	//				content: '支付宝账号不能为空！',
	//				shade: true,
	//				style: 'background: rgba(17,17,17,.7); color: #fff;',
	//				time: 2
	//			});
	//		return;
	//	}
	if(money == "") {
		wcPop({
			content: '提现金额不能为空！',
			shade: true,
			style: 'background: rgba(17,17,17,.7); color: #fff;font-size:15px;width:200px',
			time: 2
		});
		return;
	}
	if(!reg.test(money)) {
		wcPop({
			content: '请输入正确的金额格式！',
			shade: true,
			style: 'background: rgba(17,17,17,.7); color: #fff;font-size:15px;width:200px',
			time: 2
		});
		return;
	}
	if(money < 10) {
		wcPop({
			content: '请输入大于10元的金额！',
			shade: true,
			style: 'background: rgba(17,17,17,.7); color: #fff;font-size:15px;width:200px',
			time: 2
		});
		return;
	}
	if(money.substring(money.indexOf(".") + 1, money.length).length > 2 && money.indexOf(".") > 0) {

		wcPop({
			content: '提现金额小数不能超过2位！',
			shade: true,
			style: 'background: rgba(17,17,17,.7); color: #fff;font-size:15px;width:200px',
			time: 2
		});
		return;
	}

	$.ajax({
		url: $.cookie("tempUrl") + '/Member/clock.do?token=' + $.cookie("token") + "&phone=" + $.cookie("phone"),
		type: "POST",
		datatype: "application/json",
		contentType: "application/json;charset=utf-8",
		success: function(res) {
			if(res.code == 0) {
				var judge = res.data;
				if(judge) {
					$.ajax({
						url: $.cookie("tempUrl") + '/Withdrawal/application.do?token=' + $.cookie("token") + "&money=" + money + "&alipayAccount=" + alipayAccount + "&memberId=" + $.cookie("id"),
						type: "POST",
						datatype: "application/json",
						contentType: "application/json;charset=utf-8",
						success: function(res) {
							if(res.code == 0) {
								wcPop({
									content: '提现申请成功！',
									shade: true,
									style: 'background: rgba(17,17,17,.7); color: #fff;font-size:15px;width:200px',
									time: 4
								});

								setTimeout(function() {
									window.location.replace("my_withdraw.html");
								}, 1500);
							} else {
								wcPop({
									content: res.exception,
									shade: true,
									style: 'background: rgba(17,17,17,.7); color: #fff;font-size:15px;width:200px',
									time: 2
								});
							}
						}
					});
				} else {
					wcPop({
						content: '提现失败：您的提现次数已达上限！',
						shade: true,
						style: 'background: rgba(17,17,17,.7); color: #fff;font-size:15px;width:200px',
						time: 2
					});
				}
			} else {
				wcPop({
					content: res.exception,
					shade: true,
					style: 'background: rgba(17,17,17,.7); color: #fff;font-size:15px;width:200px',
					time: 2
				});
			}
		}
	});

});