<template>
  <layout :isAppView="true">
    <div slot="page_header" class="header_wrapper" >
      <m-header  title="专栏详情" :isShowInApp="true">
        <a href="javascript:;" slot="left" class="back" @click="router_back"></a>
        <div class="right" slot="right">
          <span class="share" @click="share(false)"></span>
        </div>
      </m-header>
    </div>
    <div slot="page_container">
      <div class="banner">
        <img :src="GET_IMG_URL(columnInfo.columnLogo)" alt="">
      </div>
      <div class="column_title">
        <dl>
          <dt>{{columnInfo.columnName}}</dt>
          <dd>由 <a target="_blank" :href="columnInfo.endorsementTeamLink" v-if="columnInfo.endorsementTeamLink">{{columnInfo.endorsementTeam}}</a><template v-else>{{columnInfo.endorsementTeam}}</template> 与新浪健康联合举办</dd>
        </dl>
      </div>
      <!-- 课堂 -->
      <div class="box_wrapper top10" v-if="(columnInfo.columnLesson&&columnInfo.columnLesson.videoList||[]).length>0">
        <div class="common_hd">
          <h3>{{columnInfo.columnLesson.nickName||"精选课堂"}}</h3>
          <router-link :to="{name:'columnClassList',params:{id:channelId,columnId:columnId}}"  class="toMore"></router-link>
        </div>
        <div class="common_bd">
          <div class="subject_box">
            <ul class="clearfix">
              <li v-for="(item,index) in columnInfo.columnLesson.videoList" :key="index">
                <router-link :to="{name:'channelClassDetail',params:{id:channelId},query:{id:item.videoId}}">
                  <div class="img">
                    <img v-lazy="GET_IMG_URL(item.videoCover)" alt="">
                    <i class="icon_play"></i>
                    <p>
                      <span class="author">主讲人:{{item.publisher}}</span>
                      <!-- <span class="time">21:45</span> -->
                    </p>
                  </div>
                  <dl>
                    <dt>{{item.videoTitle}}</dt>
                  </dl>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 课堂 end-->

      <!-- 百科 start-->
      <div class="box_wrapper top10" v-if="(columnInfo.columnWentry&&columnInfo.columnWentry.wentryList||[]).length>0">
        <div class="common_hd">
          <h3>{{columnInfo.columnWentry.nickName||"精选百科"}}</h3>
          <router-link :to="{name:'columnEntry',params:{id:channelId}}"  class="toMore"></router-link>
        </div>
        <div class="common_bd">
          <div class="wentry_wrapper">
            <ul class="col1">
              <li v-for="(item,index) in columnInfo.columnWentry.wentryList.slice(0,3)" :key="index"><router-link :to="{name:'columnEntryIndex',params:{id:channelId,columnId:columnId,entryId:item.wentryId}}"><i></i>{{item.wentryName}}</router-link></li>
            </ul>
            <ul class="col2" v-if="(columnInfo.columnWentry.wentryList||[]).length>3">
              <li v-for="(item,index) in columnInfo.columnWentry.wentryList.slice(3,6)" :key="index"><router-link :to="{name:'columnEntryIndex',params:{id:channelId,columnId:columnId,entryId:item.wentryId}}"><i></i>{{item.wentryName}}</router-link></li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 百科 end-->

      <!-- 案例 start -->
      <div class="box_wrapper top10 " v-if="(list||[]).length>0">
        <div class="common_hd" v-if="columnInfo.columnCase">
          <h3>{{columnInfo.columnCase.nickName||"精选案例"}}</h3>
        </div>
        <div class="common_bd">
          <div class="case_wrapper">
            <ul class="case_list"  v-if="(list||[]).length>0">
              <li v-for="(item,index) in list" :key="index">
                <case-cell :caseItem="item" :columnId="columnId"></case-cell>
              </li>
            </ul>
            <div class="empty_box"  v-else-if="!loading">
              <empty title="暂无案例"></empty>
            </div>
            <loading-btn
              :loading="loading"
              :title="loadingText"
              v-if="!isEnd&&(list||[]).length>0"
              :scroll_load="true"
              :isEnd="isEnd"
              @loadFn="getColumnCaseList">
            </loading-btn>
          </div>
        </div>
      </div>
      <!-- 案例 end -->
    </div>
    <div slot="page_footer">
      <div class="bottom" v-if="(list||[]).length<10||isEnd">- 这是我的底线 -</div>
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
import caseCell from "../../components/case_cell/case_cell";
import backBtn from "../../components/channelIndexBtn/channelIndexBtn";
import share from "@/iwen/share-all/share.vue"; //分享
import loadingBtn from "@/components/loading-btn/loading-btn";
import channelService from "@/services/channelService.js";
export default {
  name: "channel",
  mixins: [commonMixin, toTopMixin,shareMixin],
  components: {
    mHeader:Header,
    caseCell,
    loadingBtn,
    backBtn,
    mShare: share,  //分享
  },
  data() {
    return {
      COMTY_BASE_URL,
      channelId:"",
      columnId:"",
      columnInfo:{},

      loading:false,
      isEnd:false,
      loadingText:"加载更多",
      pageIndex:0,
      pageSize:10,
      pageCount:0,
      list:[],
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
      this.columnId=this.$route.params.columnId;
      this.getColumnHomePageInfo();
    },

    //分享
    share(isInit = false){
      console.log("点击了分享按钮");
      if (!isInit) {
        this.isShare = true;
      }
      this.shareConfig = {
        pid: this.channelId,
        id: this.columnId,
        type: "column",
        title: `【${this.columnInfo.columnName}】医生大V健康专栏，健康你我他 -来自新浪健康`,
        // content: (this.columnInfo.introduce||"").replace(/<[^>]+>/g, "").slice(0,100),
        content:"",
        imgUrl: this.columnInfo.columnLogo||""
      };
    },
    //查询专栏详情
    getColumnHomePageInfo() {
      let data = {
        "columnId": this.columnId
      };
      channelService.getColumnHomePageInfo(data).then((res) => {
        if(res.status == 200 && res.data) {
          this.columnInfo = res.data;
          if(res.data.columnCase&&res.data.columnCase.isSwitch=="OPEN"){
            this.getColumnCaseList();
          }
          this.share(true);//分享
        }
      })
      .catch(() => {})
      .finally(() => {
        this.share(true);//分享
      });
    },

    //查询相关案例
    getColumnCaseList(){
      if(this.loading||this.isEnd) return;
      this.loading = true;
      let This = this;
      let params = {
        columnId:this.columnId,
        page: this.pageIndex+1,
        size: this.pageSize,
      };
      channelService.getColumnCaseList(params).then(res => {
        This.loading = false;
        if (res.status == 200 && res.data) {
          This.pageIndex += 1;
          console.log(This.pageIndex);
          This.pageCount = Math.ceil(res.total/This.pageSize);
          This.list=this.list.concat(res.data);
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
  },
  mounted(){
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"  rel="stylesheet/less">
@import "./css.less";
</style>
