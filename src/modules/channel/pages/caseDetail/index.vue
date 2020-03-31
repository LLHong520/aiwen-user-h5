<template >
  <layout :isAppView="true">
    <div slot="page_header" class="header_wrapper">
      <m-header  title=" " :isShowInApp="true">
        <a href="javascript:;" slot="left" class="back" @click="router_back"></a>
        <div class="right" slot="right">
          <span class="share" @click="share(false)"></span>
        </div>
      </m-header>
    </div>
    <div slot="page_container" >
      <div class="case_info">
        <h3 class="title">{{caseInfo.title}}</h3>
        <div class="author" v-if="!loading">
          <div class="img" @click="toDocRoom(caseInfo.authorId)"><img v-lazy="GET_IMG_URL(caseInfo.headPic,'doc')"></div>
          <div class="txt">
            <dl>
              <dt><span class="name" @click="toDocRoom(caseInfo.authorId)">{{caseInfo.authorName}} </span>&nbsp;&nbsp;{{caseInfo.depName}}&nbsp;&nbsp;{{caseInfo.hospital}}</dt>
              <dd>{{caseInfo.createTime | dataFormat}}</dd>
            </dl>
          </div>
        </div>
        <!-- 背书机构start -->
        <div class="team" v-if="caseInfo.endorsementTeam">
          <i></i>案例内容经 <a target="_blank" :href="caseInfo.endorsementTeamLink" v-if="caseInfo.endorsementTeamLink">{{caseInfo.endorsementTeam}}</a><span v-else>{{caseInfo.endorsementTeam}}</span> 审核
        </div>
        <!-- 背书机构end -->
        <!-- 口腔模版start -->
        <template v-if="caseInfo.subDiseaseType=='1'">
          <div class="info_item">
            <div class="hd">
              <i></i>
              <h3>病史与诊断</h3>
            </div>
            <div class="bd">
              <dl>
                <dt>一般情况</dt>
                <dd>{{caseInfo.templateData.gender}}，{{caseInfo.templateData.age}}。</dd>
              </dl>
              <dl v-if="caseInfo.templateData.mainSuit">
                <dt>主诉</dt>
                <dd v-html="caseInfo.templateData.mainSuit"></dd>
              </dl>
              <dl v-if="caseInfo.templateData.cardinalSymptom">
                <dt>主要症状</dt>
                <dd v-html="caseInfo.templateData.cardinalSymptom"></dd>
              </dl>
              <dl v-if="caseInfo.templateData.price1||caseInfo.templateData.price2">
                <dt>参考价格</dt>
                <dd>¥{{caseInfo.templateData.price1}} - {{caseInfo.templateData.price2}}</dd>
              </dl>
            </div>
          </div>
          <div class="info_item" v-if="caseInfo.templateData.inspectionResult||caseInfo.templateData.schematicDesign||caseInfo.templateData.schematicAdvantages">
            <div class="hd">
              <i></i>
              <h3>诊断方案</h3>
            </div>
            <div class="bd">
              <dl v-if="caseInfo.templateData.inspectionResult">
                <dt>检查结果</dt>
                <dd v-html="caseInfo.templateData.inspectionResult"></dd>
              </dl>
              <dl v-if="caseInfo.templateData.schematicDesign">
                <dt>方案设计</dt>
                <dd v-html="caseInfo.templateData.schematicDesign"></dd>
              </dl>
              <dl v-if="caseInfo.templateData.schematicAdvantages">
                <dt>方案优势</dt>
                <dd v-html="caseInfo.templateData.schematicAdvantages"></dd>
              </dl>
            </div>
          </div>
          <div class="info_item" v-if="caseInfo.templateData.therapeuticCycle||caseInfo.templateData.therapeuticProcess||(caseInfo.templateData.effectBefore&&caseInfo.templateData.effectAfter)">
            <div class="hd">
              <i></i>
              <h3>治疗情况</h3>
            </div>
            <div class="bd">
              <dl v-if="caseInfo.templateData.therapeuticCycle">
                <dt>治疗周期</dt>
                <dd v-html="caseInfo.templateData.therapeuticCycle"></dd>
              </dl>
              <dl v-if="caseInfo.templateData.therapeuticProcess">
                <dt>治疗过程</dt>
                <dd v-html="caseInfo.templateData.therapeuticProcess"></dd>
              </dl>
              <dl v-if="caseInfo.templateData.effectBefore&&caseInfo.templateData.effectAfter">
                <dt>治疗效果</dt>
                <dd>
                  <div class="case_img" >
                    <div class="img_item"><img  v-lazy="GET_IMG_URL(caseInfo.templateData.effectBefore)" preview="1" alt=""><span class="state"><i></i>服务前</span></div>
                    <div class="img_item"><img  v-lazy="GET_IMG_URL(caseInfo.templateData.effectAfter)" preview="1" alt=""><span class="state"><i></i>服务后</span></div>
                  </div>
                </dd>
              </dl>
            </div>
          </div>
          <div class="info_item" v-if="caseInfo.templateData.analysis">
            <div class="hd">
              <i></i>
              <h3>案例总结</h3>
            </div>
            <div class="bd">
              <dl>
                <dd>
                  <div v-html="caseInfo.templateData.analysis"></div>
                </dd>
              </dl>
            </div>
          </div>
        </template>
        <!-- 口腔模版end -->

        <!-- 问诊模版start -->
        <template v-if="caseInfo.subDiseaseType=='-1'">
          <div class="info_item">
            <div class="hd">
              <i></i>
              <h3>问诊回顾</h3>
            </div>
            <div class="bd">
              <dl>
                <dt>患者情况</dt>
                <dd>{{caseInfo.gender}}，{{caseInfo.age}}。</dd>
              </dl>
              <dl v-if="caseInfo.answer.qcontent">
                <dt>病情描述</dt>
                <dd v-html="caseInfo.answer.qcontent"></dd>
              </dl>
              <dl v-if="caseInfo.answer.qneed||((caseInfo.answer.picIds||[]).length>0)">
                <dt>患者求助</dt>
                <dd v-html="caseInfo.answer.qneed"></dd>
                <dd v-if="(caseInfo.answer.picIds||[]).length>0">
                  <div class="img_list clearfix">
                    <div class="img_item" v-for="(item,index) in caseInfo.answer.picIds" :key="index">
                      <img src="./images/lock.png" @click="lockTip"  alt="" v-if="item.indexOf('rm') >= 0">
                      <img :src="GET_IMG_URL(item)" preview="1" alt="" v-else>
                    </div>
                  </div>
                </dd>
              </dl>
              <dl v-if="caseInfo.answer.acontent||((caseInfo.answer.drPicIds||[]).length>0)||caseInfo.answer.voiceURL">
                <dt>医生回答</dt>
                <dd v-if="caseInfo.answer.voiceURL">
                  <p class="audio-msg" :src="caseInfo.answer.voiceURL" :duration="caseInfo.answer.voiceLength"></p>
                </dd>
                <dd v-else v-html="caseInfo.answer.acontent"></dd>
                <dd v-if="(caseInfo.answer.drPicIds||[]).length>0">
                  <div class="img_list clearfix">
                    <div class="img_item" v-for="(item,index) in caseInfo.answer.drPicIds" :key="index">
                      <img src="./images/lock.png" @click="lockTip"  alt="" v-if="item.indexOf('rm') >= 0">
                      <img :src="GET_IMG_URL(item)" preview="1" alt="" v-else>
                    </div>
                  </div>
                </dd>
              </dl>
              <template >
                <div v-for="(item,index) in caseInfo.answer.dialogs" :key="index">
                  <div v-if="item.quest&&(item.content||item.voiceURL||(item.picIds||[]).length>0)">
                    <dl>
                      <dt>用户追问</dt>
                      <dd v-if="item.voiceURL">
                        <p class="audio-msg" :src="item.voiceURL" :duration="item.voiceLength"></p>
                      </dd>
                      <dd v-else v-html="item.content"></dd>
                      <dd v-if="(item.picIds||[]).length>0">
                        <div class="img_list clearfix">
                          <div class="img_item" v-for="(item,index) in item.picIds" :key="index">
                            <img src="./images/lock.png" @click="lockTip"  alt="" v-if="item.indexOf('rm') >= 0">
                            <img :src="GET_IMG_URL(item)" preview="1" alt="" v-else>
                          </div>
                        </div>
                      </dd>
                    </dl>
                  </div>
                  <div v-else-if="item.content||item.voiceURL||(item.picIds||[]).length>0">
                    <dl>
                      <dt>医生回答</dt>
                      <dd v-if="item.voiceURL">
                        <p class="audio-msg" :src="item.voiceURL" :duration="item.voiceLength"></p>
                      </dd>
                      <dd v-else v-html="item.content"></dd>
                      <dd v-if="(item.picIds||[]).length>0">
                        <div class="img_list clearfix">
                          <div class="img_item" v-for="(item,index) in item.picIds" :key="index">
                            <img src="./images/lock.png" @click="lockTip"  alt="" v-if="item.indexOf('rm') >= 0">
                            <img :src="GET_IMG_URL(item)" preview="1" alt="" v-else>
                          </div>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div class="info_item" v-if="caseInfo.content">
            <div class="hd">
              <i></i>
              <h3>案例总结</h3>
            </div>
            <div class="bd">
              <dl>
                <dd>
                  <div v-html="caseInfo.content"></div>
                </dd>
              </dl>
            </div>
          </div>
        </template>
        <!-- 问诊模版end -->

        <!-- 其他科撰写案例 -->
        <template v-if="caseInfo.subDiseaseType=='0'">
          <!-- <div class="article_box" :class="{'overHeight':overHeight}" ref="element">
            <div v-html="caseInfo.content"></div>
          </div>
          <div class="spread" v-if="overHeight">
            展开全部<i></i>
          </div> -->
          <content-cell :content="caseInfo.content" spreadTxt="展开全部" :isArticle="true" :lines="10"></content-cell>
        </template>
        <!-- 其他科撰写案例 -->
        <div class="detail_footer" v-if="!loading">
          {{caseInfo.pv}}阅读<span v-if="!IS_IWEN_COMTY(caseInfo.firstPublishComtyId)&&caseInfo.firstPublishComtyName"> · 来自：<a :href="COMTY_BASE_URL+caseInfo.firstPublishComtyId">{{caseInfo.firstPublishComtyName}}</a></span>
        </div>
        <div class="label_box" v-if="caseInfo.diseaseTagName">
          <router-link :to="{name:'channelSearch',params:{id:channelId},query:{keywords:item}}" class="label_item" v-for="(item,index) in caseInfo.diseaseTagName.slice(0,3)" :key="index">{{item}}</router-link>
        </div>
        <!-- 点赞 start-->
        <div class="prise_box">
          <div class="prise_btn" :class="{'active':isPraise}" @click="toPraise">{{caseInfo.praisePoints||"0"}}</div>
          <p>{{isPraise?"感谢":"有帮助"}}</p>
        </div>
        <!-- 点赞 end-->
        <div class="doctor_card" v-if="!loading" @click.prevent="toDocRoom(caseInfo.authorId)">
          <div class="img"><img :src="GET_IMG_URL(docInfo.headPic,'doc')" alt=""></div>
          <div class="info">
            <div class="txt_info">
              <div class="first">
                <div class="txt">
                  <p><span class="name">{{docInfo.name}}</span>&nbsp;&nbsp;{{docInfo.title}}</p>
                  <p class="hospital" >{{docInfo.department}}&nbsp;&nbsp;{{docInfo.hospital}}</p>
                </div>
                <div class="btn_box" v-if="docInfo.services.advice"><a href="javascript:void(0);" @click.stop="toConsult(caseInfo.authorId)"><i></i>问医生 ¥{{docInfo.services.advicePrice}}</a></div>
              </div>
              <p class="goodat" v-if="docInfo.ex||docInfo.expertiseArea">擅长：{{docInfo.ex||docInfo.expertiseArea}}</p>
              <div class="service_btn" v-if="docInfo.services.register||docInfo.services.phone">
                <a href="javascript:;" v-if="docInfo.services.register">门诊预约</a><!--
                --><a href="javascript:;" v-if="docInfo.services.phone">电话咨询</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 病例回顾 -->
      <div class="case_history" v-if="caseInfo.subDiseaseType=='0'&&caseInfo.caseHistory">
        <div class="case_detail_card">
          <h3 class="title">· 病例回顾 ·</h3>
          <div class="article_box" v-html="caseInfo.caseHistory"></div>
        </div>
      </div>
      
      <!-- 病例回顾 -->

      <!-- 案例推荐 start -->
      <div class="box_wrapper top10 " v-if="(caseList||[]).length>0">
        <div class="common_hd">
          <h3>案例推荐</h3>
        </div>
        <div class="common_bd">
          <div class="case_wrapper">
            <ul class="case_list">
              <li v-for="(item,index) in caseList" :key="index">
                <case-cell :caseItem="item" ></case-cell>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 案例推荐 end -->
    </div>
    <div slot="page_footer">
      <div class="bottom"  v-if="!loading">- 这是我的底线 -</div>
      <loading-page v-show="loading"></loading-page>
    </div>
    <div slot="page_layer">
      <back-btn></back-btn>
      <!-- 分享 -->
      <m-share :show.sync="isShare" :config="shareConfig"></m-share>
    </div>
  </layout>
</template>
<script>
import {commonMixin,toTopMixin,dataCollectMixin,shareMixin} from "@/mixins";
import {
  COMTY_BASE_URL
} from "@/config";
import platformLogin from "@/common/platformFn";
import Header from "@/components/header/Header";
import caseCell from "../../components/case_cell/case_cell";
import contentCell from "../../components/content_cell/content_cell";
import backBtn from "../../components/channelIndexBtn/channelIndexBtn";
import share from "@/iwen/share-all/share.vue"; //分享
import channelService from "@/services/channelService.js";
// import share_cover from "@/assets/images/share_case.jpg";
import "@/common/audio.js";
export default {
  name: "channel",
  mixins: [commonMixin, toTopMixin,dataCollectMixin,shareMixin],
  inject: ["reload"],
  components: {
    mHeader:Header,
    caseCell,
    backBtn,
    mShare: share,  //分享
    contentCell
  },
  data() {
    return {
      COMTY_BASE_URL,
      channelId:"",
      caseId:"",
      caseInfo:{},
      loading:false,
      caseList:[],
      docInfo:{
        services: {advice: false, advicePrice: 0, phone: false, register: false}
      },
      //分享
      isShare: false,
      shareConfig: {},
      shareCont:"",
      isPraise:false,
      praiseStateLoading:false,
    };
  },
  computed: {
    
  },
  watch: {
    "$route" (to, from) {
      this.reload();
    }
  },
  created() {
    this.init();
  },
  methods: {
    init(){
      this.channelId=this.$route.params.id;
      this.caseId=this.$route.query.id;
      this.columnId=this.$route.query.columnId||"";
      this.renderDataInfo();
    },
    //分享
    share(isInit = false){
      console.log("点击了分享按钮");
      if (!isInit) {
        this.isShare = true;
      }
      this.shareConfig = {
        pid: this.columnId?this.columnId:this.channelId,
        id: this.caseId,
        type: this.columnId?"columnCase":"case",
        title: `${this.caseInfo.title} - 来自新浪健康`,
        // content: (this.shareCont||"").replace(/<[^>]+>/g, "").slice(0,100),
        content:"",
        imgUrl: "https://pic.wenwo.com/fimg/b6851d84978d66b8fae0adfac59e3ed4.jpg",
      };
    },
    renderDataInfo() {
      if(this.loading) return;
      this.loading = true;
      let data = {
        "caseId": this.caseId,
        "columnId":this.columnId,
      };
      channelService.findCaseDetail(data).then((res) => {
        this.loading=false;
        if(res.status == 200 && res.data) {
          this.caseInfo = res.data;
          console.log(this.subjectInfo);
          if(res.data.subDiseaseType=="1"){
            this.shareCont=res.data.templateData.analysis;
          }else{
            this.shareCont=res.data.content;
          };
          this.$nextTick(()=>{
            new IWENAudioMsg();
          });
          this.$previewRefresh();
          this.share(true);//分享
          if (this.VX_islogin){
            this.getIsPraise();
          }
        }
      }).catch(() => {})
      .finally(()=>{
        this.renderCaseList();
        this.getDocInfo();
        this.dataCollectInit();
        this.share(true);//分享
      });
    },
    //查询相关案例
    renderCaseList() {
      let data = {
        channelId:this.channelId,
        caseId:this.caseId,
        depId:this.caseInfo.depId,
        diseaseNames: this.caseInfo.diseaseTagName.join(","),
      };
      channelService.getRelatedCase(data).then((res) => {
        if(res.status == 200 && res.data) {
          this.caseList = res.data.slice(0,3);
        }
      }).catch(() => {});
    },
    //查询医生card
    getDocInfo() {
      let data = {
        "id": this.caseInfo.authorId,
      };
      channelService.getDoctorById(data).then((res) => {
        if(res.status == 200 && res.data) {
          this.docInfo = res.data;
          console.log(this.docInfo);
        }
      }).catch(() => {});
    },
    //咨询按钮
    toConsult(id){
      // console.log("点击了咨询按钮");
      // if (!this.VX_islogin) {
      //   if (this.VX_isInSinaHealthApp) {
      //     console.log("App登录");
      //     iwenJSNativeBridge.appLogin();
      //   } else {
      //     console.log("jsp登录");
      //     platformLogin(this.$route.fullPath);
      //   }
      //   return;
      // }
      window.location.href = this.OUTER_LINKS.docConsult + id + "&bizType=NOR";
    },
    //跳转医生诊室
    toDocRoom(id){
      this.$router.push({
        name: "docIndex",
        params: {
          "dId": id,
        },
        query:{"resource":"channel"},
      });
    },
    //打点
    dataCollectInit() {
      this._dataCollect({
        contentId: this.caseId,
        contentType: "2",
        operationType: "0",
        authorId: this.caseInfo.authorId,
        contentCreateTime: this.caseInfo.createTime,
        title: this.caseInfo.title,
      });
    },
    // 查询是否已点赞
    getIsPraise(action) {
      console.log(action);
      // if (this.praiseStateLoading) return;
      // this.praiseStateLoading=true;
      let data = {
        userId:this.VX_userInfo.id,
        contentId:this.caseId,
        operationType:"2",
        contentType:"2",
      };
      channelService.isExistRecord(data).then((res) => {
        if(res.status == 200&&res.data) {
          this.isPraise=true;
          // this.praiseStateLoading=false;
        }else{
          this.isPraise=false;
          if(action&&this.caseInfo.praisePoints>0){
            this.caseInfo.praisePoints--;
            this.$toast.tip("操作失败");
          }
        }
      }).catch((error) => {}).finally(()=>{
        // this.praiseStateLoading = false;
      });
    },
    //点赞
    toPraise(){
      if(this.isPraise) return;
      if (!this.VX_islogin) {
        if (this.VX_isInSinaHealthApp) {
          console.log("App登录");
          iwenJSNativeBridge.appLogin();
        } else {
          console.log("jsp登录");
          platformLogin(this.$route.fullPath);
        }
        return;
      }else{
        this.isPraise=true;
        this.caseInfo.praisePoints++;
        this.praiseDataCollectInit();
      }
    },
    praiseDataCollectInit() {
      // if(this.praiseStateLoading) return;
      let _this=this;
      this._dataCollect({
        contentId: this.caseId,
        contentType: "2",
        operationType: "2",
        authorId: this.caseInfo.authorId,
        contentCreateTime: this.caseInfo.createTime,
        title: this.caseInfo.title,
      },function(){
        _this.getIsPraise("prise");
      });
    },
    //锁定图片toast
    lockTip(){
      this.$toast.tip("涉及隐私，照片已锁定");
    }
  },
  mounted(){
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"  rel="stylesheet/less">
@import "./css.less";
</style>
