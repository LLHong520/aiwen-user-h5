<template>
 <loading-holder :loading="initing">
  <section class="activity_list">
    <div v-for="(item,index) in interrogation_list" :key="index"  class="activity-item" :class="{'active':item.isDropdown}">
      <div class="item-header">
        <div class="doc_info">
          <div class="avater"><img v-lazy="GET_IMG_URL(item.docPhoto,'u')"/></div>
          <p>{{item.docName}} 我的预约 <span class="department">{{item.department}}</span></p>
        </div>
        <p class="interr_status">
          <span class="c_f60" v-if="item.status==0">待支付</span>
          <span class="c_yellow" v-if="item.status==1">待回复</span>
          <span class="c_green" v-if="item.status==2">已回复</span>
          <span class="c_f60" v-if="item.status==3">已评价</span>
        </p>
      </div>
      <div class="item-con">
         <p>{{item.desc}}</p>
      </div>
      <div class="item-footer">
        <p><span class="c_green">{{item.timeStr}}</span> 图文咨询</p>
        <p class="actions">
          <span class="c_f60 pay" v-if="item.status==0">支付</span>
          <span class="c_green" v-else>查看</span>
        </p>
      </div>
    </div>
   <loading-btn v-if="interrogation_list.length>9" :loading="load_more" :title="load_btn_text" @loadFn="getActivity"></loading-btn>
   <no-result title="您还没有参加活动哇~" v-if="!load_more&&interrogation_list.length==0"></no-result>
  </section>
 </loading-holder>
</template>
<script>
/*
**我的问诊
*/
import loadingHolder from "@/components/loading-holder/loading-holder";
import userService from "@/services/userService.js";
import loadingBtn from "@/components/loading-btn/loading-btn";
import noResult from "@/components/no-result/no-result";
import {toTopMixin,commonMixin} from "@/mixins";
export default {
  name: "interrogation",
  mixins: [commonMixin,toTopMixin],
  components: {
    loadingHolder: loadingHolder,
    loadingBtn,
    noResult
  },
  data() {
    return {
      load_more:false,
      load_btn_text:"点击加载更多",
      interrogation_list:[],
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
  mounted(){
  },
  methods: {
    goback(){
      this.$router.go(-1);
    },
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
      this.loadComentsType=action_name;
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
      userService.my_interrogation(queryParams).then((res)=>{
        if(targetPageNum==1){
          This.initing=false;
        }
        if(res.code==0&&res.data){
          res.data.map(item=>{
            item.isDropdown=false;
          });
          This.interrogation_list= This.interrogation_list.concat(res.data);
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
    }
  }
};
</script>
<style  scoped lang="less" rel="stylesheet/less">
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
  @r: 75rem;
  .activity_list {}

  .activity_wrapper {
    position: relative;
    background-color: #fff;
  }

  .activity-item {
    background-color: #fff;
    padding: 0;
    .font_l;
    border-bottom: 10px solid @bor_c;

    .item-header {
      .flexbox();
      padding: 20/@r 10px;
      .font_3xl;
      align-items: center;

      .doc_info{
        flex: 3;
        display:flex;
        align-items:center;
        .avater{
          width: 60/@r;
          height: 60/@r;
          margin-right: 10px;
          img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
      }

      .department{
        color: @main_c;
        .font_2xl;
      }

      .interr_status{
        flex: 1;
        text-align: right;
      }
    }

    .item-con{
      border-top: 1px solid @bor_c;
      padding:10px;
    }

    .item-footer {
      .font_l;
      padding: 10px 10px;
      display: flex;
      border-top: 1px solid @bor_c;
      &:last-child {
        border-bottom: none;
      }
      p {
        .flex(3);
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        color: #999;
        cursor: pointer;
        &:nth-of-type(2) {
          .flex(1);
          justify-content: flex-end;
          text-align: right;
        }
      }
      p.actions{
        span.pay{
          width: 100/@r;
          display: inline-block;
          text-align: center;
          border: 1px solid #ff6600;
        }
        span{
          width: 100/@r;
          display: inline-block;
          text-align: center;
          border: 1px solid @main_c;
          border-radius: 5px;
        }
      }
    }
  }
</style>
