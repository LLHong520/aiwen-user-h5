<template>
  <div>
    <h2>选择你想了解的标签</h2>
    <span class="close" @click="router_back"></span>
    <span class="total" :class="{'active':total==true}" @click="selectTotal">全部</span>
    <ul class="special_tags">
      <li :class="{'active':item.activity==true}"
      v-for="(item,index) in special_list" :key="index"
      @click="selectAction(item)">
        {{item.columnName}}
      </li>
    </ul>
    <div class="bottom-btn">
      <p>已选择标签&nbsp;&nbsp;&nbsp;(<span>{{selectedLength}}</span>/3)</p>
      <router-link :to="{ name: 'heal.special.column', params: { id: selectedId}}">
        <!-- <div class="confirm_btn">确定</div> -->
        <button class="confirm_btn" disabled>确定</button>
      </router-link>
    </div>
  </div>
</template>
<script>
import { commonMixin, toTopMixin } from "@/mixins";
import healthService from "@/services/healthService.js";
export default {
  name: "index",
  mixins: [commonMixin, toTopMixin],
  computed:{
    selected(){
      let selected=this.special_list.filter((item)=>{
        return item.activity === true;
      });
      if(this.total){
        selected = this.special_list;
      };
      if(selected.length == 0){
        $(".confirm_btn").attr("disabled", true);
        $(".confirm_btn").css("opacity", 0.2);
      }else{
        $(".confirm_btn").removeAttr("disabled");
        $(".confirm_btn").css("opacity", 1);
      };
      return selected;
    },
    selectedId(){
      let idStr = "";
      let idArr=[];
      for(let i=0;i<this.selected.length;i++){
        idArr.push(this.selected[i].id);
      }
      if(this.total){
        idStr = "all";
      }else{
        // idStr = idArr == [] ? "1114" : idArr.join("-");
        idStr = idArr.join(",");
      }
      return idStr;
    },
    selectedLength(){
      if(this.total){
        return 0;
      }else{
        return this.selected.length;
      }
    }
  },
  data(){
    return {
      closeBtn:false,
      total:false,
      special_list:[],
      outData:[]
    };
  },
  created(){
    this.outData = this.$route.params.id;
    this.load_column();
  },
  methods:{
    load_column(){
      let _this=this;
      healthService.allColumn({}).then(res =>{
        if (res.code == 0 && res.data) {
          _this.list = res.data;
          let one = {};
          for(let i=0; i<_this.list.length; i++){
            one = _this.list[i];
            one["activity"] = false;
            _this.special_list.push(one);
          };
          if(_this.outData){
            if(_this.outData.length ==  _this.special_list.length){
              _this.total = true;
            }else{
              for(let i=0 ;i<_this.special_list.length; i++){
                for(let j=0 ;j<_this.outData.length; j++){
                  if(_this.outData[j] == _this.special_list[i].id){
                    _this.special_list[i].activity = true;
                  }
                }
              }
            }
          };
        }
      });
    },
    selectTotal(){
      this.total = !this.total;
      if(this.total){
        this.special_list.map(item=>{
          item.activity=false;
        });
      }
    },
    selectAction(item){
      let isActive=item.activity;
      if(isActive){
        item.activity=false;
        return;
      };
      if(this.selected.length>=3&&this.selected.length!=this.special_list.length){
        this.$toast.tip("最多选择3项哦~");
      }else{
        item.activity = true;
        this.total=false;
      };
    }
  },
};
</script>
<style scoped lang="less" rel="stylesheet/less">
@import "./css.less";
</style>

