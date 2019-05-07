<template>
  <div class="wrapper">
    <!-- <div class="header"></div> -->
    <scroll-view
      :style="{'height': '100vh'}"
      :scroll-y="true"
      @scrolltolower="scrolltolower"
      @scroll="scroll"
    >
      <div  v-for="item in 6" :key="item"
        class="aaa"
        :style="{'backgroundImage': 'url(/static/images/'+ (item + 1)  +'.jpg)','background-position-y': yRpx + 'rpx'}">
        <!-- {{ yRpx }} -->
      </div>
    </scroll-view>
  </div>
</template>

<script>
// import card from "@/components/card";

export default {
  data () {
    return {
      yRpx: 0
    }
  },
  // components: {
  //   card
  // },
  methods: {
    scroll (e) {
      if (e.target.deltaY > 0) {
        if (this.yRpx < 0) this.yRpx = this.yRpx + 5
      } else {
        if (this.yRpx > -45) this.yRpx = this.yRpx - 5
      }
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
  .aaa {
    background-size: cover;
    width:100%;
    height:480rpx;
  }
}
</style>
