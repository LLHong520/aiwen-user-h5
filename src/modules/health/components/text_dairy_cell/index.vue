<template>
  <div class="text_dairy_cell">
    <div class="text_dairy_cell-con">
      <div class="cell-text">
        <router-link tag="a" :to="{name:'docIndex',params:{dId:article.drUserId}}" class="cell-doc-info">
          <div class="info">
            <p v-if="article.drPhoto || article.doctorPhoto" class="avater">
              <img v-lazy="GET_IMG_URL(article.drPhoto || article.doctorPhoto,'d')" alt="用户头像" />
            </p>
            <div class="text">
              <p>{{article.drUserName|| article.realName || article.authorName |limit(6)}}</p>
              <p>{{article.deptName||article.departName}}</p>
            </div>
          </div>
        </router-link>
        <div class="cell-content" :style="textCollapseStyle" ref="desc">
          <div v-html="contentfilter(article.content)"></div>
          <div class="unfold" @click="showTotalIntro" v-if="showExchangeButton">
            <p>{{exchangeButton ? '展开' : '收起'}}</p>
          </div>
        </div>
      </div>
      <i class="quito"></i>
    </div>
  </div>
</template>

<script>
  /*
   *纯文本诊间日记类型显示样式
   */
  import {
    commonMixin,
    toTopMixin
  } from "@/mixins";
  export default {
    name: "text_dairy_cell",
    mixins: [commonMixin, toTopMixin],
    data() {
      return {
        // 显示展开还是收起
        showTotal: true,
        exchangeButton: true,
        // 是否显示展开收起按钮
        showExchangeButton: false,
        lines:5,
      };
    },
    computed:{
      textCollapseStyle(){
        let collapseStyle = {
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          webkitLineClamp: this.lines,
          webkitBoxOrient: "vertical"
        };        
        return this.showTotal? {}:collapseStyle;
      }
    },
    mounted() {
      let _this= this;
      this.$nextTick(function () {
        // console.log("nextTick===========");    
        if (!this.$refs.desc) {
          return;
        }
        let descHeight = window.getComputedStyle(this.$refs.desc).height.replace("px", "");
        let lineHeight = window.getComputedStyle(this.$refs.desc).lineHeight.replace("px", "");
        let limitHeight = lineHeight * _this.lines;
        // console.log("descHeight:" + descHeight);
        // console.log("limitHeight:" + limitHeight);
        // console.log("如果 descHeight 超过" + (limitHeight) + "就要显示展开按钮");
        //判断是否超出 若超出则显示查看全部
        if (descHeight > limitHeight) {
          // 显示展开收起按钮
          this.showExchangeButton = true;
          this.exchangeButton = true;
          // 不是显示所有
          this.showTotal = false;
        } else {
          // 不显示展开收起按钮
          this.showExchangeButton = false;
          // 没有超过四行就显示所有
          this.showTotal = true;
        }
      }.bind(this));
    },
    props: {
      article: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    methods: {
      showTotalIntro () {
        this.showTotal = !this.showTotal;
        this.exchangeButton = !this.exchangeButton;
      },
      contentfilter(content){
        content = content || "";
        let resString = "";
        if(content){
          return content.replace(/\n/g,"<br/>");
        }
        return resString;
      }
    }
  };

</script>
<style scoped lang="less" rel="stylesheet/less">
  @assets: "~@/assets";
  @import "@{assets}/css/flex.less";
  @import "@{assets}/css/fix.less";

  .avater {
    display: inline-block;
    width: 72/@r;
    height: 72/@r;
    margin-right: 15/@r;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  i.quito{
    display: block;
    width: 80/@r;
    height: 74/@r;
    position: absolute;
    top: 0px;
    right: 0px;
    background: url("./images/feeds_bg_diary.png") center no-repeat;
    background-position: cover;
  }

  //健康科普文章列表
  .text_dairy_cell {
    border-bottom: 1px solid @bor_c;
    padding: 20/@r 20/@r 20/@r 20/@r;
  }

  .text_dairy_cell-con {
    cursor: pointer;
    .flexbox();
    position: relative;

    .cell-text {
      .flexbox();
      .flex(1);
      .flexdirection(column);
      overflow: hidden;
      justify-content: space-between;
    }

    .cell-content {
      .font_xl;
      color: #222;
      line-height: 150%;
      margin: 20/@r 0;
      position: relative;
    }

    .cell-doc-info {
      .font_l;
      color: #B7BBBF;
      line-height: 140%;
      display: flex;

      div {
        flex: 1;

        &:nth-of-type(2) {
          text-align: right;
        }
      }

      .info {
        vertical-align: middle;
        overflow: hidden;
        display: flex;
      }

      .text {
        vertical-align: middle;
        max-width: 90%;
        overflow: hidden;
        p:nth-of-type(1) {
          .font_2xl;
          color: #2D2D2D;
          padding-bottom: 5px;
        }
      }
    }

    .cell-img {
      width: 120px;
      height: 90px;
      overflow: hidden;
      margin-left: 38/@r;
      background-color: #f2f2f2;

      img {
        width: 120px;
        height: 90px;
        margin: 0 auto;
        display: block;
        border-radius: 3px;
      }
    }
  }

  .text_dairy_cell-footer {
    .flexbox();
    .font_l;
    color: #828888;
    padding: 20/@r;

    div {
      .flex(1);

      &:nth-of-type(2) {
        text-align: right;
      }
    }
  }

  .unfold{
    .font_xl;
    text-align: right;
    color: #36659E;
    position:absolute;
    right:0;
    bottom:0;
    background-color: rgba(255, 255, 255, .8);
    padding-left: 5px;
  }
</style>
