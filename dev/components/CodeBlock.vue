<template>
  <div>
    <v-slide-y-transition leave-absolute>
      <v-alert
        v-if="copied"
        type="success"
        close-icon="mdi-close"
        border="left"
        class="mb-2"
        dismissible
        dense
        text
        @input="onCopiedClose"
      >
        {{ name }} copied to clipboard.
      </v-alert>
    </v-slide-y-transition>
    <div class="d-flex align-center px-3 py-1 background rounded">
      <pre class="flex-grow-1"><code
        class="pa-0 transparent text--primary"
        v-text="code"
      /></pre>
      <v-btn
        title="Copy options to clipboard"
        icon
        @click="onCopyOptionsJson"
      >
        <v-icon class="text--primary">
          mdi-content-copy
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CodeBlock',
  props: {
    name: {
      required: true,
      type: String,
    },
    code: {
      required: true,
      type: String,
    },
  },
  data: () => ({
    copied: false,
  }),
  methods: {
    onCopyOptionsJson() {
      this.$copyText(this.code);

      this.copied = true;
    },
    onCopiedClose() {
      this.copied = false;
    },
  },
});
</script>
