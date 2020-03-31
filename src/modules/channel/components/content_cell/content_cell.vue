<template>
  <div class="content_cell" :class="{'article_box':isArticle}">
    <div ref="desc" class="cont_wrap" :style="textCollapseStyle">
      <div class="cont"  v-html="content"></div>
      <div class="unfold" @click.stop="showTotalIntro" v-if="showExchangeButton&&isTxtBtn">
        <p>{{exchangeButton ? '展开' : '收起'}}</p>
      </div>
    </div>
    
    <div href="javascript:;" class="spread" :class="{'up':!exchangeButton}" @click="showTotalIntro" v-if="showExchangeButton">{{spreadTxt}}<i></i></div>
  </div>
</template>

<script >
import { commonMixin} from "@/mixins";
export default {
  name: "contentCell",
  mixins:[commonMixin],
  data(){
    return {
      channelId:"",
      // 显示展开还是收起
      showTotal: true,
      exchangeButton: true,
      // 是否显示展开收起按钮
      showExchangeButton: false,
      // lines:4,
      limitHeight:"",
    };
  },
  props:{
    content:{
      type:String,
      default:""
    },
    spreadTxt:{
      type:String,
      default:""
    },
    isArticle:{
      type:Boolean,
      default:false,
    },
    isTxtBtn:{
      type:Boolean,
      default:false,
    },
    lines:{
      type:Number,
      default:4,
    }
  },
  created() {
    this.channelId=this.$route.params.id;
  },
  computed:{
    textCollapseStyle(){
      let collapseStyle = {
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        webkitLineClamp: this.lines,
        webkitBoxOrient: "vertical",
        height:this.isArticle?this.limitHeight:"",
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
      this.limitHeight=limitHeight+"px";
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
  methods:{
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
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
.content_cell{
  padding-bottom: 24/@r;
}
.cont{
  font-size: 26/@r;
  line-height: 44/@r;
  color: #666;
  word-wrap: break-word;
  word-break: break-all;
  a{
    color: #000;
  }
  /deep/img{
    display:block;
  }
  /deep/a{
    color:#286EC2;
  }
}

.cont_wrap{
  position: relative;
}

.unfold{
  .font_xl;
  text-align: right;
  color: #286EC2;
  position:absolute;
  right:0;
  bottom:0;
  background-color: rgba(255, 255, 255, .8);
  padding-left: 5px;
}

.spread{
  display: block;
  height: 40/@r;
  margin-top: 24/@r;
  padding-bottom: 1px;
  text-align: center;
  i{
    display: inline-block;
    width: 40/@r;
    height: 40/@r;
    background: url(./images/btn_down@2x.png) no-repeat;
    background-size: 40/@r 40/@r;
    transition: all .3s;
  }
  &.up i{
    transform: rotate(180deg);
  }
}

.article_box {
  margin-top: 40/@r;
  .cont{
    font-size: 32/@r;
    color: #424242;
    line-height: 54/@r;
  }
  
  img {
    max-width: 100%;
  }
  .spread {
    padding-top: 160/@r;
    height: 40/@r;
    line-height: 40/@r;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 80%);
    font-size: 28/@r;
    color: #999;
    text-align: center;
    position: relative;
    margin-top: -160/@r;

    i {
      width: 40/@r;
      height: 40/@r;
      background: url(./images/btn_down@2x.png) no-repeat;
      background-size: contain;
      position: relative;
      vertical-align: middle;
      display: inline-block;
      top: 0;
      margin-left: 24/@r;
    }
    &.up{
      display: none;
    }
  }
}

  
</style>
