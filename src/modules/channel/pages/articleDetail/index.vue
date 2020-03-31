<template>
  <layout :isAppView="true">
    <div slot="page_header" class="header_wrapper" >
      <m-header  title=" " :isShowInApp="true">
        <a href="javascript:;" slot="left" class="back" @click="router_back"></a>
        <div class="right" slot="right">
          <span class="share" @click="share(false)"></span>
        </div>
      </m-header>
    </div>
    <div slot="page_container" v-if="!loading">
      <div class="article_info" >
        <h3 class="title">{{articleInfo.title}}</h3>
        <div class="author">
          <div class="img" @click="toDocRoom(articleInfo.authorId)"><img :src="GET_IMG_URL(articleInfo.headPic)"></div>
          <div class="txt">
            <dl>
              <dt><span class="name" @click="toDocRoom(articleInfo.authorId)">{{articleInfo.authorName}} </span>&nbsp;&nbsp;{{articleInfo.depName}}&nbsp;&nbsp;{{articleInfo.hospital}}</dt>
              <dd>{{articleInfo.createTime | dataFormat}}</dd>
            </dl>
          </div>
        </div>
        <div class="article_box" v-html="articleInfo.content"></div>
        <div class="detail_footer">
          {{articleInfo.pv}}阅读<span v-if="!IS_IWEN_COMTY(articleInfo.firstPublishComtyId)&&articleInfo.firstPublishComtyName"> · 来自：<a :href="COMTY_BASE_URL+articleInfo.firstPublishComtyId">{{articleInfo.firstPublishComtyName}}</a></span>
        </div>
        <div class="label_box" v-if="articleInfo.diseaseTagName||[].length>0">
          <router-link :to="{name:'channelSearch',params:{id:channelId},query:{keywords:item}}" class="label_item" v-for="(item,index) in articleInfo.diseaseTagName.slice(0,3)" :key="index">{{item}}</router-link>
        </div>
        <!-- 点赞 start-->
        <div class="prise_box">
          <div class="prise_btn" :class="{'active':isPraise}" @click="toPraise">{{articleInfo.praisePoints||"0"}}</div>
          <p>{{isPraise?"感谢":"有帮助"}}</p>
        </div>
        <!-- 点赞 end-->
        <div class="doctor_card" @click.prevent="toDocRoom(articleInfo.authorId)">
          <div class="img"><img :src="GET_IMG_URL(docInfo.headPic,'doc')" alt=""></div>
          <div class="info">
            <div class="txt_info">
              <div class="first">
                <div class="txt">
                  <p><span class="name">{{docInfo.name}}</span>&nbsp;&nbsp;{{docInfo.title}}</p>
                  <p class="hospital">{{docInfo.department}}&nbsp;&nbsp;{{docInfo.hospital}}</p>
                </div>
                <div class="btn_box" v-if="docInfo.services.advice"><a href="javascript:void(0);" @click.stop="toConsult(articleInfo.authorId)"><i></i>问医生 ¥{{docInfo.services.advicePrice}}</a></div>
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
      <!-- 科普推荐 start -->
      <div class="box_wrapper top10 " v-if="(relativeArticle||[]).length>0">
        <div class="common_hd">
          <h3>科普推荐</h3>
        </div>
        <div class="common_bd">
          <div class="article_wrapper">
            <ul class="article_list">
              <li v-for="(item,index) in relativeArticle" :key="index">
                <article-cell :article="item" ></article-cell>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 科普推荐 end -->
    </div>
    <div slot="page_footer">
      <div class="bottom" v-if="!loading">- 这是我的底线 -</div>
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
import platformLogin from "@/common/platformFn";
import {
  COMTY_BASE_URL
} from "@/config";
import Header from "@/components/header/Header";
import articleCell from "../../components/article_cell/article_cell";
import backBtn from "../../components/channelIndexBtn/channelIndexBtn";
import share from "@/iwen/share-all/share.vue"; //分享
import channelService from "@/services/channelService.js";
// import share_cover from "@/assets/images/share_article.jpg";
export default {
  name: "channel",
  mixins: [commonMixin, toTopMixin,dataCollectMixin,shareMixin],
  components: {
    mHeader:Header,
    articleCell,
    backBtn,
    mShare: share  //分享
  },
  data() {
    return {
      COMTY_BASE_URL,
      channelId:"",
      articleId:"",
      overHeight:false,
      articleInfo:{},
      loading:false,
      docInfo:{
        services: {advice: false, advicePrice: 0, phone: false, register: false}
      },
      relativeArticle:[],
      //分享
      isShare: false,
      shareConfig: {},
      isPraise:false,
      praiseStateLoading:false,
    };
  },
  computed: {

  },
  watch: {
    "$route" (to, from) {
      this.init();
    }
  },
  created() {
    this.init();
  },
  methods: {
    init(){
      this.channelId=this.$route.params.id;
      this.articleId=this.$route.query.id;
      this.relativeArticle=[];
      this.renderDataInfo();
    },
    //分享
    share(isInit = false){
      console.log("点击了分享按钮");
      console.log("点击了分享按钮");
      if (!isInit) {
        this.isShare = true;
      }
      this.shareConfig = {
        pid: this.channelId,
        id: this.articleId,
        type: "article",
        title: `${this.articleInfo.title} - 来自新浪健康`,
        // content: (this.articleInfo.content||"").replace(/<[^>]+>/g, "").slice(0,100),
        content:"",
        imgUrl: "https://pic.wenwo.com/fimg/69475918eb99e71223bdffd07c8da54a.jpg",
      };
    },
    //查询文章详情
    renderDataInfo() {
      if(this.loading) return;
      this.loading = true;
      let data = {
        "id": this.articleId,
      };
      channelService.getArticlById(data).then((res) => {
        this.loading = false;
        if(res.status == 200 && res.data) {
          this.articleInfo = res.data;
          this.articleInfo.content=this.getContentImages(res.data.content);
          this.$previewRefresh();
          this.share(true);//分享
          if (this.VX_islogin){
            this.getIsPraise();
          }
        }
      })
      .catch(() => {})
      .finally(() => {
        this.getDocInfo();
        this.renderRelativeData();
        console.log(this.relativeArticle.length);
        this.share(true);//分享
      });
    },
    //查询图片
    getContentImages(htmlContent) {
      let dom = $("<div>"+htmlContent+"</div>");
      dom.find("img").attr("preview","2").removeAttr("style");
      return dom.html();
    },
    //查询医生card
    getDocInfo() {
      let data = {
        "id": this.articleInfo.authorId,
      };
      channelService.getDoctorById(data).then((res) => {
        if(res.status == 200 && res.data) {
          this.docInfo = res.data;
          console.log(this.docInfo);
        }
      })
      .catch(() => {})
      .finally(() => {
        this.dataCollectInit();
      });
    },
    //咨询按钮
    toConsult(id){
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
    //查询相关科普
    renderRelativeData() {
      let data = {
        id:this.channelId,
        articleId:this.articleId,
        depId:this.articleInfo.depId,
        diseaseNames: this.articleInfo.diseaseTagName.join(","),
      };
      channelService.getPageRelateArticle(data).then((res) => {
        if(res.status == 200 && res.data) {
          res.data = res.data.map( item => {
            return {
              ...item,
              art_images: this.getArticleImages(item.content).slice(0,3)
            };
          });
          this.relativeArticle = res.data;
          console.log(res.data);
        }
      }).catch(() => {});
    },
    getArticleImages(htmlContent) {
      let dom = $("<div>"+htmlContent+"</div>");
      let images = dom.find("img");
      let imageUrls = [];
      images.map((index, el) => {
        if (el.src) {
          imageUrls.push(el.src);
        }
      });
      return imageUrls;
    },
    //打点
    dataCollectInit() {
      this._dataCollect({
        contentId: this.articleId,
        contentType: "2",
        operationType: "0",//浏览
        authorId: this.articleInfo.authorId,
        contentCreateTime: this.articleInfo.createTime,
        title: this.articleInfo.title,
      });
    },
    // 查询是否已点赞
    getIsPraise(action) {
      console.log(action);
      // if (this.praiseStateLoading) return;
      // this.praiseStateLoading=true;
      let data = {
        userId:this.VX_userInfo.id,
        contentId:this.articleId,
        operationType:"2",
        contentType:"2",
      };
      channelService.isExistRecord(data).then((res) => {
        if(res.status == 200&&res.data) {
          this.isPraise=true;
          // this.praiseStateLoading=false;
        }else{
          this.isPraise=false;
          if(action&&this.articleInfo.praisePoints>0){
            this.articleInfo.praisePoints--;
            this.$toast.tip("操作失败");
          }
        }
      }).catch((error) => {
        
      }).finally(()=>{
        // this.praiseStateLoading = false;
      });
    },
    //点赞
    toPraise(){
      if(this.isPraise) return;
      console.log("点击了点赞按钮");
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
        this.articleInfo.praisePoints++;
        this.praiseDataCollectInit();
      }
    },
    praiseDataCollectInit() {
      // if(this.praiseStateLoading) return;
      let _this=this;
      this._dataCollect({
        contentId: this.articleId,
        contentType: "2",
        operationType: "2",//点赞
        authorId: this.articleInfo.authorId,
        contentCreateTime: this.articleInfo.createTime,
        title: this.articleInfo.title,
      },function(){
        _this.getIsPraise("prise");
      });
    },
  },
  mounted(){

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"  rel="stylesheet/less">
@import "./css.less";
</style>
