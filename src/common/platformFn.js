import {
  LOGIN_URL
} from "@/config";
import platformInfo from "@/common/platformInfo.js";

function goLogin(refer) {
  // if(!refer) {
  //   return;
  // }
  refer = encodeURIComponent(refer);
  var loginUrl = "";
  refer = refer ? refer : "";
  localStorage.setItem("nn-refer", LOGIN_URL + "/sys/login?refer=" + refer);
  if (platformInfo.isWx) {
    loginUrl = LOGIN_URL + "/sys/weixin/login?refer=" + refer;
  } else if (platformInfo.isWeibo) {
    loginUrl = LOGIN_URL + "/sys/login?refer=" + refer;
  } else {
    loginUrl = LOGIN_URL + "/sys/phone/login?refer=" + refer;
  }
  window.location.href = loginUrl;
}
export default goLogin;
