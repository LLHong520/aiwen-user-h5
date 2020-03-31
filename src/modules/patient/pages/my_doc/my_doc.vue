<template>
  <layout class="doc-info-page" :isAppView="true">
    <!-- page_header -->
    <div slot="page_header">
      <m-header slot="page_header" :title="(docInfo.realName||'...')">
        <span class="retrun" slot='left' @click="router_back">
          <b class="gray"></b>
        </span>
        <span class="retrun" slot='right'></span>
      </m-header>
    </div>
    <!-- page_header -->
    <!-- page_container -->
    <div slot="page_container" class="app_wrapper_inner">
      <!-- 互动记录列表 -->
      <div class="order_list" id="order_list">
        <div class="loading" v-if="loading">
          <img src="./images/loading.gif" width="25" alt>
        </div>
        <ul>
          <li v-for="(item,index) in orderList" :key="index">
            <p class="order_time">{{item.dateTimeStyle}}</p>
            <div class="order_card order_card_phone"
              v-if="item.contentType==9">
              <div class="card_hd">电话咨询</div>
              <router-link class="card_bd" tag="div" :to="{name:'phone_orderDetail',params:{orderId:item.contentId},query:{dId:dId}}" >
                <p class="item"><label>姓名：</label><span>{{item.mname}}</span></p>
                <p class="item"><label>电话：</label><span>{{item.mphone}}</span></p>
                <p class="item"><label>意向通话时间：</label><span>{{item.serviceTime}}</span></p>
                <p class="item"><label>服务价格：</label><span>{{item.servicePrice}}</span></p>
                <p class="item"><label>订单状态：</label>
                  <span :class="{'red':['待支付','待确认','已取消','超时关闭'].includes(item.serviceStatus)}">{{item.serviceStatus}}</span>
                </p>
              </router-link>
              <div v-if="['待支付','待确认'].includes(item.serviceStatus)" class="card_fd" @click="cancelOrder(index)">取消订单</div>
              <div v-if="['已确认'].includes(item.serviceStatus)" class="card_fd">咨询中</div>
            </div>

            <div class="order_card" v-if="item.contentType==1&&(!VX_isSinaHealthAppForceIng)">
              <a :href="item.serviceStatus=='待支付'?`${YK_URL}/consult/order/${item.contentId}`:`${YK_URL}/consult/detail/${item.contentId}`">
                <div class="card_hd">图文咨询</div>
                <div class="card_bd">
                  <p class="item"><label for="">姓名：</label>{{item.mname}} </p>
                  <p class="item"><label for="">病情描述：</label>{{item.description}}</p>
                </div>
                <div class="order_state">
                  <span
                    :class="{'red':item.serviceStatus=='待支付'||item.serviceStatus=='待评价','blue':item.serviceStatus=='已评价'||item.serviceStatus=='默认好评'}">{{item.serviceStatus}}</span>
                </div>
              </a>
            </div>
            <div class="order_card" v-if="item.contentType==7">
              <a :href="`${YK_URL}/outpatient/appointmentDetails/${item.contentId}`">
                <div class="card_hd">门诊预约</div>
                <div class="card_bd">
                  <p class="item"><label for="">预约时间：</label>{{item.serviceTime}}</p>
                  <p class="item"><label for="">预约地点：</label> {{item.practiceAddress}}</p>
                </div>
                <div class="order_state">
                  <span
                    :class="{'red':item.serviceStatus=='等待付款'||item.serviceStatus=='已拒绝'||item.serviceStatus=='就诊待确认','blue':item.serviceStatus=='预约成功'||item.serviceStatus=='已就诊'||item.serviceStatus=='已评价'}">{{item.serviceStatus}}</span>
                </div>
              </a>
            </div>
            <div class="order_card" v-if="item.contentType==2">
              <a :href="`${YK_URL}/consult/detail/${item.contentId}`">
                <div class="card_hd">公益咨询</div>
                <div class="card_bd">
                  <p class="item"><label for="">姓名：</label>{{item.mname}} </p>
                  <p class="item"><label for="">病情描述：</label>{{item.description}}</p>
                </div>
                <div class="order_state">
                  <span
                    :class="{'red':item.serviceStatus=='待反馈','blue':item.serviceStatus=='已反馈'||item.serviceStatus=='默认好评'||item.serviceStatus=='回答中'}">{{item.serviceStatus}}</span>
                </div>
              </a>
            </div>
            <div class="order_card" v-if="item.contentType==10">
              <a :href="`${OUTER_LINKS.courseDetails}${item.contentId}`">
                <div class="card_hd">在线课堂</div>
                <div class="card_bd">
                  <p class="item"><label for="">主题：</label>{{item.content}}</p>
                  <p class="item"><label for="">时间：</label>{{item.serviceTime}}</p>
                </div>
                <div class="order_state">
                  <span
                    :class="{'red':item.serviceStatus=='课程异常'||item.serviceStatus=='讲师缺课'||item.serviceStatus=='讲师缺课（已退款）','blue':item.serviceStatus=='直播中'||item.serviceStatus=='课程回顾'||item.serviceStatus=='未开始'}">{{item.serviceStatus}}</span>
                </div>
              </a>
            </div>
            <div class="mes_card" v-if="item.contentType==0">
              <div class="card_tit">
                <dl>
                  <dt>{{item.promptingContent}}</dt>
                  <dd>{{item.content}}</dd>
                </dl>
              </div>
              <div class="card_items">
                <div class="card_item" v-for="(ele,index) in item.cards" :key="index">
                  <a :href="`${COMTY_BASE_URL}${ele.contentId}`" v-if="ele.type==1">
                    <div class="img"><img :src="ele.img" alt=""></div>
                    <div class="txt">
                      <dl>
                        <dt>{{ele.content}}</dt>
                        <dd>去看看吧>></dd>
                      </dl>
                    </div>
                  </a>
                  <a v-else href="javascript:;" @click="dowloadApp">
                    <div class="img"><img :src="ele.img" alt=""></div>
                    <div class="txt">
                      <dl>
                        <dt>{{ele.content}}</dt>
                      </dl>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </li>
          <li v-if="isSuccess=='success'">
            <p class="order_time">{{currentTime | dataFormat}}</p>
            <div class="tips"><span>病历提交成功，仅医生可见^^</span></div>
            <div class="tips"><span>如有问题，可直接在线咨询医生</span></div>
          </li>
        </ul>
      </div>
      <!-- 互动记录列表end -->
    </div>
    <!-- /page_container -->
    <div slot="page_footer">
      <!--取消咨询订单 -->
      <action-sheet class="action_con" title="取消咨询订单" :show.sync="isShowCancelOrderTip" @cancel="hideCancelOrder"
        @confirm="confirmCancelOrder" :items="actionSheets"></action-sheet>
      <!--/取消咨询订单 -->
      <div class="nav_service">
        <div class="more_list animated fadeInUp" v-if="isSpread">
          <em></em>
          <ul>
            <li v-if="docInfo.register==1"><a :href="OUTER_LINKS.docOrder+docInfo.id">门诊预约</a></li>
            <li
              v-if="phoneSetting.status=='10001'&&phoneSetting.remainSource>0">
              <router-link :to="{name:'dialogueList', params:{ dId:dId}}">电话咨询</router-link>
            </li>
          </ul>
        </div>
        <span class="more" @click="toggleSpread"
          v-if="docInfo.register==1||(phoneSetting.status=='10001'&&phoneSetting.remainSource>0)">更多服务</span>
        <div class="service_btn">
          <router-link :to="{name:'patientsList',params:{'dId':dId}}" class="up_cases">上传病历</router-link>
          <template>
            <template v-if="!docInfo.advice">
              <a href="javascript:;" class="disabled">图文咨询<span> | 未开通</span></a>
            </template>
            <template v-else>
              <template v-if="!docInfo.nowsuspendService">
                <template v-if="!this.docInfo.qCaps > 0">
                  <a href="javascript:;" class="disabled">图文咨询<span> | 今日名额已满</span></a>
                </template>
                <template v-else>
                  <a :href="OUTER_LINKS.docConsult + docInfo.id + '&bizType=NOR'">图文咨询¥{{(VX_isSinaHealthAppForceIng && docInfo.qPrice>0)? 6:docInfo.qPrice}}</a>
                </template>
              </template>
              <template v-else>
                <a href="javascript:;" class="disabled">图文咨询<span> | 暂停服务</span></a>
              </template>
            </template>
          </template>
        </div>
      </div>
    </div>
    <div slot="page_layer">
      <!-- 医生card -->
      <div class="doc_card" :class="{'doc_card_app':isInApp}">
        <router-link :to="{ name: 'docIndex', params:{ id: dId }}">
          <div class="img"><img :src="GET_IMG_URL(docInfo.photo,'doc')" alt=""></div>
          <div class="info">
            <dl>
              <dt><span class="name">{{docInfo.realName}}</span>&nbsp;&nbsp;{{docInfo.titles}}</dt>
              <dd>{{docInfo.departments}}&nbsp;&nbsp;{{docInfo.workUnit}}</dd>
            </dl>
          </div>
          <div class="txt">医生主页</div>
        </router-link>
      </div>
      <!-- 医生card end-->
    </div>
    <!-- 取消订单确认提示 -->
    <div slot="page_layer" v-if="isShowConfirCancelOrderTip">
      <div class="shadow"></div>
      <div class="layer_confirm">
        <div class="layer_cont">取消该咨询订单？</div>
        <div class="layer_btn">
          <a href="javascript:;" class="btn_ok" @click="doCancelOrder">取消订单</a>
          <a href="javascript:;" class="btn_ok" @click="()=>{ this.isShowConfirCancelOrderTip = false; }">不了</a>
        </div>
      </div>
    </div>
    <!-- 取消订单确认提示 -->
  </layout>
</template>
<script>
  import {
    commonMixin
  } from "@/mixins";
  import {
    YK_URL,
    DOC_CONSULT_URL,
    OUTER_LINKS,
    COMTY_BASE_URL
  } from "@/config";
  import {
    mapGetters
  } from "vuex";
  import Header from "@/components/header/Header";
  import actionSheet from "@/iwen/actionSheet/actionSheet";
  import doctorService from "@/services/doctorService.js";
  import phoneService from "@/services/phoneService.js";
  export default {
    name: "patients_list",
    mixins: [commonMixin],
    data() {
      return {
        DOC_CONSULT_URL,
        YK_URL,
        OUTER_LINKS,
        COMTY_BASE_URL,
        dId: "",
        isSpread: false,
        isLoadMore: false,
        orderList: [],
        curPage: 0,
        pageSize: 10,
        pageCount: 2,
        totalCount: 2,
        loading: false,
        loadingText: "加载更多",
        isReachEnd: false,
        currentTime: "",
        isSuccess:"",
        contentHeight:0,
        docInfo: {
          id: "",
          relation: 0,
          photo: "",
          realName: "...",
          departments: "...",
          titles: "...",
          answerNum: 0,
          workUnit: "...",
          sicknessExpertise: "",
          departId: "",
        },
        phoneSetting: {
          status: "20001",
          remainSource: 0
        },
        entry: "",
        //取消订单
        cancelOrderParams: {
          index: -1,
          orderId: "",
          reason: ""
        },
        isCancelOrderSuccess: false,
        isCancelOrderFailed: false,
        isShowCancelOrderTip: false,
        isShowConfirCancelOrderTip: false,
        actionSheets: [{
          iconCtrl: "icon-css",
          textCtrl: "c_gray",
          text: "我不想咨询了"
        },
        {
          iconCtrl: "icon-css",
          textCtrl: "c_gray",
          text: "信息填写错误，重新填写"
        },
        {
          iconCtrl: "icon-css",
          textCtrl: "c_gray",
          text: "其他原因"
        }],
      };
    },
    components: {
      mHeader: Header,
      actionSheet
    },
    created() {
      this.initPage();
      this.currentTime=new Date().getTime();
    },
    computed: {
      ...mapGetters(["isInSinaHealthApp", "isInIwenApp"]),
      isInApp() {
        return platformInfo.isWeibo || platformInfo.isWx || this.isInSinaHealthApp || this.isInIwenApp;
      }
    },
    methods: {
      initPage() {
        this.dId = this.$route.params.dId;
        this.entry = this.$route.query.entry || "";
        this.getDocinfo();
        this.qryInteractiveRecording();
        this.qryDocTelConfig();
      },
      toggleSpread() {
        this.isSpread = !this.isSpread;
      },
      //日期格式
      formatTwoDigitInteger (value)  {
        value = value.toString();
        return (value.length === 1 ? "0" : "") + value;
      },
      // 获取添加滚动事件的元素
      getScrollEle() {
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        var scrollEle = null;
        if (isiOS && platformInfo.isWeibo) {
          // console.log("wrapper__inner");
          scrollEle = "#wrapper__inner";
        } else {
          // console.log("window");
          scrollEle = window;
        }
        return scrollEle;
      },
      scrollToBottom() {
        let _this=this;
        this.$nextTick(function () {
          // let contHeight = $("#order_list").get(0);
          let wrapper_inner = $(this.getScrollEle());
          console.log(_this.contentHeight);
          wrapper_inner.scrollTop(_this.contentHeight);
        });
      },
      getDocinfo() {
        let This = this;
        doctorService.doc_info({
          docId: this.dId
        })
        .then(res => {
          if (res.code == 0 && res.data) {
            This.docInfo = res.data;
            This.SET_PAGE_TITLE(This.docInfo.realName + "医生");
          }
        });
      },
      qryDocTelConfig() {
        //电话咨询配置
        let This = this;
        phoneService
          .getPhoneConsultSetting({
            doctorId: This.dId,
            departmentId: "",
          })
          .then(res => {
            if (res.status == 200 && res.data) {
              This.phoneSetting = res.data;
            }
          });
      },
      //获取互动记录列表
      qryInteractiveRecording() {

        if (this.loading || this.isReachEnd) return;
        this.loading = true;
        let This = this;
        doctorService.qryInteractiveRecording({
          drUserId: This.dId,
          userId: this.VX_userInfo.id,
          pageNum: This.curPage + 1,
          pageSize: This.pageSize,
          entry: This.entry
        })
        .then(res => {
          This.loading = false;
          if (res.code == 0) {
            let list = res.data.reverse();
            let newList = [];
            for (let i = 0; i < list.length; i++) {
              newList.push(list[i]);
            }
            This.orderList = newList.concat(This.orderList);
            This.isSuccess = This.$route.query.isSuccess || "";
            This.contentHeight=$("#order_list").get(0).scrollHeight;
            This.curPage += 1;
            This.totalCount = parseInt(res.total);
            This.pageCount = Math.ceil(res.total / This.pageSize);
            if(This.pageCount<=1){
              This.isLoadMore = false;
              This.scrollToBottom();
            }
            if (This.curPage + 1 > This.pageCount) {
              This.isReachEnd = true;
              This.loadingText = "";
            } else {
              This.isReachEnd = false;
            }
          }
        })
        .catch(() => {
          This.loading = false;
        });
      },
      loadMore() {
        // return false;
        this.contentHeight=$("#order_list").get(0).scrollHeight;
        let wrapper_inner = $(this.getScrollEle());
        if (wrapper_inner.scrollTop() <= 0) {
          this.isLoadMore = true;
          this.qryInteractiveRecording();
          wrapper_inner.scrollTop = 0;
        }else{
          this.isLoadMore = false;
        }
      },
      dowloadApp() {
        console.log("xiazai");
        try {
          iwenJSNativeBridge.openApp();
        } catch (e) {
          console.log("catch");
          this.$router.push({
            name: "appDownload"
          });
        }
      },
      cancelOrder(index) {
        this.cancelOrderParams.index = index;
        this.cancelOrderParams.orderId = this.orderList[index].contentId;
        this.isShowCancelOrderTip = true;
      },
      confirmCancelOrder(index) {
        console.log(index);
        console.log(this.actionSheets[index - 1]);
        let reason = this.actionSheets[index - 1].text;
        this.cancelOrderParams.reason = reason;
        this.isShowCancelOrderTip = false;
        this.isShowConfirCancelOrderTip = true;
      },
      doCancelOrder() {
        console.log("取消订单");
        let This = this;
        phoneService.cancelTelephoneOrder({
          orderId: this.cancelOrderParams.orderId,
          cancelReason: this.cancelOrderParams.reason,
        })
          .then((res) => {
            This.isShowConfirCancelOrderTip = false;
            if (res.status == 200) {
              This.isCancelOrderSuccess = true;
              This.orderList[This.cancelOrderParams.index].serviceStatus = "已取消";
            } else {
              This.isCancelOrderFailed = true;
            }
          })
          .catch((res) => {
            This.isShowConfirCancelOrderTip = false;
            This.isCancelOrderFailed = true;
          })
          .finally(() => {
            setTimeout(() => {
              This.isCancelOrderSuccess = false;
              This.isCancelOrderFailed = false;
            }, 2000);
          });
      },
      hideCancelOrder() {
        this.isShowCancelOrderTip = false;
      },
    },
    mounted() {
      let This = this;
      $(this.getScrollEle()).scroll(This.loadMore);
    },
    updated() {
      if (!this.isLoadMore) {
        this.scrollToBottom();
      }
    },
    beforeDestroy() {
      let This = this;
      $(this.getScrollEle()).off("scroll", This.loadMore);
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  @import './css.less';

</style>
