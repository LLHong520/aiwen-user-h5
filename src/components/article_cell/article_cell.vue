<template>
<div class="kepu-cell">
  <div class="kepu-cell-con">
    <div class="cell-text">
      <p class="cell-title">{{article.title}}</p>
      <div class="cell-doc-info">
        <div class="info">
          <span class="avater">
            <img :src="GET_IMG_URL(article.doctorPhoto,'u')" alt="用户头像" />
          </span>
          <span class="text">{{article.realName|limit(6)}}&nbsp;&nbsp;{{article.deptName}}&nbsp;<span v-if="article.drTitle">|</span>&nbsp;{{article.drTitle}}</span>
        </div>
      </div>
    </div>
    <div class="cell-img">
      <img class="adapter" v-lazy="GET_IMG_URL(article.picName)" alt="">
    </div>
  </div>
</div>
</template>

<script >
import { commonMixin, toTopMixin} from "@/mixins";
export default {
  name: "relative-subjects",
  mixins:[commonMixin,toTopMixin],
  data(){
    return {};
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
  /* background: url('./images/icon-propel@3x.png') no-repeat center; */
  background-size: contain;
}
.icon-user{
  position: relative;
  top: -2px;
  width: 28/@r;
  height: 32/@r;
  /* background: url('./images/icon-user@3x.png') no-repeat center; */
  background-size: contain;
}
.icon-doc-p{
  position: relative;
  top: -2px;
  width: 28/@r;
  height: 32/@r;
  /* background: url('./images/icon-doc@3x.png') no-repeat center; */
  background-size: contain;
}
.icon-see{
  position: relative;
  top: -2px;
  width: 28/@r;
  height: 32/@r;
  /* background: url('./images/icon-see@3x.png') no-repeat center; */
  background-size: contain;
}

.avater{
  display: inline-block;
  width:40/@r;
  height:40/@r;
  margin-right: 2px;
  img{
    width:100%;
    height:100%;
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
      .font_xl;
      color: #222;
      line-height: 150%;
      .show_n_lines(2);
    }
    .cell-doc-info{
      .font_l;
      color:#B7BBBF;
      // line-height: 140%;
      display:flex;
      div{
        flex:1;
        overflow: hidden;
        &:nth-of-type(2){
          text-align: right;
        }
      }
      .info{
        height:40/@r;
        line-height:40/@r;
        // vertical-align:middle;
        overflow: hidden;
      }
      .text{
        vertical-align:top;
        line-height: 40/@r;
        max-width:90%;
        overflow: hidden;
      }
    }
    .cell-img{
      width:120px;
      height:90px;
      overflow: hidden;
      margin-left: 38/@r;
      background-color: #f2f2f2;
      img{
        width:120px;
        height:90px;
        margin: 0 auto;
        display: block;
        border-radius:3px;
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
