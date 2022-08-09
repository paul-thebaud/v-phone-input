<script lang="ts">
import { defineComponent, ref } from 'vue';
import useClipboard from 'vue-clipboard3';

export default defineComponent({
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
  setup(props) {
    const { toClipboard } = useClipboard();

    const copied = ref(false);

    const onCopy = () => {
      toClipboard(props.code);

      copied.value = true;
    };

    const onCopiedClose = () => {
      copied.value = false;
    };

    return { copied, onCopy, onCopiedClose };
  },
});
</script>

<template>
  <div>
    <v-slide-y-transition leave-absolute>
      <v-alert
        v-if="copied"
        type="success"
        border="start"
        class="mb-2"
        variant="tonal"
        density="compact"
        @update:model-value="onCopiedClose"
      >
        {{ name }} copied to clipboard.
        <template #close>
          <v-btn
            title="Close this alert"
            variant="text"
            size="small"
            class="mx-1"
            icon
            @click="onCopiedClose"
          >
            <v-icon icon="$close" />
          </v-btn>
        </template>
      </v-alert>
    </v-slide-y-transition>
    <v-sheet
      class="card--code"
      color="background"
      rounded
    >
      <div class="d-flex align-center">
        <pre class="flex-grow-1 px-3 py-2 overflow-x-auto"><code
          class="pa-0 transparent text--primary"
          v-text="code"
        /></pre>
        <v-btn
          :title="`Copy ${name} to clipboard`"
          variant="text"
          color="primary"
          size="small"
          class="mx-1"
          icon
          @click="onCopy"
        >
          <v-icon icon="mdi-content-copy" />
        </v-btn>
      </div>
    </v-sheet>
  </div>
</template>

<style
  lang="scss"
  scoped
>
  .v-alert {
    padding-inline-end: 0;

    :deep(.v-alert__prepend) {
      align-self: center;
    }
  }

  .card--code {
    border-left-width: 8px;
    border-left-style: solid;
    border-left-color: rgba(var(--v-theme-primary), var(--v-border-opacity));

    pre {
      border-right-width: thin;
      border-right-style: solid;
      border-right-color: rgba(var(--v-theme-primary), var(--v-border-opacity));
    }
  }
</style>
