<template>
<layout class="doc-info-page">
  <!-- page_header -->
  <div slot="page_header">
   <m-header slot="page_header"  title='咨询案例'>
     <span class="retrun" slot='left' @click="router_back">
       <b class="gray"></b>
      </span>
      <span class="retrun" slot='right'></span>
   </m-header>
  </div>
 <!-- page_header -->
  <!-- page_container -->
  <div slot="page_container" class="app_wrapper_inner">
    <!-- 咨询案例 -->
    <section v-if="consultList.list.length>0">
      <div class="ongo_ask">
        <ul>
           <li v-for="elem in consultList.list" :key="elem.key">
             <div class="ongo_ask_ask">
               <div class="ongo_ask_pho"><span class="ask">问</span></div>
               <div class="ongo_ask_txt">
                   <p v-html="elem.question.questionContent"></p>
               </div>
             </div>
             <div class="ongo_ask_reply">
                 <div class="ongo_ask_pho"><img :src="GET_IMG_URL(elem.answer.docHeadImg,'u')" /></div>
                 <div class="ongo_ask_txt">
                     <p v-html="elem.answer.answerContent"></p>
                 </div>
             </div>
             <div class="p10 ta_r"><a class="c_main" style="font-size:12px" :href="OUTER_LINKS.consultDetail+elem.question.consultId">详情</a></div>
           </li>
         </ul>
      </div>
    </section>
    <!-- /咨询案例 -->
    <loading-btn
      v-if="consultList.pager.totalPage>1"
      :loading="consultList.load_more_loading"
      :title="consultList.load_more_text"
      @loadFn="getConsultList">
    </loading-btn>
  </div>
<!-- /page_container -->
  <!-- page_footer -->
  <div   slot="page_footer">
  <!-- /微信分享 -->
    <loading-page v-show='initing_page'></loading-page>
  </div>
</layout>
</template>
<script>
import loadingBtn from "@/components/loading-btn/loading-btn";
import {DOC_CONSULT_URL} from "@/config";
import Header from "@/components/header/Header";
import { commonMixin, toTopMixin} from "@/mixins";
import doctorService from "@/services/doctorService.js";
export default {
  name: "doc_consult",
  mixins:[commonMixin,toTopMixin],
  data () {
    return {
      DOC_CONSULT_URL,
      consultList:{
        list:[],
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
    this.getConsultList();
  },
  computed:{},
  methods:{
    getdocConsults(){
      let This=this;
      doctorService.doc_consults({
        pageIndex:1,
        docId:this.dId,
        qryType:1
      }).then((res)=>{
        if(res.code==0&&res.data){
          This.consultList = This.consultList.concat(res.data);
        }
      });
    },
    getConsultList(){
      if(!this.consultList.hasMore||this.consultList.load_more_loading) return;
      this.consultList.load_more_loading=true;
      let This=this;
      doctorService.doc_consults({
        pageIndex:This.consultList.pager.nowPage+1,
        docId:this.dId,
        qryType:1
      }).then((res)=>{
        if(res.code==0&&res.data){
          This.consultList.list = This.consultList.list.concat(res.data);
          This.consultList.pager.nowPage=parseInt(res.page.pageIndex);
          This.consultList.pager.totalPage=parseInt(res.page.totalPages);
          This.consultList.load_more_loading=false;
          //确定没有更多时
          if(This.consultList.pager.nowPage+1>This.consultList.pager.totalPage){
            This.consultList.load_more_text="没有更多了";
            This.consultList.hasMore=false;
          }
        }
      },function(){
        This.consultList.load_more_loading=false;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"  rel="stylesheet/less">
  @import './css.less';
</style>
