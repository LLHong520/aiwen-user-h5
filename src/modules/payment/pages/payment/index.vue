<template>
  <div>
    <!--  -->
    <m-header slot="page_header" title='支付方式'>
      <span class="retrun" slot='left' @click="router_back"> <!-- @click="backToLastPage('back')" -->
        <b class="gray"></b>
      </span>
      <span class="placeholder" slot='right'>
        <span class="mr10">&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </span>
    </m-header>
    <!--  -->
    <!-- page_container -->
    <div slot="page_container" class="app_wrapper_inner">
      <div class="time-tip-wrapper" v-if="orderInfo.orderStatus=='10001'||orderInfo.orderStatus=='50001'">
        <span v-if="orderInfo.orderStatus=='10001'">请在 <span id="timer"></span> 内完成支付，超时将自动取消订单</span>
        <router-link v-if="orderInfo.orderStatus=='50001'" tag="span" :to="{ name: 'consultInfo',params:{'dId':doctorId}}">订单超时已自动取消，请点击重新下单</router-link>
      </div>

      <section class="wrapper payment">
        <div class="order-info">
          <span class="user"><span class="user_label">电话咨询</span> <span class="user_name">{{orderInfo.doctorName}}</span></span>
          <span class="price">{{orderInfo.servicePrice}}元</span>
        </div>
        <h1 class="pay-title">请选择支付方式</h1>
        <ul class="payment-types">
          <template v-for="(payment,index) in paymentList">
            <li :class="{'active':payment.choose}" v-if="payment.isSupport" :key="index" @click="callPay(payment.en)">
              <a :class="{'choose':payment.choose}" href="javascript:;">
                <img v-if="payment.en == 'wbpay'" height="18" src="./images/weibo.png" />
                <img v-if="payment.en == 'wechatpay'" height="18" src="./images/weixin.png" />
                <img v-if="payment.en == 'alipay'" height="20" src="./images/alipay.png" />
                <span class="name">{{payment.name}}</span>
              </a>
            </li>
          </template>
        </ul>
        <!-- 去支付按钮 -->
        <div class="btn_fixed">
          <a href="javascript:;"><span class="pay_label">实际支付:</span> <span class="pay_pirce">{{orderInfo.servicePrice}}元</span></a>
          <a href="javascript:;" class="btn_blue" :class="{'disabled':orderInfo.orderStatus != 10001}" @click="doPay">立即支付</a>
        </div>
        <!-- 去支付按钮 -->
      </section>
    </div>
    <!-- /page_container -->

    <!-- page_footer -->
    <div slot="page_footer">
      <!-- 支付中提示 -->
      <div v-show="loadingPayPage" class="loading_page">
        <div class="loading">
          <img width="24" height="24" src="./images/loading.gif">
          <p class="desc">初始化支付中...</p>
        </div>
      </div>
      <!-- 支付中提示 -->
      <!-- 支付中提示 -->
      <div v-show="payOrdering" class="loading_page">
        <div class="loading">
          <img width="24" height="24" src="./images/loading.gif">
          <p class="desc">支付中...</p>
        </div>
      </div>
      <!-- 支付中提示 -->
      <!-- 未完成订单提示 -->
      <div slot="page_layer">
        <div class="shadow" v-if="showPayFailTip"></div>
        <div class="layer_confirm" v-if="showPayFailTip">
          <div class="layer_cont">支付失败，请稍后重试</div>
          <div class="layer_btn">
            <a href="javascript:;" class="btn_ok" @click="backToLastPage('delay')">好的</a>
          </div>
        </div>
      </div>
      <!-- 未完成订单提示 -->
      <!-- 支付返回确认提示 -->
      <div slot="page_layer">
        <div class="shadow" v-if="isShowConfirmBack"></div>
        <div class="layer_confirm" v-if="isShowConfirmBack">
          <div class="layer_cont">你还未完成支付，确认要离开吗？</div>
          <div class="layer_btn">
            <a href="javascript:;" class="btn_ok" @click="()=>{ this.isShowConfirmBack = false; }">继续支付</a>
            <a href="javascript:;" class="btn_ok" @click="jumpOrderDetail">确认离开</a>
          </div>
        </div>
      </div>
      <!-- 支付返回确认提示 -->
    </div>
  </div>
</template>
<script>
  import {
    commonMixin,
    shareMixin
  } from "@/mixins";
  import phoneService from "@/services/phoneService.js";
  import Header from "@/components/header/Header";
  export default {
    mixins: [commonMixin, shareMixin],
    components: {
      mHeader: Header,
    },
    data() {
      return {
        showPayFailTip: false,
        isShowConfirmBack: false,
        isLeave: false,
        paymentList: {
          wbpay: {
            name: "微博支付",
            en: "wbpay",
            isSupport: false,
            choose: false,
          },
          alipay: {
            name: "支付宝支付",
            en: "alipay",
            isSupport: false,
            choose: false,
          },
          wechatpay: {
            name: "微信支付",
            en: "wechatpay",
            isSupport: false,
            choose: false,
          },
        },
        orderId: "",
        doctorId: "",
        payOrdering: false,
        loadingPayPage: true,
        orderInfo: {},
        waitPayTimer: null,
      };
    },
    created() {
      // "5ca5c79b563bd80007a0382f"
      this.orderId = this.$route.params.businessId;
      this.doctorId = this.$route.query.dId;
      this.initPayList();
      this.getOrderDetail();

      console.log(this.isSupportWbPay);
      console.log(this.paymentList);

      // let supportList = this.paymentList.filter((item)=>{
      //   return item.isSupport == true;
      // });
      // let supportLength = supportList.length;
      // if(supportLength == 1){
      //   this.callPay(supportList[0].en);
      // }
    },
    mounted() {
      this.loadingPayPage = false;
    },
    beforeDestroy() {
      clearInterval(this.waitPayTimer);
    },
    beforeRouteLeave(to, from, next) {
      if(this.orderInfo.orderStatus == 10001){
        if(this.isLeave){
          next();
        }else{
          this.isShowConfirmBack = true;
          next(false);
        }
      }else{
        next();
      }
    },
    computed: {
      isSupportWbPay() {
        let is = false;
        let matchInfo = navigator.userAgent.match(/__weibo__([\d\.]+)/i);
        if (matchInfo) {
          let version = parseFloat(matchInfo[1]);
          if (version >= 4.3) {
            is = true;
          }
        }
        return is;
      },
      isSupportWXPay() {
        //微信5.0以上的才支持微信支付
        //调试时使用 MicroMessenger/5.0 Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B137 Safari/601.1
        let is = false;
        let matchInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i);
        if (matchInfo) {
          let version = parseFloat(matchInfo[1]);
          if (version >= 5.0) {
            is = true;
          }
        }
        return is;
      },
      typeName() {
        let typeName = "";
        for (const key in this.paymentList) {
          if (this.paymentList[key].choose) {
            typeName = this.paymentList[key].en;
          }
        }
        return typeName;
      }
    },
    methods: {
      autoPay(){
        if(this.orderInfo.orderStatus != 10001) return;
        if (platformInfo.isWx) {
          //微信免签名支付
          this.payWithoutConfig();
        } else if (platformInfo.isWeibo) {
          this.callWBpay();
        } else if(!this.VX_isInSinaHealthApp){
          this.callAliPay();
        }
      },
      getOrderDetail() {
        let params = {
          orderId: this.orderId
        };
        phoneService.getOrder(params).then(res => {
          if (res.status == 200 && res.data) {
            this.orderInfo = res.data;
            if (this.orderInfo.orderStatus == 10001) {
              this.autoPay();
              this.startWaitPayTimer(this.orderInfo.remainTime / 1000);
            }
          } else {
            this.$toast.tip(res.message);
          }
        });
      },
      startWaitPayTimer(ts) {
        let This = this;
        this.waitPayTimer = setInterval(function () {
          // var dd = parseInt(ts  / 60 / 60 / 24, 10);//计算剩余的天数
          // var hh = parseInt(ts / 60 / 60 % 24, 10); //计算剩余的小时数
          var mm = parseInt(ts / 60 % 60, 10); //计算剩余的分钟数
          var ss = parseInt(ts % 60, 10); //计算剩余的秒数
          // dd = checkTime(dd);
          // hh = checkTime(hh);
          mm = checkTime(mm);
          ss = checkTime(ss);

          function checkTime(i) {
            if (i < 10) {
              i = "0" + i;
            }
            return i;
          }

          if (ts > 0) {
            let residueTime = mm + " 分 " + ss + " 秒";
            document.getElementById("timer").innerHTML = residueTime;
            ts--;
          } else if (ts <= 0) {
            clearInterval(This.waitPayTimer);
            This.orderInfo.orderStatus = "50001";
            document.getElementById("timer").innerHTML = "";
          }
        }, 1000);
      },
      doPay() {
        if(this.orderInfo.orderStatus != 10001) return;
        let typeName = this.typeName;
        if (typeName === "alipay") {
          this.callAliPay();
        } else if (typeName === "wechatpay") {
          this.payWithoutConfig();
        } else {
          this.callWBpay();
        }
      },
      initPayList() {
        if (this.isSupportWbPay) {
          this.paymentList["wbpay"].isSupport = true;
          this.paymentList["wbpay"].choose = true;
        }
        if (this.isSupportWXPay) {
          this.paymentList["wechatpay"].isSupport = true;
          this.paymentList["wechatpay"].choose = true;
        }
        if (!platformInfo.isWx && !this.isSupportWbPay) {
          this.paymentList["alipay"].isSupport = true;
          this.paymentList["alipay"].choose = true;
        }
      },
      /*
       * 调起支付
       */
      callPay(typeName) {
        for (const key in this.paymentList) {
          this.paymentList[key].choose = false;
        }
        this.paymentList[typeName].choose = true;
      },
      /*
       * 发起支付宝支付
       */
      callAliPay() {
        if (this.payOrdering) return;
        this.payOrdering = true;
        phoneService.phoneConcultPay({
          payType: "alipayM",
          orderId: this.orderId,
        })
          .then(res => {
            this.payOrdering = false;
            console.log(res);
            console.log(res.data);
            clearInterval(this.waitPayTimer);
            document.write(res);
          });
      },
      /*
       * 发起微信支付
       */
      callWechatpay() {
        if (this.payOrdering) return;
        this.payOrdering = true;
        phoneService.payOrder({
          isWeb: true,
          payType: "weixinpay",
          orderId: this.orderId,
        })
          .then(res => {
            this.payOrdering = false;
            if (res.status == 200 && res.data) {
              this.chooseWxToPay(res.data);
            } else {
              this.payCallback(false);
            }
          })
          .catch(() => {
            this.payCallback(false);
            this.payOrdering = false;
          });
      },
      weiboPayUrlToForm(url){
        // var action = url.split("?")[0];
        var querys = url.split("?")[1].split("&");
        var inputString = "";
        let stringArr = querys.map((item)=>{
          let name = item.split("=")[0];
          let value = item.split("=")[1];
          return `<input name="${name}" type="hidden" value="${value}"/>`;
        });
        inputString = stringArr.join("");
        var formString = `
        <form id="weibopay" method="post" action="${action}">
        ${inputString}
        <input type="submit" value="立即支付" style="display:none" >
        </form>
        <script> document.forms[0].submit(); <\/script>
        `;
        // var formString = `
        // <form style="display:none" id="weibopay" method="post" action="${url}">
        // ${inputString}
        // <input type="submit" value="立即支付" style="display:none" >
        // </form>
        // <script> document.forms[0].submit(); <\/script>
        // `;
        return formString;
      },
      /*
       * 发起微博支付
       */
      callWBpay() {
        if (this.payOrdering) return;
        this.payOrdering = true;
        phoneService.phoneConcultPay({
          payType: "weibopay",
          orderId: this.orderId,
        })
          .then(res => {
            this.payOrdering = false;
            if (res.status == 200 && res.data) {
              try {
                console.log("跳转微博支付去咯");
                console.log(res.data.payUrl);
                console.log("^^ 支付链接 ^^");
                // console.error(this.weiboPayUrlToForm(res.data.payUrl));
                // document.write(this.weiboPayUrlToForm(res.data.payUrl));
                window.location.href = res.data.payUrl;
                // window.location.href = "https://pay.sc.weibo.com/api/merchant/pay/cashier?appkey=3174813925&expire=7200&notify_url=http://pay.tunnel.wenwo.com/payOrder/weibopay/pay_notify_accept&out_pay_id=20191108132043919002000032&return_url=http://pay.tunnel.wenwo.com/payOrder/weibopay/return_url_accept&seller_id=5076516542&sign=J7z%2Bf1cZeeSIB%2FjQD%2FKcw3STHkQff7odH2%2FBMJojJ0qgyrPajxT04WPBCtkbfK10h1TjXXfmMsYje6V%2BCrvZaV6ePZ6mqfV869d0AEIGCHZrEmVOgpmUH27RjYEdTprxClS19u5NWzX4KiR66kAxUjqP5smYroeAs6j0Fh61lhU%3D&sign_type=RSA&subject=%E7%88%B1%E9%97%AE%E5%8C%BB%E7%94%9F%E7%94%B5%E8%AF%9D%E5%92%A8%E8%AF%A2&total_amount=9900";
                // window.open(res.data.payUrl);
              } catch (error) {
                console.log("支付失败");
                console.log(error);
              }
            } else {
              this.payCallback(false);
            }
          })
          .catch(() => {
            this.payCallback(false);
            this.payOrdering = false;
          });
      },
      /*
       * 支付成功或者失败回调
       */
      payCallback(isSucc) {
        if (isSucc) {
          this.$toast.tip("支付成功");
          this.$router.replace({
            name: "phone_orderTip",
          });
        } else {
          this.showPayFailTip = true;
        }
      },
      /*
       * 微信免签名支付
       * @params
       */
      payWithoutConfig() {
        if (this.payOrdering) return;
        this.payOrdering = true;
        phoneService.phoneConcultPay({
          payType: "weixinpay",
          //如果当前是在新浪健康APP内 则设置isweb为false
          // isWeb: this.$store.getters.isInSinaHealthApp ? false:true,
          isWeb: true,
          orderId: this.orderId,
        })
          .then(res => {
            this.payOrdering = false;
            if (res.status == 200 && res.data) {
              this.weixinJSBridgePay(res.data);
            } else {
              this.payCallback(false);
            }
          });
      },
      /**
       * 调起免签名支付函数
       * @params data 支付签名信息
      */
      weixinJSBridgePay(data) {
        let conf = data;
        function onBridgeReady() {
          WeixinJSBridge.invoke(
            "getBrandWCPayRequest", {
              "appId": conf.appId, //公众号appId，由商户传入
              "nonceStr": conf.nonceStr, //随机串
              "timeStamp": conf.timeStamp, //时间戳，自1970年以来的秒数
              "paySign": conf.paySign, //微信签名
              "package": conf.packageInfo,
              "signType": conf.signType, //微信签名方式：
            },
            function (res) {
              if (res.err_msg == "get_brand_wcpay_request:ok") {
                window.location.href = conf.returnUrl;
              } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                _this.payCallback(false);
              }
            });
        }
        if (typeof WeixinJSBridge == "undefined") {
          if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false);
          } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
            document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
          }
        } else {
          onBridgeReady();
        }
      },
      /*
       * 微信支付前签名
       */
      getWXconfig() {
        if (!this.isSupportWXPay) return;
        let params = {
          url: window.location.href.split("#")[0]
        };
        sysService.getWXconfig(params)
          .then(res => {
            if (res.code == 0 && res.data) {
              this.configWx(res.data);
            } else {
              this.$toast.tip("支付失败，请稍后重试");
            }
          });
      },
      /*
       * 设置签名
       */
      configWx(conf) {
        let _this = this;
        wx.config({
          appId: conf.appId,
          timestamp: conf.timestamp,
          nonceStr: conf.nonceStr,
          signature: conf.signature,
          jsApiList: ["chooseWXPay"],
          success: function (res) {
            console.log("wx.config OK:" + JSON.stringify(res));
            alert("wx.config OK:" + JSON.stringify(res));
            _this.callWechatpay();
          },
          fail: function (res) {
            //无法配置当前页面, 不能发起支付, 请在此转异常处理流程[2]
            console.log("wx.config error:" + JSON.stringify(res));
            alert("wx.config error:" + JSON.stringify(res));
            _this.payCallback(false);
          }
        });
      },
      /*
       * 发起微信支付
       */
      chooseWxToPay(msg) {
        console.log("msg======================");
        console.log(msg);
        let _this = this;
        wx.chooseWXPay({
          timestamp: msg.timeStamp,
          nonceStr: msg.nonceStr,
          package: msg.packageInfo,
          signType: msg.signType,
          paySign: msg.paySign,
          success: function (res) {
            console.log(res);
            //完成微信支付, 跳转到成功页面, 同时传入所需的订单信息
            var okUrl = msg.returnUrl;
            window.location.href = okUrl;
          },
          fail: function (res) {
            //支付失败, 请在此转异常处理流程[5]
            //alert("wx.chooseWXPay\r\n" + JSON.stringify(res));
            _this.payCallback(false);
          }
        });
      },
      backToLastPage(type) {
        if (type == "delay") {
          let This = this;
          setTimeout(() => {
            This.$router.replace({
              name: "dialogueList",
              params: {
                dId: This.doctorId
              },
              query: {
                backto: "docRome"
              }
            });
          }, 1000);
        } if(type == "back") {
          this.isShowConfirmBack = true;
        }
      },
      jumpOrderDetail(){
        this.isLeave = true;
        this.$router.push({
          name: "phone_orderDetail",
          params: {
            orderId: this.orderId
          },
          query: {
            dId: this.doctorId
          }
        });
      }
    }
  };

</script>

<style lang="less" scoped>
  @import "./css.less";
</style>
