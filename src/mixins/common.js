import loading from "@/iwen/loading/loading";
import layout from "@/components/layout/layout";
import loading_page from "@/components/loading_page/loading_page";
import user_avater from "@/assets/images/default/bg_head_user@2x.png";
import m_default from "@/assets/images/default/m_default@3x.png";
import doc_default from "@/assets/images/default/bg_head_doctor@2x.png";
import hos_default from "@/assets/images/default/bg_head_hos@2x.png";
import hosCover_default from "@/assets/images/default/bg_hospital@2x.png";
import banner_default from "@/assets/images/default/banner.jpg";
import slide_default from "@/assets/images/default/def_action@2x.png";
import media_default from "@/assets/images/default/bg_video@2x.png";
import square_default from "@/assets/images/default/def_square@2x.png";
import comty_default from "@/assets/images/default/bg_head_bbs@2x.png";
import {
  mapState,
  mapGetters
} from "vuex";
import {
  APP_URL,
  PIC_URL,
  SUB_FIX,
  OUTER_LINKS,
  COURSE_DETIALS_URL,
  SERAL_COURSE_DETIALS_URL,
  IWEN_COMTY_ID
} from "@/config";
import platformLogin from "@/common/platformFn";
import setTitle from "@/common/setTitle";
import store from "../store";
import { userBehaviorDataRecord } from "@/services/sysService.js";

const commonMixin = {
  data() {
    return {
      initing_page: false,
      APP_URL,
      OUTER_LINKS,
      COURSE_DETIALS_URL,
      SERAL_COURSE_DETIALS_URL,
      IWEN_COMTY_ID
    };
  },
  components: {
    loading,
    layout,
    loadingPage: loading_page
  },
  mounted(){},
  methods: {
    //解决ios微博环境下输入框弹起空白问题
    inputFocus(){
      if(platformInfo.isiOS && platformInfo.isWeibo){
        setTimeout(function(){ 
          document.body.scrollTop = document.body.scrollHeight; 
        },300); 
      }
    },
    //解决ios输入框下拉空白问题
    inputBlur(){
      // if(platformInfo.isWx){
      //   $(".app_wrapper_inner").height = 104 + "vh";
      // }
      setTimeout(function(){
        window.scrollTo(0, 0);
      },100);
    },

    GET_IMG_URL(picID, type) {
      let url = picID;
      if (picID == "" || picID == null || picID == undefined) {
        if (type == "m") {
          url = m_default;
        } else if (type == "u") {
          url = user_avater;
        } else if (type == "b") {
          url = banner_default;
        } else if (type == "doc") {
          url = doc_default;
        } else if (type == "hos") {
          url = hos_default;
        } else if (type == "hos_cover") {
          url = hosCover_default;
        } else if (type == "slide") {
          url = slide_default;
        } else if (type == "s") {
          url = square_default;
        } else if (type == "comty") {
          url = comty_default;
        }
      } else {
        if (/http/.test(picID)) {
          //网络图片
          picID = picID.split("/");
          if (picID[4] == "") {
            url = media_default;
          };
        } else {
          //图片服务器图片
          if (/PSP/.test(picID)){
            url = PIC_URL + picID+"_120" + SUB_FIX;
          }else{
            url = PIC_URL + picID + SUB_FIX;
          }

        }
      }
      return url;
    },
    GET_ARTICLE_URL(aID, aType, authorId) {
      let url = `https://health.sina.cn/awyh/art/${aID}.html?contentType=${aType}`;
      if (authorId) {
        url += "&drUserId=" + authorId;
      }
      if (store.state.channel) {
        url += "&channel=" + store.state.channel;
      }
      return url;
    },
    GET_SPECIAL_URL(speID) {
      let url = `https://health.sina.cn/awyh/subject/detail/${speID}.html`;
      if (store.state.channel) {
        url += "?channel=" + store.state.channel;
      }
      return url;
    },
    GET_CONSULT_URL(docId, actType, actId) {
      let url = `https://health.sina.cn/consult/index?drId=${docId}&bizType=${actType}&activityId=${actId}`;
      if (store.state.channel) {
        url += "&channel=" + store.state.channel;
      }
      return url;
    },
    goLogin(refer){
      if (this.VX_isInSinaHealthApp) {
        iwenJSNativeBridge.appLogin();
      } else {
        platformLogin(refer);
      }
    },
    router_back() {
      // if (window.history.length <= 1) {
      //   this.$router.push({
      //     name: "homeIndex"
      //   });
      // } else {
      //   this.$router.back(-1);
      // }
      this.$router.back(-1);
    },
    SET_PAGE_TITLE(title) {
      setTitle(title);
    },
    USER_BEHAVIOR_DATA_RECORD(params) {
      userBehaviorDataRecord(params);
    },
    //时间戳转换为时间 yy-mm-dd ss
    dataFormat(val) {
      if (val == "" || val == 0 || val == null || val == undefined)
        return "";
      let timeMinSeconds = parseInt(val) * 1000;

      function fix(num) {
        return num >= 10 ?
          num :
          "0" + num;
      }

      var date = new Date(timeMinSeconds);
      var year = date.getFullYear();
      var month = fix(date.getMonth() + 1);
      var day = fix(date.getDate());
      var hour = fix(date.getHours());
      var minute = fix(date.getMinutes());
      return year + "-" + month + "-" + day + " " + hour + ":" + minute;
    },
    hourFormat(val) {
      if (val == "" || val == 0 || val == null || val == undefined)
        return "";
      let timeMinSeconds = parseInt(val) * 1000;

      function fix(num) {
        return num >= 10 ?
          num :
          "0" + num;
      }

      var date = new Date(timeMinSeconds);
      var hour = fix(date.getHours() == 0 ? 24 : date.getHours());
      var minute = fix(date.getMinutes());
      return hour + ":" + minute;
    },
    IS_IWEN_COMTY(id){
      let is = false;
      if (IWEN_COMTY_ID.indexOf(id) >= 0) {
        is = true;
      }
      return is;
    }
  },
  filters: {
    //限制文字显示字数
    limit: function (val, param) {
      let result = val;
      if (result && result.length > param) {
        result = result.substring(0, param) + "...";
      }
      return result;
    },
    //移除文本中的html
    removeHtmlTag(val) {
      // let result=utils.replaceHtmlTag(val);
      // return result;
      return val.replace(/<[^>]+>/g, "");
    },
    //时间戳转换为时间
    dataFormat(val) {
      if (val == "" || val == 0) return "";
      let timeMinSeconds = parseInt(val);

      function fix(num) {
        return num >= 10 ? num : "0" + num;
      }
      var date = new Date(timeMinSeconds);
      var year = date.getFullYear();
      var month = fix(date.getMonth() + 1);
      var day = fix(date.getDate());
      var hour = fix(date.getHours());
      var minute = fix(date.getMinutes());
      // console.log(year + "-" + month + "-" + day + " " + hour + ":" + minute);
      return year + "-" + month + "-" + day + " " + hour + ":" + minute;
    },
    dateFormat(val) {
      if (val == "" || val == 0 || val == null || val == undefined)
        return "";
      let timeMinSeconds = parseInt(val) * 1000;

      function fix(num) {
        return num >= 10 ?
          num :
          "0" + num;
      }

      var date = new Date(timeMinSeconds);
      var year = date.getFullYear();
      var month = fix(date.getMonth() + 1);
      var day = fix(date.getDate());
      var hour = fix(date.getHours());
      var minute = fix(date.getMinutes());
      return year + "-" + month + "-" + day + " " + hour + ":" + minute;
    },
    hourFormat(val) {
      if (val == "" || val == 0 || val == null || val == undefined)
        return "";
      let timeMinSeconds = parseInt(val) * 1000;

      function fix(num) {
        return num >= 10 ?
          num :
          "0" + num;
      }

      var date = new Date(timeMinSeconds);
      var hour = fix(date.getHours());
      var minute = fix(date.getMinutes());
      return hour + ":" + minute;
    },
    dateFormatDot(val) {
      if (val == "" || val == 0 || val == null || val == undefined)
        return "";
      let timeMinSeconds = parseInt(val) * 1000;

      function fix(num) {
        return num >= 10 ?
          num :
          "0" + num;
      }

      var date = new Date(timeMinSeconds);
      var year = date.getFullYear();
      var month = fix(date.getMonth() + 1);
      var day = fix(date.getDate());
      var hour = fix(date.getHours());
      var minute = fix(date.getMinutes());
      return year + "." + month + "." + day + " " + hour + ":" + minute;
    },
    //名字匿名 隐藏除第一个字之后的
    hideName(val) {
      return val.substring(0, 1) + "**";
    }
  },
  computed: {
    ...mapState({
      VX_userInfo:"userInfo",
      VX_isSinaHealOpenDownload: "isSinaHealOpenDownload",
      VX_helperIDs:"helperIDs",
    }),
    ...mapGetters({
      VX_isBindAccount:"isBindAccount",
      VX_islogin:"islogin",
      VX_isNickEdited:"isNickEdited",
      VX_isBindMobile:"isBindMobile",
      VX_isSinaHealthAppForceIng: "isSinaHealthAppForceIng",
      VX_isInSinaHealthApp: "isInSinaHealthApp",
      VX_isInIwenApp: "isInIwenApp",
      VX_isInHapHealApp: "isInHapHealApp",
    })
  },
  directives: {
    disall: {
      inserted: function (el, binding) {
        // let element = $(el);
        // let lineNum = binding.value;
        // let topicText = element.text();
        // let lineHeight = parseInt(element.css("line-height"));
        // console.log(222);
        // console.log(element);
        // console.log(lineHeight);
        // console.log(lineHeight * lineNum + 'px');
        // if (element.height() > lineHeight * lineNum) {
        //   element.height(lineHeight * lineNum + 'px')
        // }
      },
      updated: function updated(el, binding) {
        let element = $(el);
        let lineNum = binding.value;
        let topicText = element.text();
        element.css("-webkit-line-clamp", "initial");
        if (topicText.length > 0) {
          let lineHeight = parseInt(element.css("line-height"));
          if (element.height() > lineHeight * lineNum) {
            element.height(lineHeight * lineNum + "px");
            element.css("-webkit-line-clamp", lineNum + "");
            var arrowBtn = element.next(".icon-arrow_up");

            if (arrowBtn.size() > 0) {

              arrowBtn.css("display", "block");
              if (arrowBtn.hasClass("inited"))
                return;
              arrowBtn.addClass("inited");
              arrowBtn.click(function () {
                if ($(this).hasClass("down")) {
                  $(this).removeClass("down");
                  element.css("-webkit-line-clamp", lineNum + "");
                  element.height(lineHeight * lineNum + "px");
                } else {
                  $(this).addClass("down");
                  element.css("-webkit-line-clamp", "initial");
                  element.css("height", "auto");
                }
              });
            }
          }
        }
      },
      componentUpdated: function updated(el, binding) {
        let element = $(el);
        let lineNum = binding.value;
        let topicText = element.text();
        element.css("-webkit-line-clamp", "initial");
        if (topicText.length > 0) {
          let lineHeight = parseInt(element.css("line-height"));
          if (element.height() > lineHeight * lineNum) {
            element.height(lineHeight * lineNum + "px");
            element.css("-webkit-line-clamp", lineNum + "");
            var arrowBtn = element.next(".icon-arrow_up");
            if (arrowBtn.size() > 0) {
              arrowBtn.css("display", "block");
              if (arrowBtn.hasClass("inited")) return;
              arrowBtn.addClass("inited");
              arrowBtn.click(function () {
                if ($(this).hasClass("down")) {
                  $(this).removeClass("down");
                  element.css("-webkit-line-clamp", lineNum + "");
                  element.height(lineHeight * lineNum + "px");
                } else {
                  $(this).addClass("down");
                  element.css("-webkit-line-clamp", "initial");
                  element.css("height", "auto");
                }
              });
            }
          }
        }
      }
    }
  }
};

export default commonMixin;
