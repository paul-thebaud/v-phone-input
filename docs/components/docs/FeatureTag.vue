<script
  lang="ts"
  setup
>
import SvgIcon from "../common/SvgIcon.vue";

defineProps<{
  icon: string;
  label: string;
}>();
</script>

<template>
  <span class="chip">
    <svg-icon
      :icon="icon"
      class="chip-icon"
    />
    <span>{{ label }}</span>
  </span>
</template>

<style>
.chip {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  line-height: 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  vertical-align: middle;
  background-color: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
}

.chip-icon {
  margin-inline-end: 0.375rem;
}
</style>
