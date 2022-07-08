<template>
  <div class="pixi">
    <div class="scrolltest"></div>
    <div id="pixi"></div>
    <span class="btns" @click="toggleAni(alien, 'death', false)">序列帧</span>
    <span class="btns" style="top: 830px" @click="toggleAni(orangegirl, 'animation', true)">网格变形</span>
    <span class="btns" style="top: 1600px" @click="toggleAni(armorgirl, 'animation', true)">网格变形</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Spine } from 'pixi-spine';
import PIXI from '../libs/pixi';

export default defineComponent({
  setup() {
    // 外星人
    const alien = ref();
    // 装甲女孩
    const armorgirl = ref();
    // 橙色女孩
    const orangegirl = ref();
    // 英雄
    const heroesnew = ref();
    const onAssetsLoaded = (loader: any, res: any) => {
      // alien
      alien.value = new Spine(res.alien.spineData);
      alien.value.x = app.screen.width / 2;
      alien.value.y = 800;
      alien.value.scale.set(0.5);
      app.stage.addChild(alien.value);

      alien.value.drawDebug = true;
      alien.value.drawBones = true;
      alien.value.drawRegionAttachments = true;
      alien.value.drawClipping = true;
      alien.value.drawMeshHull = true;
      alien.value.drawMeshTriangles = true;
      alien.value.drawPaths = true;
      alien.value.drawBoundingBoxes = true;

      // armorgirl
      armorgirl.value = new Spine(res.armorgirl.spineData);
      armorgirl.value.x = app.screen.width / 2;
      armorgirl.value.y = 2300;
      armorgirl.value.scale.set(0.3);
      app.stage.addChild(armorgirl.value);
      // orange
      orangegirl.value = new Spine(res.orangegirl.spineData);
      orangegirl.value.x = app.screen.width / 2;
      orangegirl.value.y = 1500;
      orangegirl.value.scale.set(1);
      app.stage.addChild(orangegirl.value);

      // heroesnew
      heroesnew.value = new Spine(res.heroesnew.spineData);

      console.log(orangegirl.value);
      console.log(heroesnew.value);
      // heroesnew.value.x = app.screen.width / 2;
      heroesnew.value.x = 0;
      heroesnew.value.y = 0;
      heroesnew.value.scale.set(1.5);
      app.stage.addChild(heroesnew.value);
    };

    const toggleAni = (target: any, aniName: string, isLoop: boolean) => {
      target.state.setAnimation(0, aniName, isLoop);
    };

    const app = new PIXI.Application({
      width: 750,
      height: 2500,
      backgroundColor: 0xffffff,
    });

    onMounted(() => {
      const pixiWrap = document.getElementById('pixi');
      pixiWrap?.appendChild(app.view);
      app.loader
        .add('alien', 'https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/cchao/alien.json')
        .add('armorgirl', 'https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/cchao/armorgirl.json')
        .add('orangegirl', 'https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/cchao/orangegirl.json')
        .add('heroesnew', 'https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/cchao/heroesnew.json')
        .load(onAssetsLoaded);
    });

    return {
      alien,
      armorgirl,
      orangegirl,
      heroesnew,
      toggleAni,
    };
  },
});
</script>

<style lang="postcss" scoped>
.pixi {
  position: relative;
}
.btns {
  position: absolute;
  left: 12px;
  top: 0;
  display: inline-block;
  background-color: #3377ff;
  padding: 6px 10px;
  border-radius: 20px;
  color: #fff;
  font-size: 16px;
  font-weight: 400;
}
.scrolltest {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1200px;
}
</style>
