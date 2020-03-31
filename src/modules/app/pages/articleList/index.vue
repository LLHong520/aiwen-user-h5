<template>
  <layout :isAppView="true">
    <div class="common_box article_box" slot="page_header">
      <div class="common_hd">
        <div class="tab_blank"></div>
        <ul class="_m_tab">
          <!-- <li>
            <a
              href="javascript:;"
              @click="changeArticleType(3)"
              :class="{'active':indexArticleType==3}"
            >患者自述</a>
          </li> -->
          <li>
            <a href="javascript:;" @click="changeArticleType(5)" :class="{'active':indexArticleType==5}">病例分析</a>
          </li>
          <li>
            <a href="javascript:;" @click="changeArticleType(1)" :class="{'active':indexArticleType==1}">科普文章</a>
          </li>
          <li>
            <a href="javascript:;" @click="changeArticleType(2)" :class="{'active':indexArticleType==2}">诊间日记</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="wrapper" slot="page_container">
      <div class="common_box article_box">
        <div class="common_bd">
          <ul v-if="indexArticleList.length>0" class="articleList">
            <template v-for="(item,index) in indexArticleList">
              <!-- 图片数小于2的展示样式 -->
              <li v-if="item.art_images.length<=2" :key="index">
                <!-- 纯文本诊间日记 -->
                <textDairyCell v-if="item.contentType==2" :article="item"></textDairyCell>
                <!-- 纯文本诊间日记 -->
                <a v-else :href="GET_ARTICLE_URL(item.id,indexArticleType)">
                  <div class="info">
                    <dl>
                      <dt>
                        <span v-if="indexArticleType==3&&item.icon" :class="item.icon" class="icon-rank"></span>
                        {{item.title}}
                      </dt>
                      <dd class="author_bar">
                        <template v-if="indexArticleType==3">
                          <span>{{item.trueReadCountPv}}热度</span>
                        </template>
                        <template v-else>
                          <span class="face">
                            <img :src="GET_IMG_URL(item.drPhoto)" alt>
                          </span>
                          <span class="author_name">{{item.drUserName}}</span>
                          <span class="helpNum">阅读{{item.readCount}}</span>
                        </template>
                      </dd>
                    </dl>
                  </div>
                  <div class="img_box">
                    <img :src="GET_IMG_URL(item.picName)" alt>
                  </div>
                </a>
              </li>
              <!-- /图片数小于2的展示样式 -->

              <!-- 图片数大于2的展示样式 -->
              <li v-if="item.art_images.length>2" :key="index">
                <a :href="GET_ARTICLE_URL(item.id,indexArticleType)">
                  <div class="info_wrap">
                    <div class="tit"><span v-if="indexArticleType==3&&item.icon" :class="item.icon"
                        class="icon-rank"></span>{{item.title}}</div>
                    <div class="img_list clearfix">
                      <div v-for="(image) in item.art_images" :key="image.key" class="img_item">
                        <span>
                          <img :src="GET_IMG_URL(image)" alt>
                        </span>
                      </div>
                    </div>
                    <div class="author_bar">
                      <span class="face">
                        <img :src="GET_IMG_URL(item.drPhoto)" alt>
                      </span>
                      <span class="author_name">{{item.drUserName}}</span>
                      <span class="helpNum">阅读{{item.readCount}}</span>
                    </div>
                  </div>
                </a>
              </li>
              <!-- /图片数大于2的展示样式 -->
            </template>
          </ul>
          <loadingPlaceHolder v-else v-for="n in 2" :key="n.key"></loadingPlaceHolder>
        </div>
        <loading-btn
          :loading="articleLoading"
          :title="articleLoadingText"
          :scroll_load="true"
          @loadFn="getPopSciencePaperByPage">
        </loading-btn>
      </div>
    </div>
  </layout>
</template>

<script>
  import textDairyCell from "@/modules/health/components/text_dairy_cell";
  import loadingBtn from "@/components/loading-btn/loading-btn";
  import loadingPlaceHolder from "@/components/loading-place-holder/loading-place-holder";
  import {
    commonMixin,
    toTopMixin
  } from "@/mixins";
  import homeService from "@/services/homeService.js";
  export default {
    mixins: [commonMixin, toTopMixin],
    data() {
      return {
        indexArticleList: [],
        indexArticleType: 1,
        curPage: 0,
        pageCount: 1,
        articleLoading: false,
        articleLoadingText: "加载更多",
        articleIsEnd: false
      };
    },
    components: {
      loadingBtn,
      textDairyCell,
      loadingPlaceHolder: loadingPlaceHolder
    },
    created() {
      this.indexArticleType = this.$route.query.indexArticleType? this.$route.query.indexArticleType:this.indexArticleType;
      this.getPopSciencePaperByPage();
    },
    methods: {
      getArticleImages(htmlContent) {
        let dom = $("<div>" + htmlContent + "</div>");
        let images = dom.find("img");
        let imageUrls = [];
        images.map((index, el) => {
          if (el.src) {
            imageUrls.push(el.src);
          }
        });
        return imageUrls;
      },
      changeArticleType(contentType) {
        this.indexArticleList = [];
        this.indexArticleType = contentType;
        this.curPage = 0;
        this.pageCount = 1;
        this.articleIsEnd = false;
        this.getPopSciencePaperByPage();
        this.$router.replace({
          name:this.$route.name,
          query:{
            indexArticleType: contentType
          }
        });
      },
      getPopSciencePaperByPage(eventType) {
        if (this.articleIsEnd && eventType == "click") {
          if (this.indexArticleType == 1) {
            this.$router.push({
              name: "heal.article"
            });
          }
          if (this.indexArticleType == 2) {
            this.$router.push({
              name: "heal.diary"
            });
          }
          if (this.indexArticleType == 5) {
            this.$router.push({
              name: "heal.disAnalysis"
            });
          }
          return;
        }
        if (this.articleLoading || this.articleIsEnd) return;
        this.articleLoading = true;
        let This = this;
        let params = {
          pageIndex: this.curPage + 1,
          limit: 10,
          contentType: this.indexArticleType
        };
        homeService.getPopSciencePaperByPage(params).then(res => {
          This.articleLoading = false;
          if (res.code == 0 && res.data) {
            let articleList = [];
            res.data.map(item => {
              let images = This.getArticleImages(item.content);
              images.unshift(item.picName);
              images = images.slice(0,3);
              articleList.push({
                ...item,
                art_images: images
              });
            });
            This.curPage += 1;
            This.pageCount = res.page.totalPages > 2 ? 2 : res.page.totalPages;
            This.indexArticleList = This.indexArticleList.concat(articleList);
            let indexArticleList = This.indexArticleList;
            indexArticleList.map((item, index) => {
              if (This.indexArticleType == 3 && index < 5) {
                item.icon = "iconRank" + index;
              }
            });
            This.indexArticleList = indexArticleList;
            // console.log(This.indexArticleList);
            // console.log(This.pageCount);
            // console.log(res.page.totalPages);
            if (This.curPage > This.pageCount) {
              This.articleIsEnd = true;
              This.articleLoadingText = "查看全部";
            } else {
              This.articleIsEnd = false;
            }
          }
        });
      }
    }
  };

</script>
<style lang="less" scoped>
  @import "./css.less";
</style>
