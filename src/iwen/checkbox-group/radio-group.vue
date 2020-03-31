<template>
<div>
  <div v-for="(ele,index) in options" :key="index">
    <span @click="check(index)">
      <i class="icon-radio" :class="{'on':ele.val===val}"></i>
      {{ele.label}}
    </span>
  </div>
</div>

</template>

<script>
export default {
  name: "radio-group",
  props:{
    options:{//单选选项列表
      type:Array,
      default:()=>{
        return [
        {label:"男",val:0},
        {label:"女",val:1},
        ];
      }
    },
    val:{//选中的值
      type:Number,
      default:0
    }
  },
  data () {
    return {};
  },
  created(){
    if(this.options.length==1){
      console.error("options 数组长度应至少为2");
    }
  },
  methods: {
    check (index) {
      let val=this.options[index].val;
      this.$emit("update:val",val);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
i.icon-radio{
  display:inline-block;
  width:22px;
  height:22px;
  vertical-align: middle;
  background:url('./images/radio-off.png') no-repeat center;
  background-size:contain;
}
i.icon-radio.on{
  background:url('./images/radio-on.png') no-repeat center;
  background-size:contain;
}
</style>
