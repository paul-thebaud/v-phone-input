<script
  lang="ts"
  setup
>
import { mdiXml } from "@mdi/js";
import FeatureTag from "./FeatureTag.vue";
</script>

<template>
  <feature-tag
    :icon="mdiXml"
    label="Component"
  />
</template>
