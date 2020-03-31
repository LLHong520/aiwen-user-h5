<template>
  <ul class="hot-subjects" :class="{'two':subjects.length==2}">
    <li v-for="(elem,index) in subjects" :key="index" class="online-course-item">
      <!-- <router-link :to="{ name: 'departInfo', params: { dId: elem.id}}"> -->
      <!-- </router-link> -->
      <a :href="subjectUrl+elem.id">
        <div class="item-avater">
          <img v-lazy="GET_IMG_URL(elem.image,'b')" alt="">
        </div>
        <div class="course-name">{{elem.title}}</div>
      </a>
    </li>
  </ul>
</template>

<script >
import { commonMixin, toTopMixin} from "@/mixins";
export default {
  name: "relative-subjects",
  mixins:[commonMixin,toTopMixin],
  data(){
    return {
      subjectUrl:"https://health.sina.cn/popSubject/detail/",
    };
  },
  props:{
    subjects:{
      type:Array,
      default:()=>{
        return [1,2,3,4];
      }
    }
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
//====
//热门专题
.hot-subjects{
  width: 100%;
  overflow-x:scroll;
  white-space: nowrap;
  border-bottom: 10px solid @bor_c;
  margin-top: 10px;
  padding-bottom: 10px;
  display: flex;
  li{
    display: inline-block;
    position: relative;
    margin-left: 10px;
    padding: 0;
    box-shadow: 0 2px 8px rgba(0,0,0,.1);
    width: 328/@r;
    white-space: normal;
    .item-avater{
      width: 328/@r;
      height: 184/@r;
      overflow:hidden;
      background-color: @bor_c;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .course-type{
      .font_m;
      display: inline-block;
      background-color: rgba(66, 157, 242, 0.7);
      padding:0 5px;
      position: absolute;
      top: 0;
      right: 0;
      color: #fff;
    }
    .course-name{
      color: #222;
      padding: 0 5px;
      line-height: 150%;
      .show_n_lines(2);
      margin: 10px 0;
      .font_xl;
    }
  }
}
  .hot-subjects.two{
    display: flex;
    justify-content: space-between;
    li{
      flex: 1;
      margin:0 10px 0 10px;
    }
    li:nth-of-type(2){
      margin-left: 5px;
    }
  }

</style>
