<template>
<layout :curTabIndex="1">
  <div slot="page_header">
    <m-header slot="page_header"  title='更多栏目'>
     <span class="retrun" slot='left' @click="router_back">
       <b class="gray"></b>
      </span>
      <span class="retrun" slot='right'></span>
    </m-header>
  </div>
  <div slot="page_container" class="app_wrapper_inner">
    <div class="more-cloumn-list">
      <div class="item" v-for="channelItem in channelData" :key="channelItem.key">
        <h1>{{ channelItem.channelName }}</h1>
        <ul>
          <li v-for="clolumnItem in channelItem.columnInfo" :key="clolumnItem.key">
            <router-link :to="{ name: 'heal.article.cloumn', params: { id: clolumnItem.columnId }}">
              <span>{{ clolumnItem.columnName }}</span>
              <img :src="GET_IMG_URL(clolumnItem.columnPic ,'b')">
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</layout>
</template>
<script>
import Header from "@/components/header/Header";
import { commonMixin, toTopMixin } from "@/mixins";
import healthService from "@/services/healthService.js";

export default {
  name: "index",
  mixins: [commonMixin, toTopMixin],
  data() {
    return {
      channelData: [],
    };
  },
  components: {
    mHeader: Header,
  },
  created() {
    this.load_more_cloumn();
  },
  methods: {
    load_more_cloumn () {
      healthService.moreCloumn().then(res => {
        if(res.code == 0 && res.data) {
          this.channelData = res.data;
        }
      });
    },
  }
};
</script>

<style scoped lang="less"  rel="stylesheet/less">
@import "./css.less";
</style>
