<template>
  <div>
    <div id="qq"></div>
    <div class="bar">
      <p>绳段数:{{ numberOfSegments }}</p>
      <input type="range" v-model="numberOfSegments" @change="changeRope" min="5" max="30" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import PIXI from '../libs/pixi';

export default defineComponent({
  setup() {
    const numberOfSegments = ref();
    const app = ref();
    const longQQ = ref();
    onMounted(() => {
      numberOfSegments.value = 20;
      app.value = new PIXI.Application({
        width: 640,
        height: 560,
        backgroundColor: 0xffffff,
      });
      const { renderer } = app.value;
      const playground = document.getElementById('qq');
      playground?.appendChild(renderer.view);
      initLongQQ();
    });

    const eContainer = new PIXI.Container();
    eContainer.width = 640;
    eContainer.height = 560;

    const initLongQQ = () => {
      const { stage } = app.value;
      // 图片高度
      const imageHeightidth = 650;
      // 一段长度
      const ropeLength = imageHeightidth / numberOfSegments.value;
      // 保存 Point 对象的数组
      const points: Dynamic[] = [];
      for (let i = 0; i < numberOfSegments.value; i++) {
        points.push(new PIXI.Point(i * ropeLength, 0));
      }

      // 创建 Rope 类型的对象
      longQQ.value = new PIXI.SimpleRope(
        PIXI.Texture.from('https://mat1.gtimg.com/qqcdn/tupload/1655698421419.png'),
        points,
      );
      longQQ.value.position.set(300, 600);
      stage.addChild(longQQ.value);

      // 实现动画
      let count = 0;
      app.value.ticker.add(() => {
        count += 0.1;
        // 通过 for 循环将数组中的每个点按照椭圆形的轨迹移动，形成波浪效果。
        for (let i = 0; i < points.length; i++) {
          points[i].x = -Math.sin(i * 0.5 + count) * 30;
          points[i].y = -i * ropeLength + Math.cos(i * 0.3 + count) * numberOfSegments.value;
        }
      });
    };
    const changeRope = () => {
      longQQ.value.destroy();
      initLongQQ();
    };
    return {
      numberOfSegments,
      changeRope,
    };
  },
});
</script>

<style lang="postcss" scoped>
#qq {
  text-align: center;
}

.bar {
  font-weight: 400;
  text-align: center;
}
</style>
