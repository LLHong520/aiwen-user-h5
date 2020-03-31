<template>
  <div class="operationTopic-container" :style="Styles">
    <div v-if="isPreview" class="preview-modal"></div>
    <component v-for="(item, index) in topics"
      :key="index"
      :is="component[item.type]"
      :color="topicInfo && topicInfo.color"
      :dataSource="item"
      :subjectId="$route.query.subjectId"
    />
    <topic-space v-if="ifShowBottomSpace" :dataSource="{height: 70}" />
  </div>
</template>

<script>
import Store from "@/store";
import platformLogin from "@/common/platformFn";
import { commonMixin,shareMixin } from "@/mixins";
import topicServer from "@/services/operationTopicService.js";
import TopicTitle from "../components/topic_title";
import TopicImage from "../components/topic_image";
import TopicWeibo from "../components/topic_weibo";
import TopicTextarea from "../components/topic_textarea";
import TopicSpace from "../components/topic_space";
import TopicReservation from "../components/topic_reservation";
import TopicLive from "../components/topic_live";
import TopicArticle from "../components/topic_article";
import TopicBtn from "../components/topic_btn";
import sysService from "@/services/sysService.js";
import shareFns from "@/common/share";


export default {
  name: "operationTopicPage",
  mixins: [commonMixin,shareMixin],
  components: {
    TopicImage,
    TopicTitle,
    TopicWeibo,
    TopicTextarea,
    TopicSpace,
    TopicReservation,
    TopicLive,
    TopicArticle,
    TopicBtn
  },
  data() {
    return {
      isPreview: false,
      topicInfo: {},
      topics: [],
      component: {
        1: TopicImage,
        2: TopicImage,
        3: TopicTitle,
        4: TopicTextarea,
        5: TopicLive,
        6: TopicArticle,
        7: TopicReservation,
        8: TopicReservation,
        9: TopicReservation,
        10: TopicReservation,
        11: TopicArticle,
        12: TopicWeibo,
        13: TopicBtn,
        14: TopicSpace,
      }
    };
  },
  computed: {
    Styles() {
      const { topicInfo } = this;
      if(topicInfo && JSON.stringify(this.topicInfo) != "{}") {
        return {
          background: topicInfo.color || "#1E82F8"
        };
      }
      return {
        background: "#1E82F8"
      };
    },
    ifShowBottomSpace() {
      const ButtonComponent = this.topics.find(item => item.type == 13);
      if(ButtonComponent && ButtonComponent.bottom === "true") {
        return true;
      }
      return false;
    }
  },
  beforeRouteEnter (to, from, next) {
    if((platformInfo.isWeibo)&&!Store.getters.islogin) {
      platformLogin(to.fullPath);
    } else {
      next();
    }
  },
  created() {
    this.__init();
  },
  methods: {
    __init() {
      this.isPreview = this.$route.query.preview;
      const subjectId = this.$route.query.subjectId;
      Promise.all([
        this.getComponents(subjectId),
        this.getTopicInfo(subjectId)
      ]).catch(err => {
        if(!this.isPreview) {
          this.$router.push({name: "404"});
        }
      }).finally(() => {
        this.selectPVData(); // 调用两次
        this.selectPVData(true);
      });
    },
    getComponents(subjectId) {
      topicServer.getOperationTopicDetail({subjectId}).then(res => {
        if(res.status === 200 && res.data) {
          this.topics = res.data;
        } else {
          this.$toast.tip(res.message);
        }
      }).catch(err => {console.error(err);});
    },
    getTopicInfo(subjectId) {
      topicServer.getOperationTopicInfo({subjectId}).then(res => {
        if(res.status === 200 && res.data) {
          if(res.data.status!== "1" && !this.isPreview) {
            this.$router.push({name: "404"});
          }
          this.topicInfo = res.data;
          document.title = res.data.name;
          //设置分享信息
          if(platformInfo.isWx){
            this.setShareInfo();
            console.log("wx");
          }
        } else {
          this.$toast.tip(res.message);
        }
      }).catch(err => {console.error(err);});
    },
    selectPVData(flag) {
      const { subjectId, channel } = this.$route.query;
      const data = {
        "collectType":"subjectOperate",
        "businessType":"subjectOperate",
        "businessId":flag ? (subjectId + (channel || "system")) : subjectId,
      };
      if(this.$store.state.userInfo && this.$store.state.userInfo.id) {
        data.userId = this.$store.state.userInfo.id;
      }
      topicServer.colletDataPv(JSON.stringify(data)).catch(err =>{
        console.error(err);
      });
    },
    setShareInfo() {
      let This = this;
      var lineLink = location.href.split("#")[0];
      sysService
        .getWxConfig({
          shareURL: lineLink
        })
        .then(res => {
          if (res.appId) {
            shareFns.setConfig(res);
            return true;
          } else {
            //签名失败
            return false;
          }
        })
        .then(isConfig => {
          if (isConfig) {
            let url = This.$route.fullPath;
            let momentUrl = This.$route.fullPath;
            shareFns.setShareInfo({
              lineLink: This.APP_URL + url,
              momentLineLink: This.APP_URL + momentUrl,
              imgUrl: This.topicInfo.image,
              shareTitle: This.topicInfo.title,
              descContent: This.topicInfo.content
            });
          }
        });
    },
  }
};
</script>

<style lang="less" scoped>
  .operationTopic-container{
    min-height: 100vh;
    overflow: auto;
    -webkit-overflow-scrolling:touch;
    position: relative;
    .preview-modal{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
    }
  }
</style>
