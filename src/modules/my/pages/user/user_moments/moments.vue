<template>
<div class="user-moments">
     <loading-holder :loading="moments_list_loading">
          <div  v-if="moments_list.length>0">
          <ul class="hot_moments_list clearfix" >
            <!-- 圈子条目 -->
            <router-link :to="'/m/'+item.circleId" v-for="(item,s_index) in moments_list" tag="li" class="hot_moments_item" :key="item.id">
            <div class="item_avater">
                <img v-lazy="GET_IMG_URL(item.circlePhoto,'m')" alt="爱问医联" />
            </div>
            <div class="item_info">
                <p class="item_name">{{item.circleName}}</p>
                <!-- {{GET_IMG_URL(item.circlePhoto)}} -->
                <!-- <p class="item_desc">{{item.circleName}}</p> -->
            </div>

            <!-- <div class="moment_actions">
              <input type="button" :value="getJoinBtnText(item.is_join)" class="join_moment" :class="{'disable':item.is_join}" @click='join_moment(item.id)' />
            </div> -->

            </router-link>
            <!-- /圈子条目 -->
          </ul>
            <loading-btn
            v-if="pager.totalPage>1&&!showNoMoreMoments"
            :loading="load_more_loading"
            :title="load_more_text"
            @loadFn="loadMoments">
            </loading-btn>
          </div>
         <no-result title="您还没有加入圈子哇~" v-if="moments_list.length==0"></no-result>
     </loading-holder>
     <div class="user-no-focus"  v-if="moments_list.length>0&&showNoMoreMoments">
      <div>没有更多内容了，去<router-link to="/home/guang">圈子</router-link>逛逛吧~</div>
     </div>
</div>
</template>

<script>
import {commonMixin} from "@/mixins";
import loadingBtn from "@/components/loading-btn/loading-btn";
import noResult from "@/components/no-result/no-result";
import loadingHolder from "@/components/loading-holder/loading-holder";
import userService from "@/services/userService.js";
export default {
  name: "moments",
  mixins:[commonMixin],
  data () {
    return {
      moments_list: [],
      load_more_text:"点击加载更多",
      moments_list_loading:true,
      load_more_loading:false,
      hasMore:true,
      showNoMoreMoments:false,
      pager:{
        totalCount:0,
        totalPage:1,
        nowPage:0,
      }
    };
  },
  components:{
    noResult:noResult,
    loadingHolder,
    loadingBtn
  },
  created(){
    this.u_id = this.$route.params.id;
    this._initPage();
  },
  methods:{
    loadMoments(){
      if(!this.hasMore) return;
      let _this=this;
      let targetPageNum=this.pager.nowPage+1;
      if(targetPageNum==1){
        this.moments_list_loading=true;
      }else{
        this.load_more_loading=true;
      }
      userService.moments({ id: this.u_id,nowPage:targetPageNum})
        .then((res)=>{
          if(targetPageNum==1){
            _this.moments_list_loading=false;
          }
          if(res.code==0&&res.data){
            _this.moments_list=_this.moments_list.concat(res.data.result);
            _this.pager.nowPage=parseInt(res.data.nowPage);
            _this.pager.totalPage=parseInt(res.data.totalPage);
            if(targetPageNum!=1){
              _this.load_more_loading=false;
            }
            //确定没有更多时
            if(_this.pager.nowPage+1>_this.pager.totalPage){
              _this.load_more_text="没有更多了";
              _this.hasMore=false;
              _this.showNoMoreMoments=true;
            }
          }
        }
          ,function(){
            _this.moments_list_loading=false;
            _this.load_more_loading=false;
          });
    },
    _initPage(){
      this.loadMoments();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' rel="stylesheet/less">
@import './css.less';
</style>
