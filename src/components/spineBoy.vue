<template>
  <div>
    <div class="btns">
      <span @click="toggleAni('idle', true)">静止</span>
      <span @click="toggleAni('walk', true)">行走</span>
      <span @click="toggleAni('run', true)">奔跑</span>
      <span @click="toggleAni('hoverboard', true)">滑行</span>
      <span @click="toggleAni('shoot', false)">射击</span>
      <span @click="toggleAni('portal', false)">登场</span>
      <span @click="toggleAni('jump', false)">跳跃</span>
      <span @click="toggleAni('death', false)">死亡</span>
      <span @click="toggleAni('aim', false)">瞄准</span>
    </div>
    <div id="spineboy"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Spine } from 'pixi-spine';
import PIXI from '../libs/pixi';

export default defineComponent({
  setup() {
    const spineBoy = ref();
    const onAssetsLoaded = (loader: any, res: any) => {
      const wrap = document.getElementById('spineboy');

      wrap?.appendChild(app.view);

      spineBoy.value = new Spine(res.spineboy.spineData);

      spineBoy.value.x = app.screen.width / 2;
      spineBoy.value.y = app.screen.height;

      spineBoy.value.scale.set(0.5);

      app.stage.addChild(spineBoy.value);
    };

    const toggleAni = (aniName: string, isLoop: boolean) => {
      spineBoy.value.state.setAnimation(0, aniName, isLoop);
    };

    const app = new PIXI.Application({
      backgroundColor: 0xffffff,
      width: 750,
      height: 600,
    });

    app.loader
      .add('spineboy', 'https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/cchao/spineboy.json')
      .load(onAssetsLoaded);

    // 开启舞台交互
    app.stage.interactive = true;

    return {
      toggleAni,
    };
  },
});
</script>

<style lang="postcss" scoped>
.spineboy {
  width: 750px;
  height: 600px;
}
.btns {
  display: flex;
  flex-wrap: wrap;
  span {
    margin: 5px 10px;
    background-color: #3377ff;
    padding: 6px 10px;
    border-radius: 20px;
    color: #fff;
    font-size: 16px;
    font-weight: 400;
  }
}
</style>
