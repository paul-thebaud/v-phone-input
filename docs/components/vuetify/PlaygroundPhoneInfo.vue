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
  <div class="playground-phone-info">
    <v-icon
      :icon="icon"
      :color="color"
      class="me-4"
    />
    <p>
      <span class="text-label-medium">{{ title }}</span>
      <br>
      <span class="text-body-medium">{{ value }}</span>
    </p>
  </div>
</template>

<style scoped>
.playground-phone-info {
  display: flex;
  align-items: center;
  padding: 8px 16px;
}

.playground-phone-info p {
  margin: 0;
  line-height: 1.25rem;
}
</style>
