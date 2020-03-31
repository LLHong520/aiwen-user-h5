<template>
  <div class="tab-wrapper">
  	<ul class="tab-list clearfix">
  	  <li class="tab-item" v-for="(tabItem,index) in tabInfo" :key="index"  :class="{'active':index==current}" @click="jumpLink(index)">{{tabItem.text}}</li>
    </ul>
  </div>
</template>

<script>
import { YK_URL } from "@/config";
export default {
  props:{},
  data(){
    return {
      current:0,
      tabInfo:[
        {
          href:YK_URL,
          text:"订阅",
        },
        {
          href:YK_URL,
          text:"推荐",
        },
        {
          router:"/heal/diary",
      	  text:"诊间日记",
        },
        {
          router:"/heal/article",
      	  text:"科普文章",
        },
        {
          router:"/heal/analysis",
      	  text:"病例分析",
        },
        {
          router:"/heal/course",
      	  text:"在线课堂",
        },
        {
          router:"/heal/special",
          text:"专题",
        },
      ]
    };
  },
  created(){},
  methods: {
    jumpLink(index){
      let _this=this;
      _this.current=index;
      if(_this.tabInfo[index].href){
        window.location.href=_this.tabInfo[index].href;
      }else{
        this.$router.push({path:_this.tabInfo[index].router});
      }
    },
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import "~@/assets/css/fix.less";
  .tab-wrapper{
  	position: relative;
    border-bottom:3px solid #fff;
    padding: 0 20/@r;
    height:40px;
    line-height: 40px;
    background-color:#F4F8FA;
  }
  .tab-list{
  	width: 100%;
  	overflow-x:scroll;
  	// overflow-x:hidden;
    white-space: nowrap;
    .font_xl;
   .transition(transform .5s ease 0s);
   position:relative;
  }
  .tab-list li{
    display: inline-block;
    white-space: normal;
    padding:0 12px;
    cursor: pointer;
    color:#ACACAC;
    text-align: center;
    position: relative;
    &.active{
     color:@main_c;
   }
   &.active:after{
    content: "";
    position: absolute;
    bottom: -1px;
    left: 50%;
    margin-left: -16px;
    width: 32px;
    background-color: @main_c;
    height: 4px;
    .border-radius(4px);
  }
}
.tab-wrapper .icon{
  position:absolute;
  right:0;
  top:0;
  z-index:99999;
}

/* 设置滚动条的样式 */
::-webkit-scrollbar {width: 0;}/* 滚动槽 */
// ::-webkit-scrollbar-track {-webkit-box-shadow: inset 0 0 0 rgba(0,0,0,0);}/* 滚动条滑块 */
// ::-webkit-scrollbar-thumb {background: rgba(0,0,0,0);-webkit-box-shadow: inset 0 0 0 rgba(0,0,0,0);}
// ::-webkit-scrollbar-thumb:window-inactive {background: rgba(0,0,0,0);}

</style>
