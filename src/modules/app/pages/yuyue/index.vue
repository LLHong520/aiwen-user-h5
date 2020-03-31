<template>
  <div class="wrapper">
    <div v-if="yuyueList.length>0">
      <div class="zixun_list">
        <ul>
          <li v-for="(item,index) in yuyueList" :key="index">
            <a :href="YK_URL+'/outpatient/appointmentDetails/'+item.contentId">
              <div class="img">
                <img src="./images/news_icon_book_s@2x.png" alt>
              </div>
              <div class="info">
                <dl>
                  <dt>{{item.contentTypeName}}：{{item.content}}</dt>
                  <dd>
                    <div class="txt">
                      门诊预约
                      <span class="time">· {{item.dateTimeStyle}}</span>
                    </div>
                    <div class="state">
                      <span class="blue">{{item.contentHref}}</span>
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
      yuyueList: [],
      indexlistType: 1,
      curPage: 0,
      pageCount: 1,
      listLoading: false,
      listLoadingText: "加载更多",
      listIsEnd: false
    };
  },
  components: {
    loadingBtn,
    loadingPlaceHolder: loadingPlaceHolder,
    noResult
  },
  created() {
    this.myService();
  },
  methods: {
    myService() {
      if (this.listLoading || this.listIsEnd) return;
      this.listLoading = true;
      let This = this;
      let params = {
        pageIndex: this.curPage + 1,
        pageSize: 10,
        contentType: 7
      };
      userService.myService(params).then(res => {
        This.listLoading = false;
        if (res.code == 0 && res.data) {
          This.curPage += 1;
          This.pageCount = res.page.pageCount > 2 ? res.page.pageCount : 2;
          This.yuyueList = This.yuyueList.concat(res.data);
          console.log(This.pageCount);
          console.log(res.page.pageCount);
          if (This.curPage > This.pageCount) {
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
