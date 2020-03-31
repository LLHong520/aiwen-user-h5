<template>
  <user-info :u_id="u_id"></user-info>
</template>
<script>
  import { toTopMixin , commonMixin} from "@/mixins";
  import UserInfo from "./user_info";
  export default {
    name:"user_center",
    mixins: [toTopMixin, commonMixin],
    data(){
      return {
        u_id:0
      };
    },
    created(){
      this.u_id= this.VX_userInfo.id;
    },
    methods:{},
    components:{
      UserInfo: UserInfo,
    },
    beforeRouteUpdate(to, from, next) {
      next();
    }
};
</script>
<style  scoped lang="less" rel="stylesheet/less">
</style>
