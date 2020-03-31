import * as types from "./mutation-types";
import userService from "@/services/userService.js";
import store from "../store";
import platformInfo from "@/common/platformInfo.js";
export const update_userinfo = function ({
  commit
}) {
  return userService.myinfo({}).then(res => {
    if (res.code == 0 && res.data) {
      let userinfo = res.data;
      commit(types.SET_USERINFO, userinfo);
      return true;
    } else {
      return false;
    }
  });
};
export const check_login = function ({
  commit
}) {
  var loginType = "0"; //0-网页;1-微博;2-微信
  if (platformInfo.isWx) {
    loginType = 2;
  } else if (platformInfo.isWeibo) {
    loginType = 1;
  } else {
    loginType = 0;
  }
  var loginUrl = `https://health.sina.cn/userAuth/auth/login?isAutoLogin=1&autoLoginType=${loginType}`;
  $.ajax({
    url: loginUrl,
    type: "get",
    async: false,
    dataType: "jsonp",
    jsonp: "jsonpCallback",
    //jsonpCallback:"weiboAutoLoginBack",
    success: function (data) {
      if (data && data != "null") {
        commit(types.SET_TOKEN, data);
        commit(types.USER_LOGIN, true);
        store.dispatch("update_userinfo");
      }
    },
    error: function () {}
  });
};

export const refresh_message_num = function ({
  commit
}) {
  userService.messagesData().then((res) => {
    if (res.code == 0) {
      commit(types.SET_MESSAGE_NUM, res.data);
    }
  });
};

export const update_city = function ({
  commit
}) {
  if (!window.BMap) return new Promise((resolve, reject) => {
    resolve();
  });
  return new Promise((resolve, reject) => {
    var geolocation = new BMap.Geolocation();
    // var isAccess=true;//是否允许定位
    geolocation.getCurrentPosition(function (r) {
      // if(!r.accuracy){
      //   isAccess=false;
      // }
      // if(!isAccess){
      //   var address = {
      //     province:"全国",
      //     name:"全国"
      //   };
      //   commit(types.SET_LOCATION, address);
      //   resolve({
      //     success:true,
      //     status:this.getStatus(),
      //     geolocation:this,
      //     address: address
      //   });
      //   return;
      // }
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        // var pt = r.point;
        var address = {
          ...r.address,
          ...r.point
        };
        console.log(address);
        commit(types.SET_LOCATION, address);
        resolve({
          success: true,
          status: this.getStatus(),
          geolocation: this,
          address: address
        });
      } else {
        resolve({
          success: false,
          status: this.getStatus(),
          geolocation: this
        });
      }

    });
  });
};

export const getCurrentCity = function ({
  commit
}) {
  // 根据当前ip获取当前城市
  if (!window.BMap) return new Promise((resolve, reject) => {
    resolve();
  });
  return new Promise((resolve, reject) => {
    var geolocation = new BMap.LocalCity();
    geolocation.get(function (res) {
      if (res && res.name) {
        commit(types.SET_CITY, res.name);
        resolve({
          success: true,
          geolocation: this,
          address: res.name
        });
      } else {
        resolve({
          success: false,
          geolocation: this
        });
      }
    });
  });
};
