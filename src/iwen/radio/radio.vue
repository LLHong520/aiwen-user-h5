<template>
  <span @click="toogle">
    <i class="icon-radio" :class="{'on':check}"></i>
    {{label}}
  </span>
</template>

<script>
export default {
  name: "radio",
  props:{
    check:{
      type:Boolean,
      default:true
    },
    label:{
      type:String,
      default:""
    }
  },
  data () {
    return {};
  },
  methods: {
    toogle () {
      this.$emit("update:check",!this.check);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
