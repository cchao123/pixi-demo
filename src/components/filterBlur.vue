<template>
  <div id="blur"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import PIXI from '../libs/pixi';

export const IMAGE_PREFIX = 'https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/2022mother';

export default defineComponent({
  setup() {
    const app = new PIXI.Application({
      width: 750,
      height: 620,
      backgroundColor: 0xffffff,
    });
    const createSprite = (assetsUrl: string, defaultParams: any) => {
      const newSprite = PIXI.Sprite.from(assetsUrl);
      Object.keys(defaultParams).forEach((key: string) => (newSprite[key] = defaultParams[key]));
      return newSprite;
    };
    onMounted(() => {
      const wrap = document.getElementById('blur');
      wrap?.appendChild(app.view);
      const toWorkSence: PIXI.Container = new PIXI.Container();
      const filterContainer: PIXI.Container = new PIXI.Container();
      const skyBg = createSprite('https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/2022mother/4_bg_1.png', {
        x: 15,
        y: 15,
      });
      const people = createSprite('https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/2022mother/4_people.png', {
        x: 100,
        y: 180,
        alpha: 1,
      });
      toWorkSence.addChild(skyBg);
      filterContainer.addChild(skyBg);
      toWorkSence.addChild(filterContainer, people);
      const blurFilter1 = new PIXI.filters.BlurFilter();
      filterContainer.filters = [blurFilter1];
      app.stage.addChild(toWorkSence);
    });

    return {};
  },
});
</script>

<style lang="postcss" scoped></style>
