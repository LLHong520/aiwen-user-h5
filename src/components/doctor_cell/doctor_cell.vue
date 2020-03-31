<template>
  <a :href="DOC_BASE_URL + docInfo.docId">
    <div class="content-left-wrapper">
      <div class="content-avatar-wrapper">
        <img :src="GET_IMG_URL(docInfo.photo,'u')" />
        <span>V</span>
      </div>
      <div class="content-info-wrapper">
        <div class="content-user-name">
          <b>{{docInfo.realName}}</b>
          <span class="title">{{docInfo.titles}}</span>
          <span class="price">￥{{docInfo.userPrice}}</span>
        </div>
        <div class="content-msg">{{docInfo.deptName}}&nbsp;&nbsp;{{docInfo.workUnit}}</div>
        <div class="content-time">
          服务数:<span class="num-color">{{docInfo.answerNum}}</span>
          文章数:<span class="num-color">{{docInfo.popNum}}</span>
        </div>
      </div>
    </div>
  </a>
</template>

<script >
import { commonMixin, toTopMixin} from "@/mixins";
import { DOC_BASE_URL} from "@/config";
export default {
  name: "doctorCell",
  mixins:[commonMixin,toTopMixin],
  data(){
    return {
      DOC_BASE_URL
    };
  },
  props:{
    docInfo:{
      type:Object,
      default:()=>{
        return {};
      }
    }
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
.content-avatar-wrapper {
  width: 54px;
  height: 54px;
  // overflow: hidden;
  position: relative;
  padding-right: 10px;
  float: left;
}
.content-avatar-wrapper img {
  width:100%;
  height:100%;
  border-radius:50%;
}
.content-avatar-wrapper span {
  display: block;
  position: absolute;
  right: 10px;
  bottom: 0;
  width: 13px;
  height: 13px;
  font-size: 10px;
  text-align: center;
  line-height: 13px;
  background-color: #ffc600;
  color: #fff;
  border-radius: 7px;
}
.content-left-wrapper {
  overflow: hidden;
  //display:flex
  margin-right: 20px;
  }
.content-info-wrapper {
  font-size:14px;
  min-width: 70%;
}
.content-user-name {
  font-size: 14px;
  color: #666666;
  position: relative;
  min-height: 14px;
}
.content-user-name b {
  font-size: 16px;
  color: #222;
}
.content-user-name .price {
  color: #349695;
  font-weight: 700;
  position: absolute;
  right: 0;
}

.content-msg {
  height: 28px;
  line-height: 28px;
  font-size: 14px;
  overflow:hidden;
  text-overflow:ellipsis;
  color: #666;
  }
.content-time {
  height: 28px;
  line-height: 28px;
  color: #999;
  span{
    margin-right:8px;
  }
}
</style>
