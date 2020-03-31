import Auth from "../auth";
const state = {
  userInfo: Auth.userinfo(),
  is_login: Auth.is_login(),
  token: Auth.token(),
  wxConfigUrl:null,
  channel:Auth.channel(),
  sinaAppQueryString: Auth.sinaAppQueryString(),
  appScheme : "iaskpatient",
  isSinaHealOpenDownload: window.SINA_HEAL_APP_CONF.isOpenDownload ? window.SINA_HEAL_APP_CONF.isOpenDownload : false,
  location: null,
  city: "",
  layoutWrapperHeight:0
};

export default state;
