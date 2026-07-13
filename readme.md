> 草稿箱躺了一年的文章：记录初次使用PIXI实践探索、可应用场景和搭配第三方库的玩法；

#### 技术选型：Pixi + GSAP、 扫下方二维码或点击[体验地址。](https://new.qq.com/qqfile/tnewsh5/short-term/centralAxis_pre.html#/)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6021b8da25524e91adec5e5d24755205~tplv-k3u1fbpfcp-watermark.image?)
`因部分接口下线，体验为纯前端代码`

### 游戏部分[完整地图](https://mat1.gtimg.com/qqcdn/tupload/1657251570694.png)：从开发视角来分析，需要实现以下三点:

### 1. 场景移动 & 人物移动

*   **`1.1` 人物的站立和行走切换：通过切换两个精灵的透明度**

![QQ20220628-145944.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/53380aad9b984885adf8f07ee030d81a~tplv-k3u1fbpfcp-watermark.image?)![人物素材-动态.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cdce66649fc1402b820402cd0b768270~tplv-k3u1fbpfcp-watermark.image?40)
![人物.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df74ff69111f494a9a18857c531c23fa~tplv-k3u1fbpfcp-watermark.image?)
**序列帧动画使用`Pixi.AnimatedSprite`方法，但这并不是唯一方案，也可以使用包含动画定义的精灵表`Pixi.Spritesheet`，再或者使用`pixi-spine`[跳转下文示例🔗](#spine)**

`代码示例片段：`

```js
    // 创建容器，放站立和行走精灵
    const playerWrap: PIXI.Container = new PIXI.Container();

    const textureArray = [
       PIXI.Texture.from('img_01.png'),
       PIXI.Texture.from('img_02.png'),
       ...
    ];
    // 行走序列帧
    const playerRuning = new PIXI.AnimatedSprite.from(textureArray);
    playerRuning.alpha = 0;

    // 站立状态
    const playerStand = PIXI.BaseTexture.from('https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/game-player.png');

    // 放入容器
    playerWrap.addChild(playerRuning, playerRuning);

    // 通过alpha值切换显示
    playerRuning.alpha = 0;
    playerStand.alpha = 1;
```

**[GKA](https://github.com/gkajs/gka)处理序列帧的小工具。**

*   **`1.2` 人物移动，通过GSAP控制背景的Y轴`如下示意图`，同时切换人物行走状态；**

`场景关系示意图：`
![场景关系示意图.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/082e489f193040fd8b4c1f9f99d05568~tplv-k3u1fbpfcp-watermark.image?)

`水平对其可视窗口演示：`
![dasdaddsad.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b4471bfe84d4ce0a1b38519eb2a9c0b~tplv-k3u1fbpfcp-watermark.image?)

*   **`1.3` 地图平移临界情况：地图不能再向上平移时候，开始平移人物Y轴，直至临界点；`上图后两张示意`**
*   **`1.4` GSAP处理地图超出回归原点的渐补动画。`再次称赞GSAP，处理多段动画非常轻松!`**
    ![reset.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e5b368fbc3d466c85e13622f572c2a4~tplv-k3u1fbpfcp-watermark.image?)

### 2. 转盘转动 & 转动音效

*   **`2.1`转盘的角度：计算转动到目标数值的角度，再通过GSAP进行渐补旋转动画：**
    ![转盘角度.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dbe7c20420664d44a3b822c28c8b230e~tplv-k3u1fbpfcp-watermark.image?)

```javascript
    // 旋转角度累计
    const currentDeg = ref(0);
    // 转盘一格角度
    const STEP_DEG = 72;
    // 两圈起步
    const BASE_CIRCLES = 360 * 2;
    const getRotateDeg = (r: number) => {
      if (r > lastStep.value) {
        currentDeg.value = currentDeg.value + BASE_CIRCLES + Math.abs((lastStep.value - r) * STEP_DEG);
      } else {
        currentDeg.value = currentDeg.value + BASE_CIRCLES - Math.abs((lastStep.value - r) * STEP_DEG);
      }
    };

  const deg = getRotateDeg('目标数字')

  // 旋转动画
  gsap.to('转盘元素', {
    rotate: -deg,
    duration: 2,
    // Ease Visualizer: https://greensock.com/ease-visualizer
    ease: 'circ.out',
    onComplete: () => {
      cb();
    },
  });
```

**在后期整理文章时，发现GSAP中 [DirectionalRotationPlugin](https://www.tweenmax.com.cn/DirectionalRotationPlugin/) 可以实现当前角度补间至目标角度。**

*   **`2.2` 转盘点击的同时播放音乐：**  `sound功能比较完善,即使非pixi项目也可以作为音效处理方案`

```js
  // 音乐播放插件
  import { sound } from '@pixi/sound';

  // 加载音乐
  sound.add('table', {
    url: `https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/table.mp3`,
    preload: true,
  });

  // 播放
  sound.play(‘table’);
```

### 3.海报部分：标签部分提前绘制并设置为透明，根据解锁情况显示。

![1111321312.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18da1226a2154ec1a9e1d29c75fb5883~tplv-k3u1fbpfcp-watermark.image?)
![WechatIMG424@0.5x.jpg](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97f7cafc844d44d8a40047a781143634~tplv-k3u1fbpfcp-watermark.image?)

**这里`Pixi`跟`html2canvas`做一个比较：**

*   **`Pixi`写海报花的时长多一些，但渲染效果和体验上优于后者，并且不会出现奇怪的兼容问题。**
*   **`html2canvas`异步生成在体验上会差一点，并且各个版本存在不同问题；优点是处理掺杂逻辑的海和非固定尺寸的海报非常方便，且开发快。**
    **附两个html2canvas例子来对比：**

![11111111.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/237820a7d4a04776ba4a487e4d0b9d5c~tplv-k3u1fbpfcp-watermark.image?)

**自己撸了个工具：可以同时输出`Pixi` & `HTML2canvas` 源代码，实现粘贴即用、减少重复代码开发。**
[**【低代码概念为自己做一款辅助开发工具。】**](https://juejin.cn/post/7224007334514425911)

***

> **接下来是开发过程以及结束后调研的笔记部分和应用:**

## Pixi可以做一些有意思的事情：`此处省略代码块，底部附部分demo`

*   **使用Pixi中`SimpleRope`方法：成功复原出一张表情包🐧！[演示DEMO](https://new.qq.com/qqfile/tnewsh5/short-term/cchao_pre.html#/mesh)**

![绳子演示.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4fd6afa0b1854b70b18e0b1736f770de~tplv-k3u1fbpfcp-watermark.image?)
![longQQ.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10b40853425d4877b0b67d264da00c95~tplv-k3u1fbpfcp-watermark.image?)

**Pixi 内置滤镜:**  **[演示DEMO](https://new.qq.com/qqfile/tnewsh5/short-term/cchao_pre.html#/filter)**

```js
// 直接使用PIXI.filters的BlurFilter滤镜
const filterContainer: PIXI.Container = new PIXI.Container();
const blurFilter1 = new PIXI.filters.BlurFilter();
filterContainer.filters = [blurFilter1];
```

![图2313213层 1.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f884c0f756d6404d9ce9529c910d2215~tplv-k3u1fbpfcp-watermark.image?)

**Pixi 滤镜置换: 动态的滤镜**

```js
const filterContainer: PIXI.Container = new PIXI.Container();
const displacementSprite = PIXI.Sprite.from('xxx');
const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
filterContainer.filters = [displacementFilter];

const velocity =1;
const ani = () => {
  requestAnimationFrame(bgAutoAni);
  displacementSprite.x += velocity;
  displacementSprite.y += velocity;
};
ani();
```

![滤镜效果.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6873395b557940578ab1f0250a4e8140~tplv-k3u1fbpfcp-watermark.image?)

**Pixi-filter [更多滤镜开箱即用](https://github.com/pixijs/filters)：** `PixiJS 在4.0.0版本的时候将非核心滤镜转移到新的包。`

![图2222层 1.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e6ed92cf75f4954ba3aac14a8ac5594~tplv-k3u1fbpfcp-watermark.image?)

```js
// 引入滤镜
import { AsciiFilter } from '@pixi/filter-ascii';
import { PixelateFilter } from '@pixi/filter-pixelate';

// @param {number}
const Filter1 = new AsciiFilter(10);
const Filter2 = new PixelateFilter(20);

// 创建精灵
const spring = PIXI.Sprite.from('https://xxxxxx.png');
// 单个滤镜
img.filters = [Filter1];
// 混合多个滤镜
img.filters = [Filter1, Filter2];

```

*   <span id="spine">**Pixi内使用Spine：[演示DEMO](https://new.qq.com/qqfile/tnewsh5/short-term/cchao_pre.html#/spine)** `素材扒自spine官网`</span>

![触控栏快照2022-06-19 下午6.50.26.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a19062a48e4647c99d1c1f4ff931a12e~tplv-k3u1fbpfcp-watermark.image?)

![QQ20230420-004953.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ecbf20690884938b280e5ac5029644b~tplv-k3u1fbpfcp-watermark.image?)

<br />

## Pixi的定位是渲染引擎，能力有限；如果需要制作交互型应用，可以引入三方库来协作开发。

*   #### Pixi + p2.js： `在pixi中使用物理引擎` [演示DEMO](https://new.qq.com/qqfile/tnewsh5/short-term/cchao_pre.html#/physics)

![物理引擎.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c8b683d695c42378b1d27076a754606~tplv-k3u1fbpfcp-watermark.image?)

*   #### Pixi + Bump.js `在pixi中使用碰撞检测` 实现Chrom断网小游戏。[演示DEMO](https://new.qq.com/qqfile/tnewsh5/short-term/cchao_pre.html#/chrom)

![dinosaur-death.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ceb3c1e652584f049c38ece423b566f6~tplv-k3u1fbpfcp-watermark.image?)

```javascript
// 2D 碰撞检测
const b = new window.Bump(PIXI);
// true触碰 false未触碰
const isHit = b.hit(spirit1, spirit2);
```

![QQ20230420-004953.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ebb31b95fa7141b99d81c93e421891cc~tplv-k3u1fbpfcp-watermark.image?)

*   #### Pixi+ GSAP 实现动画类H5。[演示DEMO](https://new.qq.com/qqfile/tnewsh5/short-term/2022mother/2022mother.html)

![贝塞尔曲线1.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9ff0c7effe74a6ab6a9ed5289d881a4~tplv-k3u1fbpfcp-watermark.image?)

#### 文章中部分示例代码仓库：

> **<https://github.com/cchao123/pixi-demo>**

#### 最后附上相关链接：有兴趣的小伙伴自行查阅

> Pixi官网 **<https://pixijs.com/>**

> 声音 **<https://github.com/pixijs/sound>**

> GSAP **<https://github.com/greensock/GSAP>**

> 物理引擎 **<https://github.com/schteppe/p2.js>**

> 物理引擎 **<http://www.cpiet.com/>**

> Spine **<http://zh.esotericsoftware.com/>**


> Pixi官网 https://pixijs.com/
