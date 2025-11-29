<script
  lang="ts"
  setup
>
import { mdiPuzzle } from "@mdi/js";
import FeatureTag from "./FeatureTag.vue";
</script>

<template>
  <feature-tag
    :icon="mdiPuzzle"
    label="Composable"
  />
</template>
