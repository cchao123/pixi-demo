<template>
  <div class="pixi">
    <div id="pixi"></div>
    <div class="footerBar">
      <div class="items">
        <span> AsciiFilter - {{ asciiValue }}</span>
        <input type="range" v-model="asciiValue" min="1" max="30" @change="createFilter('ascii')" />
      </div>
      <div class="items">
        <span> PixelateFilter - {{ pixelateValue }}</span>
        <input type="range" v-model="pixelateValue" min="21" max="29" @change="createFilter('pixelate')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { AsciiFilter } from '@pixi/filter-ascii';
import { PixelateFilter } from '@pixi/filter-pixelate';
import PIXI from '../libs/pixi';

export default defineComponent({
  setup() {
    const app = new PIXI.Application({
      width: 750,
      height: 620,
      backgroundColor: 0xffffff,
    });

    const asciiValue = ref(5);
    const pixelateValue = ref(25);
    const people = PIXI.Sprite.from('https://mat1.gtimg.com/qqcdn/tupload/1657209573809.png');
    const filterArr = ref<any[]>([]);
    const initPixi = () => {
      people.scale.set(750 / 738);
      people.filters = filterArr.value;
      app.stage.addChild(people);
    };

    onMounted(() => {
      const pixiWrap = document.getElementById('pixi');
      pixiWrap?.appendChild(app.view);
      initPixi();
    });

    const createFilter = (filterName: string) => {
      if (filterName === 'ascii') filterArr.value = [new AsciiFilter(asciiValue.value)];
      else filterArr.value = [new PixelateFilter(pixelateValue.value)];
      initPixi();
    };

    return {
      asciiValue,
      pixelateValue,
      AsciiFilter,
      PixelateFilter,
      createFilter,
    };
  },
});
</script>

<style lang="postcss">
.items {
  padding-left: 10px;
}
.pixi span {
  font-size: 20px;
  margin-right: 70px;
}
input {
  transform: scale(2.5);
}
</style>
