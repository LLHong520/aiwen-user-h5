<template>
  <div class="d-dialog">
    <transition name="bg">
      <div v-show="isShow" class="d-dialog-bg" @click="close"></div>
    </transition>

    <transition name="bounce">
      <div class="d-dialog-container" v-show="isShow" @click="close">
        <div class="container" @click.stop>
          <div class="top top-btn">
            <span class="cancel" @click="close">取消</span>
            <span class="title">选择地址</span>
            <span class="confirm-text" @click="confirm">确定</span>
          </div>

          <div class="content d-dialog-filter-area">
            <!--<div class="d-filter">
              <div class="area">
                <label>地区：</label>
                <span>{{ areaInfo.name }}</span>
                <i class="icon" :class="{ up: isFilter }"></i>
              </div>
              <form  action="javascript:void(0)" @submit="reGetData" class="search">
                <input v-model="params.name" type="search" name="search" placeholder="请输入关键字" @keyup.13="reGetData">
              </form>
            </div>-->

            <iwen-area
              ref="iwenArea"
              v-model="isFilter"
              :autoClose="false"
              :feedback="true"
              :isCity="true"
              @feedback="onFeedback"
              @callback="onArea"
            ></iwen-area>
          </div>

        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import iwenArea from "@/iwen/area.vue";

  export default {
    components: {
      iwenArea
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      options: {
        type: Object,
      }
    },
    data() {
      return {
        isFirst: true,
        isShow: false,
        isFilter: false,
        areaInfo: {
          name: "全国"
        },
      };
    },
    watch: {
      value() {
        this.isShow = this.value;
      },
      isShow(val) {
        val ? this.open() : this.close();
      }
    },
    created() {
      this.isShow = this.value;
    },
    methods: {
      reGetData() {

      },
      onArea(location) {
        console.log(location);
        this.areaInfo = location;
        if (this.isFirst) {
          this.confirm();
        }
      },
      onFeedback(location) {
        this.areaInfo = location;
      },
      refresh() {
        this.isFirst = true;
      },
      open() {
        /*document.body.addEventListener("touchmove", function (e) {
          let className = e.target.className;
          let pareant = e.target.parentElement;
          let pareantClassaNme = pareant.className;
          let oHeight = pareant.offsetHeight;
          let sHeight = pareant.scrollHeight;

          if (className.indexOf("ios-touchmove") > -1 || pareantClassaNme.indexOf("city") > -1) {
            if (sHeight > oHeight) {
              pareant.classList.add("touchmove-scroll");
              pareant.classList.remove("touchmove-auto");
            } else {
              e.preventDefault();
              pareant.classList.add("touchmove-auto");
              pareant.classList.remove("touchmove-scroll");
            }

            // e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
          }
        }, {passive: false});*/

        this.isFilter = true;
        this.$emit("open");
      },
      close() {
        this.$emit("input", false);
        this.$emit("close");
        // Object.assign(this.$data, this.$options.data());// 重置数据
      },
      confirm() {
        this.isFirst = false;
        console.log(this.areaInfo);
        if(this.areaInfo.city||this.areaInfo.province=="全国"){
          this.$emit("confirm", this.areaInfo);
          this.close();
        }else{
          this.$toast.tip("请选择城市");
        }
      },
      cancel() {
        this.$emit("cancel");
        this.close();
      }
    }
  };

</script>

<style lang="less" scoped>
  // @import "../css/style.less";
  @m: 15px;
  @p: 15px;
  @br: 4px;
  @color: #2d2d2d;
  @borderColor: #efefef;
  @filterH: 40px;
  @activeC: #2688FC;
  @color9: #999;

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .d-dialog-filter-area {
  padding: 0!important;
  font-weight: normal!important;
  .d-filter, .d-select-area {
    position: relative;
    top: unset;
  }
  .d-select-area {
    // max-height: 450px;
    // min-height: 300px;
    height:75vh;
    overflow: hidden;
    /deep/ .min-height {
      display: flex;
      flex-direction: column;
      height: 75vh;
      overflow: hidden;
    }
  }
}

  .d-filter {
    // .flex-center;
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    z-index: 995;
    margin: 0 auto;
    max-width: 760px;
    height: @filterH;
    line-height: @filterH;
    background: #fff;
    border-bottom: 1px solid @borderColor;
    box-sizing: border-box;
    .area {
      // .flex-center;
      justify-content: normal;
      padding: 0 @p;
      width: 50%;
      color: #999;
      label {
        word-break: keep-all;
      }
      span {
        // .text-overFlow(1);
        max-width: 90%;
        color: @color;
        line-height: normal;
      }
      i {
        flex: none;
        margin-left: @m/2;
        width: 10px;
        height: 10px;
        // background: url(~assets/images/btn_down@2x.png) no-repeat center;
        background-size: 100%;
        transition: all .3s;
        &.up {
          transform: rotate(180deg);
        }
      }
    }
    .search {
      // .flex-center;
      margin: 0 @p;
      padding: 0 @p/2 0 30px;
      flex: 1;
      border-radius: 25px;
      border: 1px solid #EFF2F7;
      // background: url(~assets/images/icon_search@2x.png) no-repeat left #F6F8FB;
      background-size: 15px;
      background-position: 8px;
      overflow: hidden;
      input {
        flex: 1;
        height: 26px;
        line-height: 26px;
        background: transparent;
        font-size: 12px;
        &::-webkit-input-placeholder {
          color: #999;
        }
      }
      input[type="search"]::-webkit-search-cancel-button {
        display: none;
      }
    }
  }

  .d-dialog-bg, .d-dialog-container{
    margin: 0 auto;
    max-width: 760px;
  }

  .d-dialog-bg {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 998;
    background: rgba(0, 0, 0, .4);
  }

  .d-dialog-container {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    /*display: flex;
    justify-content: center;
    align-items: center;*/
    z-index: 999;
    overflow: hidden;
    .container {
      /*position: absolute;
      left: 0;
      right: 0;
      bottom: 0;*/
      background: #fff;
      border-radius: 6px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      overflow: hidden;
      font-size: 15px;
      text-align: center;
      .top {
        .flex-center;
        padding: 15px 10px 20px;
        color: #282828;
        font-size: 16px;
        &.top-btn {
          padding: 0 15px;
          height: 45px;
          line-height: 45px;
          font-size: 14px;
          background: #fff;
        }
        &.top-time {
          padding-top: 10px;
          padding-bottom: 0;
          position: relative;
          .title {
            height: 30px;
            line-height: 30px;
            max-width: 200px;
          }
          .icon {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            justify-content: space-between;
            width: 250px;
            i {
              width: 30px;
              height: 30px;
            }
            & i:first-child {
              background: url("../../../assets/images/btn_enter@2x.png") no-repeat center;
              background-size: 20px;
              transform: rotate(-180deg);
            }
            & i:last-child {
              background: url("../../../assets/images/btn_enter@2x.png") no-repeat center;
              background-size: 20px;
            }
          }
        }
        span {
          flex: none;
          text-align: center;
          min-width: 50px;
        }
        .cancel {
          text-align: left;
        }
        .confirm-text {
          text-align: right;
        }
        .title {
          flex: 1;
          font-weight: bold;
        }
        .confirm {
          padding: 0 @p;
          height: 27px;
          line-height: 27px;
          color: #fff;
          background: @activeC;
          border-radius: 25px;
          &.disabled {
            opacity: .3;
          }
        }
      }
      .content {
        padding: 0 15px;
        font-weight: bold;
        text-align: left;
        color: #2D2D2D;
        h3 {
          font-size: 17px;
          font-weight: bold;
        }
        p {
          color: #999;
          font-size: 12px;
          font-weight: normal;
          /deep/b {
            color: @activeC;
            font-weight: normal;
          }
        }
        .input {
          display: flex;
          align-items: center;
          margin-top: 20px;
          padding: 0 5px 0 15px;
          height: 45px;
          width: 100%;
          font-size: 14px;
          background: rgba(243,244,245,1);
          border-radius: 25px;
          overflow: hidden;
          &:last-child {
            margin-bottom: 40px;
          }
          input {
            flex: 1;
            height: 100%;
            background: inherit;
            &::-webkit-input-placeholder {
              color: @color9;
            }
          }
          .yzm {
            flex: none;
            padding: 5px 15px;
            font-size: 14px;
            font-weight: normal;
            background: #fff;
            border: 1px solid #EFF2F7;
            border-radius: 25px;
            line-height: normal;
            &.disabled {
              color: @color9;
            }
          }
        }
      }
      .bottom {
        display: flex;
        font-size: 15px;
        .button {
          display: block;
          padding: 12px;
          width: 100%;
          color: #fff;
          background: @activeC;
          border: none;
          border-top-left-radius: 2px;
          border-top-right-radius: 2px;
          text-align: center;
          &.disabled {
            opacity: .5;
          }
        }

        span {
          flex: 1;
          padding: 13px;
          + span {
            border-left: 1px solid #E7E7E7;
          }
          &.primary {
            color: #007AFF;
            &.disabled {
              color:rgba(0, 122, 255, .5)
            }
          }
        }
      }
    }
  }
</style>

