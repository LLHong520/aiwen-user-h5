<template>
  <layout :isAppView="true">
    <div slot="page_header" class="header_wrapper" >
      <m-header  title="专题详情" :isShowInApp="true">
        <a href="javascript:;" slot="left" class="back" @click="router_back"></a>
        <div class="right" slot="right">
          <span class="share" @click="share(false)"></span>
        </div>
      </m-header>
    </div>
    <div slot="page_container">
      <!-- 专题介绍 -->
      <div class="subject_banner">
        <img :src="GET_IMG_URL(subjectInfo.coverUrl)" alt="">
        <div class="tit">
          <p>{{subjectInfo.title}}</p>
        </div>
      </div>
      <div class="subject_info" v-if="subjectInfo.introduce">
        {{subjectInfo.introduce}}
        <div class="detail_footer">
          <span v-if="!IS_IWEN_COMTY(subjectInfo.communityId)">来自 <a :href="COMTY_BASE_URL+subjectInfo.communityId">{{subjectInfo.comtyName}}</a></span>
        </div>
      </div>
      <!-- 专题介绍 -->

      <!-- 专题文章 start -->
      <div class="article_wrapper box_wrapper top10" v-if="(list||[]).length>0">
        <ul class="article_list" >
          <li v-for="(item,index) in list" :key="index">
            <article-cell :article="item" :isShowRead="true"></article-cell>
          </li>
        </ul>
        <loading-btn
          :loading="loading"
          :title="loadingText"
          v-if="!isEnd&&(list||[]).length>0"
          @loadFn="renderData">
        </loading-btn>
      </div>
      <!-- 专题文章end -->

      <!-- 相关专题 start -->
      <div class="box_wrapper top10 " v-if="(relativeSubject||[]).length>0">
        <div class="common_hd">
          <h3>相关专题</h3>
        </div>
        <div class="common_bd">
          <div class="subject_box">
            <ul class="clearfix">
              <li v-for="(item,index) in relativeSubject" :key="index">
                <router-link :to="{'name':'channelSubjectDetail',params:{id:channelId},query:{id:item.id}}">
                  <div class="img">
                    <img v-lazy="GET_IMG_URL(item.coverUrl)" alt="">
                  </div>
                  <dl>
                    <dt>{{item.title}}</dt>
                  </dl>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 相关专题 end -->
    </div>
    <div slot="page_footer">
      <div class="bottom">- 这是我的底线 -</div>
    </div>
    <div slot="page_layer">
      <!-- 频道首页按钮 -->
      <back-btn></back-btn>

      <!-- 分享 -->
      <m-share :show.sync="isShare" :config="shareConfig"></m-share>
    </div>
  </layout>
</template>
<script>
import {commonMixin,toTopMixin,shareMixin} from "@/mixins";
import {
  COMTY_BASE_URL
} from "@/config";
import Header from "@/components/header/Header";
import articleCell from "../../components/article_cell/article_cell";
import backBtn from "../../components/channelIndexBtn/channelIndexBtn";
import loadingBtn from "@/components/loading-btn/loading-btn";
import share from "@/iwen/share-all/share.vue"; //分享
import channelService from "@/services/channelService.js";
export default {
  name: "channel",
  mixins: [commonMixin, toTopMixin,shareMixin],
  components: {
    mHeader:Header,
    articleCell,
    loadingBtn,
    backBtn,
    mShare: share  //分享
  },
  data() {
    return {
      COMTY_BASE_URL,
      channelId:"",
      subjectId:"",
      subjectInfo:{},

      loading:false,
      isEnd:false,
      loadingText:"加载更多",
      pageIndex:0,
      pageSize:10,
      pageCount:0,
      list:[],
      relativeSubject:[],
      //分享
      isShare: false,
      shareConfig: {},
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
      this.subjectId=this.$route.query.id;
      this.pageIndex=0;
      this.isEnd=false;
      this.list=[];
      this.renderDataInfo();
      this.renderData();
    },

    //分享
    share(isInit = false){
      console.log("点击了分享按钮");
      if (!isInit) {
        this.isShare = true;
      }
      this.shareConfig = {
        pid: this.channelId,
        id: this.subjectId,
        type: "subject",
        title: `${this.subjectInfo.title} - 来自新浪健康`,
        // content: (this.subjectInfo.introduce||"").replace(/<[^>]+>/g, "").slice(0,100),
        content:"",
        imgUrl: this.subjectInfo.coverUrl||""
      };
    },
    //查询专题详情
    renderDataInfo() {
      let data = {
        "subjectId": this.subjectId
      };
      channelService.getSubjectDetail(data).then((res) => {
        if(res.status == 200 && res.data) {
          this.subjectInfo = res.data;
          this.share(true);//分享
        }
      })
      .catch(() => {})
      .finally(() => {
        this.renderRelativeData();
        this.share(true);//分享
      });
    },
    //查询相关专题
    renderRelativeData() {
      let data = {
        channelId:this.channelId,
        depId:(this.subjectInfo.departIds||[]).join(","),
        subjectId: this.subjectId,
      };
      channelService.getRelatedSubject(data).then((res) => {
        if(res.status == 200 && res.data) {
          this.relativeSubject = res.data.slice(0,2);
        }
      }).catch(() => {});
    },
    //查询专题文章
    renderData(){
      if(this.loading||this.isEnd) return;
      this.loading = true;
      let This = this;
      let params = {
        subjectId:this.subjectId,
        page: this.pageIndex+1,
        size: this.pageSize,
      };
      channelService.getArticleBySubjectId(params).then(res => {
        This.loading = false;
        if (res.status == 200 && res.data) {
          This.pageIndex += 1;
          console.log(This.pageIndex);
          This.pageCount = res.total/This.pageSize;
          // This.list=this.list.concat(res.data);
          let articleList=[];
          res.data.map((item,index) => {
            let images = This.getArticleImages(item.content);
            articleList.push({
              ...item,
              art_images: images.slice(0,3)
            });
          });
          This.list = This.list.concat(articleList);
          if(This.pageIndex>=This.pageCount){
            This.loadingText="没有更多了~";
            This.isEnd = true;
            return;
          }else{
            This.loadingText="加载更多";
            This.isEnd = false;
          }
        }
      });
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
  },
  mounted(){
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"  rel="stylesheet/less">
@import "./css.less";
</style>
