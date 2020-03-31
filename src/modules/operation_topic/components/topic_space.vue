<template>
  <div class="operationTopic-" :style="{height: !isNaN(dataSource.height) ? `${dataSource.height}px` : dataSource.height}"></div>
</template>

<script>
export default {
  name: "topicSpace",
  props: {
    dataSource: {
      type: Object,
      default: () => ({
        height: 32
      })
    }
  }
};
</script>

<style lang="less" scoped>
  .operationTopic-space{
    width: 100%;
  }
</style>