<template>
  <router-link :to="{'name':'columnIndex',params:{id:channelId,columnId:column.id}}">
    <div class="column_cell">
      <div class="img">
        <img  v-lazy="GET_IMG_URL(column.columnLogo)" alt="">
      </div>
      <p class="tit">{{column.columnName}}</p>
      <p class="resource" v-if="!IS_IWEN_COMTY(column.communityId)&&column.communityName&&showComty">来自 {{column.communityName}}</p>
      <p class="resource" v-if="column.endorsementTeam&&!showComty">由 {{column.endorsementTeam}}与新浪健康联合举办</p>
    </div>
  </router-link>
</template>

<script >
import { commonMixin, toTopMixin} from "@/mixins";
export default {
  name: "columnCell",
  mixins:[commonMixin,toTopMixin],
  data(){
    return {
      channelId:""
    };
  },
  props:{
    column:{
      type:Object,
      default:()=>{
        return {};
      }
    },
    cName:{
      type:String,
      default:""
    },
    showComty:{
      type:Boolean,
      default:true
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
.column_cell {
  padding: 30/@r 0;
  a{
    display: block;
  }
  .tit{
    font-size: 32/@r;
    color: #282828;
    font-weight: bold;
    line-height: 44/@r;
    margin-top: 20/@r;
    .show_n_lines(1);
  }
  .resource{
    margin-top: 10/@r;
    line-height: 36/@r;
    color: #999;
    font-size: 24/@r;
  }
  .img{
    width: 690/@r;
    height: 270/@r;
    border-radius: 8/@r;
    img{
      display: block;
      width: 690/@r;
      height: 270/@r;
      border-radius: 8/@r;
      object-fit: cover;
      border: 1px solid #f3f3f3;
      box-sizing: border-box;
    }
  }
}
</style>
