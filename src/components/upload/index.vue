<template>
  <div class="upload_img">
    <div class="img_item" v-for="(item,index) in fileList" :key="index">
      <span><img :src="item.url" alt="" preview="1"></span>
      <i @click="deleteItem(index)"></i>
    </div>
    <div class="up_btn" v-if="imgsNum<limit">
      <input :accept="accept" name="avatar" ref="avatarInput" type="file" class="needsclick" @change="changeImage($event)"/>
      <span v-if="imgsNum>0">{{imgsNum}}/{{limit}}</span>
      <span v-else>上传图片</span>
    </div>

    <div class="loading" v-show="loading && showLoading">
      <div class="content">
        {{ uploadStatusTxt }}
      </div>
    </div>
  </div>
</template>

<script>
  import sysService from "@/services/sysService.js";

  export default {
    name: "upload",
    props:{
      value:{
        type:[Array,Object,String],
        default:""
      },
      fileList:{
        type:Array,
        default:()=> { return [];}
      },
      limit:{
        type:Number,
        default:10
      },
      accept:{
        type:String,
        default: "image/*"
      },
      size:{
        type:Number,
        default:8
      },
      showLoading: { // 是否开启上传loading，默认开启
        type: Boolean,
        default: true
      },
    },
    mixins: [],
    components: {},
    computed: {
      imgsNum(){
        return this.fileList.length;
      }
    },
    data() {
      return {
        loading:false,
        uploadStatusTxt: ""
      };
    },
    created() {
    },
    mounted() {
    },
    methods: {
      changeImage: function (e) {
        if (this.imgsNum == this.limit) {
          this.$toast.tip(`只允许上传${this.limit}张图片哦`);
          return;
        }
        let file = e.target.files[0];
        if (file) {
          this.file = file;
          let reader = new FileReader();
          let that = this;
          reader.readAsDataURL(file);
          reader.onload = function (e) {
            that.avatar = this.result;
          };
          let size = (file.size / 1024 / 1024).toFixed(2);
          if (size > this.size) {
            this.$toast.tip(`请选择小于${this.size}M的图片哦~`);
            return;
          }
        }
        let data = new FormData();
        data.append("fileName", "");
        data.append("fileData", file);
        e.target.value = "";
        this.uploadSubmit(data);
      },
      deleteItem(idx){
        this.fileList.splice(idx,1);
        this.emitData();
      },
      uploadSubmit(data){
        if(this.loading) return;
        this.loading = true;
        this.uploadStatusTxt = "上传中...";
        sysService.uploadImg(data).then(res => {
          this.loading = false;
          if (res.code == 0) {
            this.fileList.push({
              id:res.picId,
              url:res.picUrl
            });
            this.emitData();
            this.$emit("success");
            this.$previewRefresh();
          } else {
            this.$toast.tip("上传失败");
          }
        }).catch(()=>{
          this.loading = false;
        });
      },
      deleteSubmit(){},
      emitData(){
        this.$emit("input",this.fileList);
      }
    }
  };
</script>

<style scoped lang="less">
  @assets: "~@/assets";
  @import "@{assets}/css/flex.less";
  @import "@{assets}/css/fix.less"; //
  .upload_img{
    width: 720/@r;
    position: relative;
    margin-right: -30/@r;
    .img_item,.up_btn{
      display: inline-block;
      width: 126/@r;
      height: 126/@r;
      box-sizing: border-box;
      border-radius: 4/@r;
      position: relative;
      vertical-align: top;
      background-color: #F9FAFD;
      margin-bottom: 16/@r;
      margin-right: 16/@r;
    }
    .img_item{
      span{
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
        display: block;
        box-sizing: border-box;
        background-color: rgba(0,0,0,0.1);
        border:1px solid #EFEFEF;
        border-radius: 8/@r;
      }
      img {
        display: block;
        max-width: unset;
        border-radius: 4/@r;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      i {
        display: block;
        position: absolute;
        left: 6/@r;
        top: 6/@r;
        width: 32/@r;
        height: 32/@r;
        background: url(./images/btn_s_close_normal@2x.png) no-repeat;
        background-size: 32/@r 32/@r;
        cursor: pointer;
      }
    }
    .up_btn{
      border: 1px dashed #D6D6D6;
      text-align: center;
      font-size: 20/@r;
      color: #AEB1B6;
      padding-top: 80/@r;
      background: #F9FAFD url(./images/icon_camera@2x.png) no-repeat center 22/@r;
      background-size: 54/@r 42/@r;
      margin-right: 0;
      width: 128/@r;
      height: 128/@r;
      box-sizing: border-box;
      input{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        opacity: 0;
      }
      span{
        font-size: 20/@r;
      }
    }
  }

  .loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background: rgba(0, 0, 0, .2);
    display: flex;
    justify-content: center;
    align-items: center;
    .content {
      padding: 9px 10px;
      background: rgba(0, 0, 0, .6);
      color: #fff;
      font-size: 16px;
      border-radius: 4px;
    }
  }

</style>
