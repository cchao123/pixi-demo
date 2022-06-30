import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://www.jianshu.com/p/6e53f8f9634d
import postCssPxToViewpot from 'postcss-px-to-viewport';
// https://www.npmjs.com/package/postcss-nested
import postcssNested from 'postcss-nested';
// import postCssImport from 'postcss-import';
import precss from 'precss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';

const viewportInfo = {
  viewportWidth: 375, // (Number) The width of the viewport.
  viewportHeight: 667, // (Number) The height of the viewport.
  unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
  viewportUnit: 'vw', // (String) Expected units.
  propList: ['*'],
  selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
  minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
  mediaQuery: true, // (Boolean) Allow px to be converted in media queries.
};

// https://vitejs.dev/config/
export default () => {
  const postcssPlugin = [
    precss(),
    postCssPxToViewpot(viewportInfo),
    cssnano({
      preset: 'default',
      'postcss-zindex': false,
    }),
    // postCssImport({}),
    // postCssUrl({}),
    postcssNested({}),
    autoprefixer({}),
  ];
  return defineConfig({
    plugins: [
      vue({
        include: [/\.vue$/],
      }),
    ],
    css: {
      postcss: {
        plugins: postcssPlugin,
      },
    },
    build: {
      emptyOutDir: true,
      target: 'es2015',
      outDir: 'dist',
    },
  })
}
