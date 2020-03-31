<template>
<layout class="doc-info-page">
  <!-- page_header -->
  <div slot="page_header">
   <m-header slot="page_header"  title='患者评价'>
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
      	<ul id="appraises_list">
      			<li v-for="comment in comments" :key="comment.key">
      				<div class="pj_photo">
                <div class="avater">
                  <img v-lazy="GET_IMG_URL(comment.headImg,'u')" alt="">
                </div>
                <div class="docase_time">
      						<span>
      							{{comment.nickname | hideName}}
      						</span>
      						<b>{{comment.contentTime}}</b>
      					</div>
              </div>
      				<div class="pj_cont">
      					<div class="docase_star">
      							<span :class="{'light':comment.stars>0}"></span>
      							<span :class="{'light':comment.stars>1}"></span>
      							<span :class="{'light':comment.stars>2}"></span>
      							<span :class="{'light':comment.stars>3}"></span>
      							<span :class="{'light':comment.stars>4}"></span>
      					</div>
      					<div class="docase_txt"><p>{{comment.content||"默认好评"}}</p></div>
      				</div>
      			</li>
      	</ul>
      </div>
      <loading-btn
        v-if="queryParam.pager.totalPage>1"
        :loading="queryParam.load_more_loading"
        :title="queryParam.load_more_text"
        @loadFn="getBingliList">
      </loading-btn>
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
import doctorService from "@/services/doctorService.js";
export default {
  name: "doc_comments",
  mixins:[commonMixin,toTopMixin],
  data () {
    return {
      dId:"",
      comments:[],
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
  },
  created(){
    this.dId=this.$route.query.dId;
    this.getBingliList();
  },
  computed:{},
  methods:{
    getBingliList(){
      if(!this.queryParam.hasMore||this.queryParam.load_more_loading) return;
      this.queryParam.load_more_loading=true;
      let This=this;
      let targetPageNum=this.queryParam.pager.nowPage+1;
      doctorService.doc_comments({
        pageIndex:targetPageNum,
        docId:this.dId
      }).then((res)=>{
        if(res.code==0&&res.data){
          This.comments = This.comments.concat(res.data);
          This.queryParam.pager.nowPage=parseInt(res.page.pageIndex);
          This.queryParam.pager.totalPage=parseInt(res.page.pageCount);
          This.queryParam.load_more_loading=false;
          //确定没有更多时
          if(This.queryParam.pager.nowPage+1>This.queryParam.pager.totalPage){
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
