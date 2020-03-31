<template>
  <div class="wrapper">
    <div v-if="askList.length>0">
      <div class="zixun_list" >
        <ul >
          <li v-for="(item,index) in askList" :key="index">
            <a :href="getJumpUrl(item)">
              <div class="img">
                <img v-if="item.contentType==1" src="./images/news_icon_ask_s@2x.png">
                <img v-if="item.contentType==2||item.contentType==201" src="./images/news_icon_events_s@2x.png">
                <img v-if="item.contentType==9" src="./images/news_icon_phone@2x.png">
              </div>
              <div class="info">
                <dl>
                  <dt>@{{item.contentTypeName}}：{{item.content}}</dt>
                  <dd>
                    <div class="txt">
                      <span v-if="item.contentType==1">图文咨询</span>
                      <span v-if="item.contentType==9">电话咨询</span>
                      <span v-else>公益咨询</span>
                      <span class="time">· {{item.dateTimeStyle}}</span>
                    </div>
                    <div class="state" v-if="item.contentType==2">
                      <span class="blue">{{item.contentHref}}</span>
                    </div>
                    <div class="state" v-if="item.contentType==9">
                      <span :class="{'red':['待支付','待确认','超时关闭'].includes(item.contentHref),'blue':['咨询中'].includes(item.contentHref)}" class="gery">{{item.contentHref}}</span>
                    </div>
                    <div class="state" v-else>
                      <span class="blue" v-if="item.contentHref==1">待支付</span>
                      <span class="blue" v-if="item.contentHref==2">支付已取消</span>
                      <span class="blue" v-if="item.contentHref==3">待回复</span>
                      <span class="blue" v-if="item.contentHref==4">待评价</span>
                      <span class="blue" v-if="item.contentHref==5">已评价</span>
                      <span class="blue" v-if="item.contentHref==6">默认好评</span>
                      <span class="blue" v-if="item.contentHref==7">退款申请中</span>
                      <span class="blue" v-if="item.contentHref==8">退款申请失败</span>
                      <span class="blue" v-if="item.contentHref==9">退款申请成功</span>
                      <span class="blue" v-if="item.contentHref==10">已关闭</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </a>
          </li>
        </ul>
        <!-- <loadingPlaceHolder v-else v-for="n in 2" :key="n.key"></loadingPlaceHolder> -->
      </div>
      <loading-btn
        :loading="listLoading"
        :title="listLoadingText"
        :scroll_load="true"
        @loadFn="myService"
      ></loading-btn>
    </div>
    <noResult v-else title="暂无内容"></noResult>
  </div>
</template>
<script>
import { YK_URL } from "@/config";
import loadingBtn from "@/components/loading-btn/loading-btn";
import loadingPlaceHolder from "@/components/loading-place-holder/loading-place-holder";
import noResult from "@/components/empty/empty";
import { commonMixin, toTopMixin } from "@/mixins";
import userService from "@/services/userService.js";
export default {
  mixins: [commonMixin, toTopMixin],
  data() {
    return {
      YK_URL,
      askList: [],
      indexlistType: 1,
      curPage: 0,
      pageCount: 1,
      listLoading: false,
      listLoadingText: "加载更多",
      listIsEnd: false,
    };
  },
  components: {
    loadingBtn,
    loadingPlaceHolder: loadingPlaceHolder,
    noResult,
  },
  created() {
    this.myService();
  },
  methods: {
    getJumpUrl(item){
      let url = `${this.YK_URL}/consult/detail/${item.contentId}`;
      if(item.contentType == 9){
        url = this.$router.resolve({
          name:"phone_orderDetail",
          params:{
            orderId:item.contentId
          },
          query:{
            dId:item.drUserId
          }
        }).href;
        // if(item.contentHref == "待支付"){
        //   url = this.$route.resolve({
        //     name:"Payment",
        //     params:{
        //       businessId:item.contentId
        //     }
        //   }).href;
        // }else{
        //   url = this.$router.resolve({
        //     name:"dialogueList",
        //     params:{
        //       dId:item.drUserId
        //     }
        //   }).href;
        // }
      }else{
        if(item.contentHref == 1){
          url = `${this.YK_URL}/consult/index?qid=${item.contentId}&drId=${item.drUserId}&mid=${item.mid}`;
        }
      }
      return url;
    },
    myService() {
      if (this.listLoading || this.listIsEnd) return;
      this.listLoading = true;
      let This = this;
      let params = {
        pageIndex: this.curPage + 1,
        pageSize: 10,
        contentType: "1,2,9"
      };
      userService.myService(params).then(res => {
        This.listLoading = false;
        if (res.code == 0 && res.data) {
          This.curPage += 1;
          This.pageCount = res.page.pageCount;
          This.askList = This.askList.concat(res.data);
          console.log(This.pageCount);
          console.log(res.page.pageCount);
          if (This.curPage >= This.pageCount) {
            This.listIsEnd = true;
            This.listLoadingText = "没有更多了";
          } else {
            This.listIsEnd = false;
          }
        }
      });
    }
  }
};
</script>


<style scoped lang="less"  rel="stylesheet/less">
@import "./css.less";
</style>
