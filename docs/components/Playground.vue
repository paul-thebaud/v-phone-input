<script
  lang="ts"
  setup
>
import "flag-icons/css/flag-icons.min.css";
import "world-flags-sprite/stylesheets/flags32.css";
import "../../src/scss/v-phone-input.scss";
import {
  mdiCheckCircleOutline,
  mdiCloseCircleOutline,
  mdiEarth,
  mdiPhoneOutline,
} from "@mdi/js";
import type { PhoneNumberFormat } from "awesome-phonenumber";
import { useData } from "vitepress";
import { computed, reactive, ref, useTemplateRef, watchEffect } from "vue";
import type { ComponentProps } from "vue-component-type-helpers";
import { useTheme } from "vuetify";
import type { VTextField } from "vuetify/components";
import {
  autocompletePhoneCountryInput,
  selectPhoneCountryInput,
  VPhoneCountryFlagSprite,
  VPhoneCountryFlagSvg,
  VPhoneInput,
} from "../../src";
import PlaygroundPhoneInfo from "./playground/PlaygroundPhoneInfo.vue";

type PlaygroundConfig = {
  countryInputMode: "select" | "autocomplete";
  countryDisplayMode: "svg" | "sprite" | "text";
  displayFormat: PhoneNumberFormat;
  modelFormat: PhoneNumberFormat;
};

const defaultPlaygroundConfig: PlaygroundConfig = {
  countryInputMode: "select",
  countryDisplayMode: "svg",
  displayFormat: "national",
  modelFormat: "e164",
};

const emit = defineEmits<{
  "update:config": [
    Pick<PlaygroundConfig, "countryInputMode"> &
      Partial<Omit<PlaygroundConfig, "countryInputMode">>,
  ];
}>();

const { isDark } = useData();
const theme = useTheme();

const phoneInputRef = useTemplateRef("phoneInputRef");

const phone = ref("");

const countryInputMode = ref(defaultPlaygroundConfig.countryInputMode);

const countryInputProps = computed(
  () =>
    ({
      select: selectPhoneCountryInput,
      autocomplete: autocompletePhoneCountryInput,
    })[countryInputMode.value],
);

const countryDisplayMode = ref(defaultPlaygroundConfig.countryDisplayMode);

const countryDisplayComponent = computed(
  () =>
    ({
      svg: VPhoneCountryFlagSvg,
      sprite: VPhoneCountryFlagSprite,
      text: undefined,
    })[countryDisplayMode.value],
);

const phoneInputProps = reactive({
  variant: "filled" as ComponentProps<typeof VTextField>["variant"],
  density: "default" as ComponentProps<typeof VTextField>["density"],
  displayFormat: defaultPlaygroundConfig.displayFormat,
  modelFormat: defaultPlaygroundConfig.modelFormat,
});

const allPhoneInputProps = computed(
  // biome-ignore lint/suspicious/noExplicitAny: Using both select and autocomplete makes Vue types fail.
  (): Record<string, any> => ({
    countryDisplayComponent: countryDisplayComponent.value,
    ...countryInputProps.value,
    ...phoneInputProps,
  }),
);

watchEffect(() => {
  theme.change(isDark.value ? "dark" : "light");
});

watchEffect(() => {
  const undefinedIf = <V>(value: V, undefinedIfValue: V) =>
    value === undefinedIfValue ? undefined : value;

  emit("update:config", {
    countryInputMode: countryInputMode.value,
    countryDisplayMode: undefinedIf(countryDisplayMode.value, "text"),
    displayFormat: undefinedIf(phoneInputProps.displayFormat, "national"),
    modelFormat: undefinedIf(phoneInputProps.modelFormat, "e164"),
  });
});
</script>

<template>
  <v-app class="playground">
    <v-row>
      <v-col
        cols="12"
        lg="9"
      >
        <v-row>
          <v-col cols="12">
            <v-phone-input
              ref="phoneInputRef"
              v-model="phone"
              v-bind="allPhoneInputProps"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-select
              v-model="countryInputMode"
              label="Country input"
              :items="[
                'select',
                'autocomplete',
              ]"
            />
            <v-select
              v-model="countryDisplayMode"
              label="Country display"
              :items="[
                { value: 'svg', title: 'SVG' },
                { value: 'sprite', title: 'CSS sprite' },
                { value: 'text', title: 'Text (default)' },
              ]"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-select
              v-model="phoneInputProps.displayFormat"
              label="Display format"
              :items="[
                'national',
                'international',
                'e164',
                'rfc3966',
                'significant',
              ]"
            />
            <v-select
              v-model="phoneInputProps.modelFormat"
              label="Model format"
              :items="[
                'international',
                'e164',
                'rfc3966',
              ]"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-select
              v-model="phoneInputProps.variant"
              label="Variant"
              :items="[
                'filled',
                'outlined',
                'solo',
                'plain',
                'underlined',
              ]"
            />
            <v-select
              v-model="phoneInputProps.density"
              label="Density"
              :items="[
                'default',
                'comfortable',
                'compact',
              ]"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        lg="3"
      >
        <v-card
          class="playground__card"
          variant="flat"
        >
          <playground-phone-info
            title="Country"
            :value="phoneInputRef?.countryObject.name ?? '-'"
            :icon="mdiEarth"
          />
          <playground-phone-info
            title="Model value"
            :value="phone || '-'"
            :icon="mdiPhoneOutline"
          />
          <playground-phone-info
            title="Valid"
            :value="phoneInputRef?.isValid ? 'Yes' : 'No'"
            :icon="phoneInputRef?.isValid ? mdiCheckCircleOutline : mdiCloseCircleOutline"
            :color="phoneInputRef?.isValid ? 'success' : 'error'"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<style>
.playground {
  margin-top: 20px;
  content: "";
}

.playground .v-application__wrap {
  min-height: auto;
}

.playground .playground__card {
  background-color: var(--vp-code-block-bg);
}
</style>
