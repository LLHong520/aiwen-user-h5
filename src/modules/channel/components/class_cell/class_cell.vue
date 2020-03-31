<template>
  <router-link :to="{name:'channelClassDetail',params:{id:channelId},query:{id:classItem[attr.id]}}">
    <div class="class_cell">
      <div class="img"><img  v-lazy="GET_IMG_URL(classItem[attr.videoCover])" alt=""></div>
      <div class="class_info">
        <div class="inner">
          <p class="title">{{classItem[attr.title]}}</p>
          <p class="author">主讲人：{{classItem[attr.publisher]}}</p>
          <p class="resource" v-if="!IS_IWEN_COMTY(classItem[attr.comtyId])&&classItem[attr.comtyName]">来自 {{classItem[attr.comtyName]}}</p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script >
import { commonMixin} from "@/mixins";
export default {
  name: "classCell",
  mixins:[commonMixin],
  data(){
    return {
      channelId:"",
    };
  },
  props:{
    classItem:{
      type:Object,
      default:()=>{
        return {};
      }
    },
    attr:{
      type:Object,
      default:()=>{
        return {
          id:"id",
          videoCover:"videoCover",
          title:"title",
          publisher:"publisher",
          comtyId:"comtyId",
          comtyName:"comtyName",
        };
      }
    },
  },
  created() {
    this.channelId=this.$route.params.id;
  },
};
</script>
<style scoped lang="less" rel="stylesheet/less">
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
a{
  display: block;
}
.class_cell{
  padding: 30/@r 0;
  display: flex;
  .img{
    width: 322/@r;
    height: 182/@r;
    overflow: hidden;
    border-radius: 8/@r;
    margin-right: 24/@r;
    img{
      width: 322/@r;
      height: 182/@r;
      object-fit: cover;
      border-radius: 8/@r;
      border: 1px solid #f3f3f3;
      box-sizing: border-box;
    }
  }
  .class_info{
    font-size: 24/@r;
    line-height: 34/@r;
    color: #999;
    display: flex;
    align-items:center;
    flex: 1;
    overflow: hidden;
    p{
      .show_n_lines(1);
      margin-top: 16/@r;
      &.title{
        .show_n_lines(2);
        margin-top: 0;
      }
    }
    .title{
      font-size: 28/@r;
      color: #282828;
      font-weight: bold;
      font-size: 28/@r;
      line-height: 40/@r;
    }
    .author{
      color: #666;
    }
  }
}
</style>
