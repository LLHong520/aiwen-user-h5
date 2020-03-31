<template>
  <div class="wrapper">
    <div class="version_box">
      <div class="logo"><img src="./images/icon_applogo@2x.png" width="164" alt=""></div>
      <p>V1.0.0</p>
    </div>
    <div class="contact_items">
      <div class="contact_item">
        <a href="https://weibo.com/u/5076516542"><img src="./images/icon_weibo_s@2x.png"><span>微博：新浪爱问医生</span></a>
      </div>
      <div class="contact_item">
        <a href="javascript:;"><img src="./images/icon_gzh_s@2x.png"><span>公众号：新浪健康</span></a>
      </div>
    </div>
    <div class="link_rules"><router-link :to="{ name: 'rules'}">《软件服务及协议》</router-link></div>
  </div>
</template>
<script>
export default {
  
};
</script>


<style scoped lang="less"  rel="stylesheet/less">
  @import './css.less';
</style>
