<template>
  <div>
    <ul class="plate-list clearfix">
        <li class="plate-item" v-for="(column,index) in allColumnInfoList" :key="index">
          <router-link :to="{ name: cloumnRouterName, params: { id: column.columnId }}">
            <div class="icon-wrapper">
              <img :src="GET_IMG_URL(column.columnPic ,'b')"/>
            </div>
            <p class="title">{{column.columnName}}</p>
          </router-link>
        </li>
        <li class="plate-item">
          <router-link :to="{ name: moreCloumnRouterName }">
            <div class="icon-wrapper">
              <img :src="columnPicEight" alt=""/>
            </div>
            <p class="title">更多</p>
          </router-link>
        </li>
      </ul>
  </div>
</template>

<script>
import { commonMixin, toTopMixin } from "@/mixins";
import healthService from "@/services/healthService.js";
import columnPicEight from "@/assets/images/specialCloumn/column-08.png";

export default {
  mixins: [commonMixin, toTopMixin],
  props: {
    cloumnRouterName: {
      type: String,
      default: ""
    },
    moreCloumnRouterName: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      allColumnInfoList: [],
      columnPicEight,
    };
  },
  created() {
    this.load_cloumn();
  },
  methods: {
    load_cloumn(){
      let _this=this;
      healthService.cloumnInfoList({})
      .then((res) => {
        if(res.code == 0 && res.data){
          for(let i = 0 ; i < res.data.length ; i ++){
            if(res.data[i].columnId != ""){
              _this.allColumnInfoList = res.data.slice(0, 4);
            }
          }
        }
      });
    },
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import "~@/assets/css/fix.less";
.plate-list {
  padding: 20px 0 10px;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  .plate-item {
    margin-bottom: 10px;
    width: 20%;
    a {
      display: block;
    }
    .icon-wrapper {
      width: 46px;
      height: 46px;
      text-align: center;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: #f4f4f4;
      }
    }
    .title {
      text-align: center;
      color: #222222;
      font-size: 14px;
      padding: 5px 0;
    }
  }
}
</style>


