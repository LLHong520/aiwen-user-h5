<template>
  <div class="wuhan-topic">
    <div class="wuhan-head">
      <div class="wuhan-news">
        <div class="wuhan-news-wrapper">
          <ul class="wuhan-news-list" :style="newsStyle">
            <li v-for="(item, index) in headNews" :key="index" class="wuhan-news-content"
              @click="handleLink(item.linkUrl)"
              :iw="`{desc:'湖北互联网医院-资讯模块',id:'hb_zixun_module',ext:{url:'${item.linkUrl}'}}`"
            >
              <span class="wuhan-news-tag">{{item.author}}</span>
              <span class="wuhan-news-title">{{item.title}}</span>
              <img class="wuhan-arrow" src="~@/assets/images/wuhan/icon_arrow.png" alt="">
            </li>
            <li class="wuhan-news-content"
              @click="handleLink(headNews[0].linkUrl)"
              :iw="`{desc:'湖北互联网医院-资讯模块',id:'hb_zixun_module',ext:{url:'${headNews[0].linkUrl}'}}`"
            >
              <span class="wuhan-news-tag">{{headNews[0].author}}</span>
              <span class="wuhan-news-title">{{headNews[0].title}}</span>
              <img class="wuhan-arrow" src="~@/assets/images/wuhan/icon_arrow.png" alt="">
            </li>
          </ul>
        </div>
      </div>
      <div class="wuhan-banner" v-if="banners.length > 0">
        <swiper :options="bannerSwiperOption" ref="bannerSwiper">
          <swiper-slide v-for="(item,index) in banners" :key="index" >
            <a class="wuhan-banner-link" :href="item.linkUrl" :iw="`{desc:'湖北互联网医院-banner模块',id:'hb_banner_module',ext:{url:'${item.linkUrl}'}}`">
              <img :src="item.pic">
            </a>
          </swiper-slide>
          <!-- Add Pagination -->
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <ul class="wuhan-helper">
        <li class="wuhan-linkbox"
          @click="handleLink('https://news.sina.cn/zt_d/yiqing0121')"
          :iw="`{desc:'湖北互联网医院-功能卡模块',id:'hb_function_card_module',ext:{url:'https://news.sina.cn/zt_d/yiqing0121'}}`"
        >
          <div class="wuhan-icon"><img src="~@/assets/images/wuhan/icon_map.png" alt=""></div>
          <div class="wuhan-content">
              <h4>疫情地图</h4>
              <p class="wuhan-tips">全国实时数据</p>
          </div>
        </li>
        <li class="wuhan-linkbox"
          @click="handleLink('https://health.sogou.com/ncp/robot?from=sogouhaotopic')"
          :iw="`{desc:'湖北互联网医院-功能卡模块',id:'hb_function_card_module',ext:{url:'https://health.sogou.com/ncp/robot?from=sogouhaotopic'}}`"
        >
          <div class="wuhan-icon"><img src="~@/assets/images/wuhan/icon_check.png" alt=""></div>
          <div class="wuhan-content">
            <h4>症状自查</h4>
            <p class="wuhan-tips">足不出户自我诊断</p>
          </div>
        </li>
      </ul>
      <img class="wuhan-head-pic" src="~@/assets/images/wuhan/wuhanTopic_head.png" alt="">
    </div>
    <!-- 活动&服务 -->
    <div class="wuhan-server">
      <h3 class="wuhan-title">活动&服务</h3>
      <div class="wuhan-hotline"
        @click="handleLink('https://health.sina.cn/linkcard/lesson/detail/5e6f22170cf2a8b191140a33.htm?channel=hos07w1&tag=pc&m=lesson/detail&n=5e6f22170cf2a8b191140a33')"
        :iw="`{desc:'湖北互联网医院-活动&服务模块',id:'hb_activity_server_module',ext:{url:'https://health.sina.cn/linkcard/lesson/detail/5e6f22170cf2a8b191140a33.htm?channel=hos07w1&tag=pc&m=lesson/detail&n=5e6f22170cf2a8b191140a33'}}`"
      >
        <img src="~@/assets/images/wuhan/server_01.jpg" alt="">
      </div>
      <div class="wuhan-hotline"
        @click="handleLink('https://m.xinli001.com/qingsu?cid=57&utm_source=sina')"
          :iw="`{desc:'湖北互联网医院-活动&服务模块',id:'hb_activity_server_module',ext:{url:'https://m.xinli001.com/qingsu?cid=57&utm_source=sina'}}`"
      >
        <img src="~@/assets/images/wuhan/server_02.jpg" alt="">
      </div>
      <div class="wuhan-advice"
        @click="handleLink('https://pages.tmall.com/wow/yao/act/mybcm2?wh_biz=tm')"
        :iw="`{desc:'湖北互联网医院-活动&服务模块',id:'hb_activity_server_module',ext:{url:'https://pages.tmall.com/wow/yao/act/mybcm2?wh_biz=tm'}}`"
      >
        <img src="~@/assets/images/wuhan/server_03.jpg" alt="">
      </div>
      <ul class="wuhan-friend_link">
        <li
           @click="handleLink('https://promo.guahao.com/topic/pneumonia?_cp=awys')"
           :iw="`{desc:'湖北互联网医院-友商链接模块',id:'hb_friend_link_module',ext:{url:'https://promo.guahao.com/topic/pneumonia?_cp=awys'}}`"
        >
          <img class="wuhan-icon" src="~@/assets/images/wuhan/icon_weiyi.png" alt="">微医
        </li>
        <li
           @click="handleLink('https://m.haodf.com/ndynamic/coronalactivity/activity?businesstype=xljk')"
           :iw="`{desc:'湖北互联网医院-友商链接模块',id:'hb_friend_link_module',ext:{url:'https://m.haodf.com/ndynamic/coronalactivity/activity?businesstype=xljk'}}`"
        >
          <img class="wuhan-icon" src="~@/assets/images/wuhan/icon_haodaifu.png" alt="">好大夫
        </li>
        <li
           @click="handleLink('https://yao.jk.cn/shop/?app=XLWB&outBizType=YQZTXLWB&header=0#/market/255338')"
           :iw="`{desc:'湖北互联网医院-友商链接模块',id:'hb_friend_link_module',ext:{url:'https://yao.jk.cn/shop/?app=XLWB&outBizType=YQZTXLWB&header=0#/market/255338'}}`"
        >
          <img class="wuhan-icon" src="~@/assets/images/wuhan/icon_pingan.png" alt="">平安好医生
        </li>
      </ul>
    </div>
    <!-- /活动&服务 -->

    <div class="wuhan-hero">
      <h3 class="wuhan-title">抗疫英雄谱</h3>
      <ul class="wuhan-list">
        <li class="wuhan-item" v-for="(item, index) in heroList" :key="index"
          @click="handleLink(item.linkUrl)"
          :iw="`{desc:'湖北互联网医院-抗疫报道模块',id:'hb_kangyi_baodao_module',ext:{url:'${item.linkUrl}'}}`"
        >
          <p class="wuhan-content">{{item.title}}</p>
          <p class="wuhan-meta">{{item.author}}</p>
        </li>
      </ul>
    </div>
    <div class="wuhan-weibo-topic">
      <h3 class="wuhan-title">
        <img class="wuhan-logo" src="~@/assets/images/wuhan/icon_weibo.png" alt="">
        微博话题
        <span class="wuhan-tag">抗疫前线</span>
      </h3>
      <ul class="wuhan-weibo-list">
        <li class="wuhan-weibo-view" v-for="(item, index) in weiboList" :key="index">
          <div @click="handleLink(item.linkUrl)" :iw="`{desc:'湖北互联网医院-微博正文模块',id:'hb_weibo_zhengwen_module',ext:{url:'${item.linkUrl}'}}`">
            <h4 class="wuhan-title">{{item.title}}</h4>
            <div class="wuhan-content">{{item.content}}</div>
          </div>
          <div class="wuhan-btn-group">
            <span class="wuhan-meta">来源：{{item.from}}</span>
            <div class="wuhan-btn" @click.stop="handleLink(item.topicLink)"
              :iw="`{desc:'湖北互联网医院-微博话题模块',id:'hb_weibo_huati_module',ext:{url:'${item.topicLink}'}}`"
            >
              <img class="wuhan-logo" src="~@/assets/images/wuhan/icon_btn_topic.png" alt="">参与话题</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="wuhan-article">
      <ul class="wuhan-tabs">
        <li :class="['wuhan-tabs-item', {'active': activeIndex === index}]" v-for="(item, index) in tabs" :key="item" @click="activeIndex = index">{{item}}</li>
      </ul>
      <ul class="wuhan-posts" v-for="(article, articleIndex) in articles" :key="articleIndex" v-show="activeIndex == articleIndex">
        <li class="wuhan-posts-item" v-for="(item, index) in article" :key="index"
          :iw="`{desc:'湖北互联网医院-文章模块',id:'hb_article_module',ext:{url:'${item.linkUrl}'}}`"
        >
        <a class="wuhan-posts-link" :href="item.linkUrl">
          <div class="posts-content">
            <h4 class="posts-title">{{item.title}}</h4>
            <p class="posts-author">{{item.author}}</p>
          </div>
        </a>
          <!-- <img class="posts-pic" v-if="index < 2" :src="item.pic" alt=""> -->
        </li>
      </ul>
      <div class="wuhan-bottom">
        - 这是我的底线 -
      </div>
    </div>
    <div class="wuhan-copyright">Powered by 爱问互联网医院</div>
  </div>
</template>

<script>
import banner1 from "@/assets/images/wuhan/banner.jpg";
import banner2 from "@/assets/images/wuhan/banner_1.jpg";
import logo from "@/assets/images/default/icon_sinahealth.png";
import { commonMixin,shareMixin } from "@/mixins";
import sysService from "@/services/sysService.js";
import shareFns from "@/common/share";
export default {
  name: "wuhanTopic",
  mixins: [commonMixin,shareMixin],
  data() {
    return {
      headNews: [
        {
          title: "武汉仍有一定社区感染风险",
          author: "卫健委",
          linkUrl: "https://m.weibo.cn/2028810631/4483087226681351"
        },
        {
          title: "关于防疫的6个最新倡议",
          author: "资讯",
          linkUrl: "https://m.weibo.cn/2803301701/4482726919105293"
        }
      ],
      heroList: [
        {
          title: "“临床医生就该在病床边”",
          author: "微博@央视新闻",
          linkUrl: "https://m.weibo.cn/2656274875/4483120491742799"
        },
        {
          title: "拼尽全力患者还是走了",
          author: "微博@新京报我们视频",
          linkUrl: "https://m.weibo.cn/6124642021/4483072387310316"
        },
        {
          title: "援鄂护士离家1个多月",
          author: "微博@新京报我们视频",
          linkUrl: "https://m.weibo.cn/6124642021/4482504461061995"
        }
      ],
      weiboList: [
        {
          title: "#楚天有爱抗疫无界#",
          content: "#楚天有爱抗疫无界##我的健康十八式# 哈哈哈，关门大吉[赞]。武汉三院光谷院区1楼ICU病区“关门大吉”。接下来，希望这种门多关，快关，适时关。我们的朋友快快回来",
          from: "@蒋佩茹医生",
          linkUrl:"https://weibo.com/1143605707/IySevF8ji?refer_flag=1001030103_&type=comment",
          topicLink:"https://s.weibo.com/weibo/%2523%25E6%25A5%259A%25E5%25A4%25A9%25E6%259C%2589%25E7%2588%25B1%25E6%258A%2597%25E7%2596%25AB%25E6%2597%25A0%25E7%2595%258C%2523?topnav=1&wvr=6&b=1",
        },
        {
          title: "#我的健康十八式#",
          content: "英国的“群体免疫”政策引起了大家广泛讨论，这不仅关系着英国，也关系着全球疫情走向，与每个人息息相关。你是如何看待这一政策呢？也许大家观点不同，但每个人都应有自己的思考和想法，欢迎投票或在评论区表达自己的观点！#英国超10万人签字呼吁政府积极防控# #我的健康十八式# 请问你是如何看待英国提出的“群体免疫”政策？",
          from: "@协和医生Do先生",
          linkUrl:"https://weibo.com/3141296113/IyS3mzJDk?refer_flag=1001030103_&type=comment",
          topicLink:"https://s.weibo.com/weibo/%23%E6%88%91%E7%9A%84%E5%81%A5%E5%BA%B7%E5%8D%81%E5%85%AB%E5%BC%8F%23"
        },
        {
          title: "#健康中国2030#",
          content: "#健康中国2030##我的健康十八式# [并不简单]此次新冠肺炎让公众对ECMO产生了兴趣，ECMO是什么？人工肺小组是如何工作的？马住涨知识！",
          from: "@医疗音乐手绘君",
          linkUrl:"https://weibo.com/1758904723/IyCG0pQcY?refer_flag=1001030103_&type=comment",
          topicLink:"https://s.weibo.com/weibo/%23%E5%81%A5%E5%BA%B7%E4%B8%AD%E5%9B%BD2030%23"
        }
      ],
      tabs: ["疫情追踪", "儿童健康", "慢病管理"],
      articles: {
        0: [
          {
            title: "感染新冠肺炎有多么的痛苦可怕，外国人为什么就是不怕？",
            author: "爱问平台",
            pic: "",
            linkUrl: "https://health.sina.cn/user_pc/article/science/5e69e03ee4b0d1658c5d7dcc?channel=hos07w1"
          },
          {
            title: "海外疫情爆发，哪些国家疫情会超过中国？分析：这8国令人堪忧",
            author: "爱问平台",
            pic: "",
            linkUrl: "https://health.sina.cn/user_pc/article/science/5e6ddd680cf23bd5114a4a3f?channel=hos07w1"
          },
          {
            title: "新冠疫情全球爆发，是否说明病毒源头不在我国？本文为你讲出实情",
            author: "爱问平台",
            pic: "",
            linkUrl: "https://health.sina.cn/user_pc/article/science/5e6c8771e4b0d1658c5f6da5?channel=hos07w1"
          },
          {
            title: "NBA球员体壮如牛，为何也会感染新冠病毒？医生为你讲出真相",
            author: "爱问平台",
            pic: "",
            linkUrl: "https://health.sina.cn/user_pc/article/science/5e6c89c60cf23bd511492e56?channel=hos07w1"
          },
          {
            title: "整个亚洲都有确诊病例，唯有中亚五国独善其身，他们是如何做到的",
            author: "爱问平台",
            pic: "",
            linkUrl: "https://health.sina.cn/user_pc/article/science/5e6b7cba0cf23bd511481f92?channel=hos07w1"
          },
          {
            title: "意大利最终还是借鉴中国模式，但对病人分类收治策略让人想不明白",
            author: "爱问平台",
            pic: "",
            linkUrl: "https://health.sina.cn/user_pc/article/science/5e677c490cf2dd0680af16ff?channel=hos07w1"
          },
          {
            title: "疫情严重的伊朗效仿中国建方舱医院，疫情中方舱医院发挥哪些作用",
            author: "爱问平台",
            pic: "",
            linkUrl: "https://health.sina.cn/user_pc/article/science/5e6b788a0cf23bd511481de5?channel=hos07w1"
          },
          {
            title: "新冠肺炎已成世界大流行，这件事才是对抗新冠病毒唯一有效的“神",
            author: "爱问平台",
            pic: "",
            linkUrl: "https://health.sina.cn/user_pc/article/science/5e6b32f9e4b0d1658c5e8326?channel=hos07w1"
          }
        ],
        1: [
          {
            title: "新手妈妈的焦虑是为啥？咋办呢？",
            author: "爱问平台",
            pic: "",
            linkUrl: "https://health.sina.cn/user_pc/article/science/5e3b769fe4b0b1d263dd69d1?channel=hos07w1"
          },
          {
            title: "怎样让宝宝更容易使用吸管杯子？",
            author: "爱问平台",
            pic: "",
            linkUrl: "https://health.sina.cn/user_pc/article/science/5e6ce585e4b0d1658c5f9cca?channel=hos07w1"
          },
          {
            title: "宝宝不好好吃饭怎么办？不如试试这5招，管用",
            author: "爱问平台",
            pic: "",
            linkUrl: "https://health.sina.cn/user_pc/article/science/5e6ccf8c0cf23bd511494fde?channel=hos07w1"
          },
          {
            title: "宝宝何时开始自主如厕？家长应该怎么教？收下这份指南",
            author: "爱问平台",
            pic: "",
            linkUrl: "https://health.sina.cn/user_pc/article/science/5e6b7afc0cf23bd511481eb4?channel=hos07w1"
          },
          {
            title: "十五个月宝宝方颅怎么办？还能恢复吗？",
            author: "爱问平台",
            pic: "",
            linkUrl: "https://health.sina.cn/user_pc/article/science/5e69f234e4b0b54bbdc926a7?channel=hos07w1"
          },
          {
            title: "宝宝常见病之春季过敏性鼻炎",
            author: "爱问平台",
            pic: "",
            linkUrl: "https://health.sina.cn/user_pc/article/science/5e699bc8e4b0b54bbdc8f1e8?channel=hos07w1"
          },
        ],
        2: [
          {
            title: "从细节中保护儿童肾脏",
            author: "爱问平台",
            pic: "",
            linkUrl: "https://health.sina.cn/user_pc/article/science/5e69a18f0cf25769d58db5b2?channel=hos07w1"
          },
          {
            title: "年轻人高血压，没感觉不吃药可以吗？不同情况，本文为你详解",
            author: "爱问平台",
            pic: "",
            linkUrl: "https://health.sina.cn/user_pc/article/science/5e65fff0e4b08cfcf3356459?channel=hos07w1"
          },
          {
            title: "食用油种类繁多怎么选？这篇文章，痛风和“三高”人群必看",
            author: "爱问平台",
            pic: "",
            linkUrl: "https://health.sina.cn/user_pc/article/science/5e674df00cf2dd0680aebf6e?channel=hos07w1"
          },
          {
            title: "老年人有腰椎狭窄了，需不需要手术呢?",
            author: "爱问平台",
            pic: "",
            linkUrl: "https://health.sina.cn/user_pc/article/science/5e676920e4b05f3c89af7711?channel=hos07w1"
          },
          {
            title: "得了慢性肾病，说明离尿毒症不远了？医生：早期预警关注3个指标",
            author: "爱问平台",
            pic: "",
            linkUrl: "https://health.sina.cn/user_pc/article/science/5e68ed67e4b08b1f24dc7794?channel=hos07w1"
          },
          {
            title: "高血压吃药血压正常，为什么医生说还得换药？有什么猫腻？",
            author: "爱问平台",
            pic: "",
            linkUrl: "https://health.sina.cn/user_pc/article/science/5e607739e4b0bc6e659ac513?channel=hos07w1"
          },
          {
            title: "糖尿病患者为什么要补充维生素B12？这篇文章详细解答，不妨看",
            author: "爱问平台",
            pic: "",
            linkUrl: "https://health.sina.cn/user_pc/article/science/5e5dfa3b0cf242dcbe1104a9?channel=hos07w1"
          },
        ]
      },
      activeIndex: 0,
      count: 0,
      newsStyle: {
        transition: "transform 0.6s",
        transform: "translateY(0)",
      },
      bannerSwiperOption: {
        loop: false,
        lazyLoading : true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        },
        initialSlide:0,
        spaceBetween: 0,
        // pagination: {
        //   el: ".swiper-pagination"
        // },
      },
      banners: [
        {
          pic: banner1,
          linkUrl: "http://maka.im/danyeviewer/11717208/ZJU0AOSRW11717208?from=groupmessage&isappinstalled=0&scene=1&clicktime=1581049647&enterid=1581049647"
        },
        {
          pic: banner2,
          linkUrl: "https://health.sina.cn/linkcard/community_biz/10/5e6b4a3badbe1d0009745bbc.htm?channel=hos07w1"
        }
      ]
    };
  },
  beforeDestroy() {
    clearInterval(this.Timer);
    this.Timer = null;
  },
  created(){
    this.init();
    this.scrollNews();
  },
  methods: {
    init() {
      if(platformInfo.isWx){
        this.setShareInfo();
      }
    },
    scrollNews() {
      if(this.Timer) {
        return;
      }
      this.Timer = setInterval(() => {
        {
          this.count++;
          this.newsStyle = {
            transition: "transform 0.6s",
            transform: `translateY(${this.count*-42}px)`,
          };
          if(this.count === (this.headNews.length)) {
            setTimeout(() => {
              this.count = 0;
              this.newsStyle = {
                transition: "none",
                transform: "translateY(0)",
              };
            }, 600);
          }
        }
      }, 3000);
    },
    handleLink(url) {
      location.href = url;
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
              imgUrl: "https://health.sina.cn" + logo,
              shareTitle: "楚天有爱抗疫无界",
              descContent: "新浪爱问医生携手多家平台推出实用工具，助你随时获取新冠肺炎相关科普、在线义诊、药品与物资信息"
            });
          }
        });
    },
  }
};
</script>

<style lang="less" scoped>
  .card() {
    margin: 0 15px 10px;
    padding: 18px 12px;
    box-sizing: border-box;
    border-radius:8px;
    background: #FFFFFF;
    box-shadow:0px 6px 20px 8px rgba(0,0,0,0.03);
  }
  .wuhan-topic{
    font-family:PingFangSC-Regular,PingFang SC;
    letter-spacing: 1px;
    max-width: 600px;
    margin: 0 auto;
    background: #F6F7FA;
    overflow: hidden;
    .wuhan-title{
      font-size: 16px;
      height: 22px;
      color: #2d2d2d;
      font-weight: bold;
      margin: 0 0 12px 0;
    }
    .wuhan-head{
      // background: url("~@/assets/images/wuhan/wuhanTopic_head.png") no-repeat;
      // background-position:center 0%;
      // background-size: 100% auto;
      width: 100%;
      padding: 160px 0 0;
      position: relative;
      z-index: 0;
      .wuhan-head-pic{
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
        height: calc(100% + 20px);
      }
    }
    .wuhan-news{
      margin: 0 15px 10px;
      box-sizing: border-box;
      height:42px;
      display: flex;
      background: #FFFCE7;
      border-radius:8px;
      box-shadow:0px 6px 20px 8px rgba(0,0,0,0.03);
      align-items: center;
      .wuhan-logo{
        width: 37px;
        height: 36px;
        margin: 0 8px 0 0;
        flex-shrink: 0;
      }
      .wuhan-arrow{
        width: 20px;
        height: 18px;
        flex-shrink: 0;
      }
      .wuhan-news-wrapper{
        overflow: hidden;
        height: 100%;
        width: 100%;
        .wuhan-news-content{
          padding: 12px;
          display: flex;
        }
        h5 {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 13px;
          color: #282828;
          line-height: 18px;
          margin: 0 0 2px 0;
          font-weight: bold;
        }
        .wuhan-news-title{
          flex-grow: 1;
          line-height: 18px;
          margin: 0 16px 0 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .wuhan-news-tag{
          border-radius:2px;
          flex-shrink: 0;
          height: 18px;
          color: #FFFFFF;
          font-size: 12px;
          line-height: 18px;
          background: #F14D1A;
          padding: 0 4px;
          box-sizing: border-box;
          margin: 0 8px 0 0;
        }
      }
    }
    .wuhan-banner{
      margin: 0 15px 10px;
      object-fit: cover;
      box-shadow:0px 6px 18px 6px rgba(0,0,0,0.04);
      border-radius:8px;
      overflow: hidden;
      .wuhan-banner-link{
        width: 100%;
        line-height: 0;
        display: block;
        border-radius: 8px;
        overflow: hidden;
      }
      img{width: 100%;height: 100%;}
    }
    .wuhan-helper{
      .card;
      display: flex;
      .wuhan-linkbox{
        width: 50%;
        flex: 1 0 auto;
        display: flex;
        align-items: center;
        .wuhan-icon{
          width: 32px;
          height: 32px;
          background: #eff3fa;
          margin: 0 8px 0 0;
          border-radius:4px;
        }
      }
    }
    .wuhan-linkbox{
      .wuhan-content{
        h4{
          color: #282828;
          font-size: 13px;
          line-height: 18px;
          margin: 0 0 2px 0;
          font-weight: bold;
        }
        p{
          color: #AEB1B6;
          font-size: 12px;
          line-height: 16px;
        }
      }
    }
    .wuhan-server{
      .card;
      position: relative;
      z-index: 1;
      .wuhan-hotline,.wuhan-advice{
        overflow: hidden;
        line-height: 0;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        border-radius: 4px;
        margin: 0 0 9px 0;
      }
      .wuhan-advice{
        margin: 0 0 16px 0;
      }
      .wuhan-friend_link{
        display: flex;
        li{
          justify-content: center;
          background: #EFF3FA;
          border-radius: 4px;
          height: 40px;
          width: 30%;
          margin: 0 9px 0 0;
          padding: 10px 6px 10px 9px;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          flex: 1 0 auto;
          font-size: 12px;
          color: #282828;
          line-height: 16px;
          letter-spacing: 0;
          &:last-child{
            margin: 0;
          }
          img{
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #f8f8f8;
            margin: 0 4px 0 0;
          }
        }
      }
    }
    .wuhan-hero{
      .card;
      padding: 18px 0 18px 12px;
      .wuhan-list{
        height: 76px;
        overflow: hidden;
        overflow-x: scroll;
        white-space: nowrap;
        font-size: 0;
        .wuhan-item{
          border-radius:4px;
          vertical-align: middle;
          display: inline-block;
          white-space: pre-line;
          padding: 12px 8px;
          margin: 0 8px 0 0 ;
          box-sizing: border-box;
          color: #fff;
          width: 144px;
          height: 76px;
          background:url("~@/assets/images/wuhan/bg_hero.png"),linear-gradient(136deg,rgba(254,48,14,1) 0%,rgba(255,113,34,1) 100%);
          background-size: 100%;
        }
      }
      .wuhan-item{
        .wuhan-content{
          font-size: 13px;
          line-height: 16px;
          height: 32px;
          text-overflow: ellipsis;
          overflow: hidden;
          margin: 0 0 4px 0;
          font-weight: bold;
        }
        .wuhan-meta{
          font-size: 12px;
          line-height: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .wuhan-weibo-topic{
      .card;
      padding: 18px 0 18px 12px;
      .wuhan-title{
        font-size: 18px;
      }
      .wuhan-logo{
        width: 18px;
        height: 18px;
        border-radius: 50%;
        vertical-align: top;
      }
      .wuhan-tag{
        vertical-align: top;
        height: 18px;
        color: #FFF8DF;
        font-size: 12px;
        line-height: 18px;
        box-sizing: border-box;
        padding: 2px 4px;
        background:linear-gradient(90deg,rgba(254,77,15,1) 0%,rgba(255,127,61,1) 100%);
        border-radius:8px 8px 8px 0px;
      }
    }
    .wuhan-weibo-list{
      height: 189px;
      overflow: hidden;
      overflow-x: auto;
      white-space: nowrap;
      font-size: 0;
      .wuhan-weibo-view{
        display: inline-block;
        vertical-align: middle;
        white-space: pre-line;
        height: 100%;
        width: 280px;
        margin: 0 8px 0 0;
        background:linear-gradient(315deg,rgba(255,244,224,1) 0%,rgba(255,235,205,1) 100%);
        border-radius:4px;
        padding: 16px 12px;
        box-sizing: border-box;
        .wuhan-title{
          color: #F47A22;
          font-size: 15px;
          font-weight: normal;
        }
        .wuhan-content{
          min-height: 96px;
          background: #fff;
          padding: 12px 8px;
          box-sizing: border-box;
          font-size: 13px;
          color: #282828;
          line-height: 18px;
          margin: 0 0 12px 0;
          border-radius: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp:4;
          position: relative;
          transform: translate3d(0,0,0);
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
          &::after{
            content: "";
            position: absolute;
            width: 100%;
            height: 12px;
            left: 0;
            bottom: 0;
            background: inherit;
          }
        }
        .wuhan-btn-group{
          position: relative;
          .wuhan-meta{
            color: #B6B1AE;
            font-size: 12px;
            line-height: 16px;
          }
          .wuhan-btn{
            position: absolute;
            right: 0;
            top: -4px;
            padding: 3px 10px;
            box-sizing: border-box;
            font-size: 13px;
            color: #FFF8DF;
            background: #FF460D;
            border-radius: 12px;
            font-weight: bold;
            .wuhan-logo{
              margin: 2px 2px 2px 0;
              width: 14px;
              height: 14px;
            }
          }
        }
      }
    }
    .wuhan-article{
      .card;
      padding: 0;
      margin: 0 15px;
      box-shadow:0px 6px 20px 8px rgba(0,0,0,0.03);
      overflow: hidden;
      .wuhan-bottom{
        height: 19px;
        color: #D4D6DA;
        font-size: 12px;
        line-height: 19px;
        text-align: center;
        margin: 0 0 16px 0;
      }
    }
    .wuhan-tabs{
      display: flex;
      border-bottom: 1px solid #EFEFEF;
      .wuhan-tabs-item{
        padding: 16px 12px 10px;
        box-sizing: border-box;
        position: relative;
        font-size: 14px;
        color: #999;
        line-height: 20px;
        &.active{
          color: #2688FC;
          font-size: 16px;
          font-weight: bold;
        }
        &.active::after{
          content: "";
          width: 32px;
          height: 2px;
          background: #2688FC;
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
        }
      }
    }
    .wuhan-posts{
      .wuhan-posts-item{
        display: flex;
        .wuhan-posts-link{
          width: 100%;
          display: block;
          padding: 16px 0;
          margin: 0 12px;
          border-bottom: 1px solid #EFEFEF;
          box-sizing: border-box;
        }
        &:last-child{
          .wuhan-posts-link{
            border: none;
          }
        }
        .posts-content{
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .posts-title{
            font-size: 16px;
            color: #2d2d2d;
            line-height: 22px;
            margin: 0 0 12px 0;
          }
          .posts-author{
            font-size: 12px;
            color: #AEB1B6;
            line-height: 16px;
          }
        }
        .posts-pic{
          margin: 0 0 0 10px;
          flex-shrink: 0;
          width: 112px;
          height: 70px;
          border-radius:4px;
          border: 1px solid #F3F3F3;
        }
      }
    }
    .wuhan-copyright{
      text-align: center;
      font-size: 12px;
      color: #D4D6DA;
      margin: 20px auto;
    }
  }
</style>
