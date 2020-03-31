<template>
  <transition enter-active-class='animated fadeIn'  leave-active-class='animated fadeOut' mode='out-in'>
</transition>
</template>
<script>
export default {
  name: "logout",
  components: {
  },
  data() {
    return {};
  },
  created() {
    this.$store.commit("SET_USERINFO", null);
    this.$store.commit("SET_TOKEN",null);
    this.$store.commit("USER_LOGIN",false);
    router.replace({
      path:"/index"
    });
  },
  methods: {}
};
</script>
<style  scoped lang="less" rel="stylesheet/less">
@import './css.less';
</style>
