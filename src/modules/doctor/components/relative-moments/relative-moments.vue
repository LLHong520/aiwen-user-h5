<template>
  <div class="hot-cicles">
    <div v-for="(elem,index) in moments" :key="index" v-if="index<2" class="hot-cicle-item">
      <div class="item-avater">
        <img :src="GET_IMG_URL(elem.circlePhoto,'m')" alt="">
      </div>
      <div class="cicle-info">
        <div class="item-basic">
          <p class="name">{{elem.circleName}}</p>
          <p class="text">{{visNum[index]}} 人来过这里</p>
        </div>
        <div class="item-action">
          <a :href="MOMENT_URL+elem.id">进入圈子</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import {MOMENT_URL,FORUM_URL} from "@/config";
import { commonMixin, toTopMixin} from "@/mixins";
import momentService from "@/services/momentService.js";
export default {
  name: "index",
  mixins:[commonMixin,toTopMixin],
  data(){
    return {
      MOMENT_URL,
      FORUM_URL,
      visNum:[]
    };
  },
  props:{
    moments:{
      type:Array,
      default:()=>{
        return [];
      }
    }
  },
  mounted:async function(){
    if(this.moments.length==0) return;
    for (var i = 0; i < 2; i++) {
      if(this.moments[i]){
        let id=this.moments[i].id;
        let visNumData=await momentService.land_info({id:id});
        this.visNum.push(visNumData.data.count);
      }
    }
  },
  watch:{
    "moments":async function(moments){
      if(moments.length==0) return;
      for (var i = 0; i < 2; i++) {
        if(moments[i]){
          let id=moments[i].id;
          let visNumData=await momentService.land_info({id:id});
          this.visNum.push(visNumData.data.count);
        }
      }
    }
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
//热门圈子
.hot-cicles{
  padding: 0 15px;
  border-top: 1px solid #EFEFEF;
  .hot-cicle-item{
    display: flex;
    padding: 15px 0;
    border-bottom: 1px solid #EFEFEF;
    &:last-child{
      border:0;
    }
  }
  .item-avater{
    margin-right: 24/@r;
    width: 96/@r;
    height: 96/@r;
    img{
      width: 96/@r;
      height: 96/@r;
      border-radius: 50%;
    }
  }

  .cicle-info{
    display: flex;
    align-items: center;
    flex: 1;
    overflow: hidden;

    .item-basic,.item-action{
      flex: 1;
    }

    .item-basic{
      .name{
        padding-top: 3px;
        color: #2d2d2d;
        .font_2xl;
      }
      .text{
        padding-top: 5px;
        color: #999;
        .font_xl;
      }
    }
    .item-action{
      text-align: right;;
      a{
        display:inline-block;
        width: 140/@r;
        line-height: 52/@r;
        background-color: #fff;
        color: #2688FC;
        border:1px solid #2688FC;
        text-align: center;
        border-radius: 36/@r;
        box-sizing: border-box;
        .font_s;
      }
    }
  }
}
//-----
</style>
