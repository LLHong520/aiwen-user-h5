<template>
  <div>
    <router-link v-if="btnType==0" :to="routerUrl" :class="btnClass">{{title}}</router-link>
    <button v-if="btnType==1" type="button" name="button" :class="btnClass">{{title}}</button>
  </div>
</template>

<script>
export default {
  name:"myButton",
  props:{
    btnType:{
      type:Number,
      default:0
    },
    btnClass:{
      type:String,
      default:"btn"
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
<style scoped lang="less">
@assets:"~@/assets";
@import "@{assets}/css/fix.less";
.btn{
  display:inline-block;
  padding:6px 12px;
  margin-bottom:0;
  font-size: 14px;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  background:@main_c;
  border: 1px solid transparent;
  border-radius:14px;
}
.btn-s{
  padding:6px 12px;
  font-size: 14px;
}
.btn-m{
  padding:6px 12px;
  font-size: 14px;
}
.btn-l{
  padding:6px 12px;
  font-size: 14px;
}
.btn-xl{
  padding:6px 12px;
  font-size: 14px;
}
</style>
