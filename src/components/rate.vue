<template>
  <div class="d-rate">
    <span class="d-rate-item" v-for="(item, index) in list" :key="index">
      <i class="icon on"></i>
      <i class="icon off" :style="{ width: item.percent }"></i>
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: [Number, String],
        default: 0
      },
      count: {
        type: Number,
        default: 5
      }
    },
    data () {
      return {
        list: []
      };
    },
    watch: {
      value() {
        this.getStarArr();
      }
    },
    created() {
      this.getStarArr();
    },
    methods: {
      getStarArr() {
        let number = Number(this.value);
        this.list = [];

        let int = Math.floor(number);
        let decimals = number.toFixed(2).toString().split(".")[1];

        // 添加小数点
        if (int >= this.count) {
          int = this.count;
        } else {
          this.list.push({
            percent:  decimals + "%"
          });
        }

        // 添加整个活动中star
        for (let i = 0; i < int; i++) {
          this.list.unshift({
            percent: "100%"
          });
        }

        // 添加剩余star
        if (this.list.length < this.count) {
          let diff = this.count - this.list.length;
          for (let i = 0; i < diff; i++) {
            this.list.push({
              percent: "0%"
            });
          }
        }
      }
    }
  };
</script>

<style lang="less" scoped>
.d-rate {
  @rateW: 14px;
  display: flex;
  align-items: center;
  .d-rate-item {
    position: relative;
    width: @rateW;
    height: @rateW;
    & +  .d-rate-item {
      margin-left: 2px;
    }
    .icon {
      display: block;
      width: 100%;
      height: 100%;
      background: url(../assets/images/list_icon_star_off@2x.png) no-repeat left;
      background-size: 100%;
      &.off {
        position: absolute;
        top: 0;
        left: 0;
        background: url(../assets/images/list_icon_star@2x.png) no-repeat left;
        background-size: @rateW;
      }
    }
  }
}
</style>

