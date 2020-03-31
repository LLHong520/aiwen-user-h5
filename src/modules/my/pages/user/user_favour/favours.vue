<template>
<div class="user-favours">
  <loading-holder :loading="loading">
  <div  v-if="favours.length>0">
    <ul class="favours_list clearfix">
      <!-- 收藏条目 -->
      <router-link :to="'/t/'+item.id" v-for="(item,s_index) in favours" tag="li" class="favours_item" :key="item.id">
        <div class="item_content">
          <span  v-html="item.title"></span>
        </div>
        <div class="item_info">
          <p class="item_name">
            {{item.authorNick||'游客'}}
          </p>
          <p class="view_num">
            <i class="icon-reply disable"></i><span class="ml5">{{item.recoveryAmount}}</span>
          </p>
        </div>
      </router-link>
      <!-- /收藏条目 -->
    </ul>
    <loading-btn
    v-if="pager.totalPage>1"
    :loading="load_more_loading"
    :title="load_more_text"
    @loadFn="loadfavours">
    </loading-btn>
  </div>
    <no-result title="您没有收藏东东哇~" v-if="favours.length==0"></no-result>
  </loading-holder>
</div>

</template>

<script>
import loadingBtn from "@/components/loading-btn/loading-btn";
import {commonMixin} from "@/mixins";
import loadingHolder from "@/components/loading-holder/loading-holder";
import noResult from "@/components/no-result/no-result";
import userService from "@/services/userService.js";
export default {
  name: "favours",
  mixins:[commonMixin],
  data () {
    return {
      favours:[],
      loading:false,
      load_more_loading:false,
      hasMore:true,
      load_more_text:"点击加载更多",
      pager:{
        totalCount:0,
        totalPage:1,
        nowPage:0,
      }
    };
  },
  components:{
    noResult:noResult,
    loadingHolder: loadingHolder,
    loadingBtn:loadingBtn,
  },
  created(){
    this.u_id=this.$route.params.id;
    this.checkIs_self();
    this.loadfavours();
  },
  methods: {
    loadfavours() {
      if(!this.hasMore) return;
      let _this = this;
      let targetPageNum=this.pager.nowPage+1;
      if(targetPageNum==1){
        this.loading=true;
      }else{
        this.load_more_loading=true;
      }
      userService.favours({id:this.u_id,nowPage:targetPageNum})
        .then((res) => {
          if(targetPageNum==1){
            _this.loading=false;
          }
          if (res.code == 0&&res.data) {
            _this.favours = _this.favours.concat(res.data.result);
            _this.pager.nowPage=parseInt(res.data.nowPage);
            _this.pager.totalPage=parseInt(res.data.totalPage);
            if(targetPageNum!=1){
              _this.load_more_loading=false;
            }
            //确定没有更多时
            if(_this.pager.nowPage+1>_this.pager.totalPage){
              _this.load_more_text="没有更多了";
              _this.hasMore=false;
            }
          }
        },function(){
          _this.loading=false;
          _this.load_more_loading=false;
        });
    },
    checkIs_self(){
      //限制他人查看用户的个人收藏
      let user_id = this.VX_userInfo.id;
      let post_id = this.u_id;
      if (user_id != post_id) {
        this.$router.go(-1);
        return;
      }
    }
  },
  activated(){
    this.checkIs_self();
  },
  computed:{}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' rel="stylesheet/less">
@import './css.less';
</style>
