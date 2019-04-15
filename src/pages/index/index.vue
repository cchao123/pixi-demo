<template>
  <div class="wrapper">
    <div class="top">
    <view>
      <Swiper :images="images" />
    </view>
    </div>
    <div class="bottom">
      <div class="head">
        <img src="/static/images/logo.png" >
      </div>
      <div class="slogan">
        Hello Word
      </div>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
export default {
  data () {
    return {
      images: [
        {
          url:
            '/static/images/logo.png'
        },
        {
          url:
            '/static/images/logo.png'
        }
      ]
    }
  },
  components: {
    card
  },
  methods: {
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  .top {
    flex: 1;
    background: #546471;
  }
  .bottom {
    text-align: center;
    height: 350rpx;
    background: #ccc;
    position: relative;
    .head {
      position: absolute;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      width: 150rpx;
      height: 150rpx;
<<<<<<< HEAD
=======
      background: pink;
>>>>>>> 7c29cfd79d71318b8defaee174432d2a4a6aac0a
      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
    .slogan {
      color: #fff;
      margin-top: 80rpx;
    }
  }
}
</style>
