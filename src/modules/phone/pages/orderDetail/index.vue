<template>
  <layout class="order_wrapper">
    <div slot="page_container">
      <conHeader title="订单详情" :border_on="false">
        <span class="retrun" slot="left" @click="router_back">
          <b class="gray"></b>
        </span>
        <span class="retrun" slot="right"></span>
      </conHeader>
      <div class="order_content">
        <div class="order_title">
          <div class="order_title_status">{{orderStatusMap[orderInfo.orderStatus]}}</div>
          <div class="order_title_desc">
            <!--待支付状态提示-->
            <template v-if="orderInfo.orderStatus == '10001'">
              你已经提交了电话咨询订单，请在 <span id="timer"></span>内完成支付，超时未支付订单将自动取消
            </template>

            <!--待确认状态提示-->
            <template v-if="orderInfo.orderStatus == '20001'">
              你提交的电话咨询订单，我们已经通知医生尽快确认订单，如情况紧急，请点击底部栏联系医生
            </template>

            <!-- 订单已取消 -->
            <template v-if="['30001','40001','50001','60001','80002'].includes(orderInfo.orderStatus)">
              你提交的电话咨询订单已取消，如有疑问，请点击底部栏医生直接沟通
            </template>

            <!-- 订单已确认咨询中 -->
            <template v-if="orderInfo.orderStatus == '70001'">
              咨询进行中，如有疑问，请点击底部栏联系医生直接与医生进行沟通
            </template>

            <!-- 订单超时关闭 -->
            <template v-if="['80001'].includes(orderInfo.orderStatus)">
              由于长时间未接通成功，你提交的电话咨询订单已超时关闭，如有疑问，请点击底部栏联系医生直接沟通
            </template>

            <!-- 订单已完成 -->
            <template v-if="['90001','90002','99999'].includes(orderInfo.orderStatus)">
              如还有疑问，可以继续咨询医生
            </template>
          </div>
        </div>
        <div class="order_module">
          <h3 class="order_module_title">订单信息</h3>
          <div class="order_cell order_cell_type">
            <div class="order_cell-label">订单类型</div>
            <div class="order_cell_value">
              电话咨询 <span class="money">{{orderInfo.servicePrice}}元</span> / {{orderInfo.serviceTime}}分钟
            </div>
          </div>

          <div class="order_cell order_cell_type">
            <div class="order_cell-label">订单号</div>
            <div class="order_cell_value">
              {{orderInfo_id}}
            </div>
            <span class="split"></span>
            <p class="copy" v-clipboard:copy="orderInfo.id" v-clipboard:success="onCopy">复制</p>
          </div>

          <div class="order_cell">
            <div class="order_cell-label">意者通话时间</div>
            <div class="order_cell_value">
              {{orderInfo.callBeginTime | monthDay}} -
              {{orderInfo.callEndTime | hourMinutes}}
            </div>
          </div>
        </div>
        <div class="order_module">
          <h3 class="order_module_title">患者信息</h3>
          <div class="order_cell">
            <div class="order_cell-label">患者信息</div>
            <div class="order_cell_value">
              {{orderInfo.inquiryPatientName}} {{orderInfo.inquiryPatientSex}} {{orderInfo.inquiryPatientAge}}岁
            </div>
          </div>
          <div class="order_cell">
            <div class="order_cell-label">患病时长</div>
            <div class="order_cell_value">
              {{orderInfo.sickTime}}
            </div>
          </div>
          <div class="order_cell order_disease_info">
            <div class="order_cell-label">病情描述</div>
            <div class="order_cell_value" v-html="orderInfo.illnessDescription"></div>
          </div>
          <div class="order_cell order_disease_imgs">
            <div class="order_cell-label"><span class="label_img">病情照片</span>  </div>
            <div class="order_cell_value" v-if="orderInfo.illnessImages && orderInfo.illnessImages.length > 0">
              <ul class="order_info_imgs">
                <li v-for="(itemImg,index) in orderInfo.illnessImages" :key="index">
                  <img :src="GET_IMG_URL(itemImg)"  preview="1" />
                </li>
              </ul>
            </div>
            <div class="order_cell_value" v-else> 无 </div>
          </div>
          <div class="order_cell">
            <div class="order_cell-label">下单时间</div>
            <div class="order_cell_value">
              {{orderInfo.createTime | dataFormat}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div slot="page_footer">
      <div class="btn_fixed">
        <div class="btn_fixed_wrapper">
          <a href="javascript:;" class="contact_doctor_btn" :class="{'btn_blue':orderInfo.orderStatus=='10001'||orderInfo.orderStatus=='90001'}"
            @click="commentSubmit">{{btnText}}</a>
        </div>
      </div>
    </div>
    <div slot="page_layer">
    </div>
  </layout>
</template>
<script>
  import {
    commonMixin
  } from "@/mixins";
  import conHeader from "@/components/header/Header";
  import actionSheet from "@/iwen/actionSheet/actionSheet";
  import phoneService from "@/services/phoneService.js";

  export default {
    mixins: [commonMixin],
    data() {
      return {
        commentForm: {
          rate: {},
          content: ""
        },
        orderInfo: {},
        orderInfo_id:"",
        waitPayTimer: null,
        orderStatusMap: {
          10001: "订单待支付",
          20001: "订单待确认",
          30001: "订单已取消", //未支付取消-（用户未支付就主动取消）
          40001: "订单已取消", //支付取消(用户支付了医生确认前取消)
          50001: "订单已取消", //支付超时取消
          60001: "订单已取消", //医生取消
          70001: "订单咨询中", //已确认待通话
          80001: "订单超时关闭", //超时取消
          80002: "订单已取消", //支付后医生24小时未确认自动取消
          90001: "订单已完成", //待评价(可拨打)
          90002: "订单已完成", //待评价(不拨打)
          99999: "订单已完成", //(用户评价完,订单关闭)
        }
      };
    },
    components: {
      conHeader,
      actionSheet,
    },
    computed: {
      btnText() {
        let text = "";
        switch (this.orderInfo.orderStatus) {
          case "10001":
            text = "去支付";
            break;
          case "20001":
            text = "联系医生";
            break;
          case "30001":
          case "40001":
          case "50001":
          case "60001":
          case "70001":
          case "80001":
          case "80002":
            text = "联系医生";
            break;
          case "90001":
          case "90002":
            text = "去评价";
            break;
          case "99999":
            text = "联系医生";
            break;

          default:
            break;
        }
        return text;
      }
    },
    created() {
      this.init();
    },
    destroyed() {
      clearInterval(this.waitPayTimer);
    },
    mounted() {
      //兼容ipone6键盘弹起空白  
      // document.body.addEventListener("focusout",()=>{
      //   setTimeout(()=>{
      //     const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
      //     window.scroll(0, Math.max(scrollHeight - 1 , 0));
      //   },100);
      // });
    },
    filters: {
      monthDay(time) {
        if (time == undefined) return "";
        function fixNum(i) {
          if (i < 10) {
            i = "0" + i;
          }
          return i;
        }
        let date = new Date(time);
        return fixNum(date.getMonth() + 1) + "月" + fixNum(date.getDate()) + "日 " + fixNum(date.getHours()) + ":" + fixNum(date.getMinutes());
      },
      hourMinutes(time) {
        if (time == undefined) return "";
        function fixNum(i) {
          if (i < 10) {
            i = "0" + i;
          }
          return i;
        }
        let date = new Date(time);
        return fixNum(date.getHours()) + ":" + fixNum(date.getMinutes());
      },
    },
    methods: {
      init() {
        this.orderId = this.$route.params.orderId;
        this.getOrderDetail();
      },
      onCopy() {
        this.$toast.tip("链接已复制，可以去粘贴啦！");
      },
      getOrderDetail() {
        let params = {
          orderId: this.orderId
        };
        phoneService.getOrder(params).then(res => {
          if (res.status == 200 && res.data) {
            this.orderInfo = res.data;
            this.orderInfo_id = utils.cardSpace(this.orderInfo.id);
            this.orderInfo.illnessDescription = utils.replaceBrTag(this.orderInfo.illnessDescription);
            this.$previewRefresh();
            if (this.orderInfo.orderStatus == 10001) {
              this.startWaitPayTimer(this.orderInfo.remainTime / 1000);
            }
            this.handleBaiduHmTriggerEvent();
          } else {
            this.$toast.tip(res.message);
          }
        });
      },
      handleBaiduHmTriggerEvent(){
        switch (this.orderInfo.orderStatus) {
          case "10001":
            _hmt.push(["_trackEvent", "orderToBePaidPage", "订单详情-待支付页"]);
            break;
          case "20001":
            _hmt.push(["_trackEvent", "orderToBeConfirmedPage", "订单详情-待确认页"]);
            break;
          case "30001":
          case "40001":
          case "50001":
          case "60001":
          case "80002":
            _hmt.push(["_trackEvent", "orderCancelledPage", "订单详情-已取消页"]);
            break;
          case "70001":
            _hmt.push(["_trackEvent", "orderInConsultationPage", "订单详情-咨询中"]);
            break;
          case "80001":
            _hmt.push(["_trackEvent", "orderTimeOutOffPage", "订单详情-超时关闭页"]);
            break;
          case "90001":
          case "90002":
          case "99999":
            _hmt.push(["_trackEvent", "orderCompletedPage", "订单详情-已完成页"]);
            break;

          default:
            break;
        }
      },
      commentSubmit() {
        switch (this.orderInfo.orderStatus) {
          case "10001":
            this.$router.push({
              name: "phone.Payment",
              params: {
                businessId: this.orderId
              },
              query: {
                dId: this.orderInfo.doctorId
              }
            });
            break;
          case "20001":
          case "30001":
          case "40001":
          case "50001":
          case "60001":
          case "70001":
          case "80001":
          case "80002":
            _hmt.push(["_trackEvent", "contactDoctorButtonClick", "点击联系医生"]);
            this.$router.push({
              name: "dialogueList",
              params: {
                dId: this.orderInfo.doctorId
              }
            });
            break;
          case "90001":
          case "90002":
            _hmt.push(["_trackEvent", "evaluateDoctorButtonClick", "点击去评价"]);
            this.$router.push({
              name: "phone_comment",
              params: {
                dId: this.orderInfo.doctorId,
                orderId: this.orderId
              }
            });
            break;
          case "99999":
            _hmt.push(["_trackEvent", "contactDoctorButtonClick", "点击联系医生"]);
            this.$router.push({
              name: "dialogueList",
              params: {
                dId: this.orderInfo.doctorId
              }
            });
            break;

          default:
            break;
        }
      },
      commentConFocus(e) {
        e.target.focus();
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
            This.orderInfo.orderStatus = "80001";
            document.getElementById("timer").innerHTML = "";
          }
        }, 1000);
      }
    }
  };

</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "./css.less";

</style>
