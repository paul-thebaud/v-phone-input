<script
  setup
  lang="ts"
>
defineProps<{
  icon: string;
  title: string;
  value: string;
  color?: string;
}>();
</script>

<template>
  <div class="d-flex align-center px-4 py-2">
    <v-icon
      :icon="icon"
      :color="color"
      class="me-4"
    />
    <p class="d-flex flex-column my-0">
      <span class="text-overline font-weight-bold">{{ title }}</span>
      <br>
      <span class="text-body-2">{{ value }}</span>
    </p>
  </div>
</template>
