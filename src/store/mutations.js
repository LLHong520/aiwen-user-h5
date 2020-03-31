import * as types from "./mutation-types";
import Auth from "@/auth";
const mutations = {
  [types.USER_LOGIN](state,status) {
    state.is_login = status;
  },
  [types.SET_USERINFO](state,userinfo) {
    state.userInfo = userinfo,
    Auth.save_userinfo(userinfo);
    if (userinfo && userinfo.id) {
      console.log("save");
      Auth.save_iw_dataclollect_uid(userinfo.id || "");
    }
  },
  [types.SET_TOKEN](state, token) {
    state.token = token,
    Auth.save_token(token);
  },
  [types.SET_APP_QUERY_STRING](state, sinaAppQueryString) {
    state.sinaAppQueryString = sinaAppQueryString,
    Auth.save_sinaAppQueryString(sinaAppQueryString);
  },
  [types.SET_WXCONGIG_URL](state, wxConfigUrl) {
    state.wxConfigUrl = wxConfigUrl;
  },
  [types.SET_QUERY_CHANNEL](state, channel) {
    state.channel = channel;
    Auth.save_channel(channel);
  },
  [types.SET_MESSAGE_NUM](state, num) {
    state.messageNum = num;
  },
  [types.SET_LOCATION](state, locationInfo) {
    state.location = locationInfo;
  },
  [types.SET_CITY](state, city) {
    state.city = city;
  },
  [types.SET_LAYOUT_HEIGHT](state, layoutWrapperHeight) {
    state.layoutWrapperHeight = layoutWrapperHeight;
  },
};

export default mutations;
