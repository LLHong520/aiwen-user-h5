<template>
  <div>
    <section v-if="articleList.length>0" class="kepu-list">
    <router-link tag="article" class="kepu-cell"
      v-for="(article,index) in articleList" :key="index"
      :to="{ name: 'Post', params: { id: article.id},query:{source:'jk'}}"
      v-if="index<show_nums"
      >
      <div class="kepu-cell-con">
        <div class="cell-text">
          <p class="cell-title"  v-disall="2">{{article.title}}</p>
          <div class="cell-doc-info">
            <p class="info"><i class="icon icon-user mr5"></i>{{article.userName}}</p>
            <p class="view-num"><i class="icon icon-see mr5"></i>{{article.readingNumber}}</p>
          </div>
        </div>
        <div class="cell-img">
          <img class="adapter" v-lazy="GET_IMG_URL(article.coverPicture,'post')" alt="">
        </div>
      </div>
    </router-link>
  </section>
  <section v-else class="kepu-list">
    <article class="kepu-cell holder"
      v-for="(ele,index) in [1,2,3,4]" :key="index">
      <div class="kepu-cell-con">
        <div class="cell-text">
          <p class="cell-title"><span class="holder">&nbsp;&nbsp;&nbsp;&nbsp;</span></p>
          <div class="cell-doc-info">
            <p class="info"><span class="holder">&nbsp;&nbsp;&nbsp;&nbsp;</span> | <span class="holder">&nbsp;&nbsp;&nbsp;&nbsp;</span></p>
          </div>
        </div>
        <div class="cell-img"></div>
      </div>
      <div class="kepu-cell-footer">
        <div class="time">
          <span class="holder">&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
        <div class="read-num">
          <span class="holder">&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
      </div>
    </article>
  </section>
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
    articleList:{
      type:Array,
      default:()=>{
        return [1,2,3,4];
      }
    },
    show_nums:{
      type:Number,
      default:0
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
.icon-see{
  position: relative;
  top: -2px;
  width: 28/@r;
  height: 32/@r;
  background: url('./images/icon-see@3x.png') no-repeat center;
  background-size: contain;
}
//健康科普文章列表
.kepu-list{
  padding: 20/@r 0;
  background-color: #fff;
  border-bottom: 10px solid @bor_c;
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
      p{
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
        width: 280/@r;
        height: 180/@r;
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
}

</style>
