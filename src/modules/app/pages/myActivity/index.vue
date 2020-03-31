<template>
  <div class="my_activity_wrapper">
    <template v-if="activityList.length > 0">
      <ul class="activity_list">
        <li v-for="(item, index) in activityList" :key="index">
          <a :href="getActivityUrl(item)">
            <div class="cover_wrapper">
              <i v-if="item.activityStatus == 1" class="is_ongoing"></i>
              <img :src="GET_IMG_URL(item.activityPic, 'b')" alt>
            </div>
            <div class="content_wrapper">
              <div class="title">
                {{item.content}}
              </div>
              <div class="item">
                <span class="item_label">{{getActivityType(item.activityType)}}</span>
                <span class="item_date">{{item.activityTime}}</span>
              </div>
            </div>
          </a>
        </li>
      </ul>

      <loading-btn
        :loading="activityListLoading"
        :title="activityListText"
        :scroll_load="true"
        @loadFn="renderActivityList"
      ></loading-btn>
    </template>
    <noResult v-else title="暂无内容"></noResult>
  </div>
</template>

<script>
  import {
    commonMixin,
  } from "@/mixins";
  import { CW_ACT,OUTER_LINKS } from "@/config";
  import loadingBtn from "@/components/loading-btn/loading-btn";
  import noResult from "@/components/empty/empty";

  import activityService from "@/services/activityService.js";

  export default {
    mixins: [commonMixin],
    data() {
      return {
        CW_ACT,
        OUTER_LINKS,
        activityList: [],
        isOngoing: false,
        activityListLoading: false,
        activityListIsEnd: false,
        activityListText: "加载更多",
        pageSize: 10,
        pageIndex: 0,
        total: 0,
      };
    },
    components: {
      loadingBtn,
      noResult,
    },
    created() {
      this.renderActivityList();
    },
    methods: {
      getActivityUrl(item) {
        let url = "";
        switch (item.busType) {
        //公益活动
          case "1":
            url = CW_ACT + item.busId;
            break;
        //微访谈
          case "2":
            url = OUTER_LINKS.weiTalkDetail + item.busId;
            break;
        //课堂直播
          case "3":
            url = OUTER_LINKS.courseDetails + item.busId;
            break;
          default:
            url = CW_ACT + item.busId;
            break;
        }
        return url;
      },
      getActivityType(type) {
        switch (type) {
          case "DOCTORDAY":
            return "爱医日";
            break;
          case "HEALTHDAY":
            return "健康日";
            break;
          case "CLINICDAY":
            return "义诊日";
            break;
          case "WEITALK":
            return "微访谈";
            break;
          case "LESSON":
            return "直播课堂";
            break;

          default:
            break;
        }
      },
      renderActivityList() {
        if (this.activityListLoading || this.activityListIsEnd) return;
        this.activityListLoading = true;

        let data = {
          // userId: "581454e89cb4a342bcd8fe87",
          busType: "",
          pageIndex: this.pageIndex + 1,
          limit: this.pageSize,
        };

        activityService.myActivity(data).then((res) => {
          this.activityListLoading = false;
          if(res.code == 0 && res.data) {
            this.activityList = this.activityList.concat(res.data);
            this.pageIndex += 1;
            if(this.pageIndex >= res.page.pageCount) {
              this.activityListIsEnd = true;
              this.activityListText = "没有更多了";
            }else {
              this.activityListIsEnd = false;
            };
          }
        }).catch(() => {
          this.activityListLoading = false;
        });
      }
    }
  };
</script>


<style lang="less" scoped>
  @import "./css.less";
</style>

