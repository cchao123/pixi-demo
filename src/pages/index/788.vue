<template>
  <div class="wrapper">
    <div class="header">
      北欧奖赏
    </div>
    <scroll-view
      :scroll-y="true"
      @scrolltolower="scrolltolower"
      @scroll="scroll"
    >
      <img src="/static/images/1.jpg" >
      <img src="/static/images/2.jpg" >
      <img src="/static/images/3.jpg" >
      <img src="/static/images/4.jpg" >
      <img src="/static/images/5.jpg" >
      <img src="/static/images/6.jpg" >
    </scroll-view>
  </div>
</template>

<script>
// import card from "@/components/card";

export default {
  data () {
    return {}
  },
  // components: {
  //   card
  // },
  methods: {
    scroll () {
      console.log(123)
    },
    bindViewTap () {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    }
  },
  created () {
    // let app = getApp()
  }
}
</script>

<style scoped lang="scss">
/* @import '../../statics/css/global.scss'; */
.wrapper {
  width: 100%;
  height: 100%;
  .header {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, .5);
    width: 100%;
    height: 180rpx;
    z-index: 999;
  }
  .item {
    background-size: cover;
  }
}
</style>
