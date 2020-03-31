<template>
  <div class="hot-cicles">
    <div v-for="(elem,index) in moments" :key="index" v-if="index<2" class="hot-cicle-item">
      <div class="item-avater">
        <img :src="GET_IMG_URL(elem.circlePhoto,'m')" alt="">
      </div>
      <div class="cicle-info">
        <div class="item-basic">
          <p class="name">{{elem.circleName}}</p>
          <p class="text">{{elem.count}} 人来过这里</p>
        </div>
        <div class="item-action">
          <a :href="MOMENT_URL+elem.id">进入圈子</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import {MOMENT_URL} from "@/config";
import { commonMixin, toTopMixin} from "@/mixins";
// import momentService from "@/services/momentService.js";
export default {
  name: "index",
  mixins:[commonMixin,toTopMixin],
  data(){
    return {
      MOMENT_URL,
      // FORUM_URL,
      // visNum:[]
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
    // if(this.moments.length==0) return;
    // for (var i = 0; i < 2; i++) {
    //   if(this.moments[i]){
    //     let id=this.moments[i].id;
    //     let visNumData=await momentService.land_info({id:id});
    //     this.visNum.push(visNumData.data.count);
    //   }
    // }
  },
  watch:{
    // "moments":async function(moments){
    //   if(moments.length==0) return;
    //   for (var i = 0; i < 2; i++) {
    //     if(moments[i]){
    //       let id=moments[i].id;
    //       let visNumData=await momentService.land_info({id:id});
    //       this.visNum.push(visNumData.data.count);
    //     }
    //   }
    // }
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
//热门圈子
.hot-cicles{
  border-bottom: 10px solid @bor_c;
  .hot-cicle-item{
    display: flex;
    padding: 10px;
  }
  .item-avater{
    margin-right: 40/@r;
    width: 88/@r;
    height: 88/@r;
    img{
      width: 88/@r;
      height: 88/@r;
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
        color: #666;
        .font_2xl;
      }
      .text{
        padding-top: 5px;
        color: #A9A9A9;
        .font_xl;
      }
    }
    .item-action{
      text-align: right;;
      a{
        display:inline-block;
        width: 132/@r;
        line-height: 40/@r;
        background-color: @main_c;
        color: #fff;
        text-align: center;
        border-radius: 36/@r;
        .font_s;
      }
    }
  }
}
//-----
</style>
