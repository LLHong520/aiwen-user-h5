<template>
  <ul class="online-course">
    <li v-for="(elem,index) in courses" :key="index" class="online-course-item">
      <span v-if="elem.status==0" class="course-type">直播</span>
      <span v-if="elem.status==1" class="course-type">未开始</span>
      <span v-if="elem.status==2||elem.status==3" class="course-type">回顾</span>
      <a :href="OUTER_LINKS.courseDetails+elem.id">
        <div class="item-avater">
          <img :src="GET_IMG_URL(elem.image)" alt="">
        </div>
        <div class="course-name">{{elem.title}}</div>
        <!-- <div class="course-tip">{{elem.title}}</div> -->
      </a>
    </li>
  </ul>
</template>

<script >
import {MOMENT_URL,FORUM_URL} from "@/config";
import { commonMixin, toTopMixin} from "@/mixins";
export default {
  name: "index",
  mixins:[commonMixin,toTopMixin],
  data(){
    return {
      MOMENT_URL,
      FORUM_URL
    };
  },
  props:{
    courses:{
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
//在线课堂
.online-course{
  width: 100%;
  overflow-x:scroll;
  white-space: nowrap;
  border-bottom: 10px solid @bor_c;
  margin-top: 10px;
  padding-bottom: 0px;
  display: flex;

  li{
    display: inline-block;
    position: relative;
    margin-left: 10px;
    padding: 0 0 0px;
    // box-shadow: 0 2px 8px rgba(0,0,0,.1);
    width: 328/@r;
    a{
      display: flex;
      flex-wrap:wrap;
      justify-content:flex-start;
    }
    white-space: normal;
    .item-avater{
      width: 328/@r;
      height: 184/@r;
      overflow:hidden;
      background-color: @bor_c;
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
      // height:20px;
      // overflow: hidden;
      line-height: 150%;
      width: 328/@r;
      .show_n_lines(1);
      margin: 10px 0;
      .font_xl;
    }
    .course-tip{
      line-height: 150%;
      color: #A9A9A9;
      .show_n_lines(1);
      margin:0;
      .font_m;
    }
  }
}


//热门专题
.hot-subjects{
  width: 100%;
  overflow-x:scroll;
  white-space: nowrap;
  border-bottom: 10px solid @bor_c;
  margin-top: 10px;
  padding-bottom: 10px;

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
</style>
