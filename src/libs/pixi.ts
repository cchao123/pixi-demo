import { Sprite, Loader } from 'pixi.js-legacy';
import * as PIXI from 'pixi.js';

export default PIXI;
// pixi.js 图片配置
export interface ImageSpriteConfig {
  url: string; // 图片地址
  width: number; // 图片宽度
  height: number; // 图片高度
  offsetX: number; // 图片相对容器 X 轴偏移
  offsetY: number; // 图片相对容器 Y 轴偏移
}

/**
 * @description 创建 Pixi 图片 Sprite
 * @param param Sprite 配置
 * @param scale 图片的放大倍数，默认为 1
 * @returns Sprite
 */
export const createImageSprite = (param: ImageSpriteConfig, scale = 1) => {
  const { url, width, height, offsetX, offsetY } = param;
  const sprite = Sprite.from(url);
  sprite.width = width * scale;
  sprite.height = height * scale;
  sprite.x = offsetX;
  sprite.y = offsetY;
  return sprite;
};

/**
 * @description pixi loader
 * @images 图片列表
 * @onProgress loder进度
 * @onLoad 加载完成
 */
// imgLoader
export const initLoader = (
  param = {
    images: [{ name: '', url: '' }],
    onProgress: (progress: number) => progress,
    onLoad: () => '',
  },
) => {
  const loader = Loader.shared;
  if (!loader) {
    return;
  }
  loader.load();
  loader.reset();
  param.images.forEach((item) => {
    loader.add(item.name, item.url);
  });
  loader.onProgress.add((res: any) => {
    param.onProgress(res.progress);
  });
  loader.load(() => {
    param.onLoad();
  });
  return loader;
};

/**
 * @description 创建序列帧动画
 * @param {string} url 素材地址
 * @param {number} num 镜头数
 * @param {number} speed 播放速度
 * @param {boolean} paused 是否默认暂停
 * @param {boolean} loop 是否自动播放
 */
export const createRectangle = (url: string, num: number, speed = 20, paused = false, loop = true) => {
  const texture = PIXI.BaseTexture.from(url);
  const cutnum = num;
  const spd = parseFloat((speed / 120).toFixed(2));
  const width = Math.floor(texture.width / cutnum);
  const { height } = texture;
  const frameArray = [];
  for (let i = 0; i < cutnum; i++) {
    const rectangle = new PIXI.Rectangle(i * width, 0, width, height);
    const frame = new PIXI.Texture(texture, rectangle);
    frameArray.push(frame);
  }
  const mv = new PIXI.AnimatedSprite(frameArray);
  mv.animationSpeed = spd;
  mv.loop = loop;
  if (paused) {
    mv.stop();
  }
  return mv;
};

/**
 * @description 多图拼合序列动画
 * @param {string[]} url 素材地址
 * @param {number[]} num 镜头数
 * @param {number} speed 播放速度
 * @param {boolean} paused 是否默认暂停
 * @param {boolean} loop 是否自动播放
 */
export const createRectangleArr = (url: string[], num: number[], speed = 20, paused = false, loop = true) => {
  const textures: PIXI.BaseTexture[] = [];
  url.forEach((item) => {
    const texture = PIXI.BaseTexture.from(item);
    textures.push(texture);
  });
  const { height } = textures[0];
  const width = Math.floor(textures[0].width / num[0]);
  const frameArray: PIXI.Texture[] = [];
  const spd = parseFloat((speed / 120).toFixed(2));
  const setRectangles = (itemNum: number, index: number) => {
    for (let i = 0; i < itemNum; i++) {
      const rectangle = new PIXI.Rectangle(i * width, 0, width, height);
      const frame = new PIXI.Texture(textures[index], rectangle);
      frameArray.push(frame);
    }
  };
  for (let i = 0; i < url.length; i++) {
    setRectangles(num[i], i);
  }
  const mv = new PIXI.AnimatedSprite(frameArray);
  mv.animationSpeed = spd;
  mv.loop = loop;
  if (paused) {
    mv.stop();
  }
  return mv;
};


export interface CenterParam {
  position: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
  [x: string]: any;
}

const defaultConfig: AppConfigType = {
  width: 750,
  height: 1334,
};

interface AppConfigType {
  width: number;
  height: number;
  antialias?: boolean;
  transparent?: boolean;
  backgroundColor?: number;
}

/**
 * @description 获取元素居中参数
 * @param {PIXI.Sprite | PIXI.Container | PIXI.AnimatedSprite} item 目标精灵或容器
 * @param {AppConfigType} APPCONFIG 舞台参数
 */
export const spriteCenter = (item: PIXI.Sprite | PIXI.Container | PIXI.AnimatedSprite, APPCONFIG: AppConfigType) => {
  const x = (APPCONFIG.width || defaultConfig.width - item?.width) / 2;
  const y = (APPCONFIG.height || defaultConfig.height - item?.height) / 2;
  const centerX = item.width / 2;
  const centerY = item.height / 2;
  return { x, y, centerX, centerY };
};

/**
 * @description 获取元素中心点
 * @param {PIXI.Sprite | PIXI.Container | PIXI.AnimatedSprite} item 目标精灵或容器
 */
export const povitCenter = (item: PIXI.Sprite | PIXI.Container | PIXI.AnimatedSprite) => {
  const center = {
    povitX: item.width / 2,
    povitY: item.height / 2,
    x: item.x + item.width / 2,
    y: item.y + item.height / 2,
  };
  return center;
};

/**
 * @description 绘制矩形
 * @param {number} width 宽度
 * @param {number} height 高度
 * @param {number} bgColor 背景色
 * @param {number} borderSize 边框宽
 * @param {number} borderColor 边框颜色
 * 
 */
export const drawSquare = (
  width: number,
  height: number,
  bgColor = 0xffffff,
  borderSize = 0,
  borderColor = 0x000000,
) => {
  const bg = new PIXI.Graphics();
  bg.beginFill(bgColor);
  if (borderSize > 0) {
    bg.lineStyle(borderSize, borderColor, 1);
  }
  bg.drawRect(0, 0, width, height);
  return bg;
};