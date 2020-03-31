<template>
  <div class="operationTopic-image" :style="{padding: padding}" @click="$emit('onClick')">
    <a :iw="`{desc:'运营专题-广告图组件',id:'operation_topic_img',ext:{subjectId:'${subjectId}',url:'${dataSource.url}'}}`"  :href="dataSource.url">
      <img class="pic" :src="dataSource.bannerImage || dataSource.advertiseImage" alt="image" />
    </a>
  </div>
</template>

<script>
export default {
  name: "topicImage",
  props: {
    dataSource: {
      type: Object,
      default: () => ({
        bannerImage: "",
        url: "",
        advertiseImage: "",
      })
    },
    subjectId: {
      type: String,
      default: ""
    }
  },
  computed: {
    imageUrl() {
      return this.dataSource.bannerImage || this.dataSource.advertiseImage;
    },
    padding() {
      if(this.dataSource.advertiseImage) {
        return "0 15px";
      }
      return 0;
    }
  }
};
</script>

<style lang="less" scoped>
  .operationTopic-image{
    width: 100%;
    box-sizing: border-box;
    padding: 0 15px 8px;
    background-size: 100%;
    a{
      display: block;
    }
    .pic{
      display:block;
      font-size: 0;
      width: 100%;
      margin: 0;
      padding: 0;
    }
  }
</style>
