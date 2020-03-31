<template>
  <layout :isAppView="true">
    <div slot="page_header" class="header_wrapper">
      <m-header  title="热门话题" :isShowInApp="true">
        <a href="javascript:;" slot="left" class="back" @click="router_back"></a>
        <div class="right" slot="right"></div>
      </m-header>
    </div>
    <div slot="page_container">
      <!-- 社区推荐start -->
      <div class="comty_list clearfix">
        <a :href="COMTY_BASE_URL+item.id" v-for="(item,index) in comtyList.slice(0,3)" :key="index">
          <div class="img"><img :src="GET_IMG_URL(item.logo.url,'comty')" alt=""> </div>
          <p>{{item.comtyName}}</p>
        </a>
        <router-link :to="{name:'channelComtyList',params:{id:channelId}}" v-if="(comtyList||[]).length>3">
          <div class="img"><img src="./images/more.png" alt="">
          </div><p>更多社区</p>
        </router-link>
      </div>
      <!-- 社区推荐end -->

      <!-- 帖子列表start -->
      <div class="post_list">
        <ul v-if="(list||[]).length>0">
          <li v-for="(item,index) in list" :key="index">
            <router-link :to="{name:'channelPostDetail',params:{id:channelId},query:{id:item.id}}">
              <div class="author">
                <div class="img"><img v-lazy="GET_IMG_URL(item.userPhoto,'u')" alt=""></div>
                <dl>
                  <dt>{{item.userName}}</dt>
                  <dd>{{item.publishTime}}</dd>
                </dl>
              </div>
              <div class="txt">
                {{item.title}}
              </div>
              <!-- <div class="img_list clearfix">
                <span class="img"><img src="./images/zhaoqin.png" alt=""></span>
                <span class="img"><img src="./images/zhaoqin.png" alt=""></span>
                <span class="img"><img src="./images/zhaoqin.png" alt=""></span>
              </div> -->
              <p class="resource">{{item.comments}}评论 ·来自 {{item.comtyName}}</p>
              <div class="label_box" v-if="(item.postTags||[]).length>0">
                <span class="label_item" v-for="(tag,i) in item.postTags" :key="i">{{tag}}</span>
              </div>
            </router-link>
          </li>
        </ul>
        <div class="empty_box"  v-else-if="!loading">
          <empty title="暂无帖子"></empty>
        </div>
      
        <loading-btn
          :loading="loading"
          :title="loadingText"
          v-if="(!isEnd&&(list||[]).length>0)||(isEnd&&(list||[]).length>0)"
          :scroll_load="true"
          :isEnd="isEnd"
          @loadFn="renderData">
        </loading-btn>
      </div>
      <!-- 帖子列表end -->
    </div>
    <div slot="page_footer">
      <loading-page v-show="loading&&(list||[]).length==0"></loading-page>
    </div>
  </layout>
</template>
<script>
import {commonMixin,toTopMixin} from "@/mixins";
import {COMTY_BASE_URL} from "@/config";
import Header from "@/components/header/Header";
import loadingBtn from "@/components/loading-btn/loading-btn";
import empty from "@/components/empty/empty";
import channelService from "@/services/channelService.js";
export default {
  name: "channel",
  mixins: [commonMixin, toTopMixin],
  components: {
    mHeader:Header,
    loadingBtn,
    empty
  },
  data() {
    return {
      COMTY_BASE_URL,
      channelId:"",
      loading:false,
      isEnd:false,
      loadingText:"加载更多",
      pageIndex:0,
      pageSize:10,
      pageCount:0,
      list:[],
      isShowInApp:true,
      comtyList:[],
    };
  },
  computed: {
    
  },
  created() {
    this.channelId=this.$route.params.id;
    this.renderData();
    this.pageCommunityRecommendList();
  },
  methods: {
    renderData(){
      if(this.loading||this.isEnd) return;
      this.loading = true;
      let This = this;
      let params = {
        channelId:this.channelId,
        page: this.pageIndex+1,
        size: this.pageSize,
      };
      channelService.getPostList(params).then(res => {
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
    // 查询社区推荐
    pageCommunityRecommendList(){
      let params = {
        channelId:this.channelId,
        page: 1,
        size:10,
      };
      channelService.pageCommunityRecommendList(params).then(res => {
        if (res.status == 200 && res.data.list) {
          this.comtyList=res.data.list;
        }
      });
    }
  },
  mounted(){},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"  rel="stylesheet/less">
@import "./css.less";
</style>
