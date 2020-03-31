<template>
  <div class="line-wrapper">
    <div class="line-scroll-wrapper">
      <div class="content-wrapper">
        <doctor-cell :docInfo="info"></doctor-cell>
      </div>
      <div class="line-btn-delete" @click="deleteItem(current+1,info.id)"><button>删除</button></div>
    </div>
  </div>
</template>
<script>
import doctorCell from "@/components/doctor_cell/doctor_cell";
import {toTopMixin,commonMixin} from "@/mixins";
export default {
  name: "leftSliderDel",
  mixins:[commonMixin,toTopMixin],
  props:{
    info:{
      type:Object,
      default:()=>{},
    },
    current:{
      type:Number,
      default:0,
    },
  },
  data() {
    return {};
  },
  components:{
    doctorCell
  },
  mounted(){
    // 设定每一行的宽度=屏幕宽度+按钮宽度
    $(".line-scroll-wrapper").width($(".line-wrapper").width() + $(".line-btn-delete").width());
    // 设定常规信息区域宽度=屏幕宽度
    $(".content-wrapper").width($(".line-wrapper").width());
    // 设定文字部分宽度（为了实现文字过长时在末尾显示...）
    // $(".content-msg").width($(".content-wrapper").width() - 280);

    // 获取所有行，对每一行设置监听
    var lines = $(".content-wrapper");
    var len = lines.length;
    var lastX, lastXForMobile;

    // 用于记录被按下的对象
    var pressedObj;  // 当前左滑的对象
    var lastLeftObj; // 上一个左滑的对象
    // 用于记录按下的点
    var start;

    /*移动端运行时的监听*/
    for (var i = 0; i < len; ++i) {
      lines[i].addEventListener("touchstart", function(e){
        lastXForMobile = e.changedTouches[0].pageX;
        pressedObj = this; // 记录被按下的对象
        var touches = event.touches[0];// 记录开始按下时的点
        start = {
          x: touches.pageX, // 横坐标
          y: touches.pageY  // 纵坐标
        };
      });
      lines[i].addEventListener("touchmove",function(e){
        // 计算划动过程中x和y的变化量
        var touches = event.touches[0];
        var delta = {
          x: touches.pageX - start.x,
          y: touches.pageY - start.y
        };
        // 横向位移大于纵向位移，阻止纵向滚动
        if (Math.abs(delta.x) > Math.abs(delta.y)) {
          event.preventDefault();
        }
      });
      lines[i].addEventListener("touchend", function(e){
        if (lastLeftObj && pressedObj != lastLeftObj) { // 点击除当前左滑对象之外的任意其他位置
          $(lastLeftObj).removeClass("mL132"); // 右滑
          $(lastLeftObj).addClass("mL0"); // 右滑
          // $(lastLeftObj).animate({marginLeft:"0"}, 500); // 右滑
          lastLeftObj = null; // 清空上一个左滑的对象
        }
        var diffX = e.changedTouches[0].pageX - lastXForMobile;
        if (diffX < -100) {
          $(pressedObj).addClass("mL132"); // 左滑
          $(lastLeftObj).addClass("mL0"); // 已经左滑状态的按钮右滑
          $(pressedObj).removeClass("mL0");
          $(lastLeftObj).addClass("mL132");
          //$(pressedObj).animate({marginLeft:"-132px"}, 500); // 左滑
          //$(lastLeftObj).animate({marginLeft:"0"}, 500); // 已经左滑状态的按钮右滑
          lastLeftObj = pressedObj; // 记录上一个左滑的对象
        }
        else if (diffX > 100) {
          if (pressedObj == lastLeftObj) {
            $(pressedObj).removeClass("mL132"); // 右滑
            $(pressedObj).addClass("mL0"); // 右滑
            // $(pressedObj).animate({marginLeft:"0"}, 500); // 右滑
            lastLeftObj = null; // 清空上一个左滑的对象
          }
        }
      });
    }

    /*网页在PC浏览器中运行时的监听*/
    for (var i = 0; i < len; ++i) {
      $(lines[i]).bind("mousedown", function(e){
        lastX = e.clientX;
        pressedObj = this; // 记录被按下的对象
      });
      $(lines[i]).bind("mouseup", function(e){
        if (lastLeftObj && pressedObj != lastLeftObj) { // 点击除当前左滑对象之外的任意其他位置
          $(lastLeftObj).removeClass("mL132"); // 右滑
          $(lastLeftObj).addClass("mL0"); // 右滑
          //$(lastLeftObj).animate({marginLeft:"0"}, 500); // 右滑
          lastLeftObj = null; // 清空上一个左滑的对象
        }
        var diffX = e.clientX - lastX;
        if (diffX < -100) {
          $(pressedObj).addClass("mL132"); // 左滑
          $(lastLeftObj).addClass("mL0"); // 已经左滑状态的按钮右滑
          $(pressedObj).removeClass("mL0");
          $(lastLeftObj).addClass("mL132");
          //$(pressedObj).animate({marginLeft:"-132px"}, 500); // 左滑
          //$(lastLeftObj).animate({marginLeft:"0"}, 500); // 已经左滑状态的按钮右滑
          lastLeftObj = pressedObj; // 记录上一个左滑的对象
        }
        else if (diffX > 100) {
          if (pressedObj == lastLeftObj) {
            $(pressedObj).removeClass("mL132"); // 右滑
            $(pressedObj).addClass("mL0"); // 右滑
            // $(pressedObj).animate({marginLeft:"0"}, 500); // 右滑
            lastLeftObj = null; // 清空上一个左滑的对象
          }
        }
      });
    }
  },
  created() {},
  methods: {
    deleteItem(index,id){
      this.$emit("deleteFn",{
        index:index,
        id:id
      });
      $(".content-wrapper").removeClass("mL132");
      $(".content-wrapper").addClass("mL0");
    }
  }
};
</script>
<style  scoped lang="less" rel="stylesheet/less">
.line-wrapper { width: 100%; height: 100px; overflow: hidden; font-size: 28px; border-bottom: 1px solid #f4f4f4; }
.line-scroll-wrapper { white-space: nowrap; height: 100px; clear: both; }
.line-btn-delete { float: left; width: 120px; height: 100px; }
.line-btn-delete button { width: 100%; height: 100%; background:#ff556a;border: none;font-size:16px;font-weight:bolder;color:#fff; }
.content-wrapper{
  // line-height:100px;
  float:left;
  background-color: #fff;
  padding: 15px 10px;
}
.content-avatar-wrapper {
  width: 54px;
  height: 54px;
  // overflow: hidden;
  position: relative;
  padding-right: 5px;
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
  right: 7px;
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
.content-left-wrapper {overflow: hidden;display:flex}
.content-info-wrapper {
  margin-left: 10px;
  font-size:14px;
  min-width: 70%;
}
.content-user-name {
  font-size: 14px;
  color: #666666;
  position: relative;
}
.content-user-name b {
  font-size: 16px;
  margin-right: 10px;
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

.mL132{
  transition: margin-left 0.5s;
  -moz-transition: margin-left 0.5s;	/* Firefox 4 */
  -webkit-transition: margin-left 0.5s;	/* Safari 和 Chrome */
  -o-transition: margin-left 0.5s;	/* Opera */
}
.mL132
{
margin-left:-132px;
}
.mL0{
  transition: margin-left 0.5s;
  -moz-transition: margin-left 0.5s;	/* Firefox 4 */
  -webkit-transition: margin-left 0.5s;	/* Safari 和 Chrome */
  -o-transition: margin-left 0.5s;	/* Opera */
}
.mL0
{
margin-left:0px;
}
</style>
