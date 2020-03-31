<template>
  <layout class="user-center">
    <!-- page_header -->
    <m-header slot="page_header" title='我的消息'>
      <span class="retrun" slot='left' @click="router_back">
        <b class="gray"></b>
      </span>
      <span class="retrun" slot='right'></span>
    </m-header>
    <!-- page_header -->
    <!-- page_container -->
    <div slot="page_container" class="app_wrapper_inner message_wrapper_inner">
      <interrogationMsg ref="interrogationMsg"></interrogationMsg>
    </div>
    <!-- /page_container -->
    <!-- page_footer -->
    <div slot="page_footer">
      <loading-page v-show='initing_page' title="切换中..."></loading-page>

      <!--消息详情  -->
      <pop-form title="消息详情" ref="message_preview" @cancel='cancel_pop' @confirm="cancel_pop">
        <!-- 内容 -->
        <section class="preview_item">
          <div class="message-item">
            <div class="item-header">
              <p class="type">{{preview_item.title}}</p>
              <p class="time">{{preview_item.createTimeStr}}</p>
            </div>
            <div class="item-con" v-if="preview_item.urlType==0">
              <router-link :to="preview_item.url?preview_item.url:''">
                {{preview_item.content}}
              </router-link>
            </div>
            <div class="item-con" v-else-if="preview_item.urlType==1">
              <a :href="preview_item.url">
                {{preview_item.content}}
              </a>
            </div>
            <div class="item-con" v-else>
              <span>
                {{preview_item.content}}
              </span>
            </div>
          </div>
        </section>
        <!-- /内容 -->
      </pop-form>
      <!--/消息详情  -->
      <to-top></to-top>
    </div>
  </layout>
</template>
<script>
  import interrogationMsg from "./components/interrogation";
  import actMsg from "./components/act";
  import sysMsg from "./components/sys";
  import Tab from "@/components/tab/tab";
  import loadingHolder from "@/components/loading-holder/loading-holder";
  import popForm from "@/components/pop-form/pop-form";
  import Header from "@/components/header/Header";
  // import userService from "@/services/userService.js";
  import loadingBtn from "@/components/loading-btn/loading-btn";
  import noResult from "@/components/no-result/no-result";
  import {
    toTopMixin,
    commonMixin
  } from "@/mixins";
  export default {
    name: "my_message",
    mixins: [commonMixin, toTopMixin],
    components: {
      mHeader: Header,
      loadingHolder: loadingHolder,
      loadingBtn,
      noResult,
      Tab,
      interrogationMsg,
      actMsg,
      sysMsg,
      popForm
    },
    data() {
      return {
        load_more: false,
        load_btn_text: "点击加载更多",
        messages: [],
        initing: false,
        hasMore: true,
        preview_item: {},
        pager: {
          totalCount: 0,
          totalPage: 1,
          nowPage: 0,
        },
        majia_infos: {
          hasMajias: false, //是否有马甲
          currentMajia: -1, //当前选中马甲
          majia_users: []
        }
      };
    },
    computed: {
      current_avater_name() {
        let name = "...";
        if (this.majia_infos.majia_users.length > 0) {
          name = this.majia_infos.majia_users[this.majia_infos.currentMajia].nickName;
        }
        return name;
      }
    },
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
      getMessages() {},
      _init_page() {
        this.initing = true;
        this.getMessages();
      },
      cancel_pop() {
        this.$refs.message_preview.hide();
      },
      toSitePage() {
        this.$router.push(this.preview_item.url);
      }
    }
  };

</script>
<style scoped lang="less" rel="stylesheet/less">
  @import './css.less';

  .message_wrapper_inner {
    position: relative;
  }

</style>
