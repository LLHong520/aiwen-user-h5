import storage from "good-storage";
import Cookies from "js-cookie";
import platformInfo from "@/common/platformInfo.js";
const storage_pre_fix ="aiwen_user_";
export default {
  userinfo(){
    let userinfo = storage.session.get(storage_pre_fix + "userinfo");
    if (userinfo==undefined){
      userinfo=null;
    }
    return userinfo;
  },
  channel(){
    let channel = storage.session.get(storage_pre_fix + "channel");
    if (channel==undefined){
      channel=null;
    }
    return channel;
  },
  sinaAppQueryString() {
    let sinaAppQueryString = storage.session.get(storage_pre_fix + "sinaAppQueryString");
    if (sinaAppQueryString == undefined) {
      sinaAppQueryString = null;
    }
    return sinaAppQueryString;
  },
  is_login(){
    var isLogin = false;
    if(!platformInfo.isWeibo){
      if (this.token() != undefined) {
        isLogin = true;
      }
    }else {
      if (storage.session.get(storage_pre_fix +"userinfo") != undefined) {
        isLogin = true;
      }
    }

    return isLogin;
  },
  token(){
    if (!platformInfo.isWeibo) {
      return storage.get(storage_pre_fix + "token");
    } else {
      return storage.session.get(storage_pre_fix + "token");
    }
    // return "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NzMxMTQ2NjY4OTQsInBheWxvYWQiOiJcIjEzMTEzNjc2MTg3XCIifQ.R1yhA6GEYlBSCeLArfh-hSVA33WwRE9L9O9TnJdqSXs";
  },
  checkToken(){},
  save_userinfo(val){
    storage.session.set(storage_pre_fix +"userinfo",val);
  },
  save_sinaAppQueryString(val) {
    storage.session.set(storage_pre_fix + "sinaAppQueryString", val);
    Cookies.set(storage_pre_fix + "sinaAppQueryString", val);
  },
  get_sinaAppQueryString() {
    let sinaAppQueryString = Cookies.get(storage_pre_fix + "sinaAppQueryString");
    console.log(sinaAppQueryString);
    if (sinaAppQueryString == "" || sinaAppQueryString == undefined) {
      sinaAppQueryString = {};
    }else{
      sinaAppQueryString = JSON.parse(sinaAppQueryString);
    }
    return sinaAppQueryString;
  },
  save_channel(val){
    storage.session.set(storage_pre_fix +"channel",val);
  },
  save_token(val){
    if(!platformInfo.isWeibo){
      storage.set(storage_pre_fix +"token", val);
    }else{
      storage.session.set(storage_pre_fix +"token", val);
    }
  },
  save_iw_dataclollect_uid(val) {
    localStorage.setItem("IW_DATA_COLLECT_UID", val);
  }
};
