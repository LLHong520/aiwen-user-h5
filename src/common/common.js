(function () {
  function SwiperTab(selector, callback) {
    this.oTab = $(selector).eq(0);
    this.aItems = this.oTab.find(".swiper_tab_cell");
    this.cellW = this.aItems.eq(0).width();
    this.cellLength = this.aItems.size();
    this.left = 0;
    this.init.call(this);
    this.activeIndex = 0;
    this.callback = callback;
  }
  SwiperTab.prototype.init = function () {
    // this.oTab.width(this.cellLength * this.cellW);
    this.aItems.eq(0).addClass("active");
    this.bindItemClick.call(this);
  };

  SwiperTab.prototype.bindItemClick = function () {
    var _self = this;
    this.aItems.click(function () {
      //点击之后元素聚焦
      $(this).addClass("active").siblings().removeClass("active");
      //算出横向剩余空间
      var leftW = window.screen.width - $(this).offset().left;
      var targetLeft = 0;
      var index = $(this).index();


      //当前已经激活 则不重新激活
      if (index == _self.activeIndex) return;
      if (index > _self.activeIndex) {
        //点击目前最右边一个tab然后切换
        if (leftW < _self.cellW) {
          targetLeft = _self.left - _self.cellW;
        }
      } else {
        //点击目前最左端的一个tab切换
        if ($(this).offset().left == 0 && index > 0) {
          targetLeft = _self.left + _self.cellW;
        }
      }
      _self.activeIndex = index;
      _self.left = targetLeft;
      _self.move();
      _self.callback(index, _self);
    });

  };
  SwiperTab.prototype.checkTo = function (index) {
    this.aItems.eq(index).trigger("click");
  };

  SwiperTab.prototype.move = function (index) {
    this.oTab.css("transform", "translate3d(" + this.left + "px, 0px, 0px)");
  };

  window.SwiperTab = SwiperTab;
})();

(function () {
  function goTop(el) {
    var wrapper_inner = $(el).eq(0);
    var timer = setInterval(function () {
      var top = wrapper_inner.scrollTop();
      var speed = -Math.ceil(top / 8);
      if (top == 0) {
        clearInterval(timer);
      } else {
        wrapper_inner.scrollTop(top + speed);
      }
    }, 30);
  }

  window.goTop = goTop;
})();

import loadingImg from "../assets/images/loading.gif";
(function () {
  var changePage = "<div id=\"changeing_page\">";
  changePage += "<div class=\"loading\">";
  changePage += "<img width=\"24\" height=\"24\" src=\"" + loadingImg + "\">";
  changePage += "</div>";
  changePage += "</div>";
  $("body").eq(0).append($(changePage));
})();

// (function () {
//   var u = navigator.userAgent; //, app = navigator.appVersion
//   var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //判断是否是ios,函数只在ios下执行
//   if(isiOS){
//     // $(".iosEdit").on("focusin",function(){
//     //   window.scrollTo(0, 50);
//     // });
//     // $(".iosEdit").on("focusout",function(){
//     //   window.scrollTo(0, 0);
//     // });

//     var htmlScrollHeight = $(document).scrollTop();//记录页面初始滚动条到顶部的高度
//     $(".iosEdit").blur(function(){
//       //输入框失去焦点时，使页面滚动条到顶部的高度恢复到初始值，页面就会滑动下来
//       $("html,body").animate({scrollTop:htmlScrollHeight}, 1000);
//     });

//   }

  // var u = navigator.userAgent;// app = navigator.appVersion;
  // var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

  // $("input,textarea").blur(function(){
  //   if (isIOS) {
  //     blurAdjust();
  //   }
  // });

  // 解决苹果不回弹页面
  // function blurAdjust(e){
  //   setTimeout(()=>{
  //     // alert("1231321233")
  //     if(document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA"){
  //       return;
  //     }
  //     let result = "pc";
  //     if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
  //       result = "ios";
  //     }else if(/(Android)/i.test(navigator.userAgent)) {  //判断Android
  //       result = "android";
  //     }
  //     if(result == "ios"){
  //       document.activeElement.scrollIntoViewIfNeeded(true);
  //     }
  //   },100);
  // }
  
// })();


(function () {
  function init() {
    var sTipHtml = (function () {
      var html = "<!--提示 start-->";
      html += "<div class=\"tips_mod\" style=\"display:none; z-index:10000;\">";
      html += "<div class=\"tips_txt tips_sty1\">";
      html += "<b></b><p></p><span></span>";
      html += "</div>";
      html += "</div>";
      html += "<!--提示 end-->";
      return html;
    })();

    var oTipDom = $(".tips_mod");
    if (oTipDom.size() == 0) {
      $("body").eq(0).append(sTipHtml);
    }
  }
  window.toast = {
    delay: 2000,
    tip: function (tit, msg) {
      init();
      var oTipDom = $(".tips_mod").eq(0);
      oTipDom.focus();
      if (this.timer) clearTimeout(this.timer);
      oTipDom.blur(function () {
        clearTimeout(this.timer);
        oTipDom.hide();
      });
      oTipDom.find("b").text(tit);
      oTipDom.find("p").text(msg);

      oTipDom.show();
      this.timer = setTimeout(function () {
        oTipDom.hide();
      }, this.delay);
    }
  };
})();

(function () {
  var utils = {};
  utils.trim = function (str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  };
  utils.removeAllSpace = function (str) {
    return str.replace(/\s+/g, "");
  };
  utils.cardSpace = function (str) {
    return str.replace(/\s/g, "").replace(/(.{4})/g, "$1 ");
    // return value.replace(/\s/g,"").replace(/[^\d]/g,"").replace(/(\d{4})(?=\d)/g,"$1 ");
  };
  utils.isEmpty = function (str) {
    var str = this.trim(str);
    if (str == "") {
      return true;
    } else {
      return false;
    }
  };
  utils.isNumber = function (str) {
    var str = this.trim(str);
    var exp = /^[0-9]*[1-9][0-9]*$/;
    if (exp.test(str)) {
      return true;
    } else {
      return false;
    }
  };
  utils.isMobile = function (mobile) {
    var mobile = this.trim(mobile);
    var exp = /^1\d{10}$/;
    if (exp.test(mobile)) {
      return true;
    } else {
      return false;
    }
  };
  utils.addEvent = function (obj, ev, fn) {
    if (obj.attachEvent) {
      //针对IE浏览器
      obj.attachEvent("on" + ev, fn);
    } else {
      //针对FF与chrome
      obj.addEventListener(ev, fn, false);
    }
  };
  utils.removeEvent = function (obj, ev, fn) {
    if (obj.attachEvent) {
      //针对IE浏览器
      obj.detachEvent("on" + ev, fn);
    } else {
      //针对FF与chrome
      obj.removeEventListener(ev, fn, false);
    }
  };
  //将用户输入的信息转换为伪标签存入数据库
  utils.getFormatFakeHtml = function (strContent) {
    strContent = strContent.replace(/\r\n/g, "[br]"); //IE9、FF、chrome
    strContent = strContent.replace(/\n/g, "[br]"); //IE7-8
    strContent = strContent.replace(/\s/g, " "); //空格处理
    return strContent;
  };
  utils.replaceBrTag = function (strContent) {
    strContent = strContent.replace(/\r\n/g, "<br/>");
    strContent = strContent.replace(/\n/g, "<br/>");
    return strContent;
  };
  //将数据库中提取的字符串中伪标签转换为可以识别的标签
  utils.getFormatHtml = function (strContent) {
    strContent = strContent.replace(/\[br\]/g, "<br/>"); //IE9、FF、chrome
    return strContent;
  };
  //将数据库中提取的字符串中伪标签转换为textarea可以识别的字符
  utils.getFormatStr = function (strContent) {
    strContent = strContent.replace(/\[br\]/g, "\r\n"); //IE9、FF、chrome
    strContent = strContent.replace(/\[br\]/g, "\n"); //IE7-8
    // strContent = strContent.replace(/ /g, '\s'); //空格处理
    return strContent;
  };
  utils.getFormatStrNone = function (strContent) {
    strContent = strContent.replace(/\[br\]/g, "\r\n"); //IE9、FF、chrome
    strContent = strContent.replace(/\[br\]/g, "\n"); //IE7-8
    strContent = strContent.replace(/\s/g, " "); //空格处理
    return strContent;
  };
  utils.replaceHtmlTag = function (strContent) {
    strContent = strContent.replace(/\[br\]/g, "");
    return strContent;
  };
  utils.replaceSpaceTag = function (strContent) {
    strContent = strContent.replace(/ /g, "\u00a0");
    return strContent;
  };

  //压缩图片
  utils.compressIMG = function (file, quality, callback) {
    if (!window.FileReader || !window.Blob) {
      return errorHandler("您的浏览器不支持图片压缩")();
    }

    var reader = new FileReader();
    var mimeType = file.type || "image/jpeg";

    reader.onload = createImage;
    reader.onerror = errorHandler("图片读取失败！");
    reader.readAsDataURL(file);

    function createImage() {
      var dataURL = this.result;
      var image = new Image();
      image.onload = compressImage;
      image.onerror = errorHandler("图片加载失败");
      image.src = dataURL;
    }

    function compressImage() {
      var canvas = document.createElement("canvas");
      var ctx;
      var dataURI;
      var result;

      canvas.width = this.naturalWidth;
      canvas.height = this.naturalHeight;
      ctx = canvas.getContext("2d");
      ctx.drawImage(this, 0, 0);
      dataURI = canvas.toDataURL(mimeType, quality);
      result = dataURIToBlob(dataURI);

      callback(null, result);
    }

    function dataURIToBlob(dataURI) {
      var type = dataURI.match(/data:([^;]+)/)[1];
      var base64 = dataURI.replace(/^[^,]+,/, "");
      var byteString = atob(base64);

      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ia], {
        type: type
      });
    }

    function errorHandler(message) {
      return function () {
        var error = new Error("Compression Error:", message);
        callback(error, null);
      };
    }
  };
  window.utils = utils;
})();
//设备信息
(function (window) {
  var u = navigator.userAgent,
    appVersion = navigator.appVersion;
  var platformInfo = {};
  platformInfo.userAgent = u;
  platformInfo.appVersion = appVersion;
  platformInfo.isiOS = (function () {
    return u.toLowerCase().indexOf("iphone") > 0 ? true : false;
  })();
  platformInfo.isAndroid = (function () {
    return u.toLowerCase().indexOf("android") > 0 ? true : false;
  })();
  platformInfo.isWx = (function () {
    return u.toLowerCase().match(/MicroMessenger/i) == "micromessenger" ? true : false;
  })();
  platformInfo.isWeibo = (function () {
    return u.toLowerCase().match(/WeiBo/i) == "weibo" ? true : false;
  })();
  platformInfo.isInIframe = (function () {
    return top.location == location ? false : true;
  })();
  platformInfo.isApp = (function () {
    return platformInfo.isAndroid || platformInfo.isiOS;
  })();
  platformInfo.deviceInfo = (function () {
    return {
      width: window.screen.width,
      height: window.screen.height
    };
  })();
  window.platformInfo = platformInfo;
})(window);
//设备信息
(function (window) {
  function weiboAutoLoginBack(token) {}
  window.weiboAutoLoginBack = weiboAutoLoginBack;
})(window);

//滚动时固定
(function ($) {
  // var oWrapper_inner=$('.layout_wrapper').eq(0);
  var oWrapper_inner = $(window);
  var isInit = false;
  var aFixed_scroll = $(".fixed_scroll");
  //页面加载记录当前位置
  function initTop() {
    for (var i = 0; i < aFixed_scroll.length; i++) {
      aFixed_scroll.eq(i).attr("top", aFixed_scroll.eq(i).offset().top);
      aFixed_scroll.eq(i).wrap("<div style=\"height:" + aFixed_scroll.eq(i).height() + "px\"></div>");
    }
  }
  //滚动时位置固定
  oWrapper_inner.on("scroll", function () {
    // console.log('ppp');
    if (!isInit) {
      initTop();
      isInit = true;
    }
    // var sTop=oWrapper_inner.scrollTop(); //滚动条滚动的高度
    // var cHeight=oWrapper_inner.height(); //可视区域高度
    // var sHeight=oWrapper_inner.get(0).scrollHeight;  //页面内容高度
    var This = $(this);
    for (var i = 0; i < aFixed_scroll.length; i++) {
      var oTop = aFixed_scroll.eq(i).attr("top");
      if (This.scrollTop() >= oTop) {
        aFixed_scroll.eq(i).addClass("fixed_top");
      } else {
        aFixed_scroll.eq(i).removeClass("fixed_top");
      }
    }
  });
})($ || Zepto);

//切分数组
(function () {
  window.sliceArray = function (array, size) {
    var result = [];
    if (array.length % size == 0) {
      // console.log("求余取整");
      for (var x = 0; x < Math.ceil(array.length / size); x++) {
        var start = x * size;
        var end = start + size;
        result.push(array.slice(start, end));
      }
      return result;
    } else {
      if (array.length < size) {
        // console.log("不足size条");
        result.push(array);
        return result;
      } else {
        // console.log("多于size条,求余不取整");
        for (var x = 0; x < Math.ceil(array.length / size); x++) {
          var start = x * size;
          var end = start + size;
          result.push(array.slice(start, end));
        }
        // result.push(array.slice(end*5,array.length));
        return result;
      }
    }
  };
})();
