<template>
  <div id="video"></div>
  <span @click="onPlayVideo">播放视频</span>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import PIXI from '../libs/pixi';

export default defineComponent({
  setup() {
    const app = new PIXI.Application({
      width: 750,
      height: 1334,
      backgroundColor: 0xffffff,
    });

    onMounted(() => {
      const wrap = document.getElementById('video');
      wrap?.appendChild(app.view);
    });
    const onPlayVideo = () => {
      const videoSprite = new PIXI.Sprite(
        PIXI.Texture.from('https://mat1.gtimg.com/qqcdn/tnewsh5/2022olympic/snowBg.mp4'),
      );
      // 全屏拉伸
      videoSprite.width = app.screen.width;
      videoSprite.height = app.screen.height;

      app.stage.addChild(videoSprite);
    };
    return {
      onPlayVideo,
    };
  },
});
</script>

<style lang="postcss" scoped>
span {
  display: inline-block;
  background-color: #3377ff;
  padding: 6px 10px;
  border-radius: 20px;
  color: #fff;
  font-size: 16px;
  font-weight: 400;
}
</style>
