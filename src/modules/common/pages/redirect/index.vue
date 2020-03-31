<template>
  <transition enter-active-class='animated fadeIn'  leave-active-class='animated fadeOut' mode='out-in'>
</transition>
</template>
<script>
const REDIRECT_LINKS = [
  "https://verified.biz.weibo.com/bluev/verify/showinfo?vtype=enterprise",
  "http://t.cn/EAhvYdQ",
  "http://e.cn.miaozhen.com/r/k=2127821&p=7PyCn&dx=__IPDX__&rt=2&ns=__IP__&ni=__IESID__&v=__LOC__&xa=__ADPLATFORM__&tr=__REQUESTID__&mo=__OS__&m0=__OPENUDID__&m0a=__DUID__&m1=__ANDROIDID1__&m1a=__ANDROIDID__&m2=__IMEI__&m4=__AAID__&m5=__IDFA__&m6=__MAC1__&m6a=__MAC__&na=__SUID__&o=https://m.tb.cn/h.e59P7Vl?sm=38549f",
  "https://e.dxy.cn/broadcast/live/id/11159",
  "https://e.dxy.cn/broadcast/live/id/11065",
  "https://vzan.com/live/tvchat-377575250?shareuid=45523660",
];
export default {
  name: "redirect",
  components: {
  },
  data() {
    return {
      redirectUri:"",
      index:-1,
    };
  },
  created() {
    let index = this.$route.params.index;
    if(index<=0 || index>REDIRECT_LINKS.length){
      this.$router.replace({
        name:"Index"
      });
    }else{
      let redirectUri = REDIRECT_LINKS[index-1];
      window.location.href = redirectUri;
    }
  },
  methods: {}
};
</script>
<style  scoped lang="less" rel="stylesheet/less">
@import './css.less';
</style>
