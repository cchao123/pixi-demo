<template>
  <div id="p2Wrap"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import PIXI from '../libs/pixi';


export default defineComponent({
  setup() {
    // PIXI 容器
    const container = ref();
    const squareShape = ref();
    const square = ref();
    const circleBody = ref();
    const circleShape = ref();
    const squareBody = ref();
    const planeBody = ref();
    const planeShape = ref();
    const circle = ref();
    const textContainer = ref();
    const textBody = ref();
    const textShape = ref();
    const world = ref();
    const app = ref();

    const animate = () => {
      requestAnimationFrame(animate);
      world.value.step(1 / 3);
      square.value.position.x = squareBody.value.position[0];
      square.value.position.y = squareBody.value.position[1];
      square.value.rotation = squareBody.value.angle;
      circle.value.position.x = circleBody.value.position[0];
      circle.value.position.y = circleBody.value.position[1];
      circle.value.rotation = circleBody.value.angle;
      textContainer.value.position.x = textBody.value.position[0];
      textContainer.value.position.y = textBody.value.position[1];
      textContainer.value.rotation = textBody.value.angle;
    };

    // const createBody = () =>{

    // }

    // pixi的缩放
    const scale = 1;
    // pixi的舞台
    app.value = new PIXI.Application({
      width: 750,
      height: 800,
      backgroundColor: 0xffeefff,
    });

    onMounted(() => {
      // 创建世界
      world.value = new window.p2.World();
      // 创建形状
      squareShape.value = new window.p2.Box({ width: 200, height: 200 });
      // 方块刚体
      squareBody.value = new window.p2.Body({
        mass: 1,
        position: [150, 0],
        angularVelocity: 0.2,
      });
      squareBody.value.addShape(squareShape.value);

      world.value.addBody(squareBody.value);

      // 小球形状
      circleShape.value = new window.p2.Circle({ radius: 100 });
      // 小球刚体
      circleBody.value = new window.p2.Body({
        mass: 100, // 模拟铁球
        position: [150, -300],
      });
      circleBody.value.addShape(circleShape.value);
      world.value.addBody(circleBody.value);

      // 文字形状
      textShape.value = new window.p2.Box({ width: 700, height: 100 });
      // 文字刚体
      textBody.value = new window.p2.Body({
        mass: 1,
        position: [50, 800],
        angularVelocity: -0.1,
      });
      textBody.value.addShape(textShape.value);
      world.value.addBody(textBody.value);

      // 地平线
      planeShape.value = new window.p2.Plane();
      // 地平线刚体
      planeBody.value = new window.p2.Body({
        position: [0, -app.value.view.height],
      });
      planeBody.value.addShape(planeShape.value);
      world.value.addBody(planeBody.value);

      container.value = new PIXI.Container();
      app.value.stage.addChild(container.value);
      // 内容摆放到舞台中央
      container.value.position.x = 375 / 2;
      container.value.scale.x = scale;
      container.value.scale.y = -scale;

      // 绘制矩形
      square.value = PIXI.Sprite.from('https://mat1.gtimg.com/qqcdn/tupload/1657028149306.jpg');
      square.value.width = squareShape.value.width;
      square.value.height = squareShape.value.height;
      square.value.pivot.x = 100;
      square.value.pivot.y = 100;

      // 绘制圆形
      circle.value = new PIXI.Graphics();
      circle.value.beginFill(0x650a5a);
      circle.value.drawCircle(0, 0, circleShape.value.radius);
      circle.value.endFill();

      // 绘制文字
      textContainer.value = new PIXI.Container();
      const text = new PIXI.Text('Pixi＋物理引擎', {
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'],
        stroke: '#4a1850',
        strokeThickness: 10,
        fontSize: 100,
      });
      textContainer.value.addChild(text);
      textContainer.value.pivot.x = textShape.value.width / 2;
      textContainer.value.pivot.y = textShape.value.height / 2;
      textContainer.value.scale.y = -1;
      container.value.addChild(circle.value, square.value, textContainer.value);
      document.body.appendChild(app.value.view);
      animate();
    });
    return {};
  },
});
</script>

<style lang="postcss" scoped></style>
