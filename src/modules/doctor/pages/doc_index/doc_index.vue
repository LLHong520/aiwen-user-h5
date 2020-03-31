<template>
  <component v-bind:is="docRoom"></component>
</template>
<script>
import docRoomIndex from "../../components/doc_room_index/doc_room_index";
import docRoomAct from "../../components/doc_room_act/doc_room_act";
export default {
  name: "doc-info",
  data () {
    return {
      // docRoom:docRoomIndex
      // docRoom:docRoomAct
      docRoom:null
    };
  },
  components:{
    docRoomIndex,
    docRoomAct
  },
  created(){
    let _this = this;
    if(_this.$route.query.activityId){
      _this.docRoom = docRoomAct;
    }else{
      _this.docRoom = docRoomIndex;
    }
  },
  methods:{
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"  rel="stylesheet/less">
</style>
