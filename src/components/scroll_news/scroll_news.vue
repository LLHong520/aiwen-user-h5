<template>
  <div class="scroll-wrap">
    <ul class="scroll-content" :style="{ top }">
      <li v-for="(item,index) in news" :key="index" class="ellipsis" v-if="item.status==1">
        <a :href="item.linkURL">
          <i class="icon icon-prop"></i>{{item.content}}
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {
      news:{
        type: Array,
        default:[]
      }
    },
    data() {
      return {
        activeIndex: 0,
      };
    },
    computed: {
      top() {
        return - this.activeIndex * 40 + "px";
      }
    },
    mounted() {
      setInterval(_ => {
        if(this.activeIndex < this.news.length-1) {
          this.activeIndex += 1;
        }else{
          this.activeIndex = 0;
        }
      }, 3000);
    },
    methods: {
    }
  };
</script>
/**
  說明：消息滚动组件
  @使用 <scroll-news :news="info"></scroll-news>
 **/
<style scoped lang="less" rel="stylesheet/less">
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
.scroll-wrap{
  padding:0 10px;
  height: 40px;
  overflow: hidden;
  .font_xl;
  color: #222;
  border-bottom: 10px solid @bor_c;
}

.scroll-content{
  position: relative;
  transition: top 0.5s;
  li{
    line-height: 40px;
    height:40px;
  }
  .icon{
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
  }
  .icon-prop{
    width: 44/@r;
    height: 28/@r;
    background: url('~@/assets/images/icons/icon-propel@3x.png') no-repeat center;
    background-size: contain;
  }
}

</style>
