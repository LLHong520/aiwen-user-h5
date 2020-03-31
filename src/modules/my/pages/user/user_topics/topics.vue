<template>
<div class="user-topics">
  <loading-holder :loading="initing">
  <div class="list_wrapper"  v-if="topic_list.length>0">

      <ul class="favours_list clearfix">
        <!-- 收藏条目 -->
        <router-link :to="'/t/'+item.postsId" v-for="(item,s_index) in topic_list" tag="li" class="favours_item" :key="s_index">
          <div v-if="item.postsType==1">
            <div class="item_content">
              {{item.text}}
            </div>
            <div class="item_info">
              <p class="item_name">
                发表于 {{item.circleName}}
              </p>
              <p class="item_time">
                {{item.publishTime}}
              </p>
            </div>
          </div>
          <div v-else-if="item.postsType==2">
            <div class="item_content">
              {{item.text}}
            </div>
            <div class="item_reply_con">
              <span class="c_555">原帖：</span>{{item.subText}}
            </div>
            <div class="item_info">
              <p class="item_name">
                回复于 {{item.circleName}}
              </p>
              <p class="item_time">
                {{item.publishTime}}
              </p>
            </div>
          </div>
          <div v-else>
            <div class="item_content">
              回复 {{item.replyName}}： {{item.text}}
            </div>
            <div class="item_reply_con">
              <span class="c_555">原帖：</span>{{item.subText}}
            </div>
            <div class="item_info">
              <p class="item_name">
                回复于 {{item.circleName}}
              </p>
              <p class="item_time">
                {{item.publishTime}}
              </p>
            </div>
          </div>

        </router-link>
        <!-- /收藏条目 -->
      </ul>
      <loading-btn v-if="pager.pageCount>1" :loading="load_more" :title="load_btn_text" @loadFn="loadtopic"></loading-btn>
  </div>
   <no-result title="啊哦~没有帖子~" v-if="!initing&&topic_list.length==0"></no-result>
  </loading-holder>
</div>
</template>

<script>
import store from "@/store";
import { toTopMixin , commonMixin} from "@/mixins";
import loadingHolder from "@/components/loading-holder/loading-holder";
import loadingBtn from "@/components/loading-btn/loading-btn";
import noResult from "@/components/no-result/no-result";
import userService from "@/services/userService.js";
export default {
  name: "topics",
  mixins: [toTopMixin, commonMixin],
  data () {
    return {
      topic_list: [],
      initing: true,
      load_btn_text:"点击加载更多",
      load_more: false,
      hasMore: true,
      pager:{
        total:0,
        pageCount:1,
        pageIndex:0,
      }
    };
  },
  components:{
    noResult:noResult,
    loadingHolder: loadingHolder,
    loadingBtn: loadingBtn,
  },
  created() {
    this.uid = this.$route.params.id;
    let _this=this;
    setTimeout(function(){
      _this._initPage();
    },500);
  },
  methods: {
    loadtopic() {
      if(!this.hasMore) return;
      let _this = this;
      let targetPageNum=parseInt(this.pager.pageIndex)+1;
      if(targetPageNum==1){
        this.initing=true;
      }else{
        this.load_more=true;
      }
      userService.user_topics({ userId: this.uid,pageIndex:targetPageNum})
        .then((res) => {
          if(targetPageNum==1){
            _this.initing=false;
          }else{
            _this.load_more=false;
          }
          if (res.code == 0) {
            _this.topic_list=_this.topic_list.concat(res.data);
            _this.pager.pageIndex=parseInt(res.page.pageIndex);
            _this.pager.pageCount=parseInt(res.page.pageCount);
            //确定没有更多时
            if(_this.pager.pageIndex+1>_this.pager.pageCount){
              _this.load_btn_text="没有更多了";
              _this.hasMore=false;
            }
          }
        }
          ,function(){
            _this.initing=false;
            _this.load_more=false;
          });
    },
    _initPage(){
      this.initing=true;
      this.loadtopic();
    }
  },
  watch:{
    "$route":function(newVal){
      if(newVal.params.id!= this.uid){
        this.uid = newVal.params.id;
        this.topic_list=[];
        this.load_btn_text="点击加载更多";
        this.load_more=false;
        this.hasMore=true;
        this.pager={
          total:0,
          pageCount:1,
          pageIndex:0,
        };
        this._initPage();
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    //如果要跳转到的用户主页为当前登录用户 则重置页面到当前用户的个人中心
    if (to.params.id==store.state.userInfo.id) {
      next("/mine");
    } else {
      next();
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' rel="stylesheet/less">
@import './css.less';
</style>
