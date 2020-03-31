<template>
<div class="kepu-cell">
  <div class="kepu-cell-con">
    <div class="cell-text">
      <p class="cell-title" v-disall="2">{{article.title}}</p>
      <div class="cell-doc-info">
        <div class="info">
          <span class="text">{{article.deptName||article.departName}}&nbsp;·&nbsp;{{article.drUserName|limit(6)}}</span>
        </div>
      </div>
    </div>
    <div class="cell-img">
      <img class="adapter" v-lazy="GET_IMG_URL(article.picName,'post')" alt="">
    </div>
  </div>
</div>
</template>

<script >
import {MOMENT_URL,FORUM_URL} from "@/config";
import { commonMixin, toTopMixin} from "@/mixins";
export default {
  name: "relative-subjects",
  mixins:[commonMixin,toTopMixin],
  data(){
    return {
      MOMENT_URL,
      FORUM_URL
    };
  },
  props:{
    article:{
      type:Object,
      default:()=>{
        return {};
      }
    }
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";

//文章列表
  .kepu-cell{
    border-bottom: 1px solid #EFEFEF;
  }
  .kepu-cell-con{
    padding: 30/@r 0;
    cursor: pointer;
    .flexbox();
    .cell-text{
      .flexbox();
      .flex(1);
      .flexdirection(column);
      overflow: hidden;
      justify-content:space-between;
    }
    .cell-title{
      font-size: 32/@r;
      color: #2d2d2d;
      line-height: 44/@r;
      height: 88/@r;
      .show_n_lines(2);
    }
    .cell-doc-info{
      font-size: 24/@r;
      color:#AEB1B6;
      line-height: 140%;
      display:flex;
      div{
        flex:1;
        &:nth-of-type(2){
          text-align: right;
        }
      }
      .info{
        height:40/@r;
        vertical-align:middle;
        overflow: hidden;
      }
      .text{
        vertical-align:middle;
        max-width:90%;
        overflow: hidden;
      }
    }
    .cell-img{
      width:242/@r;
      height:152/@r;
      margin-left: 26/@r;
      overflow: hidden;
      // display: flex;
      // align-items: center;
      // justify-content: center;
      // text-align: center;
      background-color: #E8ECEF;
      border-radius: 4/@r;
      img{
        margin: 0 auto;
        display: block;
        border-radius:3px;
        width:242/@r;
        height:152/@r;
        object-fit: cover;
      }
    }
  }
  .kepu-cell-footer{
    .flexbox();
    .font_l;
    color: #828888;
    padding:20/@r;

    div{
      .flex(1);
      &:nth-of-type(2){
        text-align: right;
      }
    }
  }

</style>
