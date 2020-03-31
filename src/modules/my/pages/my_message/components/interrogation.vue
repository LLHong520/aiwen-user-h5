<template>
  <loading-holder :loading="initing">
    <ul class="news">
      <!-- 活动消息 -->
      <template v-for="(item,index) in interrogation_list">
        <li :key="index">
          <a :href="YK_BASE_URL+item.url">
            <strong>
              <div class="news_left">
                <img :src="GET_IMG_URL(item.img,'u')" width="75" height="75">
                <span v-if="item.isRead==1"></span>
              </div>
              <div class="news_right">
                <h3><b>{{item.title}}</b><span>{{item.dateTime}}</span></h3>
                <p>{{item.content}}</p>
              </div>
            </strong>
          </a>
        </li>
        <!-- 系统消息 -->
        <!-- <li v-else-if="item==2" :key="index" >
         <strong onclick="window.location='#'">
            <div class="news_left"><img src="../images/news_02.png" /><em></em></div>
            <div class="news_right">
                <h3><b>系统消息</b><span>2016-07-18 16:48</span></h3>
                <p>饮食和睡眠问题上多注意一下，这样对你的心情也……</p>
            </div>
         </strong>
       </li>
       <li v-else-if="item==3" :key="index">
         <strong>
            <div class="news_left"><img src="../images/news_01.png" /></div>
            <div class="news_right">
                <h3><b>订阅了郭威龙医生</b><span>2016-07-18 16:48</span></h3>
                <p>雅文酱，你好~欢迎加入我的订阅，更多健康就在…</p>
            </div>
         </strong>
       </li> -->
      </template>
      <loading-btn v-if="interrogation_list.length>9" :loading="load_more" :title="load_btn_text" @loadFn="getActivity">
      </loading-btn>
      <no-result title="您还没有消息哇~" v-if="!load_more&&interrogation_list.length==0"></no-result>
    </ul>
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
  import {
    toTopMixin,
    commonMixin
  } from "@/mixins";
  import {
    YK_BASE_URL
  } from "@/config";
  export default {
    name: "interrogation",
    mixins: [commonMixin, toTopMixin],
    components: {
      loadingHolder: loadingHolder,
      loadingBtn,
      noResult
    },
    data() {
      return {
        YK_BASE_URL,
        load_more: false,
        load_btn_text: "点击加载更多",
        interrogation_list: [],
        initing: false,
        hasMore: true,
        pager: {
          totalCount: 0,
          totalPage: 1,
          nowPage: 0,
        }
      };
    },
    computed: {},
    created() {
      let _this = this;
      _this._init_page();
      //计算图片宽高
      this.imgInfo = {
        w: lib.flexible.rem2px(80 / 64),
        h: lib.flexible.rem2px(80 / 64)
      };
    },
    mounted() {},
    methods: {
      goback() {
        this.$router.go(-1);
      },
      getActivity() {
        if (!this.hasMore) return;
        let This = this;
        let targetPageNum = this.pager.nowPage + 1;
        if (targetPageNum == 1) {
          this.initing = true;
        } else {
          this.load_more = true;
        }
        let queryParams = {
          pageNum: targetPageNum,
          pageSize: 10
        };
        userService.my_interrogation(queryParams).then((res) => {
          if (targetPageNum == 1) {
            This.initing = false;
          }
          if (res.code == 0 && res.data) {
            res.data.map(item => {
              item.isDropdown = false;
            });
            This.interrogation_list = This.interrogation_list.concat(res.data);
            This.pager.nowPage = targetPageNum;
            if (targetPageNum != 1) {
              This.load_more = false;
            }
            //确定没有更多时
            if (res.data.length < 10) {
              This.load_btn_text = "没有更多了";
              This.hasMore = false;
            }
          }
        }, function () {
          This.initing = false;
          This.load_more = false;
        });
      },
      _init_page() {
        this.initing = true;
        this.load_more = false;
        this.load_btn_text = "点击加载更多";
        this.interrogation_list = [];
        this.hasMore = true;
        this.pager = {
          totalCount: 0,
          totalPage: 1,
          nowPage: 0,
        };
        this.getActivity();
      }
    }
  };

</script>
<style scoped lang="less" rel="stylesheet/less">
  @assets: "~@/assets";
  @import "@{assets}/css/flex.less";
  @import "@{assets}/css/fix.less";
  @r: 75rem;

  .news {
    background-color: #fff;
  }

  .news li {
    height: 68px;
    padding: 0 10px;
    border-bottom: 1px solid #eee;
    position: relative;
  }

  .news li strong {
    display: flex;
    cursor: pointer;
  }

  .news_left {
    width: 28px;
    height: 28px;
    padding-top: 4px;
    padding-right: 6px;
    margin-top: 11px;
    position: relative;
    margin-right: 5px;
  }

  .news_left img {
    width: 28px;
    height: 28px;
    border-radius: 14px;
  }

  .news_left span {
    background-color: #ff6555;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    color: #fff;
    text-align: center;
    line-height: 10px;
    position: absolute;
    top: 0;
    right: 0;
  }

  .news_left em {
    position: absolute;
    top: 4px;
    right: 6px;
    width: 8px;
    height: 8px;
    background-color: #ff6555;
    border-radius: 4px;
  }

  .news_right {
    flex: 1;
    margin-top: 14px;
    height: 45px;
  }

  .news_right h3 {
    font-size: 16px;
    font-weight: normal;
    line-height: 18px;
    height: 18px;
    overflow: hidden;
    display: flex;
  }

  .news_right h3 b {
    flex: 1;
    margin-right: 5px;
    word-break: break-all;
  }

  .news_right h3 span {
    float: right;
    font-size: 12px;
    color: #999;
    text-align: right;
  }

  .news_right p {
    font-size: 14px;
    color: #999;
    line-height: 24px;
    margin-top: 3px;
    height: 24px;
    overflow: hidden;
    word-break: break-all;
    /*white-space:nowrap; text-overflow:ellipsis;*/
  }

  .news_right p a {
    /*color:#5da5ff;*/
    color: #999;
  }

  /*消息-系统消息*/
  .news_system {
    display: flex;
    padding: 15px 10px 0;
    line-height: 28px;
  }

  .news_system span {
    flex: 1;
    font-size: 16px;
    color: #646464;
  }

  .news_system span img {
    width: 28px;
    height: 28px;
    float: left;
    margin-right: 10px;
  }

  .news_system b {
    font-size: 14px;
    color: #999;
  }

  .news_system_txt {
    font-size: 14px;
    line-height: 21px;
    margin: 5px 10px 0 48px;
    word-break: break-all;
  }

  .news_system_txt a {
    color: #5da5ff;
  }

</style>
