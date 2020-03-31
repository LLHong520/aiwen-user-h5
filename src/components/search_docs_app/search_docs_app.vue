<template>
<section>
  <div v-if="docList.length>0">
  <!-- 帖子 -->
  <div class="famous_list">
    <dl v-for="elem in docList" :key="elem.key" class="famous_doctor">
      <dt>
        <router-link :to="{ name: 'docIndex', params: { dId: elem.id}}">
        <img :src="GET_IMG_URL(elem.photo,'doc')" /><span>V</span>
        </router-link>
      </dt>
      <dd>
        <router-link :to="{ name: 'docIndex', params: { dId: elem.id}}">
          <div class="fam_doc_name"><b>{{elem.realName}}</b>{{elem.titles}}</div>
          <div class="fam_doc_dep">{{elem.departments}}<span>{{elem.workUnit}}</span></div>
          <div class="fam_doc_good"><em></em>擅长：{{elem.areasOfExpertise}}</div>
          <div class="fam_doc_num">评分<span class="blue">{{elem.score}}</span>&nbsp;&nbsp;回答数<span class="blue">{{elem.answerTotal}}</span></div>
          <div v-if="!VX_isSinaHealthAppForceIng && elem.advice" class="fam_doc_price"><em></em>问诊￥{{elem.qPrice}}</div>
        </router-link>
      </dd>
    </dl>
 </div>

  <!-- /帖子 -->
   <loading-btn
    v-if="showLoadMore"
    :loading="load_topics_loading"
    :title="load_topics_text"
    @loadFn="load_by_pagenum"
    :scroll_load="true"
    ></loading-btn>
    <div class="user-no-focus"  v-if="docList.length>0&&showNoMoreDynamics">
     <div>没有更多了</div>
   </div>
</div>
  <noResult v-else title="没有找到相关医生" :isSearch="true"></noResult>
</section>
</template>
<script>
import { commonMixin, toTopMixin} from "@/mixins";
import loadingBtn from "@/components/loading-btn/loading-btn";
import noResult from "@/components/no-result/no-result";
import { mapGetters } from "vuex";
import doctorService from "@/services/doctorService.js";
export default {
  name: "search_topics",
  mixins:[commonMixin,toTopMixin],
  props:["keywords"],
  data() {
    return {
      docList: [],
      load_topics_loading:false,
      load_topics_text:"点击加载更多",
      showLoadMore:false,
      showNoMoreDynamics:false,
      all_datas_topics:0,
      nowPage:0,
      pager:{
        pageCount:2,
        pageIndex:0,
        pageSize:10,
        total:0,
      }
    };
  },
  created() {},
  components:{
    loadingBtn:loadingBtn,
    noResult:noResult,
  },
  computed: {
    ...mapGetters({
      VX_isSinaHealthAppForceIng:"isSinaHealthAppForceIng",
    })
  },
  methods: {
    search(){
      this.pager.pageIndex=0;
      this.docList=[];
      this.load_by_pagenum();
    },
    load_by_pagenum(){
      let _this=this;
      if(this.load_topics_loading) return;
      this.load_topics_loading=true;
      //查询帖子信息
      let dataPost={
        keyWord:_this.keywords,
        pageSize:_this.pager.pageSize,
        pageIndex:_this.pager.pageIndex+1
      };
      doctorService.query_doc_bykeywords(dataPost).then(res=>{
        _this.load_topics_loading=false;
        if(res.code==0&&res.data){
          if(res.data.length>0){
            _this.docList=_this.docList.concat(res.data);
            _this.pager.pageCount=parseInt(res.page.pageCount);
            _this.pager.pageIndex=parseInt(res.page.pageIndex);
            _this.all_datas_topics=parseInt(res.page.total);
            if(_this.pager.pageIndex+1>_this.pager.pageCount){
              _this.showNoMoreDynamics=true;
              _this.showLoadMore=false;
            }else{
              _this.showNoMoreDynamics=false;
              _this.showLoadMore=true;
            }
          }
        }
      },function(){
        _this.load_topics_loading=false;
        _this.load_topics_text="加载失败，点击重试";
      })
        .then(()=>{
          _this.$emit("changeSearching",false);
          _this.$emit("change_res_num",_this.docList.length);
        });
    }
  },
  watch:{
    "keywords":function(newVal){
      if(newVal!=""){
        this.search();
      }
    }
  }
};
</script>
<style  scoped lang="less" rel="stylesheet/less">
@import './css.less';
</style>
