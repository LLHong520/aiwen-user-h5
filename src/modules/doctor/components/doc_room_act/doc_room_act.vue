<template>
  <layout class="doc-info-page">
    <!-- page_header -->
    <div slot="page_header">
      <m-header slot="page_header" title='医生诊室'>
        <span class="retrun" slot='left' @click="router_back">
          <b class="gray"></b>
        </span>
        <span class="placeholder" slot='right'>
          <span v-if="cwActInfo.activityStatus!=2&&docInfo.canCaps!=0" class="mr15" @click="share">
            <i class="icon icon-share"></i>分享</span>
        </span>
      </m-header>
    </div>
    <!-- page_header -->

    <!-- page_container -->
    <div slot="page_container" class="app_wrapper_inner">
      <div class="doc-wrapper">
        <section class="doc-wrapper-inner">
          <div class="doc-info-wrapper">
            <div class="doc-card">
              <a :href="DOC_DESC_URL+docInfo.id">
                <div class="faceImg-wrapper">
                  <div class="faceImg">
                    <img :src="GET_IMG_URL(docInfo.photo,'doc')" alt="爱问医生">
                  </div>
                </div>
                <div class="doc-info">
                  <div class="info">
                    <span class="name">{{docInfo.realName}}</span>
                    <span class="doc-title">{{docInfo.departments}}&nbsp;{{docInfo.titles}}</span>
                  </div>
                  <div class="hos">{{docInfo.workUnit}}</div>
                </div>
                <div class="free-num">
                  <span class="bg"></span>
                  <span class="number">{{docInfo.canCaps}}</span>
                  <span class="text">咨询名额</span>
                </div>
              </a>
            </div>
            <div class="doc-desc">
              <p class="desc-text">
                <label>擅长：</label>{{docInfo.areasOfExpertise}}
              </p>
            </div>
            <div class="doc-data">
              <ul>
                <li>
                  <span class="number">{{docInfo.answerNum}}</span>
                  <span class="text">服务人次</span>
                </li>
                <li>
                  <span class="number">{{docInfo.grade}}</span>
                  <span class="text">好评率</span>
                </li>
                <li>
                  <span class="number">{{(docInfo.answersRate)+"%"}}</span>
                  <span class="text">作答率</span>
                </li>
                <li>
                  <span class="number">{{docInfo.rankCount}}</span>
                  <span class="text">公益之星</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <div v-if="cwActInfo.id" class="act-title-wrapper">
          <div class="act-title">
            <div class="act">
              【
              <span v-if="cwActInfo.activityType=='DOCTORDAY'">爱医日</span>
              <span v-if="cwActInfo.activityType=='HEALTHDAY'">健康日</span>
              <span v-if="cwActInfo.activityType=='CLINICDAY'">义诊日</span>】 {{cwActInfo.title}}
              <!--：限量名额问医生-->
            </div>
          </div>
        </div>
        <section class="act-time-wrapper" v-if="cwActInfo.id">
          <!-- 活动未开始 -->
          <div v-if="cwActInfo.activityStatus==1" class="act-time-bg no-start" :class="{'cancel-bg':cwActInfo.remind}">
            <div class="act-time clearfix">
              <div class="con-txet">
                <p class="time">{{timeInfo.start_remainingTime}}</p>
                <!--cwActInfo.startTime-->
                <p class="text">有限免费咨询名额，设置提醒不错过</p>
              </div>
              <div class="set-remind" :class="{'cancel-remind':cwActInfo.remind}">
                <span v-if="!cwActInfo.remind" @click="setRemind" class="set-btn">设置提醒</span>
                <span v-else @click="cancelRemind" class="cancel-btn">✔已设置</span>
              </div>
            </div>
          </div>

          <!-- 活动进行中-->
          <div v-if="cwActInfo.activityStatus==0">
            <!--医生没有名额-->
            <template v-if="docInfo.canCaps==0">
              <div class="act-time-bg ask-wrapper">
                <div class="act-time clearfix">
                  <div class="con-txet">
                    <p class="time">距结束：{{timeInfo.remainingTime}}</p>
                    <p class="text">来晚啦~医生免费名额已抢完</p>
                  </div>
                  <div class="to-ask free">
                    <a href="javascript:;" @click="toConsult" class="price yuan">
                      立即咨询￥{{docInfo.qPrice}}
                    </a>
                  </div>
                </div>
              </div>
            </template>
            <!-- 医生有名额 -->
            <template v-else>
              <!-- 未登录(医生有名额) -->
              <template v-if="!VX_islogin">
                <div class="act-time-bg ask-wrapper">
                  <div class="act-time clearfix">
                    <div class="con-txet">
                      <p class="time">距结束：{{timeInfo.remainingTime}}</p>
                      <p v-if="cwActNumber.capCount==0" class="text">您还有1次免费咨询机会
                        <span class="dis-none-s">，赶紧咨询吧~</span>
                      </p>
                    </div>
                    <div class="to-ask free">
                      <a href="javascript:;" @click="toConsult">
                        <s class="price-yuan">原价￥{{docInfo.canCaps==0?docInfo.qPrice:askPrice}}</s>
                        <span class="price ask">立即咨询 ￥0</span>
                      </a>
                    </div>
                  </div>
                </div>
              </template>
              <!-- 已登录(医生有名额) -->
              <template v-else>
                <!-- 已分享（已登录&医生有名额) -->
                <template v-if="cwActNumber.isShare">
                  <div class="act-time-bg ask-wrapper">
                    <div class="act-time clearfix">
                      <div class="con-txet">
                        <p class="time">距结束：{{timeInfo.remainingTime}}</p>
                        <p v-if="cwActNumber.capCount>0&&cwActNumber.capCount<3" class="text">您还有{{cwActNumber.capCount}}次免费咨询机会
                          <span class="dis-none-s">，赶紧咨询吧~</span>
                        </p>
                        <p v-else class="text">本期2个免费名额已用完~</p>
                      </div>
                      <div class="to-ask free">
                        <a v-if="cwActNumber.capCount>0&&cwActNumber.capCount<3" href="javascript:;" @click="toConsult">
                          <s class="price-yuan">原价￥{{docInfo.canCaps==0?docInfo.qPrice:askPrice}}</s>
                          <span class="price ask">立即咨询 ￥0</span>
                        </a>
                        <a v-else href="javascript:;" @click="toConsult" class="price yuan">
                          立即咨询￥{{docInfo.qPrice}}
                        </a>
                      </div>
                    </div>
                  </div>
                </template>
                <!-- 未分享（已登录&医生有名额) -->
                <template v-if="!cwActNumber.isShare">
                  <!--用户用完一次名额-->
                  <template v-if="cwActNumber.capCount==0">
                    <div class="act-time-bg going">
                      <div class="act-time clearfix">
                        <div class="con-txet">
                          <p class="time">距结束：{{timeInfo.remainingTime}}</p>
                          <p class="text">分享可获1次免费咨询机会
                            <span class="dis-none-s">，赶紧分享吧~</span>
                          </p>
                        </div>
                        <div class="set-remind">
                          <span @click="share" class="set-btn">立即分享</span>
                        </div>
                      </div>
                    </div>
                  </template>
                  <!--用户没有使用名额-->
                  <template v-if="cwActNumber.capCount>0&&cwActNumber.capCount<3">
                    <div class="act-time-bg ask-wrapper">
                      <div class="act-time clearfix">
                        <div class="con-txet">
                          <p class="time">距结束：{{timeInfo.remainingTime}}</p>
                          <p class="text">您还有{{cwActNumber.capCount}}次免费咨询机会
                            <span class="dis-none-s">，赶紧咨询吧~</span>
                          </p>
                        </div>
                        <div class="to-ask free">
                          <a href="javascript:;" @click="toConsult">
                            <s class="price-yuan">原价￥{{docInfo.canCaps==0?docInfo.qPrice:askPrice}}</s>
                            <span class="price ask">立即咨询 ￥0</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </template>
                </template>
              </template>
            </template>
          </div>

          <!-- 活动已结束 -->
          <div v-if="cwActInfo.activityStatus==2" class="act-end-wrapper">
            <a @click="endConsultHandler" href="javascript:;" class="price-ask">
              原价咨询 ￥{{docInfo.qPrice}}
            </a>
            <div class="remark">当前活动已结束，你可以付费问诊该医生哦~</div>
          </div>
        </section>
        <section v-if="comments.length>0" class="p15">
          <div class="comment-wrapper">
            <div class="comment-title">
              <label class="text">用户好评</label>
              <span class="stars">
                <em v-for="n in 5" :key="n.key" class="icon-stars"></em>5.0
              </span>
            </div>
            <div class="comment-list-wrapper">
              <ul class="comment-list">
                <li class="comment-item" v-for="(commentItem,index) in comments" :key="index">
                  <div class="user-info">
                    <div class="user">
                      <span class="faceImg">
                        <img :src="GET_IMG_URL(commentItem.headImg,'u')" alt="爱问医生">
                      </span>
                      <span class="name">{{commentItem.nickname | hideName}}</span>
                    </div>
                    <div class="time">{{commentItem.contentTime}}</div>
                  </div>
                  <div class="stars">
                    <em v-for="n in commentItem.stars" :key="n.key" class="icon-stars"></em>
                  </div>
                  <div class="comments">{{commentItem.content}}</div>
                </li>
              </ul>
              <div class="view-more">
                <router-link :to="{ name: 'docComments', query: { dId: dId}}">查看更多</router-link>
              </div>
            </div>
          </div>
        </section>
        <section class="achievement" v-if="achievement.list.length>0">
          <div class="title">往期成就</div>
          <ul class="achievement-list clearfix">
            <li v-for="(item,index) in achievement.list" :key="index">
              <a href="javascript:;" class="achievement-item">
                <div class="achievement-name">
                  <p class="name" v-if="item.activityType=='DOCTORDAY'">爱医日</p>
                  <p class="name" v-if="item.activityType=='HEALTHDAY'">健康日</p>
                  <p class="name" v-if="item.activityType=='CLINICDAY'">义诊日</p>
                  <p class="text">{{item.activityTitle}}</p>
                </div>
                <div class="achievement-rank">
                  <div class="name clearfix">
                    <span class="rank fl">公益排名</span>
                    <span class="number fr">{{item.ranking}}</span>
                  </div>
                  <div class="name clearfix">
                    <span class="rank fl">获得爱心点</span>
                    <span class="number fr">{{item.lovePoint}}</span>
                  </div>
                </div>
              </a>
            </li>
          </ul>
          <div class="loading-btn-wrapper">
            <loading-btn :loading="achievement.loading" :title="achievement.text" @loadFn="getAchievement">
            </loading-btn>
          </div>
          <!-- <div class="view-more"><a href="">查看更多</a></div> -->
        </section>
        <div class="go-back-wrapper">
          <a :href="CW_ACT_Index+activityId">
            <span class="img-box">
              <img src="./images/pic-doctor@2x.png" alt="爱问医生">
            </span>
            <span class="text">点击返回活动会场</span>
            <span class="icon-go-back"></span>
          </a>
        </div>
      </div>
    </div>
    <!-- /page_container -->
    <!-- page_footer -->
    <div slot="page_footer">
      <div v-if="cwActInfo.activityStatus==1&&!cwActInfo.remind">
        <div class="btn-bar">
          <a href="javascript:;" @click="setRemind">设置活动提醒</a>
        </div>
        <div v-if="showFixedTip" class="fixed-service-tip">
          <span class="close-fix-tip" @click="hideFixedTip">×</span>
          <div class="text">
            <p>{{timeInfo.start_remainingTime}}</p>
            <p>该医生名额有限，赶紧设置活动提醒~抢免费咨询</p>
          </div>
        </div>
      </div>
      <!-- 确认取消设置提醒 -->
      <confirm ref="confirm" title="确定取消【设置提醒】？" text="活动开始后您将无法收到活动信息通知" @confirm="confirm_cancel_remind"></confirm>
      <!-- 分享弹窗 -->
      <share :show.sync="share_show" @cancel="cancelShare" @confirm="confirmShare"></share>
      <!-- 分享弹窗 -->
      <!-- 微博分享 -->
      <share-sina :show.sync="share_con_show" @cancel="cancelShareCon" @confirm="confirmShareCon" :conInfo="shareSinaInfo"></share-sina>
      <!-- 微博分享 -->
      <!-- 微信分享 -->
      <share-wechat :show.sync="show_wechatShare"></share-wechat>
      <!-- /微信分享 -->
      <!-- 微信二维码 -->
      <div class="wx_code_wrapper" @click="toogleWxCode" v-show="showWxCode">
        <div class="wx_code">
          <img :src="GET_IMG_URL(docInfo.weixinCard)" alt="">
        </div>
      </div>
      <!-- /微信二维码 -->
      <loading-page v-show='initing_page'></loading-page>
      <alert-tip alertText="医生的咨询名额已用完" confirmText="我知道了" @closeTip="toogleAlertTip" v-show='showAlertTip'></alert-tip>
    </div>
  </layout>
</template>
<script>
  import {
    LINK_CARD_BASE_URL,
    APP_URL,
    CW_ACT_Index,
    DOC_DESC_URL
  } from "@/config";
  import Header from "@/components/header/Header";
  import conHeader from "@/components/con-header/con-header";
  import alertTip from "@/iwen/alertTip/alertTip";
  import confirm from "@/iwen/confirm/confirm";
  import loadingBtn from "@/components/loading-btn/loading-btn";
  import shareFns from "@/common/share";
  import share from "@/iwen/share/share";
  import shareSina from "@/iwen/share-sina/share-sina";
  import shareWechat from "@/iwen/share-wechat/share-wechat";
  import {
    commonMixin,
    toTopMixin,
    shareMixin
  } from "@/mixins";
  import sysService from "@/services/sysService.js";
  import doctorService from "@/services/doctorService.js";
  export default {
    name: "doc-room-act",
    mixins: [commonMixin, toTopMixin, shareMixin],
    data() {
      return {
        dId: "",
        activityId: "",
        CW_ACT_Index,
        APP_URL,
        DOC_DESC_URL,
        showAlertTip: false,
        share_show: false,
        share_con_show: false,
        showWxCode: false,
        show_wechatShare: false,
        shareSinaInfo: {
          sharedContent: "",
          sharedImg: "",
        },
        docInfo: {
          id: "",
          photo: "",
          realName: "...",
          departments: "...",
          titles: "...",
          answerNum: 0,
          grade: "0%",
          answersRate: "0",
          rankCount: "0",
          qCaps: 0,
          workUnit: "...",
          areasOfExpertise: "...",
        },
        cwActInfo: {},
        timeInfo: {
          remainingTime: "00天00小时00分00秒", //活动剩余时间
          start_remainingTime: "00天00小时00分00秒", //距活动开始时间
          timer: null,
        },
        cwActNumber: {
          capCount: 0,
          isShare: false,
          canCapCount: 0
        },
        showFixedTip: true,
        achievement: {
          list: [],
          more: true,
          loading: false,
          text: "查看更多",
          nowPage: 1
        },
        comments: [],
      };
    },
    components: {
      mHeader: Header,
      alertTip,
      conHeader,
      loadingBtn,
      confirm,
      share,
      shareSina,
      shareWechat
    },
    computed: {
      askPrice() {
        return this.docInfo.qPrice < 58 ? 58 : this.docInfo.qPrice;
      }
    },
    created() {
      this.initPage();
      this.USER_BEHAVIOR_DATA_RECORD({
        contentId: this.$route.params.dId,
        contentType:"7",
        sceneId:this.activityId,
        scene:0,
        actionType:0
      });
    },
    watch: {
      VX_islogin(islogin){
        if (islogin) {
          this.getAskNumber();
        }
      }
    },
    methods: {
      initPage() {
        // document.body.parentNode.style.backgroundColor = "#FEFBF0";
        document.getElementsByTagName("html")[0].classList.add("skin_act_doc");
        this.dId = this.$route.params.dId;
        if (this.$route.query.activityId) {
          this.activityId = this.$route.query.activityId;
        }
        this.getDocinfo();
        this.getdocComments();
        this.getAchievement();
        this.getCommonwealActivity();
        this.getAskNumber();
      },
      toConsult() {
        if (!this.checkLogin()) return;
        //是否绑定手机
        if (!this.VX_isBindMobile) {
          this.$router.push({
            name: "bindMobile",
            query: {
              refer: this.$route.fullPath
            }
          });
          return;
        }
        let consultUrl = this.GET_CONSULT_URL(this.docInfo.id, this.cwActInfo.activityType, this.cwActInfo.id);
        //是否有免费咨询名额
        let isHasAskNum = this.cwActNumber.capCount > 0 && this.cwActNumber.capCount < 3 ? true : false;
        // console.log("1111");
        // return;
        //判断是否有名额
        if ((!isHasAskNum || this.docInfo.canCaps == 0) && this.docInfo.qCaps == 0) {
          this.toogleAlertTip();
        } else {
          window.location.href = consultUrl;
        }
      },
      endConsultHandler() {
        if (!this.checkLogin()) return;
        //是否绑定手机
        if (!this.VX_isBindMobile) {
          this.$router.push({
            name: "bindMobile",
            query: {
              refer: this.$route.fullPath
            }
          });
          return;
        }
        let consultUrl = this.GET_CONSULT_URL(this.docInfo.id, this.cwActInfo.activityType, this.cwActInfo.id);
        //判断是否有名额
        if (this.docInfo.qCaps == 0) {
          this.toogleAlertTip();
        } else {
          window.location.href = consultUrl;
        }
      },
      toogleAlertTip() {
        this.showAlertTip = !this.showAlertTip;
      },
      toogleWxCode() {
        this.showWxCode = !this.showWxCode;
      },
      focusDoc() {
        let _this = this;
        doctorService.focusDoc({
          docId: _this.dId,
        })
          .then((res) => {
            if (res.code == 0) {
              console.log("已关注该医生");
            }
          });
      },
      setRemind() {
        if (!this.checkLogin()) return;
        //是否绑定手机
        if (!this.VX_isBindMobile) {
          this.$router.push({
            name: "bindMobile",
            query: {
              refer: this.$route.fullPath
            }
          });
          return;
        }
        let _this = this;
        doctorService.setRemind({
          activityId: _this.activityId
        })
          .then((res) => {
            if (res.code == 0) {
              _this.$toast.tip("设置提醒成功~");
              _this.cwActInfo.remind = true;
              _this.focusDoc();
            }
          });
      },
      cancelRemind() {
        this.$refs.confirm.show();
      },
      confirm_cancel_remind() {
        if (!this.checkLogin()) return;
        let _this = this;
        doctorService.cancelRemind({
          activityId: _this.activityId
        })
          .then((res) => {
            if (res.code == 0) {
              _this.$toast.tip("取消提醒成功~");
              _this.cwActInfo.remind = false;
            }
          });
      },
      hideFixedTip() {
        this.showFixedTip = false;
      },
      getAchievement() {
        if (this.achievement.loading || !this.achievement.more) return;
        this.achievement.loading = true;
        let _this = this;
        let data = {
          docId: _this.dId,
          pageIndex: _this.achievement.nowPage,
          pageSize: 6
        };
        doctorService.achievement(data).then((res) => {
          _this.achievement.loading = false;
          if (res.code == 0 && res.data) {
            _this.achievement.list = _this.achievement.list.concat(res.data);
            _this.achievement.nowPage += 1;
            let pageCount = Math.ceil(res.totalCount / data.pageSize);
            if (_this.achievement.nowPage > pageCount) {
              _this.achievement.more = false;
              _this.achievement.text = "没有更多内容了";
            } else {
              _this.achievement.more = true;
            }
          } else {
            _this.achievement.more = false;
            _this.achievement.text = "没有更多内容了";
          }
        });
      },
      getCommonwealActivity() {
        let This = this;
        doctorService.commonwealAct({
          docId: This.dId,
          activityId: This.activityId
        }).then((res) => {
          if (res.code == 0 && res.data) {
            This.cwActInfo = res.data;
            if (This.cwActInfo.activityStatus == 0 || This.cwActInfo.activityStatus == 1) {
              console.log("未开始||已结束");
              This.startTimer();
            }
          }
        });
      },
      startTimer() {
        let _this = this;
        this.timeInfo.timer = setInterval(() => {
          let now = new Date();
          let startTime = new Date(_this.cwActInfo.startTime.replace(/-/g,"/")).getTime();
          let endTime = new Date(_this.cwActInfo.endTime.replace(/-/g,"/")).getTime();
          // new Date("2010-03-15 10:30:00".replace(/-/g,'/')).getTime();
          // let startTime = new Date(_this.cwActInfo.startTime).getTime();
          // let endTime = new Date(_this.cwActInfo.endTime).getTime();
          let startOfCount = startTime - now.getTime();
          let endOfCount = endTime - now.getTime();
          //计算距结束时间
          let minutes = endOfCount / (1000 * 60);
          let hours = minutes / 60;
          let days = hours / 24;
          let db_time_str = "";
          if (days > 1) {
            db_time_str += parseInt(days) + "天";
          }
          if (parseInt(hours % 24) > 0) {
            db_time_str += parseInt(hours % 24) + "小时";
          }
          if (minutes % 60 > 0) {
            db_time_str += parseInt(minutes % 60) + "分";
          }
          if ((endOfCount / 1000) % 60 > 0) {
            db_time_str += parseInt((endOfCount / 1000) % 60) + "秒";
          }
          _this.timeInfo.remainingTime = db_time_str;

          //计算距开始时间(小于3天)
          let minutes_start = startOfCount / (1000 * 60);
          let hours_start = minutes_start / 60;
          let days_start = hours_start / 24;
          let db_time_str_s = "";
          if (days_start > 1) {
            db_time_str_s += parseInt(days_start) + "天";
          }
          if (parseInt(hours_start % 24) > 0) {
            db_time_str_s += parseInt(hours_start % 24) + "小时";
          }
          if (minutes_start % 60 > 0) {
            db_time_str_s += parseInt(minutes_start % 60) + "分";
          }
          if ((startOfCount / 1000) % 60 > 0) {
            db_time_str_s += parseInt((startOfCount / 1000) % 60) + "秒";
          }
          //小于3天显示倒计时否则显示开始时间
          if (days_start <= 3) {
            _this.timeInfo.start_remainingTime = `距开始：${db_time_str_s}`;
          } else {
            _this.timeInfo.start_remainingTime = `活动开始时间：${_this.cwActInfo.startTime.split(" ")[0]}`;
          }
          //判断是否已开始
          if (startOfCount <= 0) {
            if (endOfCount > 0) {
              _this.cwActInfo.activityStatus = 0; //进行中
            } else {
              _this.cwActInfo.activityStatus = 2; //已结束
              clearInterval(_this.timeInfo.timer);
            }
          }
        }, 1000);
      },
      getAskNumber() {
        if (!this.VX_islogin) return;
        let This = this;
        doctorService.askNumber({
          activityId: This.activityId,
          docId: This.dId
        }).then((res) => {
          if (res.code == 0 && res.data) {
            This.cwActNumber = res.data;
          }
        });
      },
      wxShareCall() {
        let This = this;
        doctorService.wxShareCallBack({
          businessId: This.activityId,
          businessType: "awyh_commonwealactive",
          channer: ""
        }).then((res) => {
          if (res.code == 0) {
            This.getAskNumber();
            console.log("微信分享回调成功");
          }
        });
      },
      getdocComments() {
        let This = this;
        doctorService.doc_comments({
          pageIndex: 1,
          docId: This.dId,
          pageSize: 3,
        }).then((res) => {
          if (res.code == 0 && res.data) {
            This.comments = This.comments.concat(res.data);
          }
        });
      },
      getDocinfo() {
        let This = this;
        doctorService.doc_info({
          docId: This.dId,
          activityId: This.activityId
        })
          .then(res => {
            if (res.code == 0 && res.data) {
              This.docInfo = res.data;
              This.SET_PAGE_TITLE(This.docInfo.realName + "的个人诊室");
              if(platformInfo.isWx){
                This.setShareInfo();
              }
              return true;
            }
          });
      },
      checkLogin() {
        if (!this.VX_islogin) {
          this.goLogin(this.$route.fullPath);
          return false;
        } else {
          return true;
        }
      },
      checkNikeAndMobile() {
        //是否编辑昵称
        if (!this.VX_isNickEdited) {
          this.$router.push("/nike_name?refer=" + this.$route.fullPath);
          return false;
        } else if (!this.VX_isBindMobile) {
          this.$router.push("/bind_mobile?refer=" + this.$route.fullPath);
          return false;
        } else {
          return true;
        }
      },
      statistics_pv() {
        let This = this;
        doctorService.addLogRecord({
          pageType: "ACTIHOMEPAGE",
          actionType: "ACTIVITYSHARE",
          doctorId: This.dId,
          businessId: This.activityId,
          channel: "01HZ00000600023000"
        })
          .then(res => {
            if (res.code == 0) {
              console.log("pv统计");
            }
          });
      },
      statistics_uv() {
        let This = this;
        doctorService.actionRecord({
          departId: This.docInfo.departId,
          actionType: "Action0003",
          sceneType: "GY"
        })
          .then(res => {
            if (res.code == 0) {
              console.log("uv统计");
            }
          });
      },
      /* **分享开始 */
      cancelShare() {
        this.share_show = false;
      },
      share() {
        if (platformInfo.isWx) {
          this.share_show = true;
        } else {
          if (!this.checkLogin()) return;
          this.share_con_show = true;
          // this.wxShareCall();
        }
        this.shareSinaInfo.sharedContent =
          `#${this.cwActInfo.title}# ${this.docInfo.realName}医生参与本期活动，名额有限，先到先得，快来向Ta咨询吧~`;
        this.shareSinaInfo.sharedImg = this.GET_IMG_URL(this.docInfo.photo);
      },
      confirmShare(params) {
        if (params.type == "wx") {
          this.show_wechatShare = true;
          return;
        } else if (params.type == "wb") {
          if (!this.VX_islogin) {
            this.goLogin(this.$route.fullPath);
            return;
          }
          this.share_show = false;
          this.share_con_show = true;
        }
      },
      cancelShareCon() {
        this.share_con_show = false;
      },
      confirmShareCon(sharedContent) {
        let This = this;
        let url = LINK_CARD_BASE_URL + `/linkcard/awyh_doctorindex/${This.docInfo.id}.htm`;
        if (url.indexOf("?") >= 0) {
          url += "&channel=01HZ00000600011011&tag=pc&m=doctor_Index&n=" + This.docInfo.id + "&activityId=" + This.activityId;
        } else {
          url += "?channel=01HZ00000600011011&tag=pc&m=doctor_Index&n=" + This.docInfo.id + "&activityId=" + This.activityId;
        }
        sysService.wbShare({
          sharedContent: sharedContent,
            // sharedUrl:encodeURIComponent(url),
          sharedUrl: url,
            // sharedImg:This.shareSinaInfo.sharedImg
          businessId: This.activityId,
          businessType: "awyh_commonwealactive",
        })
          .then(res => {
            This.statistics_pv();
            This.statistics_uv();
            if (res.code == 0) {
              This.$toast.tip("分享成功");
              This.getAskNumber();
            }
          })
          .catch(() => {
            This.$toast.tip("分享失败");
          });
      },
      setShareInfo() {
        let This = this;
        var lineLink = location.href.split("#")[0];
        sysService.getWxConfig({
          shareURL: lineLink
        })
        .then(res => {
          if (res.appId) {
            shareFns.setConfig(res);
            return true;
          } else {
            //签名失败
            return false;
          }
        }).then((isConfig) => {
          if (isConfig) {
            let url = This.$route.fullPath;
            let momentUrl = This.$route.fullPath;
            if (url.indexOf("?") >= 0) {
              url += "&channel=02HZ00004100011011";
              momentUrl += "&channel=02HZ00004200011011";
            } else {
              url += "?channel=02HZ00004100011011";
              momentUrl += "?channel=02HZ00004200011011";
            }
            shareFns.setShareInfo({
              lineLink: This.APP_URL + url,
              momentLineLink: This.APP_URL + momentUrl,
              imgUrl: This.GET_IMG_URL(This.docInfo.photo),
              shareTitle: This.cwActInfo.title,
              descContent: `${This.docInfo.realName}医生参与本期活动，名额有限，先到先得，快来向Ta咨询吧~`,
              success: function (res) { //微信分享成功后
                if (!This.VX_islogin) return;
                This.wxShareCall();
              }
            });
          }
        });
      },
      /* **分享结束 */
    },
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  @import './css.less';

</style>
