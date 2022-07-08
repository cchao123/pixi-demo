<template>
  <div class="spineAll">
    <SpineBoy />
    <SpineExample />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SpineBoy from './components/spineBoy.vue';
import SpineExample from './components/spineExample.vue';

export default defineComponent({
  components: {
    SpineBoy,
    SpineExample,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="postcss" scoped>
</style>
