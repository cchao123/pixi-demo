<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, computed, watch } from 'vue';

export default defineComponent({
  setup() {
    return {
    };
  },
});
</script>
<style lang="postcss">
html.borderbox *,
html.borderbox *:before,
html.borderbox *:after {
  box-sizing: border-box;
}

body {
  font-family: -apple-system-font, 'PingFang SC', 'Hiragino Sans GB', 'Heiti SC', 'Microsoft YaHei',
    'WenQuanYi Micro Hei';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 26px;
  font-weight: 200;
  color: #41414e;
  margin: 0;
  padding: 0;
  border: 0;
}

body * {
  user-select: none;
}

body input,
body textarea {
  user-select: text;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

p,
h3,
h4,
dd,
dt {
  margin: 0;
}

.menu {
}
</style>
