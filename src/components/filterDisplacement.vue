<template>
  <div id="displacement"></div>
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
      const wrap = document.getElementById('displacement');
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
      // 置换精灵
      const displacementSprite = createSprite('https://mat1.gtimg.com/qqcdn/tupload/1650879231987.png', {});
      // BaseTexture: 纹理存储表示图像的信息
      // wrapMode: 纹理包裹模式
      // WRAP_MODES: pixi支持的循环模式。
      // REPEAT: 贴图重复平铺
      displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
      const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
      filterContainer.filters = [displacementFilter];
      toWorkSence.addChild(skyBg);
      // 单独创建存放滤镜的容器，防止污染
      filterContainer.addChild(displacementSprite, skyBg);
      toWorkSence.addChild(filterContainer, people);

      app.stage.addChild(toWorkSence);
      const velocity = 1;
      const bgAutoAni = () => {
        requestAnimationFrame(bgAutoAni);
        displacementSprite.x += velocity;
        displacementSprite.y += velocity;
      };
      bgAutoAni();
    });

    return {};
  },
});
</script>

<style lang="postcss" scoped>

</style>
