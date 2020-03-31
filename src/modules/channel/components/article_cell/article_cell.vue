<template>
  <div class="article_cell" >
    <template v-if="article.articleType=='2'">
      <router-link :to="{'name':'channelArticleDetail',params:{id:channelId},query:{id:article.id}}">
        <div class="info">
          <dl>
            <dt>{{article.title}}</dt>
            <dd class="author_bar">
              {{article.authorName}}<span v-if="!IS_IWEN_COMTY(article.firstPublishComtyId)&&article.firstPublishComtyName&&!isShowRead">· 来自 {{article.firstPublishComtyName}}</span><span v-if="isShowRead">· {{article.pv}}阅读</span>
            </dd>
          </dl>
        </div>
      </router-link>
    </template>
    <template v-else-if="article.articleType=='5'">
      <router-link :to="{'name':'channelCaseDetail',params:{id:channelId},query:{id:article.id}}">
        <div class="info">
          <dl>
            <dt>{{article.title}}</dt>
            <dd class="author_bar">
              {{article.authorName}}<span v-if="!IS_IWEN_COMTY(article.firstPublishComtyId)&&article.firstPublishComtyName&&!isShowRead">· 来自 {{article.firstPublishComtyName}}</span><span v-if="isShowRead">· {{article.pv}}阅读</span>
            </dd>
          </dl>
        </div>
      </router-link>
    </template>
    <template v-else>
      <router-link v-if="(article.art_images||[]).length<3" :to="{'name':'channelArticleDetail',params:{id:channelId},query:{id:article.id}}">
        <div class="info">
          <dl>
            <dt>{{article.title}}</dt>
            <dd class="author_bar">
              {{article.authorName}}<span v-if="!IS_IWEN_COMTY(article.firstPublishComtyId)&&article.firstPublishComtyName&&!isShowRead">· 来自 {{article.firstPublishComtyName}}</span><span v-if="isShowRead">· {{article.pv}}阅读</span>
            </dd>
          </dl>
        </div>
        <div class="img_box" v-if="article.cover||''!=''"><img v-lazy="GET_IMG_URL(article.cover)" alt=""></div>
      </router-link>
      <router-link v-if="(article.art_images||[]).length>=3" :to="{'name':'channelArticleDetail',params:{id:channelId},query:{id:article.id}}">
        <div class="info_wrap">
          <div class="tit">{{article.title}}</div>
          <div class="img_list clearfix">
            <div class="img_item" v-for="(item,index) in article.art_images.slice(0,3)" :key="index"><span><img v-lazy="GET_IMG_URL(item)" alt=""></span></div>
          </div>
          <div class="author_bar">
            {{article.authorName}}<span v-if="!IS_IWEN_COMTY(article.firstPublishComtyId)&&article.firstPublishComtyName&&!isShowRead">· 来自 {{article.firstPublishComtyName}}</span><span v-if="isShowRead">· {{article.pv}}阅读</span>
          </div>
        </div>
      </router-link>
    </template>
    
  </div>
</template>

<script >
import { commonMixin} from "@/mixins";
export default {
  name: "articleCell",
  mixins:[commonMixin],
  data(){
    return {
      channelId:""
    };
  },
  props:{
    article:{
      type:Object,
      default:()=>{
        return {};
      }
    },
    isShowRead:{
      type:Boolean,
      default:false,
    }
  },
  created() {
    this.channelId=this.$route.params.id;
  },
};
</script>
<style scoped lang="less" rel="stylesheet/less">
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
.article_cell {
  a {
    display: flex;
    padding: 15px 0;
  }
  .info_wrap {
    width: 100%;
  }
  .img_box {
    width: 242/@r;
    height: 152/@r;
    overflow: hidden;
    text-align: center;
    margin-left: 40/@r;
    border-radius: 6/@r;
    background-color: #E8ECEF;
    img {
      display: block;
      width: 242/@r;
      height: 152/@r;
      object-fit: cover;
      border-radius: 6/@r;
      background-color: #f2f2f2;
      border: 1px solid #f3f3f3;
      box-sizing: border-box;
    }
  }
  .info {
    flex: 1;
    box-flex: 1;
    overflow: hidden;
    dt {
      font-size: 30/@r;
      line-height: 44/@r;
      height: 88/@r;
      overflow: hidden;
      color: #282828;
      .show_n_lines(2);
    }
  }
  .tit {
    line-height: 44/@r;
    max-height: 88/@r;
    font-size: 32/@r;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #2D2D2D;
    .show_n_lines(2);
  }
  .img_list {
    margin: 0 -3px;
    padding-top: 25/@r;
    display: flex;
    justify-content: space-between;
    .img_item {
      float: left;
      width: 222/@r;
      height: 140/@r;
      overflow: hidden;
      box-sizing: border-box;
      span {
        position: relative;
        width: 100%;
        height: 140/@r;
        display: block;
        border-radius: 4/@r;
        background-color: #E8ECEF;
      }
      img {
        width: 100%;
        height: 140/@r;
        object-fit: cover;
        border-radius: 4/@r;
        background-color: #E8ECEF;
        border: 1px solid #f3f3f3;
        box-sizing: border-box;
      }
    }
  }
  .author_bar {
    height: 44/@r;
    line-height: 44/@r;
    font-size: 24/@r;
    color: #AEB1B6;
    margin-top: 24/@r;
    .show_n_lines(1);
  }
  .face {
    display: block;
    float: left;
    width: 44/@r;
    height: 44/@r;
    margin-right: 16/@r;
    img {
      display: block;
      width: 44/@r;
      height: 44/@r;
      border-radius: 44/@r;
      background-color: #f2f2f2;
    }
  }
}
</style>
