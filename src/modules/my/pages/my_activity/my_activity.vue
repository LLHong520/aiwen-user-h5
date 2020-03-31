<template>
  <layout class="user-center" :curTabIndex="4" :tabbarSwitch="false">
      <!-- page_header -->
       <m-header slot="page_header" title='我的活动'>
         <span class="retrun" slot='left' @click="router_back">
          <b class="split"></b>
         </span>
         <span class="retrun" slot='right'></span>
      </m-header>
      <!-- page_header -->
      <!-- page_container -->
      <div slot="page_container" class="app_wrapper_inner activity_wrapper_inner">
         <div  class="activitys_wrapper_inner activity_wrapper">
           <loading-holder :loading="initing">
            <section class="activity_list">
              <div v-for="(item,index) in activity_list" :key="index"  class="activity-item" :class="{'active':item.isDropdown}">
                <div class="item-header" @click="displayThis(index)">
                  <p class="type">#{{item.actType}}# {{item.title}}</p>
                  <p class="time">{{item.createTime}}</p>
                  <span class="toogle_dropdown"><i class="icon-arrow_down ml5" :class="{'active':item.isDropdown}"></i></span>
                </div>
                <div class="question-list" v-show="item.isDropdown">
                  <router-link tag="div" v-for="(question,q_index) in item.questionList"  :key="q_index" class="question-item"  :to="'/my/ask_detail/'+question.qid">
                    <div class="question-item-header">
                      <p>#{{item.actType}}# {{question.title}}</p>
                      <p>
                        <span class="c_f60" v-if="question.status==0">咨询失败</span>
                        <span class="c_yellow" v-if="question.status==1">处理中</span>
                        <span class="c_green" v-if="question.status==2">已发表</span>
                        <span class="c_f60" v-if="question.status==3">审核未通过</span>
                      </p>
                    </div>
                    <div class="question-item-footer">
                      <p>发表于 <span class="c_green">{{question.circleName}}</span></p>
                      <p class="time">{{question.createTime}}</p>
                    </div>
                  </router-link>
                </div>
              </div>
             <loading-btn v-if="activity_list.length>9" :loading="load_more" :title="load_btn_text" @loadFn="getActivity"></loading-btn>
             <no-result title="您还没有参加活动哇~" v-if="!load_more&&activity_list.length==0"></no-result>
            </section>
           </loading-holder>
         </div>
       </div>
       <!-- /page_container -->
       <!-- page_footer -->
       <div  slot="page_footer">
          <loading-page v-show='initing_page' title="加载中..."></loading-page>
          <!--/消息详情  -->
          <to-top></to-top>
     </div>
  </layout>
</template>
<script>
import loadingHolder from "@/components/loading-holder/loading-holder";
import Header from "@/components/header/Header";
import userService from "@/services/userService.js";
import loadingBtn from "@/components/loading-btn/loading-btn";
import noResult from "@/components/no-result/no-result";
import {toTopMixin,commonMixin} from "@/mixins";
export default {
  name: "my_sms",
  mixins: [commonMixin,toTopMixin],
  data() {
    return {
      load_more:false,
      load_btn_text:"点击加载更多",
      activity_list:[],
      initing:false,
      hasMore:true,
      preview_item:{},
      pager:{
        totalCount:0,
        totalPage:1,
        nowPage:0,
      }
    };
  },
  computed:{},
  created() {
    let _this=this;
    _this._init_page();
    //计算图片宽高
    this.imgInfo={
      w:lib.flexible.rem2px(80/64),
      h:lib.flexible.rem2px(80/64)
    };
  },
  mounted(){},
  methods: {
    getActivity(){
      if(!this.hasMore) return;
      let This=this;
      let targetPageNum=this.pager.nowPage+1;
      if(targetPageNum==1){
        this.initing=true;
      }else{
        this.load_more=true;
      }
      let queryParams={
        nowPage:targetPageNum
      };
      userService.my_activity(queryParams).then((res)=>{
        if(targetPageNum==1){
          This.initing=false;
        }
        if(res.code==0&&res.data){
          res.data.map(item=>{
            item.isDropdown=false;
          });
          This.activity_list= This.activity_list.concat(res.data);
          This.pager.nowPage=targetPageNum;
          if(targetPageNum!=1){
            This.load_more=false;
          }
          //确定没有更多时
          if(res.data.length<10){
            This.load_btn_text="没有更多了";
            This.hasMore=false;
          }
        }
      },function(){
        This.initing=false;
        This.load_more=false;
      });
    },
    _init_page(){
      this.initing = true;
      this.getActivity();
    },
    displayThis(index){
      let This=this;
      if(This.activity_list[index].isDropdown){
        This.activity_list[index].isDropdown=!This.activity_list[index].isDropdown;
        return;
      }
      let queryParams={
        id:this.activity_list[index].id,
        nowPage:1
      };
      userService.activity_questions(queryParams).then((res)=>{
        if(res.code==0){
          This.activity_list[index].isDropdown=!This.activity_list[index].isDropdown;
          This.activity_list[index].questionList=res.data;
        }
      });
    },
    cancel_pop(){
      this.$refs.activity_preview.hide();
    }
  },
  components: {
    mHeader: Header,
    loadingHolder: loadingHolder,
    loadingBtn,
    noResult
  }
};
</script>
<style  scoped lang="less" rel="stylesheet/less">
@import './css.less';
.activity_wrapper_inner{
  position: relative;
}
</style>
