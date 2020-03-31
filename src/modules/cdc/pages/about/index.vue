<template>
  <div class="wrapper">
    <img :src="this[$route.params.name].img" />
  </div>
</template>
<script>
import setTitle from "@/common/setTitle";
export default {
  data(){
    return {
      qyxjkzx:{
        title:"祁阳县疾控中心",
        img:require("./images/qyxjkzx.jpeg")
      },
      sysjkzx:{
        title:"十堰市疾控中心",
        img:require("./images/sysjkzx.jpeg")
      },
      sysdxqjkzx:{
        title:"邵阳市大祥区疾控中心",
        img:require("./images/sysdxqjkzx.jpeg")
      },
    };
  },
  created(){
    if(this[this.$route.params.name] != undefined){
      setTitle(this[this.$route.params.name].title);
    }
  }
};
</script>


<style scoped lang="less"  rel="stylesheet/less">
  @import './css.less';
</style>
