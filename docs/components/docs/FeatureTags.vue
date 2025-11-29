<script
  lang="ts"
  setup
>
import ComponentFeatureTag from "./ComponentFeatureTag.vue";
import ComposableFeatureTag from "./ComposableFeatureTag.vue";

defineProps<{
  component?: boolean;
  composable?: boolean;
}>();
</script>

<template>
  <p>
    <component-feature-tag v-if="component"/>
    <composable-feature-tag
      v-if="composable"
      :class="{ 'margin-start': component }"
    />
  </p>
</template>

<style>
.margin-start {
  margin-inline-start: 0.25rem;
}
</style>
