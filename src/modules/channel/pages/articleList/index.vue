<template>
  <layout :isAppView="true">
    <div slot="page_header" class="header_wrapper">
      <m-header  :title="`${channelName||''}-科普列表`" :border_on="false" :isShowInApp="true">
        <a href="javascript:;" slot="left" class="back" @click="router_back"></a>
        <div class="right" slot="right"></div>
      </m-header>
    </div>
    <div slot="page_container">
      <div class="article_wrapper">
        <ul class="article_list" v-if="(list||[]).length>0">
          <li v-for="(item,index) in list" :key="index">
            <article-cell :article="item"></article-cell>
          </li>
        </ul>
        <div class="empty_box"  v-else-if="!loading">
          <empty title="暂无科普"></empty>
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
    <div  slot="page_footer">
      <loading-page v-show="loading&&(list||[]).length==0"></loading-page>
    </div>
    <div slot="page_layer">
      <div class="select_bar" :class="{'isInApp':isInApp&&!isShowInApp}">
        <ul>
          <li :class="{'active':sortActive,'selected':sortActiveIndex!=0}" @click="toggleSort">{{sortName}}<i></i></li>
        </ul>
      </div>
      <div class="sort_layer" :class="{'isInApp':isInApp&&!isShowInApp}" v-if="sortActive">
        <ul>
          <li v-for="(item,index) in sortItem" :key="index" @click="sortChange(index)" :class="{'current':sortActiveIndex==index}">{{item.name}}</li>
        </ul>
      </div>
      <div class="shadow" v-if="sortActive" @click="hideLayer"></div>
    </div>
  </layout>
</template>
<script>
import {commonMixin,toTopMixin} from "@/mixins";
import Header from "@/components/header/Header";
import articleCell from "../../components/article_cell/article_cell";
import loadingBtn from "@/components/loading-btn/loading-btn";
import empty from "@/components/empty/empty";
import channelService from "@/services/channelService.js";
import {mapGetters} from "vuex";
export default {
  name: "channel",
  mixins: [commonMixin, toTopMixin],
  components: {
    mHeader:Header,
    articleCell,
    loadingBtn,
    empty
  },
  data() {
    return {
      channelId:"",
      loading:false,
      isEnd:false,
      loadingText:"加载更多",
      pageIndex:0,
      pageSize:10,
      pageCount:0,
      list:[],
      channelName:"...",
      sortItem:[{
        name:"默认排序",
        value:"all",
      },{
        name:"热度优先",
        value:"hot",
      }],
      sortActive:false,
      sortName:"默认排序",
      sortActiveIndex:0,
      isShowInApp:true,
    };
  },
  computed: {
    ...mapGetters(["isInSinaHealthApp","isInIwenApp","isInHapHealApp"]),
    isInApp(){
      return platformInfo.isWeibo || platformInfo.isWx || this.isInSinaHealthApp || this.isInIwenApp || this.isInHapHealApp;
    }
  },
  created() {
    this.channelId=this.$route.params.id;
    this.channelName=this.$route.query.channelName.length>6?this.$route.query.channelName.slice(0,6)+"...":this.$route.query.channelName;
    this.renderData();
  },
  methods: {
    //排序
    sortChange(index){
      this.sortActiveIndex=index;
      this.sortName=this.sortItem[index].name;
      this.rule=this.sortItem[index].value;
      this.sortActive=false;
      this.pageIndex=0;
      this.list=[];
      this.isEnd=false;
      this.renderData();
    },
    // 打开关闭排序弹框
    toggleSort(){
      this.sortActive=!this.sortActive;
    },
    //点击遮罩关闭
    hideLayer(){
      this.sortActive=false;
    },
    renderData(){
      if(this.loading||this.isEnd) return;
      this.loading = true;
      let This = this;
      let params = {
        id:this.channelId,
        page: this.pageIndex+1,
        size: this.pageSize,
        sortRule:this.rule,
      };
      channelService.getPageArticle(params).then(res => {
        This.loading = false;
        if (res.status == 200 && res.data) {
          This.pageIndex += 1;
          console.log(This.pageIndex);
          This.pageCount = Math.ceil(res.total/This.pageSize);
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
