<template>
  <div class="cloumn-tab-container">
    <section class="cloumn-tab">
      <ul>
        <li v-for="(cloumnTab, index) in showCloumnListArr" :key="index"
        :class="{'active' : cloumnId == cloumnTab.columnId}"
        @click="changeCloumn(cloumnTab.columnId)">
          <a><span>{{cloumnTab.columnName}}</span></a>
        </li>
       <li :class="{'active' : isMoreCloumn}" @click="toggleCloumn">
          <a>
            <span :class="[{'icon-menu-heal': !isMoreCloumn},{'icon': !isMoreCloumn}]">{{ moreCloumn }}</span>
          </a>
        </li>
      </ul>
    </section>
    <transition name="fade">
      <div class="cloumn-mask" v-show="cloumnMaskShow" @click="toggleCloumn"></div>
    </transition>
    <transition name="bounce">
      <div class="cloumn-menu" v-show="cloumnMaskShow">
        <ul class="cloumn-menu-list">
          <li>
            <p>请选择栏目</p>
          </li>
          <li v-for="(column,index) in allCloumnListArr" :key="index"
          :class="{'active' : cloumnId == column.columnId}"
          @click="seclect_cloumn">
            <router-link :to="{ name: 'heal.article.cloumn', params: { id: column.columnId }}">
              <p class="title">{{ column.columnName }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    showCloumnListArr: {
      type: Array,
      default: ()=>[]
    },
    allCloumnListArr: {
      type: Array,
      default: ()=>[]
    },
    cloumnId: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      cloumnMaskShow: false,
      myCloumnId: this.cloumnId,
      myNowColumn: "",
      fixedColumnArr: []
    };
  },
  created() {
    this.load_seclect_cloumn();
    this.getFixedCloumnIdArr();
  },
  computed: {
    moreCloumn() {
      let str = "";
      let _this = this;
      let is = _this.fixedColumnArr.some((item) => {
        return item == _this.cloumnId;
      });
      if(!is){
        str = _this.myNowColumn;
      };
      return str;
    },
    isMoreCloumn() {
      let _this = this;
      let is = _this.fixedColumnArr.some((item) => {
        return item == _this.cloumnId;
      });
      return !is;
    }
  },
  methods: {
    changeCloumn(id) {
      this.$emit("changeCloumnFn", id);
    },
    toggleCloumn() {
      this.cloumnMaskShow = !this.cloumnMaskShow;
    },
    seclect_cloumn() {
      this.load_seclect_cloumn();
      this.toggleCloumn();
    },
    load_seclect_cloumn() {
      this.myCloumnId = this.$route.params.id;
      this.allCloumnListArr.forEach((item, index) => {
        if(this.myCloumnId == item.columnId){
          this.myNowColumn = item.columnName;
        }
      });
    },
    getFixedCloumnIdArr() {
      let _this = this;
      for(let i = 0 ; i < _this.showCloumnListArr.length ; i++) {
        _this.fixedColumnArr.push(_this.showCloumnListArr[i].columnId);
      }
    },
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import "~@/assets/css/fix.less";
.cloumn-tab-container {
  height: 40px;
  .cloumn-tab {
    width: 100%;
    background-color: #F4F8FA;
    line-height: 40px;
    position: fixed;
    ul {
      display: flex;
      justify-content: space-around;
      li {
        color: #ACACAC;
        display: block;
        height: 80/@r;
        text-align: center;
        position: relative;
        a {
          font-size: 30/@r;
        }
      }
      .active {
        a {
          color: @main_c;
        }
      }
      .active:after {
        content: "";
        position: absolute;
        bottom: -1px;
        left: 50%;
        margin-left: -16px;
        width: 32px;
        background-color: @main_c;
        height: 4px;
        border-radius: 4px;
      }
    }
  }
  .cloumn-article {
    padding-top: 40px;
  }
  .cloumn-mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #000;
    opacity: 0.5;
  }
  .cloumn-menu {
    position:fixed;
    top: 0;
    right: 0;
    width: 100px;
    height: 100%;
    background-color: #5E5E5E;
    z-index: 1111;
    overflow-y: scroll;
    .cloumn-menu-list {
      li {
        text-align: center;
        p {
          color: #ffffff;
          font-size: 15px;
          line-height: 40px;
        }
      }
      li:first-child {
        p {
          color: #a8a8a8;
          margin: 10px 0 0;
        }
      }
      .active {
        p {
          color: #7FFFED;
        }
      }
    }
  }
  //动画效果
  .bounce-enter-active {
    animation: bounce-in 0.5s;
  }

  .bounce-leave-active {
    animation: bounce-out 0.5s;
  }

  @keyframes bounce-in {
    0% {
      transform: translateX(100px);
    }

    100% {
      transform: translateX(0px);
    }
  }

  @keyframes bounce-out {
    0% {
      transform: translateX(0px);
    }

    100% {
      transform: translateX(100px);
    }
  }

  .fade-enter-active {
    animation: fade-in 0.5s;
  }

  .fade-leave-active {
    animation: fade-out 0.5s;
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 0.5;
    }
  }

  @keyframes fade-out {
    0% {
      opacity: 0.5;
    }

    100% {
      opacity: 0;
    }
  }

  /* 设置滚动条的样式 */

  ::-webkit-scrollbar {
    width: 0;
  }
}
</style>
