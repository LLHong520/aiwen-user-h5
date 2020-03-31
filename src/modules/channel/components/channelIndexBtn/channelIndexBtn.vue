<template>
  <router-link :to="{name:'channelIndex',params:{id:channelId}}">
    频道<br/>首页
  </router-link>
</template>

<script >
import { commonMixin} from "@/mixins";
export default {
  name: "channneIndexBtn",
  mixins:[commonMixin],
  data(){
    return {
      channelId:"",
    };
  },
  props:{},
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
  position: fixed;
  right: 30/@r;
  bottom: 100/@r;
  display: block;
  width:100/@r;
  height:100/@r;
  border-radius: 100/@r;
  font-weight: bold;
  font-size: 24/@r;
  color: #282828;
  line-height: 34/@r;
  text-align: center;
  box-sizing: border-box;
  padding-top: 18/@r;
  background:linear-gradient(270deg,rgba(255,255,255,1) 0%,rgba(238,243,249,1) 100%);
  box-shadow:0px 8/@r 20/@r 4/@r rgba(0,0,0,0.15);
  border:1px solid rgba(239,239,239,1);
  z-index: 99;
}
</style>
