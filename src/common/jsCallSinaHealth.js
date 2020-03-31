// const sinaAppKeys = ["2", "20190123"];
// const iaskAppKeys = ["20140123"];

/**
 * js调用原生App
*/
export default {
  getAppQueryFromUA(){
    var queryString = UA.split(";app/")[1];
    var queryStringObj = JSON.parse(queryString);
    return queryStringObj;
  },
  getAppScheme(){
    let scheme = "iaskpatient";
    // if(){
    //   scheme = "sinahealth";
    // }
    return scheme;
  },
  getPlatformInfo(){
    let os = {
      isIos:false,
      isAndroid: false,
    };
    if(window){
      let UA = navigator.userAgent;
      os.isiOS = (function () {
        return UA.toLowerCase().indexOf("iphone") > 0 ? true : false;
      })();
      os.isAndroid = (function () {
        return UA.toLowerCase().indexOf("android") > 0 ? true : false;
      })();
    }
    return os;
  },
  callNative(action, params) {
    let os = this.getPlatformInfo();
    let paramsString = JSON.stringify(params);
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
  },
  /**
   * 打开App内内嵌H5页面 参数示例
   * paramsString = "type=web&path=path"
   * path 需要编码 encodeURIComponent("/zt/depart/12345")
   *
   * 打开App内原生页面 参数示例
   * paramsString = "type=app&path=path"
   * **/
  openSinaHealApp(paramsString = "",isToDownload = true) {
    paramsString = paramsString == "" || paramsString == undefined || paramsString == null ? "" : paramsString;
    let openUrl = "sinahealth://?" + paramsString;
    // let downloadUrl = "http://localhost:3033/zt/app/down";
    let downloadUrl = "https://health.sina.cn/zt/app/down";
    try {
      window.location.href = openUrl;
      console.log("打开app参数");
      console.log(paramsString);
      console.log(openUrl);
      if (isToDownload){
        setTimeout(() => {
          window.location.href = downloadUrl + "?referer=" + encodeURIComponent(paramsString);
        }, 500);
      }
    } catch (error) {
      console.log("打开app参数", paramsString);
      window.location.href = openUrl;
    }
  },
  /*
   *通知App在手机浏览器打开某个网页链接
   *参数为url即可(url需要进行编码)
   */
  goSystemBrowser(params) {
    if (!params) {
      params = {
        url: encodeURIComponent("https://health.sina.cn")
      };
    }
    this.callNative("goSystemBrowser", params);
  },
  /*
   *回到app首页
   *参数不传即可
   */
  goHome(params) {
    if (!params) {
      params = "";
    };
    this.callNative("goHome", params);
  },
  //调起原生App登录
  appLogin(params = {}) {
    this.callNative("appLogin", params);
  },
  //调起分享
  appShare(params = {}) {
    this.callNative("appShare", params);
  },
  //隐藏App的分享按钮
  hiddenShare(params = {
    hidden: true
  }) {
    console.log("调起隐藏分享按钮");
    console.log("params");
    console.log(params);
    this.callNative("hiddenShare", params);
  }
};
