<script
  generic="
    Country extends VPhoneInputCountryObject = VPhoneInputCountryObject,
    CountryInputComponent extends VPhoneCountryInputComponent = typeof VSelect
  "
  lang="ts"
  setup
>
import { computed, ref, shallowRef, toRef, watch } from "vue";
import type { VSelect } from "vuetify/components";
import { VListItem, VTextField } from "vuetify/components";
import usePhoneInput from "../composables/usePhoneInput";
import usePhoneInputPluginOptions from "../composables/usePhoneInputPluginOptions.ts";
import omitBy from "../internals/omitBy.ts";
import pick from "../internals/pick";
import vPhoneInputSharedProperties from "../internals/vPhoneInputSharedProperties";
import makePhoneInputCompleteProps from "../props/makePhoneInputCompleteProps.ts";
import makePhoneInputProps from "../props/makePhoneInputProps.ts";
import type {
  VPhoneCountryInputComponent,
  VPhoneInputCountryObject,
  VPhoneInputExposed,
  VPhoneInputMessageFactoryContext,
  VPhoneInputNonModelEmits,
  VPhoneInputSlots,
} from "../types";

defineOptions({
  inheritAttrs: false,
  components: {
    VTextField,
    VListItem,
  },
});

// biome-ignore lint/suspicious/noExplicitAny: Temp TS fix for dynamic slots support.
const slots: any =
  defineSlots<VPhoneInputSlots<Country, CountryInputComponent>>();
const emit = defineEmits<VPhoneInputNonModelEmits<Country>>();
const props = defineProps(
  makePhoneInputCompleteProps<Country, CountryInputComponent>(),
);

const modelValue = defineModel<string>({ default: "" });
const country = defineModel<string>("country", { default: "" });

const { useOption } = usePhoneInputPluginOptions<
  Country,
  CountryInputComponent
>();

const countryInputComponentOption = useOption("countryInputComponent", props);
const countryInputComponentPropsOption = useOption(
  "countryInputComponentProps",
  props,
);
const countryDisplayComponentOption = useOption(
  "countryDisplayComponent",
  props,
);
const guessLoadingOption = useOption("guessLoading", props, true);
const wrapperAttrsOption = useOption("wrapperAttrs", props);
const countryPropsOption = useOption("countryProps", props);
const phonePropsOption = useOption("phoneProps", props);
const countryLabelOption = useOption("countryLabel", props, null);
const countryAriaLabelOption = useOption(
  "countryAriaLabel",
  props,
  (ctx: VPhoneInputMessageFactoryContext<Country>) =>
    `Country for "${ctx.label}"`,
);
const hintOption = useOption("hint", props);

const countryInputRef = shallowRef<CountryInputComponent>();
const phoneInputRef = shallowRef<VTextField>();

const countryInputFocused = ref(false);

const {
  countries,
  countryGuessing,
  resolveMessage,
  countryLabel,
  countryAriaLabel,
  label,
  ariaLabel,
  placeholder,
  invalidMessage,
  countryObject,
  phone,
  phoneObject,
  phoneValid,
} = usePhoneInput({
  country,
  modelValue,
  countryInputRef: computed(() => countryInputRef.value?.controlRef),
  phoneInputRef: computed(() => phoneInputRef.value?.controlRef),
  countryLocale: toRef(props, "countryLocale"),
  countryName: toRef(props, "countryName"),
  countries: toRef(props, "countries"),
  preferCountries: toRef(props, "preferCountries"),
  includeCountries: toRef(props, "includeCountries"),
  excludeCountries: toRef(props, "excludeCountries"),
  defaultCountry: toRef(props, "defaultCountry"),
  guessCountry: toRef(props, "guessCountry"),
  modelFormat: toRef(props, "modelFormat"),
  displayFormat: toRef(props, "displayFormat"),
  displayFormatDelay: toRef(props, "displayFormatDelay"),
  displayFormatOnBlur: toRef(props, "displayFormatOnBlur"),
  validate: toRef(props, "validate"),
  example: toRef(props, "example"),
  exampleFormat: toRef(props, "exampleFormat"),
  countryLabel: countryLabelOption,
  countryAriaLabel: countryAriaLabelOption,
  label: toRef(props, "label"),
  ariaLabel: toRef(props, "ariaLabel"),
  placeholder: toRef(props, "placeholder"),
  invalidMessage: toRef(props, "invalidMessage"),
});

const hint = computed(() => resolveMessage.value(hintOption.value));

const phoneInputRules = computed(() => [
  ...(props.rules ?? []),
  () => {
    if (phoneValid.value === false) {
      return invalidMessage.value ?? false;
    }

    return true;
  },
]);

const extractMenuProps = (from: { menuProps?: object } | null | undefined) =>
  from && "menuProps" in from ? from.menuProps : {};

const countryInputProps = computed(() => ({
  ...pick(props, vPhoneInputSharedProperties),
  ...(countryInputComponentPropsOption.value as Record<string, unknown>),
  ref: countryInputRef,
  modelValue: country.value,
  label: countryLabel.value,
  "aria-label": countryAriaLabel.value,
  itemTitle: "name",
  itemValue: "iso2",
  items: countries.value,
  prependIcon: props.prependIcon,
  prependInnerIcon: props.prependInnerIcon,
  appendInnerIcon: undefined,
  appendIcon: undefined,
  loading: guessLoadingOption.value && countryGuessing.value,
  ...(countryPropsOption.value as Record<string, unknown>),
  menuProps: {
    width: 300,
    maxHeight: 300,
    contentClass: "v-phone-input__country__menu",
    closeOnContentClick: true,
    ...extractMenuProps(
      countryInputComponentPropsOption.value as Record<string, unknown>,
    ),
    ...extractMenuProps(countryPropsOption.value as Record<string, unknown>),
  },
  class: [
    "v-phone-input__country__input",
    {
      "v-phone-input__country__input--focused": countryInputFocused.value,
    },
  ],
  onFocus: () => {
    countryInputFocused.value = true;
  },
  onBlur: () => {
    countryInputFocused.value = false;
  },
  "onUpdate:modelValue": (value: string) => {
    country.value = value;
  },
}));

const nonForwardedPropsKeys = [
  ...Object.keys(makePhoneInputProps<Country, CountryInputComponent>()),
  "modelValue",
  "country",
];

const forwardedProps = computed(() =>
  omitBy(
    props,
    (key) =>
      nonForwardedPropsKeys.indexOf(key) === -1 &&
      props[key] !== VTextField.props[key]?.default,
  ),
);

const phoneInputProps = computed(() => ({
  ...pick(props, vPhoneInputSharedProperties),
  ...forwardedProps.value,
  ref: phoneInputRef,
  modelValue: phone.value,
  label: label.value,
  "aria-label": ariaLabel.value,
  placeholder: placeholder.value,
  hint: hint.value,
  rules: phoneInputRules.value,
  prependIcon: undefined,
  prependInnerIcon: undefined,
  appendInnerIcon: props.appendInnerIcon,
  appendIcon: props.appendIcon,
  id: undefined,
  style: undefined,
  ...(phonePropsOption.value as Record<string, unknown>),
  class: "v-phone-input__phone__input",
  type: "tel",
  "onUpdate:modelValue": (value: string) => {
    phone.value = value;
  },
}));

const parsedSlots = computed(() =>
  (Object.keys(slots) as (string & keyof typeof slots)[]).reduce(
    (nextSlots, name) => {
      const [namespace, ...names] = name.split(":");

      if (namespace === "country-input" && names.length) {
        const targetName = names.join(":");
        if (targetName !== "selection" && targetName !== "item") {
          nextSlots.country[targetName] = name;
        }
      } else {
        nextSlots.default[name] = null;
      }

      return nextSlots;
    },
    {
      country: {} as Record<string, keyof typeof slots>,
      default: {} as Record<keyof typeof slots, null>,
    },
  ),
);

watch(countryObject, (next) => emit("update:country-object", next));
watch(phoneObject, (next) => emit("update:phone-object", next));

defineExpose<VPhoneInputExposed<Country, CountryInputComponent>>({
  countryInputRef,
  phoneInputRef,
  countryObject,
  phoneObject,
  isValid: computed(() => phoneInputRef.value?.isValid ?? null),
  errorMessages: computed(
    () => (phoneInputRef.value?.errorMessages ?? []) as string[],
  ),
  reset: async () => phoneInputRef.value?.reset(),
  resetValidation: async () => phoneInputRef.value?.resetValidation(),
  validate: async (silent) =>
    (await phoneInputRef.value?.validate(silent)) ?? [],
});
</script>

<template>
  <div
    :class="{ 'v-phone-input--prepend-inner-icon': prependInnerIcon }"
    class="v-phone-input"
    v-bind="wrapperAttrsOption as Record<string, unknown>"
  >
    <component
      :is="countryInputComponentOption"
      v-bind="countryInputProps"
    >
      <template #selection="selectionProps">
        <slot
          name="country-input:selection"
          v-bind="selectionProps"
        >
          <slot
            name="country-display"
            :country="countryObject"
            :decorative="false"
          >
            <component
              :is="countryDisplayComponentOption"
              v-if="countryDisplayComponentOption"
              :country="countryObject"
              :decorative="false"
            />
            <span v-else>{{ `+${countryObject.dialCode}` }}</span>
          </slot>
        </slot>
      </template>
      <template #item="itemProps">
        <slot
          name="country-input:item"
          v-bind="itemProps"
        >
          <v-list-item v-bind="itemProps.props">
            <template #prepend>
              <slot
                name="country-display"
                :country="itemProps.item.raw"
                :decorative="true"
              >
                <component
                  :is="countryDisplayComponentOption"
                  v-if="countryDisplayComponentOption"
                  :country="itemProps.item.raw"
                  :decorative="true"
                />
              </slot>
            </template>
            <template #title>
              <slot
                name="country-name"
                :country="itemProps.item.raw"
              >
                <span class="v-phone-input__country__title">
                  {{ itemProps.item.raw.name }}
                </span>
              </slot>
            </template>
            <template #append>
              <slot
                name="country-append"
                :country="itemProps.item.raw"
              >
                <span
                  v-if="countryDisplayComponentOption"
                  class="v-phone-input__country__append text-body-2"
                >
                  +{{ itemProps.item.raw.dialCode }}
                </span>
              </slot>
            </template>
          </v-list-item>
        </slot>
      </template>
      <template
        v-for="(targetName, name) in parsedSlots.country"
        #[name]="data"
      >
        <slot
          :name="targetName"
          v-bind="data"
        />
      </template>
    </component>
    <component
      :is="VTextField"
      v-bind="phoneInputProps"
    >
      <template
        v-for="(_, name) in parsedSlots.default"
        #[name]="data"
      >
        <slot
          :name="name"
          v-bind="data"
        />
      </template>
    </component>
  </div>
</template>
