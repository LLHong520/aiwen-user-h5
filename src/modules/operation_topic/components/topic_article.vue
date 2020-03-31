<template>
  <div class="operationTopic-article">
    <div class="operationTopic-article-container" @click="handleClick">
      <div class="article-content">
        <h4 class="article-title">
          {{dataSource.title}}
        </h4>
        <div class="article-doctor-info">
          <span class="article-doctor-context" v-if="dataSource.comtyName">{{dataSource.comtyName}}</span>
          <template v-else>
            <span class="article-doctor-context">{{dataSource.realName}}</span>&nbsp;|&nbsp;<span class="article-doctor-title">{{dataSource.titles}}</span>
          </template>
        </div>
      </div>
      <div class="article-cover">
        <img v-if="dataSource.cover" :src="dataSource.cover || defaultCover" alt="cover">
      </div>
    </div>
  </div>
</template>

<script>
import { commonMixin } from "@/mixins";
import defaultCover from "./assets/img/default_cover.jpg";
export default {
  name: "topicArticle",
  mixins: [commonMixin],
  props: {
    dataSource: {
      type: Object,
      default: () => ({
        id:"",
        contentId: "",
        cover: "",
        title: "",
        realName: "",
        titles: "",
        comtyName: "",
        type: ""
      })
    }
  },
  data() {
    return {
      defaultCover
    };
  },
  methods: {
    handleClick() {
      if(this.dataSource.type == 11) {
        window.location = `https://health.sina.cn/c/news/${this.dataSource.contentId}?type=10&comtyId=${this.dataSource.comtyId}`;
        return;
      }
      window.location = this.GET_ARTICLE_URL(this.dataSource.contentId,1);
    }
  }
};
</script>

<style lang="less" scoped>
  .operationTopic-article{
    font-family:PingFangSC-Regular,PingFang SC;
    width: 100%;
    padding: 8px 15px;
    box-sizing: border-box;
    .operationTopic-article-container{
      height: 110px;
      box-sizing: border-box;
      padding: 15px 10px;
      background: #fff;
      border-radius:5px;
      display: flex;
      .article-cover{
        width: 32%;
        height: 76px;
        margin: 0 0 0 8px;
        overflow: hidden;
        background: #f8f8f8;
        flex-shrink: 0;
        box-sizing: border-box;
        border:1px solid rgba(243,243,243,1);
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .article-content{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 40%;
        flex-grow: 1;
      }
    }
    .article-content{
      .article-title{
        font-size:16px;
        font-weight:500;
        color:#282828;
        line-height:22px;
        margin: 0 0 16px 0;
        overflow: hidden;   
        text-overflow: ellipsis;
        display: -webkit-box;
        white-space:normal;
        -webkit-line-clamp: 2;
        /*! autoprefixer: ignore next */
        -webkit-box-orient: vertical;
      }
      .article-doctor-info{
        display: flex;
        max-width: 100%;
        color: #999999;
        line-height:17px;
        font-size:12px;
        font-weight:400;
        overflow: hidden;
        .article-doctor-title,.article-doctor-context{
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
</style>