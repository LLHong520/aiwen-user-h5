<template>
  <user-info :u_id="u_id"></user-info>
</template>
<script>
  import UserInfo from "./user_info";
  export default {
    name:"user_center",
    data(){
      return {
        u_id:0
      };
    },
    created(){
      this.u_id= this.$route.params.id;
    },
    methods:{},
    components:{
      UserInfo: UserInfo,
    },
    watch:{
      "$route":function(newVal){
        if(newVal.params.id!= this.u_id){
          this.u_id = newVal.params.id;
        }
      }
    },
    beforeRouteUpdate(to, from, next) {
      next();
    }
};
</script>
<style  scoped lang="less" rel="stylesheet/less">
</style>
