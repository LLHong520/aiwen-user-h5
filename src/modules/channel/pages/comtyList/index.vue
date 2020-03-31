<template>
  <layout :isAppView="true">
    <div slot="page_header" class="header_wrapper">
      <m-header  title="社区推荐" :isShowInApp="true">
        <a href="javascript:;" slot="left" class="back" @click="router_back"></a>
        <div class="right" slot="right"></div>
      </m-header>
    </div>
    <div slot="page_container">
      <div class="comptyList">
        <ul v-if="(list||[]).length>0">
          <li v-for="(item,index) in list" :key="index">
            <div class="img" v-if="item.logo"><img v-lazy="GET_IMG_URL(item.logo.url,'comty')" alt=""></div>
            <dl>
              <dt>{{item.comtyName}}</dt>
              <dd>{{item.doctorCount+item.userCount}}成员</dd>
            </dl>
            <a :href="COMTY_BASE_URL+item.id" class="enter">进入社区</a>
          </li>
        </ul>
        <div class="empty_box"  v-else-if="!loading">
          <empty title="暂无社区"></empty>
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
    };
  },
  computed: {
    
  },
  created() {
    this.channelId=this.$route.params.id;
    this.renderData();
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
      channelService.pageCommunityRecommendList(params).then(res => {
        This.loading = false;
        if (res.status == 200 && res.data) {
          This.pageIndex += 1;
          console.log(This.pageIndex);
          This.pageCount = Math.ceil(res.data.total/This.pageSize);
          This.list=this.list.concat(res.data.list);
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
    }
  },
  mounted(){},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"  rel="stylesheet/less">
@import "./css.less";
</style>
