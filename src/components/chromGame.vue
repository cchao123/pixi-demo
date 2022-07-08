<template>
  <div class="chromgame">
    <div id="pixiWrap"></div>
    <div>得分：{{ Math.floor(score / 10) }}</div>
    <div>点击<span style="color: red">任意位置</span>{{ isGameOver ? '重开' : '跳跃' }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import gsap from 'gsap';
import PIXI, { initLoader, createRectangle } from '../libs/pixi';
import GameStats from 'gamestats.js';

export const GAME_ASSETS = [
  {
    name: '恐龙-奔跑',
    url: 'https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/cchao/dinosaur-runing.png',
  },
  {
    name: '恐龙-死亡',
    url: 'https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/cchao/dinosaur-death.png',
  },
  {
    name: '障碍物-鸟',
    url: 'https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/cchao/obstacle-bird.png',
  },
  {
    name: '障碍物-仙人掌1',
    url: 'https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/cchao/cactus1.png',
  },
  {
    name: '障碍物-仙人掌2',
    url: 'https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/cchao/cactus2.png',
  },
  {
    name: '障碍物-仙人掌3',
    url: 'https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/cchao/cactus3.png',
  },
  {
    name: '游戏背景-路',
    url: 'https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/cchao/dinosaur-bg.png',
  },
  {
    name: '游戏背景-云',
    url: 'https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/cchao/dinosaur-cloud.png',
  },
];
export default defineComponent({
  setup() {
    // 创建舞台
    const app = new PIXI.Application({
      width: 750,
      height: 620,
      backgroundColor: 0xffffff,
    });

    const WIDTH = 53;
    const { stage } = app;


   const random = (min: number, max: number) => Math.round(Math.random() * (max - min)) + min;


    const checkBump = new window.Bump(PIXI);

    window.addEventListener('pointerdown', () => {
      jump();
    });

    const dinosaurWrap = new PIXI.Container();
    dinosaurWrap.width = 86;

    const initDinosaur = () => {
      // 创建一个容器 放各个形态的恐龙
      dinosaurWrap.x = 30;
      dinosaurWrap.y = 438;
      // 恐龙-奔跑
      const dinosaurRun = createRectangle(
        'https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/cchao/dinosaur-runing.png',
        2,
      );
      dinosaurRun.play();
      dinosaurWrap.addChild(dinosaurRun);
      stage.addChild(dinosaurWrap);
    };

    const isGameOver = ref(false);

    const createCactus = () => {
      const num = random(1, 3);
      const nextObstacles = PIXI.Sprite.from(`https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/cchao/cactus${num}.png`);
      nextObstacles.x = 750;
      nextObstacles.y = 458;
      stage.addChild(nextObstacles);

      app.ticker.add(() => {
        if (isGameOver.value) return;
        // 53 恐龙宽度
        if (nextObstacles.x > -WIDTH) {
          nextObstacles.x -= step.value;
          isGameOver.value = checkBump.hit(dinosaurWrap, nextObstacles);
        } else stage.removeChild(nextObstacles);
      });
    };

    const createBird = () => {
      const nextObstacles = createRectangle(
        'https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/cchao/obstacle-bird.png',
        2,
      );
      nextObstacles.play();
      nextObstacles.x = 750;
      nextObstacles.y = 300;
      stage.addChild(nextObstacles);
      app.ticker.add(() => {
        if (isGameOver.value) return;
        // WIDTH 恐龙宽度
        if (nextObstacles.x > -WIDTH) {
          nextObstacles.x -= step.value;
          isGameOver.value = checkBump.hit(dinosaurWrap, nextObstacles);
        } else stage.removeChild(nextObstacles);
      });
    };

    // 设置四档速度
    const speedUp = (currentpProgress: number) => {
      if (currentpProgress > 500) step.value = 15;
      if (currentpProgress > 1000) step.value = 20;
      if (currentpProgress > 1500) step.value = 30;
      if (currentpProgress > 2000) step.value = 50;
    };

    const showDinosaurDeath = () => {
      const dinosaurDeath = PIXI.Sprite.from(
        'https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/cchao/dinosaur-death.png',
      );
      dinosaurDeath.x = 30;
      dinosaurDeath.y = currentY.value;
      dinosaurWrap.alpha = 0;
      stage.addChild(dinosaurDeath);
    };

    const addObstacle = (currentpProgress: number) => {
      if (currentpProgress % 500 === 0) createBird();
      else if (currentpProgress % 100 === 0) createCactus();
    };

    // 步长-控制速度
    const step = ref(10);
    // 得分
    const score = ref(0);

    // 背景-云
    const cloud = PIXI.Sprite.from('https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/cchao/dinosaur-cloud.png');
    cloud.x = 750;
    cloud.y = 30;

    // 平铺精灵 - 实现无缝滚动背景
    const background = PIXI.TilingSprite.from('https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/cchao/dinosaur-bg.png', {
      width: 2213,
      height: 28,
    });
    background.y = 500;

    // 记录恐龙跳跃的y，死亡状态需要用到
    const currentY = ref(0);

    const run = () => {
      stage.addChild(background, cloud);
      app.ticker.add(() => {
        stats.begin();
        stats.begin('physics');
        speedUp(score.value);
        addObstacle(score.value);
        if (!isGameOver.value) {
          currentY.value = dinosaurWrap.y;
          score.value += 1;
          cloud.x -= 0.5;
          background.tilePosition.x -= step.value;
        } else {
          stats.end('render');
          stats.end();
          showDinosaurDeath();
        }
      });
    };

    const isJumping = ref(false);
    const jump = () => {
      if (isGameOver.value) {
        window.location.reload();
        return;
      }
      if (isJumping.value) return;
      isJumping.value = true;
      gsap.to(dinosaurWrap, {
        y: 250,
        duration: 0.5,
        ease: 'power4.out',
      });
      gsap.to(dinosaurWrap, {
        delay: 0.3,
        y: 438,
        duration: 0.5,
        ease: 'sine.out',
        onComplete: () => {
          isJumping.value = false;
        },
      });
    };
    onMounted(() => {
      const pixiWrap = document.getElementById('pixiWrap');
      pixiWrap?.appendChild(app.view);
      initLoader({
        images: GAME_ASSETS,
        onProgress: (progress) => progress,
        onLoad: () => {
          initDinosaur();
          run();
          return '';
        },
      });
    });

    const stats = new GameStats();
    document.body.appendChild(stats.dom);

    return {
      score,
      isGameOver,
    };
  },
});
</script>

<style lang="postcss" scoped>
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
.chromgame {
  text-align: center;
  font-size: 20px;
  font-weight: 800;
}
</style>
