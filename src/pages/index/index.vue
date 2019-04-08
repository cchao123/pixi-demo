<template>
  <div class="wrapper">
    <scroll-view
      :style="{'height': '300px'}"
      :scroll-y="true"
      @scrolltolower="scrolltolower"
      @scroll="scroll"
    >
      <div :style="{'height': '200px','background-color':'red'}">tyuiolpo</div>
      <div class :style="{'height': '200px','background-color':'red'}">dsdsd</div>
      <div class :style="{'height': '200px','background-color':'red'}">grytyju</div>
    </scroll-view>

    <!-- <div class="wrapper_wrapper" @scroll="scroll">
      <div class="aaa" @click="scroll"></div>
      <div class="aaa"></div>
      <div class="aaa"></div>
      <div class="aaa"></div>
    </div>-->
  </div>
</template>

<script>
import card from "@/components/card";

export default {
  data() {
    return {};
  },
  components: {
    card
  },
  methods: {
    scroll() {
      console.log(123);
    },
    bindViewTap() {
      const url = "../logs/main";
      if (mpvuePlatform === "wx") {
        mpvue.switchTab({ url });
      } else {
        mpvue.navigateTo({ url });
      }
    },
    clickHandle(ev) {
      console.log("clickHandle:", ev);
      // throw {message: 'custom test'}
    }
  },
  created() {
    // let app = getApp()
  }
};
</script>

<style scoped lang="scss">
/* @import '../../statics/css/global.scss'; */
.wrapper {
  width: 100%;
  height: 100%;
  .wrapper_wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: scroll;
    .aaa {
      width: 100%;
      height: 500rpx;
      background-image: url(//mat1.gtimg.com/bbs/qqnewslite/images/mt-bg.jpg);
      background-size: cover;
      background-position: 50% 50%;
      margin-bottom: 20rpx;
    }
  }
}
</style>
