<template>
  <section>
    <div v-if="articleList.length>0">
      <!-- 文章 -->
      <div class="common_box article_box">
        <div class="common_bd">
          <ul v-if="articleList.length>0" class="articleList">
            <template v-for="(item,index) in articleList">
              <li v-if="item.art_images.length<=2" :key="index">
                <a :href="GET_ARTICLE_URL(item.id,item.contentType)">
                  <div class="info">
                    <dl>
                      <dt>{{item.title}}</dt>
                      <dd class="author_bar">
                        <span class="face">
                          <img :src="GET_IMG_URL(item.drPhoto)" alt>
                        </span>
                        <span class="author_name">{{item.drUserName}}</span>
                        <span class="helpNum">阅读{{item.readCount}}</span>
                      </dd>
                    </dl>
                  </div>
                  <div class="img_box">
                    <img :src="GET_IMG_URL(item.picName)" alt>
                  </div>
                </a>
              </li>
              <li v-if="item.art_images.length>2" :key="index">
                <a :href="GET_ARTICLE_URL(item.id,item.contentType)">
                  <div class="info_wrap">
                    <div class="tit">{{item.title}}</div>
                    <div class="img_list clearfix">
                      <div v-for="(image,imgIdx) in item.art_images" v-if="imgIdx<3" :key="image.key" class="img_item">
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
            </template>
          </ul>
          <loadingPlaceHolder v-else v-for="n in 2" :key="n.key"></loadingPlaceHolder>
        </div>
        <loading-btn v-if="showLoadMore" :loading="load_topics_loading" :title="load_topics_text"
          @loadFn="load_by_pagenum" :scroll_load="true"></loading-btn>
      </div>
      <!-- <div class="famous_list">
      <dl v-for="elem in articleList" :key="elem.key" class="famous_doctor">
        <dt>
          <router-link :to="{ name: 'docIndex', params: { dId: elem.id}}">
          <img :src="GET_IMG_URL(elem.photo,'doc')" /><span>V</span>
          </router-link>
        </dt>
        <dd>
          <router-link :to="{ name: 'docIndex', params: { dId: elem.id}}">
            <div class="fam_doc_name"><b>{{elem.realName}}</b>{{elem.titles}}</div>
            <div class="fam_doc_dep">{{elem.departments}}<span>{{elem.workUnit}}</span></div>
            <div class="fam_doc_good"><em></em>擅长：{{elem.areasOfExpertise}}</div>
            <div class="fam_doc_num">评分<span class="blue">5.0</span>&nbsp;&nbsp;回答数<span class="blue">{{elem.answerNum}}</span></div>
            <div class="fam_doc_price"><em></em>问诊￥{{elem.qPrice}}</div>
          </router-link>
        </dd>
      </dl>
  </div> -->

      <!-- /帖子 -->
      <!-- <loading-btn
      v-if="showLoadMore"
      :loading="load_topics_loading"
      :title="load_topics_text"
      @loadFn="load_by_pagenum"
      :scroll_load="true"
      ></loading-btn> -->
      <div class="user-no-focus" v-if="articleList.length >= 10 && showNoMoreDynamics">
        <div>没有更多了</div>
      </div>
    </div>
    <noResult v-else title="没有找到相关文章" :isSearch="true"></noResult>
  </section>
</template>
<script>
  import {
    commonMixin,
    toTopMixin
  } from "@/mixins";
  import loadingBtn from "@/components/loading-btn/loading-btn";
  import noResult from "@/components/no-result/no-result";
  import homeService from "@/services/homeService.js";
  export default {
    name: "search_topics",
    mixins: [commonMixin, toTopMixin],
    props: ["keywords"],
    data() {
      return {
        articleList: [],
        load_topics_loading: false,
        load_topics_text: "点击加载更多",
        showLoadMore: false,
        showNoMoreDynamics: false,
        all_datas_topics: 0,
        nowPage: 0,
        pager: {
          pageCount: 2,
          pageIndex: 0,
          pageSize: 10,
          total: 0,
        }
      };
    },
    created() {},
    components: {
      loadingBtn: loadingBtn,
      noResult: noResult,
    },
    methods: {
      search() {
        this.pager.pageIndex = 0;
        this.articleList = [];
        this.load_by_pagenum();
      },
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
      load_by_pagenum() {
        let _this = this;
        if (this.load_topics_loading) return;
        this.load_topics_loading = true;
        //查询帖子信息
        let dataPost = {
          keyWord: _this.keywords,
          // contentType:1,
          pageSize: _this.pager.pageSize,
          pageIndex: _this.pager.pageIndex + 1
        };
        homeService.getDrPopsListByType(dataPost).then(res => {
            _this.load_topics_loading = false;
            if (res.code == 0 && res.data) {
              if (res.data.length > 0) {
                // _this.articleList=_this.articleList.concat(res.data);
                let list = [];
                res.data.map(item => {
                  let images = _this.getArticleImages(item.content);
                  images = images.reverse();
                  images.push(item.picName);
                  images = images.reverse();
                  list.push({
                    ...item,
                    art_images: images
                  });
                });
                _this.articleList = _this.articleList.concat(list);
                _this.pager.pageCount = parseInt(res.page.pageCount);
                _this.pager.pageIndex = parseInt(res.page.pageIndex);
                _this.all_datas_topics = parseInt(res.page.total);
                if (_this.pager.pageIndex + 1 > _this.pager.pageCount) {
                  _this.showNoMoreDynamics = true;
                  _this.showLoadMore = false;
                } else {
                  _this.showNoMoreDynamics = false;
                  _this.showLoadMore = true;
                }
              }
            }
          }, function () {
            _this.load_topics_loading = false;
            _this.load_topics_text = "加载失败，点击重试";
          })
          .then(() => {
            _this.$emit("changeSearching", false);
            _this.$emit("change_res_num", _this.articleList.length);
          });
      }
    },
    watch: {
      "keywords": function (newVal) {
        if (newVal != "") {
          this.search();
        }
      }
    }
  };

</script>
<style scoped lang="less" rel="stylesheet/less">
  @import './css.less';

</style>
