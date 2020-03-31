<template>
<div class="loading-holder">
   <transition name="move_top"  mode="out-in">
    <loading v-show='loading'></loading>
   </transition>
   <transition name="move_top"  mode="out-in">
    <slot  v-show='!loading'></slot>
   </transition>
</div>
</template>
<script>
import loading from "@/iwen/loading/loading";
export default {
  props: ["loading"],
  components: {
    loading
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
.move_top-enter-active,.move_top-leave-active{
  transition:all .3s ease-in-out;
}
.move_top-enter{
  opacity:0;
}
.move_top-leave-to{
  opacity:0;
}

.loading-holder{
  position:relative;
  min-height:100px;
}
.loading-holder /deep/ .loading{
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
}
</style>
