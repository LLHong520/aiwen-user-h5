<template>
  <div class="operationTopic-weibo">
    <div class="weibo-view">
      <div class="weibo-view-wrapper">
        <div class="weibo-icon-wrapper">
          <img class="weibo-icon" src="./assets/img/weibo_icon.png" alt="wbicon">
        </div>
        <div class="weibo-content">
          <h5 class="weibo-content-title">{{dataSource.nickName}}</h5>
          <p class="weibo-content-description">{{dataSource.remark}}</p>
        </div>
        <button class="weibo-add-btn" @click="handleClick"><i class="icon_add" />关注</button>
      </div>
      <img class="weibo-bg" src="./assets/img/weibo_bg_gradient.png" alt="">
    </div>
  </div>
</template>

<script>
import topicServer from "@/services/operationTopicService.js";
import { commonMixin } from "@/mixins";
export default {
  name: "topicWeibo",
  mixins: [commonMixin],
  props: {
    dataSource: {
      type: Object,
      default: () => ({
        nickName: "",
        remark: "",
        uid: ""
      })
    }
  },
  data() {
    return {
      isFollow: false,
    };
  },
  created() {
    setTimeout(() => {
      this.addWeiboFans();
    }, 5000);
  },
  methods: {
    handleClick() {
      window.location = `https://weibo.com/u/${this.dataSource.uid}`;
    },
    addWeiboFans() {
      if(this.$store.state.userInfo && this.$store.state.userInfo.id) {
        const params = {
          businessId: this.$route.query.subjectId,
          channel: this.$route.query.channel,
          targetUid	: this.dataSource.uid,
          userId: this.$store.state.userInfo.id
        };
        topicServer.addWeiboFans(params).then(res => {
          if(res.status === 200) {
            console.log("加粉成功");
          }
        }).catch(err => {console.error(err);});
      }
    }
  }
};
</script>

<style lang="less" scoped>
  .operationTopic-weibo{
    padding: 8px 15px;
    .weibo-view{
      padding:20px 0;
      position: relative;
      box-sizing: border-box;
      border-radius:43px;
      .weibo-bg{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
      .weibo-view-wrapper{
        border-radius:43px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        min-height:72px;
        border: 3px solid #f9dfc4;
        background: #fff;
        padding: 6px 12px;
        box-sizing: border-box;
      }
      .weibo-icon-wrapper{
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 8px 0 0;
        flex-shrink: 0;
        z-index: 99;
        box-shadow: 0px 1px 8px 0 #eee;
        .weibo-icon{
          width: 28px;
          height: 24px;
        }
      }
      .weibo-content{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        z-index: 99;
        .weibo-content-title{
          font-size: 15px;
          color: #2D2D2D;
          font-weight:400;
          line-height: 21px;
          margin: 0 0 3px 0;
        }
        .weibo-content-description{
          color: #999999;
          font-size: 12px;
          line-height: 16px;
        }
      }
      .weibo-add-btn{
        margin: 0 0 0 6px;
        height: 24px;
        flex-shrink: 0;
        background: #FF9E13;
        color: #fff;
        position: relative;
        padding: 4px 11px;
        border-radius:12px;
        border: none;
        outline: none;
        z-index: 99;
        &:active{
          opacity: 0.8;
        }
        .icon_add{
          display: inline-block;
          margin: 0 2px 0 0;
          width:10px;
          height:10px;
          position: relative;
          &::after, &::before{
            position: absolute;
            background:#fff;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            height:10px;
            width:2px;
            content: "";
            display: inline-block;
            border-radius:1px;
          }
          &::after{
            width: 10px;
            height: 2px;
          }
        }
      }
    }
  }
</style>