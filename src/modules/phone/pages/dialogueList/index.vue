<template>
  <div class="dialouge_wrapper">
    <div slot="page_container" class="page_container">
      <conHeader :title="docInfo.realName" :border_on="false">
        <span class="retrun" slot="left" @click="backToLastPage">
          <b class="gray"></b>
        </span>
        <!-- <span v-if="!VX_isInSinaHealthApp" href="javascript:;" class="placeholder" slot="right">
          <a  class="toOrder" @click="toOrder">电话咨询</a>
        </span> -->
        <span class="retrun" slot='right'></span>
      </conHeader>
      <div class="dialouge_box" id="dialouge_box">
        <!-- 订单头部提示-->
        <div class="order_affix_wrapper" v-if="['10001','20001','70001'].includes(orderCurrentDetal.orderStatus)">
          <div class="order_affix">
            <div class="order_affix_status">
              <span v-if="orderCurrentDetal.orderStatus == '10001'">待支付</span>
              <span v-if="orderCurrentDetal.orderStatus == '20001'">待确认</span>
              <span class="active" v-if="orderCurrentDetal.orderStatus == '70001'">咨询中</span>
            </div>
            <div class="order_affix_tips">
              <!--<template>已通知医生尽快确认，超时自动退款</template>-->
              <template v-if="orderCurrentDetal.orderStatus == '10001'&&orderTimeM>0">
                支付剩余 <span>{{orderTimeM}}</span>分<span>{{orderTimeS}}</span>秒
              </template>
              <template v-if="orderCurrentDetal.orderStatus == '70001'&&orderTimeM>0">
                剩余 <span>{{orderTimeH}}</span>小时<span>{{orderTimeM}}</span>分<span>{{orderTimeS}}</span>秒自动结束
              </template>
              <template v-if="orderCurrentDetal.orderStatus == '20001'">
                已通知医生尽快确认，超时自动退款
              </template>
            </div>
          </div>
        </div>
        <!-- 消息加载中 -->
        <div v-if="loading">
          <img src="./images/loading.gif" width="25" alt>
        </div>
        <!-- 沟通提示 -->
        <!-- <div class="dialouge_tip">你可以先与医生提前沟通，并发起服务订单</div> -->

        <!-- 对话列表 -->
        <div ref="scrollList">
          <div v-for="(item,index) in dialougeList" :key="index">
            <!-- 当前信息条目的时间 -->
            <div v-if="item.showTime&&item.showTime!=''" class="time">
              <!-- {{item.createTime/1000 | dateFormatDot}} -->
              <!-- v-if="(item.type=='30001'&&item.id&&!isOverTime)||item.type=='20001'||item.type=='10001' || item.type == '40001' || item.type == '60001'" -->
              {{item.showTime}}
            </div>
            <!-- /当前信息条目的时间/ -->

            <!-- 系统消息 -->
            <div v-if="item.type=='10001'" class="dialouge_tip">{{item.content}}</div>
            <!-- /系统消息 -->

            <!-- 订单状态消息 -->
            <order-foot-status v-if="item.type=='70001'" :text="item.content" ></order-foot-status>
            <!-- /订单状态消息 -->

            <!-- 患者发的消息 -->
            <div class="dialouge_item dialouge_my" v-if="item.contentSource=='user'">
              <div class="dialouge_txt">
                <!--type 40001 图片信息-->
                <template v-if="item.type == '40001'">
                  <div>
                    <img :src="GET_IMG_URL(item.images[0])" preview="1">
                  </div>
                </template>
                <!--type 20001 默认普通消息-->
                <template v-else>
                  <div class="txt_inner" v-html="item.content"></div>
                  <em class="arrow"></em>
                </template>
              </div>
              <div class="face">
                <img :src="GET_IMG_URL(VX_userInfo.photoPicURL,'u')" :alt="VX_userInfo.nickName">
              </div>
            </div>
            <!-- 患者发的消息 end -->

            <!-- 医生发的消息 -->
            <div class="dialouge_item dialouge_doc" v-else-if="item.contentSource=='doctor'">
              <div class="face">
                <img :src="GET_IMG_URL(docInfo.photo,'doc')" :alt="docInfo.realName">
              </div>
              <div class="dialouge_txt">
                <!--type 40001 图片信息-->
                <div v-if="item.type == 40001">
                  <img :src="GET_IMG_URL(item.images[0])"  preview="1">
                </div>
                <div class="txt_inner" v-else>
                  <i v-if="item.type=='60001'" class="icon-phone"></i>
                  <span v-html="item.content"></span>
                </div>
                <em class="arrow"></em>
              </div>
            </div>
            <!-- 医生发的消息 end -->

            <!-- 订单消息 -->
            <div v-else-if="item.type == '30001'">
              <!-- 未支付订单 -->
              <div v-if="item.orderStatus=='10001'&&(!isOverTime)">
                <div class="dialouge_tip" v-if="item.orderStatus=='10001'">
                  你向医生发起的电话咨询，我们已通知医生尽快确认，期间你可以与医生沟通具体通话时间或继续补充咨询内容，由于医生工作的特殊性，请耐心等待
                </div>
                <div class="order_card">
                  <div class="card_hd">
                    <p>电话咨询预约</p>
                  </div>
                  <a class="orderDetail" href="javascript:;" @click="toPay(item.orderStatus,item.orderId)">
                    <div class="card_bd">
                      <div class="order_item">
                        <label for>姓名：</label>
                        <div class="order_info">{{item.name}}</div>
                      </div>
                      <div class="order_item">
                        <label for>电话：</label>
                        <div class="order_info">{{item.phoneNum}}</div>
                      </div>
                      <div class="order_item">
                        <label for>意向通话时间：</label>
                        <div class="order_info">{{item.wantPhoneTime}}</div>
                      </div>
                      <div class="order_item">
                        <label for>服务价格：</label>
                        <div class="order_info">
                          {{item.price}}
                        </div>
                      </div>
                      <div class="order_item">
                        <label for>订单状态：</label>
                        <div class="order_info">
                          <template>
                            <span class="red">待支付</span>
                          </template>
                        </div>
                      </div>
                    </div>
                  </a>
                  <div class="card_fd" @click="cancelOrder(index)">
                    取消订单
                  </div>
                  <!-- 订单操作 -->
                  <!-- /订单操作 -->
                </div>

                <div class="dialouge_tip" v-if="item.orderStatus=='10001'">
                  你已经提交了电话咨询订单，请在<span v-if="orderTimeM>0">{{orderTimeM}}分</span>{{orderTimeS}}秒内完成支付，超时订单自动关闭
                </div>
              </div>
              <!-- /未支付订单 -->

              <!-- 已支付订单 -->
              <div v-else-if="item.orderStatus!='10001'">
                <div class="dialouge_tip" v-if="item.orderStatus=='20001'">
                  你向医生发起的电话咨询，我们以通知医生尽快确认，期间你可以与医生沟通具体通话时间或继续补充咨询内容，由于医生工作的特殊性，请耐心等待</div>
                <div class="order_card">
                  <div class="card_hd">
                    <p>电话咨询预约</p>
                  </div>
                  <a class="orderDetail" href="javascript:;" @click="toPay(item.orderStatus,item.orderId)">
                    <div class="card_bd">
                      <div class="order_item">
                        <label for>姓名：</label>
                        <div class="order_info">{{item.name}}</div>
                      </div>
                      <div class="order_item">
                        <label for>电话：</label>
                        <div class="order_info">{{item.phoneNum}}</div>
                      </div>
                      <div class="order_item">
                        <label for>意向通话时间：</label>
                        <div class="order_info">{{item.wantPhoneTime}}</div>
                      </div>
                      <div class="order_item">
                        <label for>服务价格：</label>
                        <div class="order_info">
                          {{item.price}}
                        </div>
                      </div>
                      <div class="order_item">
                        <label for>订单状态：</label>
                        <div class="order_info">
                          <template>
                            <div class="order_state red" v-if="item.orderStatus=='20001'">待确认</div>
                            <div class="order_state red" v-if="item.orderStatus=='30001'">已取消</div>
                            <div class="order_state red" v-if="item.orderStatus=='40001'">已取消</div>
                            <div class="order_state red" v-if="item.orderStatus=='50001'">已取消</div>
                            <div class="order_state red" v-if="item.orderStatus=='60001'">已取消</div>
                            <div class="order_state" v-if="item.orderStatus=='70001'">已确认</div>
                            <div class="order_state red" v-if="item.orderStatus=='80001'">超时关闭</div>
                            <div class="order_state red" v-if="item.orderStatus=='80002'">已取消</div><!--支付后医生24小时未确认自动取消-->
                            <div class="order_state" v-if="item.orderStatus=='90001'">已确认</div><!--待评价-->
                            <div class="order_state" v-if="item.orderStatus=='90002'">已确认</div><!--已评价-->
                            <div class="order_state red" v-if="item.orderStatus=='99999'">已确认</div><!--已关闭-->
                          </template>
                        </div>
                      </div>
                    </div>
                  </a>
                  <!-- 订单操作 -->
                  <section class="order-actions">
                    <div v-if="item.orderStatus == '20001'" @click="cancelOrder(index)" class="order-actions-item">
                      <span class="cancel">取消订单</span>
                    </div>
                    <div v-if="item.orderStatus=='70001'" class="order-actions-item">
                      <span class="cancel">咨询中</span>
                    </div>
                    <div v-if="['90001','90002','99999'].includes(item.orderStatus)" class="order-actions-item">
                      <span class="cancel">已完成</span>
                    </div>
                  </section>
                  <!-- /订单操作 -->
                </div>

                <!-- 咨询已结束 -->
                <div  v-if="item.orderStatus=='90001'" class="order_comment">
                  <div class="order_comment_l">
                    <p class="order_comment_title">本次咨询已结束</p>
                    <p class="order_comment_sub">本次咨询是否满意？去给医生一些评价吧</p>
                  </div>
                  <div class="order_comment_r" @click="toComment(item)">去评价</div>
                </div>
                <!-- 咨询已结束 -->
              </div>
              <!-- /已支付订单 -->
            </div>


            <!-- 动态时间消息 -->
            <!-- <div v-else-if="item.type=='50001'"> -->
              <!-- 当前信息条目的时间 -->
              <!-- <div class="time">{{item.createTime | dateFormatDot}}</div> -->
              <!-- /当前信息条目的时间/ -->
            <!-- </div> -->
            <!-- 动态时间消息 -->


            <!-- 中断提示 -->
            <div v-else-if="item.type=='40002'">
              <!-- 当前信息条目的时间 -->
              <div class="time">{{item.create_time_stamp | dateFormatDot}}</div>
              <!-- /当前信息条目的时间/ -->
              <div class="dialouge_tip">付费电话咨询通话中断</div>
            </div>
            <!-- 中断提示 -->

            <!-- 接通提示 -->
            <div v-else-if="item.type=='40003'">
              <div class="dialouge_tip">付费电话咨询通话成功</div>
            </div>
            <!-- 接通提示 -->
          </div>
        </div>
      </div>
    </div>
    <div slot="page_footer">
      <!-- 编辑框 -->
      <div class="edit_area">
        <div class="edit_wrapper">
          <div class="edit_img">
            <input accept="image/*" name="avatar" type="file" class="needsclick" @change="uploadImage($event)" />
          </div>
          <div class="edit_txt">
            <!-- <input class="edit-input" type="needsclick text" placeholder="发送消息" v-model="sentCont"> -->
            <textarea class="edit-input autoEdit iosEdit" @focus="inputFocus" @blur="inputBlur" id="edit" maxlength="140" placeholder="发送消息" v-model="sentCont"></textarea>
          </div><!-- @blur="inputBlur" @focus="inputFocus"-->
          <div class="edit_btn">
            <a href="javascript:;" :class="{'disabled':!isChecked}" @click="sentMessage">发送</a>
          </div>
        </div>
      </div>
      <!-- /编辑框 -->

      <!--取消咨询订单 -->
      <action-sheet class="action_con" title="取消咨询订单" :show.sync="isShowCancelOrderTip" @cancel="hideCancelOrder"
        @confirm="confirmCancelOrder" :items="actionSheets"></action-sheet>
      <!--/取消咨询订单 -->

      <!-- 未完成订单提示 -->
      <div slot="page_layer">
        <div class="shadow" v-if="isShowUnFinishedTip"></div>
        <div class="layer_confirm" v-if="isShowUnFinishedTip">
          <div class="layer_cont">您还有未完成的订单，请先完成当前的订单哦</div>
          <div class="layer_btn">
            <a href="javascript:;" class="btn_ok" @click="closeLayer">好的</a>
          </div>
        </div>
      </div>
      <!-- 未完成订单提示 -->
      <!-- 取消订单确认提示 -->
      <div slot="page_layer">
        <div class="shadow" v-if="isShowConfirCancelOrderTip"></div>
        <div class="layer_confirm" v-if="isShowConfirCancelOrderTip">
          <div class="layer_cont">取消该咨询订单？</div>
          <div class="layer_btn">
            <a href="javascript:;" class="btn_ok" @click="doCancelOrder">取消订单</a>
            <a href="javascript:;" class="btn_ok" @click="()=>{ this.isShowConfirCancelOrderTip = false; }">不了</a>
          </div>
        </div>
      </div>
      <!-- 取消订单确认提示 -->

      <!-- 保存成功 -->
      <div class="success_tip" v-if="isCancelOrderSuccess">
        <em></em>取消成功
      </div>
      <!-- 保存成功end -->
      <!-- 保存成功 -->
      <div class="failed_tip" v-if="isCancelOrderFailed">
        <em></em>取消失败
      </div>
      <!-- 保存成功end -->

    </div>
  </div>
</template>
<script>
  import {
    commonMixin
  } from "@/mixins";
  import conHeader from "@/components/header-on/Header";
  import doctorService from "@/services/doctorService.js";
  import actionSheet from "@/iwen/actionSheet/actionSheet";
  import sysService from "@/services/sysService.js";
  // import loadingBtn from "@/components/loading-btn-top/loading-btn-top";
  import Load from "./images/loading.gif";
  import orderFootStatus from "./components/order_foot_status";
  import phoneService from "@/services/phoneService.js";
  export default {
    mixins: [commonMixin],
    components: {
      conHeader,
      actionSheet,
      orderFootStatus
    },
    data() {
      return {
        dId: "",
        isShowUnFinishedTip: false,
        sentCont: "",
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
          departId: ""
        },
        dialougeList: [],
        orderCurrentDetal: {
          orderStatus:"",
          remainTime:0,
        },
        curPage: 1,
        pageSize: 10,
        pageCount: 0,
        totalCount: 0,
        loading: false,
        loadingText: "加载更多",
        isReachEnd: false,
        Load,
        state: 0,
        top: 0,
        isLoadMore: false,
        orderDownTime: 0,
        orderTimeH: 0,
        orderTimeM: 0,
        orderTimeS: 0,
        isOverTime: false,
        refreshTimer: false,
        refreshIngQuestion: false,
        allQuestionListCount: 0,
        allQuestionList: [],
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
        },
        ]
      };
    },
    watch:{
      sentCont(val){
        $.each($(".autoEdit"), function(i, n){
          if(val==""){
            $(n).css("height", 36 + "px");
          }else{
            console.log(n.scrollHeight);
            if(n.scrollHeight<= 90){
              $(n).css("height", n.scrollHeight + "px");
            }
          }
        });
      },
      "orderCurrentDetal.orderStatus"(orderStatus){
        console.log(orderStatus);
        if(orderStatus=="10001"||orderStatus=="70001"){
          if(this.orderCurrentDetal.remainTime==0) return;
          this.orderDownTime = this.orderCurrentDetal.remainTime;
          this.getCountdown();
        }else{
          this.orderCurrentDetal.remainTime == 0;
        }
      }
    },
    computed: {
      isChecked() {
        let is = false;
        if (this.sentCont != "") {
          is = true;
        }
        return is;
      },
      //有未支付订单 则不允许发起
      isHasUnFinishOrder() {
        let isBoolen = this.allQuestionList.some((item) => {
          return item.type == "30001" && (item.orderStatus == "10001" || item.orderStatus == "20001");
        });
        console.log(isBoolen);
        // return false;
        return isBoolen;
      }
    },
    created() {
      this.dId = this.$route.params.dId;
      this.getDocinfo();
      this.qryQuestion("loadFirst");

      this.refreshTimer = setInterval(() => {
        this.refreshQuestion();
      }, 2000);

      // this.getAllQuestion();
    },
    mounted() {
      $("#dialouge_box")
        .get(0)
        .addEventListener("scroll", this.loadMore);

      //兼容ipone6键盘弹起空白  
      // document.body.addEventListener("focusout",()=>{
      //   setTimeout(()=>{
      //     const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
      //     window.scroll(0, Math.max(scrollHeight - 1 , 0));
      //   },100);
      // });
    },
    // updated() {
    //   if (!this.isLoadMore) {
    //     this.scrollToBottom();
    //   }
    // },
    beforeDestroy() {
      clearInterval(this.timer);
      clearInterval(this.refreshTimer);
      try {
        $("#dialouge_box")
          .get(0)
          .removeEventListener("scroll", this.loadMore);
      } catch (error) {
        console.log("");
      }
    },
    methods: {
      cancelOrder(index) {
        this.cancelOrderParams.index = index;
        this.cancelOrderParams.orderId = this.dialougeList[index].orderId;
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
        _hmt.push(["_trackEvent", "cancelOrderButtonClick", "点击取消订单"]);
        let This = this;
        phoneService.cancelTelephoneOrder({
          orderId: this.cancelOrderParams.orderId,
          cancelReason: this.cancelOrderParams.reason,
        })
          .then((res) => {
            This.isShowConfirCancelOrderTip = false;
            if (res.status == 200 && res.data) {
              This.isCancelOrderSuccess = true;
              This.dialougeList[This.cancelOrderParams.index].orderStatus = "30001";
              This.orderDownTime = 0;
              // This.dialougeList.push(res.data.dialogue[0]);
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
      getAllQuestion() {
        let This = this;
        phoneService
          .getDialogue({
            doctorId: This.dId,
            patientId: this.VX_userInfo.id,
            page: 1,
            pageSize: 1
          })
          .then(res => {
            if (res.status == 200 && res.data) {
              This.allQuestionListCount = parseInt(res.total);
            }
          })
          .then((res) => {
            console.log(This.allQuestionListCount);
            phoneService
              .getDialogue({
                doctorId: This.dId,
                patientId: This.VX_userInfo.id,
                page: 1,
                pageSize: This.allQuestionListCount == 0 ? 1 : This.allQuestionListCount
              })
              .then(res => {
                if (res.status == 200 && res.data) {
                  let newList = res.data;
                  This.allQuestionList = newList;
                }
              });
          });
      },
      // 获取添加滚动事件的元素
      getScrollEle() {
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        var scrollEle = null;
        if (isiOS && platformInfo.isWeibo) {
          scrollEle = "#wrapper__inner";
        } else {
          scrollEle = window;
        }
        return scrollEle;
      },
      scrollToBottom() {
        this.$nextTick(function () {
          let wrapper_inner = $("#dialouge_box").get(0);
          wrapper_inner.scrollTop = wrapper_inner.scrollHeight;
        });
      },
      getDocinfo() {
        let This = this;
        doctorService.doc_info({
          docId: this.dId
        }).then(res => {
          if (res.code == 0 && res.data) {
            This.docInfo = res.data;
          }
        });
      },
      toOrder() {
        if (!this.isHasUnFinishOrder) {
          this.$router.push({
            name: "consultInfo"
          });
        } else {
          this.isShowUnFinishedTip = true;
        }
      },
      closeLayer() {
        this.isShowUnFinishedTip = false;
      },
      toPay(status, id) {
        console.log(status);
        console.log(id);
        // if (status == "10001" || status == "20001") {}
        this.$router.push({
          name: "phone_orderDetail", //phone.Payment
          params: {
            orderId: id //businessId
          },
          query: {
            dId: this.dId
          }
        });
      },


      //空格换行转化
      formatContent(){
        this.dialougeList.map((item)=>{
          if(item.content && item.content!=""){
            item.content = utils.replaceSpaceTag(utils.replaceBrTag(item.content));
          }
        });
      },
      refreshQuestion() {
        if (this.refreshIngQuestion) return;
        this.refreshIngQuestion = true;
        // console.log("刷新");
        let This = this;
        phoneService
          .getDialogue({
            doctorId: This.dId,
            patientId: This.VX_userInfo.id,
            page: 1,
            pageSize: This.totalCount + 10
          })
          .then(res => {
            if (res.status == 200 && res.data) {
              //如果数据量相等 则证明没有新信息
              if (res.data.total <= This.totalCount) {
                console.log("没有新数据");
              } else {
                console.log("有新数据");
                if(res.data.order){
                  let order = res.data.order;
                  This.orderCurrentDetal.orderStatus = order.orderStatus; //获取最新订单状态
                  This.orderCurrentDetal.remainTime = order.remainTime; //获取最新订单时间
                }
                console.log(This.orderCurrentDetal);

                if(This.orderCurrentDetal.index){//更新前者订单
                  let orderIndex = This.orderCurrentDetal.index;
                  console.log(This.orderCurrentDetal.orderStatus);
                  This.dialougeList[orderIndex].orderStatus = This.orderCurrentDetal.orderStatus;
                  console.log(This.dialougeList);
                  // This.orderCurrentDetal.index = null;//清空
                }

                let newDataList = res.data.list;
                // res.data = res.data.list.reverse();
                for (let index = This.totalCount; index < newDataList.length; index++) {
                  const element = newDataList[index];
                  This.dialougeList.push(element);
                }
                This.formatContent();//内容换行空格转化
                This.getCurrentOrder(This.dialougeList);//获取最新订单
                This.totalCount = parseInt(res.data.total);
              }
            }
            if (res.code == 400) {
              clearInterval(this.refreshTimer);
            }
          })
          .catch(() => {})
          .finally(() => {
            This.refreshIngQuestion = false;
          });
      },
      qryQuestion(type) {
        if (this.loading || this.isReachEnd) return;
        this.loading = true;
        let This = this;
        phoneService
          .getDialogue({
            doctorId: This.dId,
            patientId: this.VX_userInfo.id,
            pageNum: This.curPage,
            pageSize: This.pageSize
          })
          .then(res => {
            This.loading = false;
            if (res.status == 200) {
              if(res.data.order){
                let order = res.data.order;
                This.orderCurrentDetal.orderStatus = order.orderStatus; //获取最新订单状态
                This.orderCurrentDetal.remainTime = order.remainTime; //获取最新订单时间
              }
              // let list = res.data.list.reverse();
              let list = res.data.list;
              This.dialougeList = list.concat(This.dialougeList);
              This.formatContent();//内容换行空格转化
              This.getCurrentOrder(This.dialougeList);//获取最新订单
              This.$previewRefresh();

              This.totalCount = parseInt(res.data.total);
              This.pageCount = Math.ceil(res.data.total / This.pageSize);
              if (This.curPage > This.pageCount) {
                This.isReachEnd = true;
                This.loadingText = "";
              } else {
                This.isReachEnd = false;
              }
              This.curPage += 1;

              if(type=="loadFirst"){
                This.scrollToBottom();
              }
            }
          })
          .catch(() => {
            This.loading = false;
            if(type=="loadFirst"){
              this.scrollToBottom();
            }
          });
      },
      getCurrentOrder(newList){
        let This = this;
        newList.map((item,index)=>{
          if(item.type == "30001"&&["10001","20001","70001"].includes(item.orderStatus)){
            This.orderCurrentDetal.index = index;
            //倒计时 > 0 执行倒计时
            if (item.remainTime > 0 && ["10001","70001"].includes(item.orderStatus)) {
              console.log(This.orderCurrentDetal.remainTime);
            } else {
              if(item.orderStatus=="10001"||item.orderStatus=="70001"){
                // 已超时显示已超时
                item.orderStatus = "50001";
                This.dialougeList[index].orderStatus = "50001";
              }
            }
          }
        });
      },
      //倒计时
      getCountdown() {
        let This = this;
        This.timer = setInterval(function () {
          if (This.orderDownTime > 0) {
            This.orderTimeH = Math.floor(This.orderDownTime / 1000 / 60 /60);
            This.orderTimeM = Math.floor(This.orderDownTime / 1000 / 60 % 60);
            This.orderTimeS = Math.floor(This.orderDownTime / 1000 % 60);
            This.orderDownTime = This.orderDownTime - 1000;
          } else {
            clearInterval(This.timer);
            This.isOverTime = true;
          }
        },1000);
      },
      sentMessage() {
        let This = this;
        if (utils.trim(This.sentCont) == "") {
          This.$toast.tip("不能发送空白消息~");
          return;
        }
        let params = {
          type: "20001",
          content: This.sentCont
        };
        this.sentMessageSubmit(params);
      },
      loadMore() {
        let wrapper_inner = $("#dialouge_box").get(0);
        if (wrapper_inner.scrollTop <= 0) {
          this.isLoadMore = true;
          this.qryQuestion();
          wrapper_inner.scrollTop = 0;
        }
      },
      backToLastPage() {
        let backto = this.$route.query.backto;
        if (backto == "docRome") {
          this.$router.push({
            name: "docIndex",
            params: {
              dId: this.dId
            }
          });
        } else {
          this.router_back();
        }
      },
      uploadImage(e) {
        let file = e.target.files[0];
        if (file) {
          let size = (file.size / 1024 / 1024).toFixed(2);
          if (size > 20) {
            this.$toast.tip("请发送小于20M的图片哦~");
            return;
          }
        }
        let data = new FormData();
        data.append("fileName", "");
        data.append("fileData", file);
        e.target.value = "";
        this.uploadSubmit(data);
      },
      uploadSubmit(data) {
        sysService.uploadImg(data).then(res => {
          if (res.code == 0) {
            let d = {
              type: "40001",
              images: res.picUrl,
              content: "",
            };
            this.$toast.tip("发送成功");
            this.sentMessageSubmit(d);
          } else {
            this.$toast.tip("发送消息失败");
          }
        });
      },
      //发送消息提交 消息类型 type（系统消息:10001、普通对话消息:20001、系统业务消息:30001、图片消息:40001）
      sentMessageSubmit(data) {
        if (this.loading) return;
        this.loading = true;
        let baseData = {
          doctorId: this.dId,
          patientId: this.VX_userInfo.id,
          //患者发送消息固定参数
          contentSource: "user",
          doctorIsRead: "20001",
          doctorIsVisible: "10001",
          status: "10001",
          patientIsRead: "10001"
        };
        data = Object.assign(baseData, data);
        phoneService.createDialogue(data)
          .then(res => {
            this.loading = false;
            if (res.status == 200) {
              if(res.tip&&res.tip!=""){
                this.$toast.tip(res.tip);
              }
              if(data.type == "20001"){
                this.sentCont = "";
              }
              let newList = res.data;
              this.totalCount += newList.length||0;
              newList.map((item)=>{
                item.content = utils.replaceSpaceTag(utils.replaceBrTag(item.content));
                this.dialougeList.push(item);
              });
              // this.curPage = 1;
              // this.pageSize= 10;
              // this.dialougeList = [];
              // this.qryQuestion();
              this.scrollToBottom();
            } else {
              this.$toast.tip("发送失败，请稍后重试~");
            }
          }).catch(()=>{
            this.loading = false;
          });
      },
      toComment(item) {
        this.$router.push({
          name: "phone_comment",
          params: {
            dId: this.dId,
            orderId: item.orderId
          }
        });
      }
    }
  };

</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "./css.less";

</style>
