const shareMixin = {
  beforeRouteEnter(to, from, next) {
    // XXX: 修复iOS版微信HTML5 History兼容性问题
    if (platformInfo.isiOS&&platformInfo.isWx && "/zt"+to.path !== location.pathname) {
      // 此处不可使用location.replace
      location.assign("/zt"+to.fullPath);
      next();
    } else {
      next();
    }
  }
};

export default shareMixin;
