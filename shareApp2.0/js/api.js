






//判断移动端设备
function isMobile() {
    var sUserAgent = navigator.userAgent.toLowerCase(),
    bIsIpad = sUserAgent.match(/ipad/i) == "ipad",
    bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os",
    bIsMidp = sUserAgent.match(/midp/i) == "midp",
    bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
    bIsUc = sUserAgent.match(/ucweb/i) == "ucweb",
    bIsAndroid = sUserAgent.match(/android/i) == "android",
    bIsCE = sUserAgent.match(/windows ce/i) == "windows ce",
    bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile",
    bIsWebview = sUserAgent.match(/webview/i) == "webview";
    return (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM);
}

//判断微信环境
function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}
//获取网址参数
function request(paras) {
    var url = location.search;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {}
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
}


//日期小时分钟格式化
function dateHoursMinFormat(date) {
    if (date) {
        return (new Date(date.toString().replace("T", " "))).Format("yyyy-MM-dd hh:mm");
    } else {
        return "";
    }
}


//日期年月日格式化
function dateYMDFormat(date) {
    if (date) {
        return (new Date(date)).Format("yyyy-MM-dd");
    } else {
        return "";
    }
}


Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        // 月份
        "d+": this.getDate(),
        // 日
        "h+": this.getHours(),
        // 小时
        "m+": this.getMinutes(),
        // 分
        "s+": this.getSeconds(),
        // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3),
        // 季度
        S: this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return fmt;
};




//判断手机号是否合法
function matchMobile(val) {
    var valnew = trim(val);
    if (valnew.match(/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/)) {
        return true;
    } else {
        return false;
    }
}

//判断密码

function matchPassword(val) {
    var valnew = val;
    //if(/^[a-z|A-Z]+[a-z|A-Z|_|0-9]{5,11}$/){
    if (valnew.length >= 6 && valnew.length <= 16) {
        return true;
    } else {
        return false;
    }
}

//删除左右两端的空格
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
//删除左边的空格
function ltrim(str) {
    return str.replace(/(^\s*)/g, "");
}
//删除右边的空格
function rtrim(str) {
    return str.replace(/(\s*$)/g, "");
}


//提示框  
var message = new function () {

    //基础弹出框
    this.show = function (message) {
        var html = "<div class=\"message\"><div class=\"message-layer\"></div><div class=\"box\"><div class=\"title\">SWDK提示</div><div class=\"messagecontent\">" + message + "</div><div class=\"messagebtn\" onclick=\"message.close();\">确认</div></div></div>";
        var jq = $(html);
        jq.appendTo('body').show();
    }

    this.close = function () {
        $('.message').remove();
    }

    this.confirm = function (message, selected) {
        this._close = function (r) {
            this.close();
            if ($.isFunction(selected)) selected(r);
        };
        var html = "<div class=\"message\"><div class=\"message-layer\"></div><div class=\"box\"><div class=\"title\">SWDK提示</div><div class=\"messagecontent\">" + message + "</div><div class=\"messagebtnConfirm\" onclick=\"message._close(true);\">确认</div><div class=\"messagebtnConfirm\" onclick=\"message._close(false);\">取消</div></div></div>";
        var jq = $(html);
        jq.appendTo('body').show();
    }
};


////设置Cookie
//function setCookie(name, value, time) {
//
//  var date = new Date();
//  date.setTime(date.getTime() + time * 60 * 1000); //设置date为当前时间+30分
//  document.cookie = name + "=" + value + "; expires=" + date.toGMTString(); //将date赋值给expires
//}
//
//
////获取Cookie
//function getCookie(name) {
//  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
//  if (arr = document.cookie.match(reg)) {
//      return unescape(arr[2]);
//  } else {
//      return "";
//  }
//}




function setField(data, el) {
    var field_els = el ? $(el).find('[field]') : $('[field]');
    for (var field in data) {
        field_els.each(function (i, el) {
            var fields = el.attributes.getNamedItem('field').value.split('.');
            if (fields.indexOf(field) > -1) {
                if (typeof (dataset) == "function")
                    dataset(el);
                var value = data[fields[0]];
                if (fields.length > 1) {
                    for (var j = 1; j < fields.length; j++) {
                        if (value) {
                            value = value[fields[j]];
                        }
                    }
                }
                if (value === false) {
                    el.style.display = 'none';
                } else if (el.nodeName == "IMG") {
                    el.src = value;
                } else if (el.nodeName == "INPUT") {
                    el.value = value;
                    try {
                        el.onchange && el.onchange();
                        $(el).change();
                    } catch (e) {

                    }
                } else if (el.nodeName == "SELECT") {
                    dataset(el);
                    var key = el.dataset.key;
                    select:
                        for (var j = 0; j < el.options.length; j++) {
                            var option = el.options[j];
                            if ((key == "text" && option.text == value) || (key != "text" && option.value == value)) {
                                el.selectedIndex = j;

                                try {
                                    el.onchange && el.onchange();
                                    $(el).change();
                                } catch (e) {

                                }

                                break select;
                            }
                        }
                    el.dataset.value = value;
                } else {
                    if (el.dataset.format == "num") {
                        el.innerText = numFormat(value);
                    } else if (el.dataset.format == "time") {
                        el.innerText = timeFormat(value);
                    } else if (el.dataset.format == "date") {
                        el.innerText = new Date(value).Format('yyyy-MM-dd');
                    } else if (el.dataset.format == "datetime") {
                        el.innerText = new Date(value).Format('yyyy-MM-dd hh:mm:ss');
                    } else if (el.dataset.format == "html") {
                        el.innerHTML = value || el.dataset.default || value;
                    } else {
                        el.innerText = value || el.dataset.default || value;
                    }
                    if (window.navigator.userAgent.toLowerCase().indexOf("firefox") != -1) {
                        el.textContent = el.innerText;
                    }
                }
            }
        });
    }
}
function dataset(el) {
    if (el && !el.dataset) {
        el.dataset = {};
        for (var i = 0; i < el.attributes.length; i++) {
            var attr = el.attributes[i];
            if (attr.name.toLowerCase().indexOf('data-') == 0) {
                el.dataset[attr.name.substr(5)] = attr.value;
            }
        }
    }
}

/*cookie*/
function setCookie(name, value) {
	var date = new Date();
	date.setTime(date.getTime() + 10 * 24 * 60 * 60 * 1000); //设置date为当前时间+30分
	//document.cookie = name + "=" + value + "; expires=" + date.toGMTString(); //将date赋值给expires
	//  var test=value+';expires='+date.toGMTString()+'; path=/';
	function plusReady() {
		plus.navigator.setCookie(name, value + '; expires=' + date.toGMTString() + '; path=/');
	}
	if(window.plus) {
		plusReady();
	} else {
		document.addEventListener('plusready', plusReady, false);
	}
}

function getCookie(name) {
	var test = "";
	//test=plus.navigator.getCookie(name);
	if(window.plus) {
		test = plus.navigator.getCookie(name);
	} else { // 兼容老版本的plusready事件
		document.addEventListener('plusready', function() {
			test = plus.navigator.getCookie(name);
		}, false);
	}
	return test;
}