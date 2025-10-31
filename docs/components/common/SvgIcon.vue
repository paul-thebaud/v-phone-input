<script
  setup
  lang="ts"
>
defineProps<{
  icon: string;
  title?: string;
}>();
</script>

<template>
  <span
    :role="title ? 'img' : undefined"
    :title="title"
  >
    <svg
      :class="$style.icon"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        :d="icon"
      />
    </svg>
  </span>
</template>

<style module>
.icon {
  display: inline;
  height: 1rem;
  width: 1rem;
}
</style>
