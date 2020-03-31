<template>
<div class="kepu-cell">
  <div class="kepu-cell-con">
    <div class="cell-text">
      <p class="cell-title"  v-disall="2">{{article.title}}</p>
      <div class="cell-doc-info">
        <div class="info">
          <span v-if="article.drPhoto" class="avater">
            <img :src="GET_IMG_URL(article.drPhoto)" alt="" />
          </span>
          <i v-else class="icon icon-user mr5" :class="{'icon-doc-p':article.contentType==1}"></i>
          <span>{{article.drUserName|limit(6)}}</span>
        </div>
        <div class="view-num"><i class="icon icon-see mr5"></i>{{article.readCount}}</div>
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
//icons
.icon{
  display: inline-block;
  vertical-align: middle;
}
.icon-prop{
  width: 44/@r;
  height: 28/@r;
  background: url('./images/icon-propel@3x.png') no-repeat center;
  background-size: contain;
}
.icon-user{
  position: relative;
  top: -2px;
  width: 28/@r;
  height: 32/@r;
  background: url('./images/icon-user@3x.png') no-repeat center;
  background-size: contain;
}
.icon-doc-p{
  position: relative;
  top: -2px;
  width: 28/@r;
  height: 32/@r;
  background: url('./images/icon-doc@3x.png') no-repeat center;
  background-size: contain;
}
.icon-see{
  position: relative;
  top: -2px;
  width: 28/@r;
  height: 32/@r;
  background: url('./images/icon-see@3x.png') no-repeat center;
  background-size: contain;
}

.avater{
  display: inline-block;
  width: 32/@r;
  height: 32/@r;
  img{
    border-radius: 50%;
  }


}
//健康科普文章列表
  .kepu-cell{
    border-bottom: 1px solid @bor_c;
  }

  .kepu-cell-con{
    padding: 10px 20/@r 20/@r 20/@r;
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
      .font_2xl;
      color: #333;
      line-height: 180%;
      line-height: 125%;
      .show_n_lines(2);
    }
    .cell-doc-info{
      .font_l;
      color: #828888;
      line-height: 140%;
      display:flex;
      div{
        flex:1;
        &:nth-of-type(2){
          text-align: right;
        }
      }
    }
    .cell-img{
      width: 260/@r;
      height: 180/@r;
      overflow: hidden;
      margin-left: 38/@r;
      background-color: #f2f2f2;
      img{
        width: 260/@r;
        height: 180/@r;
        margin: 0 auto;
        display: block;
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
