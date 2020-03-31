<template>
  <transition enter-active-class='animated fadeIn' leave-active-class='animated fadeOut' mode='out-in'>
  </transition>
</template>
<script>
  import userService from "@/services/userService.js";
  import platformLogin from "@/common/platformFn";
  import Auth from "@/auth";
  export default {
    name: "callback",
    components: {},
    data() {
      return {
        is_perview: false,
        toogle_memu: false,
        title: "",
        content: "",
        posting: false
      };
    },
    created() {
      localStorage.setItem("callback", JSON.stringify(this.$route.query));
      if (this.$route.query.code) {
        this.getTokenByCode();
      } else if (this.$route.query.appToken) {
        console.log(this.$route.query);
        this.sinaHealappAutoLogin();
      } else {
        this.$router.replace("/home");
      }
    },
    methods: {
      getSinaHealthAPPQueryString() {
        let is = false;
        var queryStringObj = this.$route.query;
        var cookieSinaAppQueryString = Auth.get_sinaAppQueryString();
        var queryObject = null;
        //优先从导航栏取
        if (queryStringObj.isApp && queryStringObj.isApp == 2) {
          is = true;
          queryObject = queryStringObj;
        } else {
          //导航栏没有则从cookie取得
          if (cookieSinaAppQueryString.isApp && cookieSinaAppQueryString.isApp == 2) {
            is = true;
            queryObject = cookieSinaAppQueryString;
          }
        }

        return {
          is,
          queryObject
        };
      },
      checkAPPQueryString() {
        //新浪健康App中进入的话 直接拿到链接中的token登录
        let APPQueryString = this.getSinaHealthAPPQueryString();
        if (APPQueryString.is) {
          console.log("新浪健康App中进入");
          store.commit("SET_APP_QUERY_STRING", APPQueryString.queryObject);
          let appToken = APPQueryString.queryObject.appToken;
          if (appToken && appToken != "") {
            let newTo = {
              path: "/callback",
              params: to.params,
              query: to.query,
              replace: true
            };
            newTo.query.refer = to.path;

            console.log(newTo);
            console.log(to);


          } else {
            store.commit("SET_TOKEN", null);
          }
        }
      },
      /*
       *新浪健康APP自动登录
       */
      sinaHealappAutoLogin() {
        let APPQueryString = this.$route.query;
        let appToken = APPQueryString.appToken;
        let This = this;

        if (appToken && appToken != "") {
          this.$store.commit("SET_TOKEN", appToken);
          setTimeout(function () {
            This.login();
          }, 100);
        } else {
          this.$store.commit("SET_TOKEN", null);
        }

      },
      getTokenByCode() {
        let This = this;
        userService.get_token({
          code: this.$route.query.code
        }).then(res => {
          if (res.code == 0 && res.data) {
            This.$store.commit("SET_TOKEN", res.data);
            // This.$store.commit("SET_TOKEN", res.data+"--");
            setTimeout(function () {
              This.login();
            }, 100);
          } else {
            // This.$toast.tip("【" +res.msg + "】");
            let refer = This.$route.query.refer;
            refer = decodeURIComponent(refer);
            platformLogin(refer);
          }
        });
      },
      login() {
        let This = this;
        userService.myinfo({}).then(res => {
          if (res.code == 0) {
            let userinfo = res.data;
            This.$store.commit("SET_USERINFO", userinfo);
            This.$store.commit("USER_LOGIN", true);
            This.goToRefer();
          } else {
            This.$toast.tip(res.msg);
          }
        });
      },
      goToRefer() {
        if (this.$route.query.refer) {
          let refer = this.$route.query.refer;
          refer = decodeURIComponent(refer);
          refer = refer.replace(/&amp;/g, "&");
          if (refer.indexOf("http") >= 0) {
            window.location.href = refer;
          } else {
            this.$router.replace(refer);
          }
        } else {
          this.$router.replace("/home");
        }
      }
    }
  };

</script>
<style scoped lang="less" rel="stylesheet/less">
  @import './css.less';

</style>
