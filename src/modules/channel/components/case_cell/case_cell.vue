<template>
  <div class="case_cell">
    <router-link :to="columnId?{'name':'channelCaseDetail',params:{id:channelId},query:{id:caseItem.id,columnId:columnId}}:{'name':'channelCaseDetail',params:{id:channelId},query:{id:caseItem.id}}">
      <div class="author_info">
        <div class="img"><img v-lazy="GET_IMG_URL(caseItem.headPic,'doc')" alt=""></div>
        <dl>
          <dt>{{caseItem.authorName}}</dt>
          <dd v-if="!IS_IWEN_COMTY(caseItem.firstPublishComtyId)&&caseItem.firstPublishComtyName">来自 {{caseItem.firstPublishComtyName}}</dd>
        </dl>
      </div>
      <div class="case_info">
        <dl>
          <dt v-html="tit"></dt>
          <dd v-if="caseItem.subDiseaseType=='-1'">{{caseItem.gender}} {{caseItem.age}} {{caseItem.answer.qneed|removeHtmlTag}}</dd><!--问诊-->
          <dd v-if="caseItem.subDiseaseType=='1'">{{caseItem.gender}} {{caseItem.age}} {{caseItem.templateData.mainSuit|removeHtmlTag}}</dd><!--口腔模版-->
          <dd v-if="caseItem.subDiseaseType=='0'" v-html="cont"></dd><!--其他-->
        </dl>
      </div>
      <div class="case_img" v-if="((isIndex&&index==0)||!isIndex)&&caseItem.subDiseaseType=='1'&&caseItem.templateData.effectBefore&&caseItem.templateData.effectAfter">
        <div class="img_item"><img v-lazy="GET_IMG_URL(caseItem.templateData.effectBefore)" alt=""><span class="state"><i></i>服务前</span></div>
        <div class="img_item"><img v-lazy="GET_IMG_URL(caseItem.templateData.effectAfter)" alt=""><span class="state"><i></i>服务后</span></div>
      </div>
    </router-link>
  </div>
</template>

<script >
import { commonMixin} from "@/mixins";
export default {
  name: "caseCell",
  mixins:[commonMixin],
  data(){
    return {
      channelId:"",
      cont:"",
      tit:""
    };
  },
  props:{
    caseItem:{
      type:Object,
      default:()=>{
        return {};
      }
    },
    isIndex:{
      type:Boolean,
      default:false,
    },
    index:{
      type:Number,
      default:0
    },
    columnId:{
      type:String,
      default:""
    }
  },
  created() {
    let _this=this;
    this.channelId=this.$route.params.id;
    this.tit=this.$options.filters["removeHtmlTag"](_this.caseItem.title||"");
    if(this.caseItem.subDiseaseType=="0"){
      this.cont=this.$options.filters["removeHtmlTag"](_this.caseItem.caseHistory);
    }
  },
};
</script>
<style scoped lang="less" rel="stylesheet/less">
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
.case_cell {
  padding: 30/@r 0;
  a{
    display: block;
  }
  .author_info{
    display: flex;
    align-items: center;
    .img{
      width: 72/@r;
      height: 72/@r;
      margin-right: 20/@r;
      img{
        display: block;
        width: 72/@r;
        height: 72/@r;
        border-radius: 72/@r;
        box-sizing: border-box;
        border: 1px solid #f3f3f3;
        object-fit: cover;
      }
    }
    dl{
      flex: 1;
      width: 0;
      dt,dd{
        .show_n_lines(1);
        line-height: 34/@r;
        color: #999;
        font-size: 24/@r;
      }
      dt{
        color: #2D2D2D;
        font-weight: bold;
      }
      dd{
        margin-top: 4/@r;
      }
    }
  }
  .case_info{
    margin-top: 20/@r;
    dt{
      font-size: 32/@r;
      color: #282828;
      line-height: 44/@r;
      .show_n_lines(2);
    }
    dd{
      font-size: 28/@r;
      color: #999;
      line-height: 40/@r;
      .show_n_lines(1);
      margin-top: 16/@r;
      word-break: break-all;
    }
  }
  .case_img{
    display: flex;
    margin-top: 30/@r;
    .img_item {
      flex: 1;
      width: 0;
      height: 340/@r;
      position: relative;
      &:first-child{margin-right: 5/@r;}
      &:last-child{margin-left: 5/@r;}
      img{
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 8/@r;
        object-fit: cover;
        border: 1px solid #f3f3f3;
        box-sizing: border-box;
      }
      .state{
        position: absolute;
        right: 20/@r;
        bottom: 20/@r;
        width: 134/@r;
        height: 48/@r;
        line-height: 48/@r;
        font-size: 24/@r;
        color: #fff;
        background: rgba(0,0,0,.4);
        border-radius: 48/@r;
        i{
          display: inline-block;
          vertical-align: middle;
          position: relative;
          width: 24/@r;
          height: 24/@r;
          margin-right: 8/@r;
          margin-left: 14/@r;
          background: url(./images/icon_ago@2x.png) no-repeat;
          background-size: contain;
        }
      }
      &:last-child{
        .state i{
          background-image: url(./images/icon_later@2x.png);
        }
      }
    }
  }
}
</style>
