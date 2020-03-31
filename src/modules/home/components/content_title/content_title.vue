<template>
  <div class="title-text clearfix">
    <slot name="title-left">
      <span class="t-title" v-if="title!=''">{{title}}</span>
    </slot>
    <slot name="title-center">
        <span class="t-center" v-if="t_center!=''">{{t_center}}</span>
    </slot>
    <span  class="right">
      <slot name="right">
        <router-link :to="right_router" class="t-right"  v-if="t_right!=''">{{t_right}}</router-link>
      </slot>
    </span>
  </div>
</template>

<script >
export default {
  props:{
    title:{
      type:String,
      default:""
    },
    t_center:{
      type:String,
      default:""
    },
    t_right:{
      type:String,
      default:""
    },
    right_router:{
    	type:String,
    	default:""
    }
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
  .title-text{
	.font_l;
	padding: 20/@r 0;
	border-bottom: 1px solid @bor_c;
	.t-title{
    border-left:10/@r solid @main_c;
    padding:0 18/@r;
    .font_l;
    width:160/@r;
  }
  .t-center{
  	float: left;
  	width:30%;
  	text-align:center;
  }
  .right{
  	float: right;
  	margin-right:15px;
  	color:@main_c;
    .font_s;
    text-align: right;
    a{
      color:@main_c;
    }
  }
}
</style>
