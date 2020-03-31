<template>
  <div>
  <!-- 圈子 -->
  <div v-if="moments_list.length>0">
    <h2 class="block_title"><span>圈子</span><span class="result-number">一共找到<b>{{all_datas_circle}}</b>个结果</span></h2>
    <loading v-if="moments_list_loading"></loading>
    <section class="hot_moments_wrapper" v-if="moments_list.length>0">
      <ul class="hot_moments_list clearfix">
       <!-- 圈子条目 -->
       <li class="hot_moments_item" v-for='(item,index) in moments_list' :key="index">
         <div class="item_avater">
           <a :href="OUTER_LINKS.momentDetails+item.id">
             <img :src="GET_IMG_URL(item.circlePhoto,'m')" :height="imgInfo.h" :width="imgInfo.w" alt="爱问医联" />
           </a>
         </div>
         <div class="item_info">
           <a :href="OUTER_LINKS.momentDetails+item.id">
             <p class="item_name">{{item.circleName}}</p>
          </a>
        </div>
      </li>
      <!-- /圈子条目 -->
    </ul>
    <div v-show="more_cricle" @click="load_by_pagenum" class="toogle_more"></div>
  </section>
  </div>
  <noResult v-else title="木有相关圈子哇~"></noResult>
<!-- /圈子 -->
</div>
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
      moments_list: [],
      moments_list_loading:false,
      load_topics_text:"点击加载更多",
      showLoadMore:false,
      showNoMoreDynamics:false,
      all_datas_circle:0,
      more_cricle:true,
      pager:{
        pageCount:2,
        pageIndex:0,
        pageSize:8,
        total:0,
      }
    };
  },
  created(){
    //计算图片宽高
    this.imgInfo={
      w:lib.flexible.rem2px(97/75),
      h:lib.flexible.rem2px(97/75)
    };
  },
  mounted() {
  },
  updated() {
  },
  components:{
    loadingBtn:loadingBtn,
    noResult:noResult,
  },
  methods: {
    search(){
      this.pager.pageIndex=0;
      this.moments_list=[];
      this.load_by_pagenum();
    },
    load_by_pagenum(){
      let _this=this;
      if(this.moments_list_loading) return;
      this.moments_list_loading=true;
      //查询帖子信息
      let dataPost={
        words:_this.keywords,
        pageSize:_this.pager.pageSize,
        pageIndex:_this.pager.pageIndex+1
      };
      momentService.search_circle(dataPost).then(res=>{
        _this.moments_list_loading=false;
        if(res.code==0&&res.data){
          if(res.data.length>0){
            _this.moments_list=_this.moments_list.concat(res.data);
            _this.pager.pageCount=parseInt(res.page.pageCount);
            _this.pager.pageIndex=parseInt(res.page.pageIndex);
            _this.all_datas_circle=parseInt(res.page.total);
            if(_this.pager.pageIndex+1>_this.pager.pageCount){
              _this.more_cricle=false;
            }else{
              _this.more_cricle=true;
            }
          }
        }
      },function(){
        _this.moments_list_loading=false;
        _this.load_topics_text="加载失败，点击重试";
      })
        .then(()=>{
          _this.$emit("changeSearching",false);
          _this.$emit("change_res_num",_this.moments_list.length);
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
