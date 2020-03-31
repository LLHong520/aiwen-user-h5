<template>
  <layout class="user-center" :curTabIndex="4" :tabbarSwitch="false">
      <!-- page_header -->
       <m-header slot="page_header" title='我的服务'>
         <span class="retrun" slot='left' @click="router_back">
          <b class="split"></b>
         </span>
         <span class="retrun" slot='right'>
         </span>
      </m-header>
      <!-- page_header -->
      <!-- page_container -->
      <div slot="page_container" class="app_wrapper_inner activity_wrapper_inner">
        <!-- tab切換 -->
        <Tab
        @changeCallBack="changeTab"
        :tabs="['我的问诊','我的预约','我的课堂']"
        ref="tabRef"
        ></Tab>
        <!-- /tab切換 -->
         <div  class="activitys_wrapper_inner activity_wrapper">
           <interrogation v-show="loadServiceType==1"></interrogation>
           <keep-alive>
             <oppointment v-if="loadServiceType==2"></oppointment>
             <courses v-if="loadServiceType==3"></courses>
           </keep-alive>
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
import Tab from "@/components/tab/tab";
import interrogation from "./components/interrogation";
import oppointment from "./components/oppointment";
import courses from "./components/courses";
import loadingHolder from "@/components/loading-holder/loading-holder";
import Header from "@/components/header/Header";
import userService from "@/services/userService.js";
import loadingBtn from "@/components/loading-btn/loading-btn";
import noResult from "@/components/no-result/no-result";
import {toTopMixin,commonMixin} from "@/mixins";
export default {
  name: "my_service",
  mixins: [commonMixin,toTopMixin],
  components: {
    mHeader: Header,
    loadingHolder: loadingHolder,
    loadingBtn,
    Tab,
    interrogation,
    oppointment,
    courses,
    noResult
  },
  data() {
    return {
      loadServiceType:1,
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
  mounted(){
  },
  methods: {
    changeTab(index){
      let action_name="1";
      switch (index) {
        case 1:
          action_name="2";
          break;
        case 2:
          action_name="3";
          break;
      }
      this.loadServiceType=action_name;
    },
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
  }
};
</script>
<style  scoped lang="less" rel="stylesheet/less">
@import './css.less';
.activity_wrapper_inner{
  position: relative;
}
</style>
