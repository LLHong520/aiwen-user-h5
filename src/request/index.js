import router from "@/router";
import axios from "axios";
require("promise.prototype.finally").shim();
var qs = require("qs");
import Auth from "@/auth";
import { API_URL } from "@/config";
import store from "../store";
import platformLogin from "@/common/platformFn";
axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.headers.channel = Auth.channel()==null? "":Auth.channel();
// axios.defaults.headers.token = Auth.token()==null? "":Auth.token();
axios.defaults.timeout = 50000;

axios.interceptors.request.use(config => {
  config.headers.common["token"] = Auth.token();
  return config;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  // if (response.data.code == 401 || response.data.code == 5001) {
  if (response.data.code == 401 || response.data.code == 5001 || response.data.status == 401) {
    store.commit("SET_USERINFO", null);
    store.commit("SET_TOKEN",null);
    store.commit("USER_LOGIN",false);
    //如果是在新浪健康App内 则调用App登录
    if (store.getters.isInSinaHealthApp){
      iwenJSNativeBridge.appLogin();
    }else{
      platformLogin(router.app.$route.fullPath);
    }
    return ;
  }else{

    //显示提示信息
    if (response.data.msg&&response.data.msg.toLowerCase()!="success"){
      if (response.data.code != -2 && response.data.msg != "token已过期，请重新登录") {
        toast.tip(response.data.msg);
      }
    }

    //===================针对不是401的code 这里进行处理
    switch(parseInt(response.data.code)){
      case 5003://对象不存在
      case 5004://参数错误
      case 5901://帖子已删除
      case 5900://帖子不存在
      case 5007://目标用户（被查看的用户）被锁定
        setTimeout(function(){
          router.replace("/404");
        },1000);
        return;
        break;
      case 5002://当前登录用户无权限访问
      case 5006://当前登录用户被锁定
        store.commit("SET_USERINFO", null);
        store.commit("SET_TOKEN",null);
        store.commit("USER_LOGIN",false);
        setTimeout(function(){
          router.replace("/home");
        },1000);
        return;
        break;
    }

  }
  return response;
}, function (error) {
  if(error.config.url.indexOf("/awyh/personal/qryInfo") === -1) {
    toast.tip("网络走丢了~");
  }
  return Promise.reject(error);
});

export default {
  get:function(url,data={}){
    url=API_URL+url;
    if(Auth.token()){
      data.token = Auth.token();
    }
    return axios.get(url, { params: data})
      .then((res) => {
        return Promise.resolve(res.data);
      });
  },
  post:function(url,data={}){
    url=API_URL+url;
    if(Auth.token()){
      data.token = Auth.token();
    }
    return axios.post(url, qs.stringify(data))
      .then((res) => {
        return Promise.resolve(res.data);
      });
  },
  postJSON:function(url,data={}){
    url=API_URL+url;
    if(Auth.token() && typeof data === "object"){
      data.token = Auth.token();
    }
    return axios.post(url, data, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        return Promise.resolve(res.data);
      });
  },
  postFile:function(url,data){
    url=API_URL+url;
    let config = {
      headers: { "Content-Type": "multipart/form-data" }
    };
    if(Auth.token()){
      data.append("token", Auth.token());
    }
    return axios.post(url, data, config)
      .then((res) => {
        return Promise.resolve(res.data);
      });
  }
};
