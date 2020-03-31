;
(function (win, document) {
  var iwen = function () {
    this.os = this.getPlatformInfo();
    this.UA = win.navigator.userAgent;
    this.sinaHealthAPPQueryString = this.getSinaHealthAPPQueryString();
    this.isInSinaHealthApp = this.sinaHealthAPPQueryString && this.sinaHealthAPPQueryString.isApp && this.sinaHealthAPPQueryString.isApp == 2;
  };

  iwen.prototype.getPlatformInfo = function () {
    var os = {
      isiOS: false,
      isAndroid: false,
    };
    if (win) {
      var UA = win.navigator.userAgent;
      os.isiOS = (function () {
        return UA.toLowerCase().indexOf("iphone") > 0 ? true : false;
      })();
      os.isAndroid = (function () {
        return UA.toLowerCase().indexOf("android") > 0 ? true : false;
      })();
      os.isWx = (function () {
        return UA.toLowerCase().match(/MicroMessenger/i) == "micromessenger" ? true : false;
      })();
      os.isWeibo = (function () {
        return UA.toLowerCase().match(/WeiBo/i) == "weibo" ? true : false;
      })();
    }
    return os;
  };

  iwen.prototype.getSinaHealthAPPQueryString = function () {
    var queryStringObj = null;
    var UA = win.navigator.userAgent;
    if (UA.indexOf(";app/") >= 0) {
      var queryString = UA.split(";app/")[1];
      try {
        queryStringObj = JSON.parse(queryString);
      } catch (error) {
        console.error("转换json失败");
        console.error("queryString", queryString);
        console.error(error);
      }
    }
    return queryStringObj;
  };

  iwen.prototype.callNative = function (action, params) {
    if (!action || !params) {
      console.error("action,params不允许为空~");
    };
    var os = this.os;
    var paramsString = JSON.stringify(params);
    if (os.isiOS) {
      try {
        window.webkit.messageHandlers[action].postMessage(paramsString);
      } catch (error) {
        console.error("调用ios失败");
        console.error("action == ", action);
        console.error("paramsString == ", paramsString);
        console.error(error);
      }
    } else if (os.isAndroid) {
      try {
        window.jsCallSinaHealth[action](paramsString);
      } catch (error) {
        console.log("调用安卓失败");
        console.error("action == ", action);
        console.error("paramsString == ", paramsString);
        console.error(error);
      }
    }
  };


  iwen.prototype.appLogin = function (params) {
    if (!params) {
      params = {};
    };
    this.callNative("appLogin", params);
  };


  iwen.prototype.appShare = function (params) {
    if (!params) {
      params = {
        title: "新浪健康",
        url: "https://www.991kang.com",
        img: "",
        content: "新浪健康",
      };
    };
    this.callNative("appShare", params);
  };


  iwen.prototype.hiddenShare = function (params) {
    if (!params) {
      params = {
        hidden: true,
        share: {
          title: "新浪健康",
          url: "https://www.991kang.com",
          img: "",
          content: "新浪健康",
        }
      };
    };
    this.callNative("hiddenShare", params);
  };
  /*
   *通知App在手机浏览器打开某个网页链接
   *参数为url即可(url需要进行编码)
   */
  iwen.prototype.goSystemBrowser = function (params) {
    if (!params) {
      params = {
        url: encodeURIComponent("https://www.991kang.com")
      };
    };
    this.callNative("goSystemBrowser", params);
  };

  /*
   *回到app首页
   *参数不传即可
   */
  iwen.prototype.goHome = function (params) {
    if (!params) {
      params = "";
    };
    this.callNative("goHome", params);
  };

  /**
   * 打开App内内嵌H5页面 参数示例
   * paramsString = "type=web&path=path"
   * path 需要编码 encodeURIComponent("/zt/depart/12345")
   *
   * 打开App内原生页面 参数示例
   * paramsString = "type=app&path=path"
   * path 需要编码 encodeURIComponent("/zt/depart/12345")
   * **/
  iwen.prototype.openSinaHealApp = function (paramsString, isToDownload) {
    if (!paramsString) {
      paramsString = "";
    };
    if (isToDownload == undefined) {
      isToDownload = true;
    };
    paramsString = paramsString == "" || paramsString == undefined || paramsString == null ? "" : paramsString;
    var openUrl = "sinahealth://?" + paramsString;
    var downloadUrl = "https://www.991kang.com/zt/app/down";
    try {
      window.location.href = openUrl;
      console.log("打开app参数");
      console.log(paramsString);
      console.log(openUrl);
      if (isToDownload) {
        setTimeout(function () {
          window.location.href = downloadUrl + "?referer=" + encodeURIComponent(paramsString);
        }, 500);
      }
    } catch (error) {
      console.log("打开app参数", paramsString);
      window.location.href = openUrl;
    }
  };
  win.IWEN = new iwen();
})(window, document);
