<template>
  <div>
    <div class="testscroll"></div>
    <FilterBlur></FilterBlur>
    <FilterDisplacement></FilterDisplacement>
    <FilterExample></FilterExample>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import FilterBlur from './components/filterBlur.vue';
import FilterDisplacement from './components/filterDisplacement.vue';
import FilterExample from './components/filterExample.vue';

export default defineComponent({
  components: {
    FilterBlur,
    FilterDisplacement,
    FilterExample,
  },
  setup() {
    onMounted(() => {
    });
    return {};
  },
});
</script>

<style lang="postcss" scoped>
.testscroll {
  position: fixed;
  width: 100%;
  top: 0;
  height: 850px;
}</style>
