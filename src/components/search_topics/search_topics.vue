<template>
<section>
  <div v-if="topics.length>0">
  <!-- 帖子 -->
  <h2 class="block_title title-sbor"><span>帖子</span><span class="result-number">一共找到<b>{{all_datas_topics}}</b>个结果</span></h2>
  <section class="dynamic_wrapper">
    <div v-for="(topicitem,index) in topics" :key="index">
      <!-- -->
      <ul class="dynamic_list">
        <li  class="dynamic_item">
          <a :href="OUTER_LINKS.topicDetails+topicitem.id" class="item_con">
            <div class="item_con">
              <span class="item-con-title" v-html="topicitem.title"></span>
            </div>
          </a>

          <div class="item-footer clearfix">
            <p  class="item-author">
              <a :href="OUTER_LINKS.userDetails+topicitem.authorId">
                <span class="name">{{topicitem.authorNick}}</span>
              </a>
            </p>
            <p class="item_info">
              <span>
              <span class="reply">发布在 <a :href="OUTER_LINKS.momentDetails+topicitem.circleId">“{{topicitem.circleName}}”</a></span>
              </span>
            </p>
          </div>
        </li>
      </ul>
      <!-- -->
    </div>
  </section>

  <!-- /帖子 -->
   <loading-btn
    v-if="showLoadMore"
    :loading="load_topics_loading"
    :title="load_topics_text"
    @loadFn="load_by_pagenum"
    :scroll_load="true"
    ></loading-btn>
    <div class="user-no-focus"  v-if="topics.length>0&&showNoMoreDynamics">
     <div>木有更多结果了 >_< </div>
   </div>
</div>
  <noResult v-else title="木有找到帖子哇~"></noResult>
</section>
</template>
<script>
import { commonMixin, toTopMixin} from "@/mixins";
import loadingBtn from "@/components/loading-btn/loading-btn";
import noResult from "@/components/no-result/no-result";
import momentService from "@/services/momentService.js";
export default {
  name: "search_topics",
  mixins:[commonMixin,toTopMixin],
  props:["keywords"],
  data() {
    return {
      topics: [],
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
    noResult
  },
  methods: {
    search(){
      this.pager.pageIndex=0;
      this.topics=[];
      this.load_by_pagenum();
    },
    load_by_pagenum(){
      let _this=this;
      if(this.load_topics_loading) return;
      this.load_topics_loading=true;
      //查询帖子信息
      let dataPost={
        words:_this.keywords,
        pageSize:_this.pager.pageSize,
        pageIndex:_this.pager.pageIndex+1
      };
      momentService.search_topic(dataPost).then(res=>{
        _this.load_topics_loading=false;
        if(res.code==0&&res.data){
          if(res.data.length>0){
            _this.topics=_this.topics.concat(res.data);
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
          _this.$emit("change_res_num",_this.topics.length);
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
