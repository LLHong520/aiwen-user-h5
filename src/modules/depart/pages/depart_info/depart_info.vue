<template>
  <layout class="user-center">
    <!-- page_header -->
    <div slot="page_header">
      <m-header slot="page_header" :title='departInfo.name'>
        <span class="retrun" slot='left' @click="backToIndex">
          <b class="gray"></b>
        </span>
        <span class="placeholder" slot='right'>
          <span class="mr10" @click="share"><i class="icon icon-share"></i>分享</span>
        </span>
      </m-header>
    </div>
    <!-- page_header -->
    <!-- page_container -->
    <div slot="page_container" class="app_wrapper_inner">
      <div class="banner" v-if="departInfo.picture">
        <img :src="GET_IMG_URL(departInfo.picture,'b')" />
      </div>
      <div class="departInfo">
        <p class="depart_name">{{departInfo.name}}<span v-if="!VX_isInSinaHealthApp && !VX_isInIwenApp" class="mr10"
            @click="share">分享</span></p>
        <div class="depart_desc">{{departInfo.introduction}}</div>
      </div>
      <!-- 自定义导航列表 -->
      <ul class="index-config-navs">
        <li v-for="elem in config_navs" :key="elem.key">
          <router-link v-if="elem.link_type==0" :to="elem.link+dId">
            <div class="nav-icon">
              <img :src="elem.icon" />
            </div>
            <p class="nav-name">{{elem.text}}</p>
          </router-link>
          <a v-if="elem.link_type==1" :href="elem.link+dId">
            <div class="nav-icon">
              <img :src="elem.icon" />
            </div>
            <p class="nav-name">{{elem.text}}</p>
          </a>
        </li>
      </ul>
      <!-- /自定义导航列表 -->
      <!-- 推荐医生 -->
      <contentTitle v-if="famous_docs.length>0" title="推荐医生">
        <span slot="right">
          <router-link :to="{ name: 'famousDocs',query:{dId:dId}}" class="t-right">更多医生></router-link>
        </span>
      </contentTitle>
      <div class="famous_doc" v-if="famous_docs.length>0">
        <ul>
          <li v-for="elem in famous_docs" :key="elem.key">
            <router-link :to="{ name: 'docIndex', params: { dId: elem.id}}">
              <div class="nav-icon">
                <img :src="GET_IMG_URL(elem.photo,'doc')" />
              </div>
              <div class="doc-info">
                <p class="doc-name">{{elem.realName}}</p>
                <p class="doc-titles">{{elem.titles}}</p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <loadingPlaceHolder v-if="loading_famous_docs" v-for="n in 2" :key="n.key"></loadingPlaceHolder>
      <!-- 相关科普文章 -->
      <contentTitle v-if="kepuList.length>0" title="科普文章">
        <span slot="right">
          <router-link :to="{ name:'heal.article',query:{departId:dId}}">更多文章></router-link>
        </span>
      </contentTitle>
      <ul class="article-list">
        <li v-for="(article,index) in kepuList" :key="index">
          <a :href="GET_ARTICLE_URL(article.id,1)">
            <articleCell :article="article"></articleCell>
          </a>
        </li>
      </ul>
      <loadingPlaceHolder v-if="loading_kepuList" v-for="n in 2" :key="n.key"></loadingPlaceHolder>
      <section v-if="diaryList.length>0">
        <!-- 相关诊间日记 -->
        <contentTitle title="诊间日记">
          <span slot="right">
            <router-link :to="{ name:'heal.diary',query:{departId:dId}}">查看更多></router-link>
          </span>
        </contentTitle>
        <ul class="article-list">
          <li v-for="(article,index) in diaryList" :key="index">
            <!-- 纯文本诊间日记 -->
            <textDairyCell v-if="article.contentType==2" :article="article"></textDairyCell>
            <!-- 纯文本诊间日记 -->
            <!-- 普通文章 -->
            <a v-else :href="GET_ARTICLE_URL(article.id,2)">
              <articleCell :article="article"></articleCell>
            </a>
          </li>
        </ul>
      </section>

      <!-- 相关病例分析 -->
      <section v-if="bingliList.length>0">
        <contentTitle title="病例分析">
          <span slot="right">
            <router-link :to="{ name:'heal.disAnalysis',query:{departId:dId}}">查看更多></router-link>
          </span>
        </contentTitle>
        <ul class="article-list">
          <li v-for="(article,index) in bingliList" :key="index">
            <a :href="GET_ARTICLE_URL(article.id,5)">
              <articleCell :article="article"></articleCell>
            </a>
          </li>
        </ul>
      </section>
      <!-- 相关患者自述 -->
      <section v-if="zishuList.length>0">
        <contentTitle title="患者自述">
          <span slot="right">
            <a :href="OUTER_LINKS.patientIndex+'&departId='+dId">查看更多></a>
          </span>
        </contentTitle>
        <ul class="article-list">
          <li v-for="(article,index) in zishuList" :key="index">
            <a :href="GET_ARTICLE_URL(article.id,3)">
              <articleCell :article="article"></articleCell>
            </a>
          </li>
        </ul>
      </section>
      <!-- 相关圈子 -->
      <!-- <section v-if="moments.length>0">
    <contentTitle title="相关圈子">
      <span slot="right">
          <a :href="FORUM_URL" >进入社区></a>
      </span>
    </contentTitle>
    <relative-moments :moments="moments"></relative-moments>
  </section> -->
      <!-- 最新活动 -->
      <contentTitle title="相关活动">
        <span slot="right">
          <router-link :to="{ name: 'actIndex',query:{dId:dId}}">更多活动</router-link>
        </span>
      </contentTitle>
      <!-- 最新活动 -->
      <div v-for="actInfo in actList" :key="actInfo.key">
        <act-cell :key="actInfo.key" :actInfo="actInfo"></act-cell>
      </div>
      <!-- /最新活动 -->
      <!-- 相关专题 -->
      <contentTitle title="相关专题">
        <span slot="right">
          <router-link :to="{ name: 'heal.special',query:{departId:dId}}">更多专题</router-link>
        </span>
      </contentTitle>
      <relative-subjects :subjects="subjects"></relative-subjects>

      <!-- <contentTitle title="相关问答">
      <span slot="right">
          <router-link :to="{ name: 'Departs'}" >更多问答></router-link>
      </span>
    </contentTitle>
    <div class="hot-departments clearfix">
      <div v-for="(elem,index) in departments" :key="index" class="department-item">
        <router-link :to="{ name: 'departInfo', params: { dId: elem.id}}">
          <div class="item-avater">
            <img :src="GET_IMG_URL(elem.img,'u')" alt="">
          </div>
          <p class="dep-name">{{elem.name}}</p>
        </router-link>
      </div>
    </div> -->
      <!-- 相关视频 -->
      <div v-if="!VX_isInHapHealApp">
        <section v-if="lessonList.length>0&&lessonList.length!=1&&lessonList.length!=3">
          <contentTitle title="相关课堂">
            <span slot="right">
              <router-link :to="{ name: 'heal.course',query:{departId:dId}}">更多课堂</router-link>
            </span>
          </contentTitle>
          <ul class="relative-movies">
            <li v-for="(elem,index) in lessonList" :key="index" class="relative-movies-item">
              <span v-if="elem.status==0" class="course-type">直播</span>
              <span v-if="elem.status==1" class="course-type">未开始</span>
              <span v-if="elem.status==2" class="course-type">回顾</span>
              <span v-if="elem.status==3" class="course-type">回顾</span>
              <a :href="OUTER_LINKS.courseDetails+elem.id">
                <div class="item-avater">
                  <img :src="GET_IMG_URL(elem.image)" alt="">
                </div>
                <div class="course-name">{{elem.title}}</div>
                <!-- <div class="course-tip">{{elem.title}}</div> -->
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
    <!-- /page_container -->
    <!-- page_footer -->
    <div slot="page_footer">
      <!-- 分享弹窗 -->
      <share :show.sync="share_show" @cancel="cancelShare" @confirm="confirmShare"></share>
      <!-- 分享弹窗 -->
      <!-- 微博分享 -->
      <share-sina :show.sync="share_con_show" @cancel="cancelShareCon" @confirm="confirmShareCon"
        :conInfo="shareSinaInfo"></share-sina>
      <!-- 微博分享 -->
      <!-- 微信分享 -->
      <share-wechat :show.sync="show_wechatShare"></share-wechat>
      <!-- /微信分享 -->
      <loading-page v-show='initing_page'></loading-page>
    </div>
  </layout>
</template>
<script>
  import {
    LINK_CARD_BASE_URL,
    MOMENT_URL,
    FORUM_URL,
    APP_URL
  } from "@/config";
  import Header from "@/components/header/Header";
  import shareFns from "@/common/share";
  import share from "@/iwen/share/share";
  import shareSina from "@/iwen/share-sina/share-sina";
  import shareWechat from "@/iwen/share-wechat/share-wechat";
  import contentTitle from "../../components/content_title/content_title";
  import articleCell from "../../components/article-cell/article-cell";
  import actCell from "../../components/act-cell/act-cell";
  import textDairyCell from "@/modules/health/components/text_dairy_cell";
  import relativeSubjects from "../../components/relative-subjects/relative-subjects";
  import {
    commonMixin,
    toTopMixin,
    shareMixin
  } from "@/mixins";
  import loadingPlaceHolder from "@/components/loading-place-holder/loading-place-holder";
  import sysService from "@/services/sysService.js";
  import departService from "@/services/departService.js";
  import courseService from "@/services/courseService.js";
  import icon_bingli from "@/assets/images/icons/icon-bingli@3x.png";
  import icon_book from "@/assets/images/icons/icon-book@3x.png";
  import icon_act from "@/assets/images/icons/icon-act@3x.png";
  import icon_subject from "@/assets/images/icons/icon-subject@3x.png";
  export default {
    name: "index",
    mixins: [commonMixin, toTopMixin, shareMixin],
    data() {
      return {
        dId: 0,
        MOMENT_URL,
        FORUM_URL,
        APP_URL,
        loading_famous_docs: true,
        loading_kepuList: true,
        share_show: false,
        share_con_show: false,
        show_wechatShare: false,
        shareSinaInfo: {
          sharedContent: "",
          sharedImg: "",
        },
        departInfo: {
          id: "",
          name: "...",
          introduction: "...",
          picture: "",
        },
        kepuList: [],
        diaryList: [],
        zishuList: [],
        bingliList: [],
        actList: [],
        subjects: [],
        departments: [],
        // moments:[],
        lessonList: [],
        config_navs: [
          {
            text: "活动",
            link: "/act?departId=",
            link_type: 0,
            icon: icon_act
          },
          {
            text: "专题",
            link: "/heal/special?departId=",
            link_type: 0,
            icon: icon_subject
          },
          {
            text: "病例分析",
            link: "/heal/analysis?departId=",
            link_type: 0,
            icon: icon_bingli
          },
          {
            text: "诊间日记",
            link: "/heal/diary?departId=",
            link_type: 0,
            icon: icon_book
          },
        ],
        famous_docs: []
      };
    },
    components: {
      mHeader: Header,
      actCell,
      articleCell,
      textDairyCell,
      contentTitle,
      relativeSubjects,
      share,
      loadingPlaceHolder,
      shareSina,
      shareWechat
    },
    mounted() {
      this.dId = this.$route.params.dId;
      this.depart_subjects();
      this.getArticleByType(1);
      this.getArticleByType(2);
      // this.getArticleByType(3);
      this.getArticleByType(5);
      // this.depart_circles();
      this.depart_acts();
      this.depart_docs();
      this.depart_info();
      this.homeLesson();
    },
    computed: {},
    methods: {
      backToIndex() {
        this.$router.push({
          name: "homeIndex"
        });
      },
      homeLesson() {
        let This = this;
        courseService.home_lesson({
          position: "DEPART_INDEX",
          deptId: This.dId
        })
        .then((res) => {
          if (res.code == 0) {
            This.lessonList = res.data;
          }
        });
      },
      setShareInfo() {
        let This = this;
        var lineLink = "";
        if (platformInfo.isiOS && platformInfo.isWx) {
          // lineLink = this.$store.state.wxConfigUrl.split('#')[0];
          // alert(lineLink);
          lineLink = window.location.href.split("#")[0];
        } else {
          lineLink = window.location.href.split("#")[0];
        }
        sysService.getWxConfig({
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
        }).then((isConfig) => {
          if (isConfig) {
            let url = This.$route.fullPath;
            let momentUrl = This.$route.fullPath;
            if (url.indexOf("?") >= 0) {
              url += "&channel=02HZ00004100024000";
              momentUrl += "&channel=02HZ00004200024000";
            } else {
              url += "?channel=02HZ00004100024000";
              momentUrl += "?channel=02HZ00004200024000";
            }
            shareFns.setShareInfo({
              lineLink: This.APP_URL + url,
              momentLineLink: This.APP_URL + momentUrl,
              imgUrl: `${This.GET_IMG_URL(This.departInfo.picture)}`,
              shareTitle: `${This.departInfo.name}`,
              descContent: `${This.departInfo.introduction}`
            });
          }
        });
      },
      cancelShare() {
        this.share_show = false;
      },
      checkLogin() {
        if (!this.VX_islogin) {
          this.goLogin(this.$route.fullPath);
          return false;
        } else {
          return true;
        }
      },
      checkNikeAndMobile() {
        //是否编辑昵称
        if (!this.VX_isNickEdited) {
          this.$router.push("/nike_name?refer=" + this.$route.fullPath);
          return false;
        } else if (!this.VX_isBindMobile) {
          this.$router.push("/bind_mobile?refer=" + this.$route.fullPath);
          return false;
        } else {
          return true;
        }
      },
      share() {
        // if(!this.checkLogin()) return;
        // if(!this.checkNikeAndMobile()) return;
        if (platformInfo.isWx) {
          this.share_show = true;
        } else {
          if (!this.checkLogin()) return;
          this.share_con_show = true;
        }
        this.shareSinaInfo.sharedContent = `小伙伴们，这里好多${this.departInfo.name}相关的知识，快来看看吧~`;
        this.shareSinaInfo.sharedImg = this.GET_IMG_URL(this.departInfo.picture);
      },
      confirmShare(params) {
        if (params.type == "wx") {
          this.show_wechatShare = true;
          return;
        } else if (params.type == "wb") {
          if (!this.VX_islogin) {
            this.goLogin(this.$route.fullPath);
            return;
          }
          //是否编辑昵称
          // if(!this.VX_isNickEdited){
          //   this.$router.push("/nike_name?refer="+this.$route.fullPath);
          //   return;
          // }
          // //是否绑定手机
          // if(!this.VX_isBindMobile){
          //   this.$router.push("/bind_mobile?refer="+this.$route.fullPath);
          //   return;
          // }
          this.share_show = false;
          this.share_con_show = true;
        }
      },
      cancelShareCon() {
        this.share_con_show = false;
      },
      confirmShareCon(sharedContent) {
        let This = this;
        let url = LINK_CARD_BASE_URL + `/linkcard/awyh_departindex/${this.departInfo.id}.htm`;
        if (url.indexOf("?") >= 0) {
          url += "&channel=01HZ00000600024000&tag=pc&m=awyh_departindex&n=" + this.departInfo.id;
        } else {
          url += "?channel=01HZ00000600024000&tag=pc&m=awyh_departindex&n=" + this.departInfo.id;
        }
        sysService.wbShare({
          sharedContent: sharedContent,
          sharedUrl: url,
          // sharedUrl:encodeURIComponent(url),
          // sharedImg:this.GET_IMG_URL(this.departInfo.picture)
        })
        .then(res => {
          if (res.code == 0) {
            This.$toast.tip("分享成功");
          }
        })
        .catch(() => {
          This.$toast.tip("分享失败");
        });
      },
      getArticleByType(contentType) {
        let This = this;
        sysService.getArticleByType({
          limit: 2,
          departId: this.dId,
          contentType: contentType,
          position: "DEPART_INDEX"
        })
        .then((res) => {
          if (contentType == 1) {
            This.loading_kepuList = false;
          }
          if (res.code == 0) {
            switch (contentType) {
              case 1:
                This.kepuList = res.data;
                break;
              case 2:
                This.diaryList = res.data;
                break;
              case 3:
                This.zishuList = res.data;
                break;
              case 5:
                This.bingliList = res.data;
                break;
              default:

            }
          }
        });
      },
      depart_subjects() {
        let This = this;
        departService.depart_subjects({
          departId: this.dId
        })
        .then((res) => {
          if (res.code == 0) {
            This.subjects = res.data;
          }
        });
      },
      // depart_circles(){
      //   let This=this;
      //   departService.depart_circles({
      //     deptId:this.dId
      //   })
      //   .then((res)=>{
      //     if(res.code==0){
      //       This.moments=res.data;
      //     }
      //   });
      // },
      depart_acts() {
        let This = this;
        departService.depart_acts({
          departId: this.dId
        })
        .then((res) => {
          if (res.code == 0) {
            This.actList = res.data;
          }
        });
      },
      depart_docs() {
        let This = this;
        this.loading_famous_docs = true;
        departService.depart_docs({
          deptId: this.dId
        })
        .then((res) => {
          This.loading_famous_docs = false;
          if (res.code == 0) {
            This.famous_docs = res.data;
          }
        });
      },
      depart_info() {
        let This = this;
        departService.depart_info({
          deptId: this.dId
        })
        .then((res) => {
          if (res.code == 0) {
            This.departInfo = res.data;
            This.SET_PAGE_TITLE(This.departInfo.name);
            This.setShareInfo();
          }
        });
      }
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  @import './css.less';

</style>
