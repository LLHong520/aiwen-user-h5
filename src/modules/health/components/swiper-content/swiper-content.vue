<template>
  <m-swiper :autoPlay="false" :showIndicator="true" interval="2000" duration="500" v-if="specialInfo.length>0" class="swiper-wrapper">
    <m-slide v-for="(specialItem,index) in specialInfo" :key="index">
      <ul class="hot-subjects" :class="{'two':subjects.specialInfo==2}">
        <li v-for="(elem,index) in specialItem" :key="index" class="online-course-item">
          <a :href="GET_SPECIAL_URL(elem.id)">
            <div class="item-avater">
              <img v-lazy="GET_IMG_URL(elem.userCoverPicture,'b')" alt="">
            </div>
            <div class="course-name">{{elem.title}}</div>
          </a>
        </li>
      </ul>
    </m-slide>
  </m-swiper>
</template>
<script >
import { commonMixin, toTopMixin} from "@/mixins";
import { mSwiper, mSlide } from "@/iwen/swiper";
import "@/common/common.js";
export default {
  name: "swiperContent",
  mixins:[commonMixin,toTopMixin],
  data(){
    return {
      subjectUrl:"https://www.991kang.com/popSubject/detail/",
    };
  },
  props:{
    subjects:{
      type:Array,
      default:()=>{
        return [];
      }
    }
  },
  components:{
    mSwiper,
    mSlide
  },
  created(){
  },
  computed:{
    specialInfo(){
      return window.sliceArray(this.subjects,2);
    }
  },
  methods:{}
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
  margin-top: 10px;
  display: flex;
  padding: 0 28/@r 30px;
  box-sizing: border-box;
  li{
    display: inline-block;
    position: relative;
    // margin-left: 8px;
    margin-right: 20/@r;
    padding: 0;
    box-shadow: 0 2px 8px rgba(0,0,0,.1);
    // width: 352/@r;
    flex: 1;
    overflow: hidden;
    white-space: normal;
    &:last-child{margin-right: 0;}
    .item-avater{
      // width: 352/@r;
      height: 198/@r;
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

.swiper-wrapper /deep/ .wh_indicator{
  bottom:2%!important;
}

.swiper-wrapper /deep/ .wh_indicator_item{
  background-color: #D1DEE5;
  opacity: 1;
  transition: width 0.5s ease 0s;
}
.swiper-wrapper /deep/ .wh_show_bgcolor{
  background-color: #D1DEE5;
  width: 30px;
  border-radius: 5px;
}

</style>
