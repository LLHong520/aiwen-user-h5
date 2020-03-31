<template>
<layout class="doc-info-page" :docSwitch="true">
  <!-- page_header -->
  <div slot="page_header">
   <m-header slot="page_header"  title='医生视频'>
     <span class="retrun" slot='left' @click="router_back">
       <b class="gray"></b>
      </span>
      <span class="retrun" slot='right'></span>
   </m-header>
  </div>
 <!-- page_header -->
  <!-- page_container -->
  <div slot="page_container" class="app_wrapper_inner">
      <div class="docase_list">
        <ul class="relative-movies">
          <li v-for="(elem,index) in videoList" :key="index" class="relative-movies-item">
            <span v-if="elem.status==0" class="course-type">直播</span>
            <span v-if="elem.status==1" class="course-type">未开始</span>
            <span v-if="elem.status==2" class="course-type">回顾</span>
            <span v-if="elem.status==3" class="course-type">内容通过审核</span>
            <a :href="GET_ARTICLE_URL(elem.id,10,dId)">
              <div class="item-avater">
                <img  class="adapter" v-lazy="GET_IMG_URL(elem.image)" alt="">
              </div>
              <div class="info_wrapper">
                <div class="course-name">{{elem.title}}</div>
                <div class="course-tip">浏览量：{{elem.readCount}}</div>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <loading-btn
        v-if="queryParam.pager.totalPage>1&&queryParam.hasMore"
        :loading="queryParam.load_more_loading"
        :title="queryParam.load_more_text"
        @loadFn="getVideoList">
      </loading-btn>
      <noResult v-if="!queryParam.load_more_loading&&videoList.length==0" title="木有相关视频^_^"></noResult>
  </div>
<!-- /page_container -->
  <!-- page_footer -->
  <div  slot="page_footer">
    <!-- /微信分享 -->
    <loading-page v-show='initing_page'></loading-page>
  </div>
</layout>
</template>
<script>
import loadingBtn from "@/components/loading-btn/loading-btn";
import Header from "@/components/header/Header";
import { commonMixin, toTopMixin} from "@/mixins";
import noResult from "@/components/empty/empty";
import courseService from "@/services/courseService.js";
export default {
  name: "doc_comments",
  mixins:[commonMixin,toTopMixin],
  data () {
    return {
      dId:"",
      videoList:[],
      queryParam:{
        pager:{
          totalCount:0,
          totalPage:2,
          nowPage:0,
        },
        load_more_loading:false,
        hasMore:true,
        load_more_text:"点击加载更多",
      }
    };
  },
  components:{
    mHeader:Header,
    loadingBtn,
    noResult,
  },
  created(){
    this.dId=this.$route.params.dId;
    this.getVideoList();
  },
  computed:{},
  methods:{
    getVideoList(){
      if(!this.queryParam.hasMore||this.queryParam.load_more_loading) return;
      this.queryParam.load_more_loading=true;
      let This=this;
      courseService.doc_video({
        docId:this.dId,
        last:this.videoList.length>0?this.videoList[this.videoList.length-1].time:""
      }).then((res)=>{
        if(res.code==0&&res.data){
          This.videoList = This.videoList.concat(res.data);
          // This.queryParam.pager.totalPage=parseInt(res.page.totalPages);
          This.queryParam.load_more_loading=false;
          //确定没有更多时
          if(res.data.length<10){
            This.queryParam.load_more_text="没有更多了";
            This.queryParam.hasMore=false;
          }
        }
      },function(){
        This.queryParam.load_more_loading=false;
      });
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"  rel="stylesheet/less">
  @import './css.less';
</style>
