<script
  lang="ts"
  setup
>
import useCountries from '@/composables/useCountries';
import useCountryIconComponent from '@/composables/useCountryIconComponent';
import useCountrySelectComponent from '@/composables/useCountrySelectComponent';
import useLabels from '@/composables/useLabels';
import useNamespacedSlots from '@/composables/useNamespacedSlots';
import { Country, CountryGuesser, CountryOrIso2 } from '@/types/countries';
import {
  CountryIconMode,
  CountryPhoneExample,
  MessageOptions,
  MessageResolver,
  PhoneValidator,
} from '@/types/options';
import { getOption } from '@/utils/options';
import {
  getExample,
  ParsedPhoneNumber,
  parsePhoneNumber,
  PhoneNumberFormat,
} from 'awesome-phonenumber';
import { computed, markRaw, nextTick, onMounted, ref, useAttrs, watch } from 'vue';
import { VListItem, VSelect, VTextField } from 'vuetify/components';

type VPhoneCountriesItems = ((Country & { preferred?: boolean }) | { divider: boolean })[];

type ValidationResult = string | boolean;

type ValidationRule =
  | ValidationResult
  | PromiseLike<ValidationResult>
  | ((value: any) => ValidationResult)
  | ((value: any) => PromiseLike<ValidationResult>);

type ValidateOnValue = 'blur' | 'input' | 'submit';

type VPhoneInputValidationResult = string | boolean | PromiseLike<string | boolean>;

type VPhoneInputValidationRule = VPhoneInputValidationResult | ((
  input: string,
  phone: ParsedPhoneNumber,
  messageOptions: MessageOptions,
) => VPhoneInputValidationResult);

type VPhoneInputProps = {
  label?: MessageResolver;
  ariaLabel?: MessageResolver;
  countryLabel?: MessageResolver;
  countryAriaLabel?: MessageResolver;
  placeholder?: MessageResolver;
  hint?: MessageResolver;
  invalidMessage?: MessageResolver;
  example?: CountryPhoneExample;
  appendIcon?: string | undefined;
  appendInnerIcon?: string | undefined;
  prependIcon?: string | undefined;
  prependInnerIcon?: string | undefined;
  rules?: VPhoneInputValidationRule[];
  validateOn?: ValidateOnValue | `${ValidateOnValue} lazy` | `lazy ${ValidateOnValue}` | 'lazy';
  countryIconMode?: CountryIconMode;
  allCountries?: Country[];
  preferCountries?: CountryOrIso2[];
  includeCountries?: CountryOrIso2[];
  excludeCountries?: CountryOrIso2[];
  defaultCountry?: CountryOrIso2 | undefined;
  country?: string;
  modelValue?: string | null;
  wrapperProps?: Record<string, any>;
  countryProps?: Record<string, any>;
  phoneProps?: Record<string, any>;
  /**
   * @deprecated
   * This public API will be replaced in a next major release.
   */
  displayFormat?: PhoneNumberFormat;
  /**
   * @deprecated
   * This public API will be replaced in a next major release.
   */
  enableSearchingCountry?: boolean;
  /**
   * @deprecated
   * This public API will be replaced in a next major release.
   */
  phoneValidator?: PhoneValidator;
  /**
   * @deprecated
   * This public API will be replaced in a next major release.
   */
  countryGuesser?: CountryGuesser;
  /**
   * @deprecated
   * This public API will be replaced in a next major release.
   */
  guessCountry?: boolean;
  /**
   * @deprecated
   * This public API will be replaced in a next major release.
   */
  disableGuessLoading?: boolean;
};

type VPhoneInputEmits = {
  (e: 'update:modelValue', value: string): void;
  (e: 'update:country', country: string): true;
};

type VPhoneInputSlots = {
  'country-input'(props: { props: (typeof countryInputProps)['value']; }): any;
  'country-selection'(props: { country: Country; }): any;
  'country-icon'(props: { country: Country; decorative: boolean; }): any;
  'country-title'(props: { country: Country; }): any;
  'country-append'(props: { country: Country; }): any;
  'phone-input'(props: { props: (typeof phoneInputProps)['value']; }): any;
  [key: `country:${string}`]: (props: any) => any;
  [key: string]: (props: any) => any;
};

const WRAPPER_ATTRS = [
  'id',
  'class',
  'style',
];

const INPUTS_COMMON_ATTRS = [
  'variant',
  'flat',
  'tile',
  'density',
  'singleLine',
  'hideDetails',
  'direction',
  'reverse',
  'color',
  'bgColor',
  'theme',
  'disabled',
  'readonly',
  'rounded',
];

const props = withDefaults(defineProps<VPhoneInputProps>(), {
  label: (): any => getOption('label'),
  ariaLabel: (): any => getOption('ariaLabel'),
  countryLabel: (): any => getOption('countryLabel'),
  countryAriaLabel: (): any => getOption('countryAriaLabel'),
  placeholder: (): any => getOption('placeholder'),
  hint: (): any => getOption('hint'),
  invalidMessage: (): any => getOption('invalidMessage'),
  example: (): any => getOption('example'),
  appendIcon: undefined,
  appendInnerIcon: undefined,
  prependIcon: undefined,
  prependInnerIcon: undefined,
  rules: () => [],
  validateOn: undefined,
  phoneValidator: getOption('phoneValidator'),
  countryIconMode: getOption('countryIconMode'),
  allCountries: () => getOption('allCountries'),
  preferCountries: () => getOption('preferCountries'),
  includeCountries: () => getOption('includeCountries'),
  excludeCountries: () => getOption('excludeCountries'),
  defaultCountry: getOption('defaultCountry'),
  countryGuesser: () => getOption('countryGuesser'),
  guessCountry: getOption('guessCountry'),
  disableGuessLoading: getOption('disableGuessLoading'),
  enableSearchingCountry: getOption('enableSearchingCountry'),
  displayFormat: getOption('displayFormat'),
  country: '',
  modelValue: '',
  wrapperProps: () => ({}),
  countryProps: () => ({}),
  phoneProps: () => ({}),
});

const emit = defineEmits<VPhoneInputEmits>();

const slots = defineSlots<VPhoneInputSlots>();
const attrs = useAttrs();

const {
  countriesCount,
  preferredCountries,
  otherCountries,
  guessingCountry,
  findCountry,
  firstCountry,
  setCountryPreference,
  guessCountry,
} = useCountries({ props });

const countryInput = ref(null);
const phoneInput = ref(null as (VTextField | null));

const { namespacedSlots } = useNamespacedSlots(slots, ['country']);

const { countryIconComponent } = useCountryIconComponent({ props });
const { countrySelectComponent } = useCountrySelectComponent({ props });

const countryFocused = ref(false);
const mergedRules = ref([] as ValidationRule[]);
const lazyCountry = ref(props.country as string | undefined);
const lazyValue = ref(props.modelValue || '' as string | null);
const lazyPhone = ref(markRaw(parsePhoneNumber('')));

const onlyAttrs = (matcher: (key: string) => boolean) => Object.keys(attrs)
  .reduce((filteredAttrs, attrKey) => (
    matcher(attrKey)
      ? { ...filteredAttrs, [attrKey]: attrs[attrKey] }
      : filteredAttrs
  ), {});

const wrapperAttrs = computed(() => ({
  ...onlyAttrs((attr) => WRAPPER_ATTRS.indexOf(attr) !== -1),
  ...props.wrapperProps,
}));

const fallbackCountry = computed(() => findCountry(props.defaultCountry) || firstCountry.value);
const activeCountry = computed(() => findCountry(lazyCountry.value) || fallbackCountry.value);
const countriesItems = computed(() => {
  const preferredItems: VPhoneCountriesItems = preferredCountries.value
    .map((c) => ({ ...c, preferred: true }));

  return [...preferredItems, ...otherCountries.value];
});

const format = (phone: ParsedPhoneNumber) => (
  phone.number?.[props.displayFormat]
  || phone.number?.input
  || ''
);
const example = computed(() => {
  if (props.example !== undefined) {
    return typeof props.example === 'function'
      ? props.example(activeCountry.value)
      : props.example;
  }

  return format(getExample(activeCountry.value.iso2));
});
const immediateValidation = computed(() => {
  const validateOn = new Set(props.validateOn?.split('') || []);

  return validateOn.size === 0 || validateOn.has('input');
});

const labels = useLabels({ props, country: activeCountry, example });

const validate = () => {
  if (immediateValidation.value) {
    phoneInput.value?.validate();
  }
};
const mergeRules = () => {
  const rules = props.rules.map((rule) => (
    typeof rule === 'function'
      ? (() => rule(lazyValue.value ?? '', lazyPhone.value, labels.messageOptions.value))
      : rule
  )) as ValidationRule[];
  if (!labels.invalidMessage.value) {
    mergedRules.value = rules;
  } else {
    mergedRules.value = [
      ...rules,
      () => !lazyValue.value
        || props.phoneValidator(lazyPhone.value)
        || (labels.invalidMessage.value as string),
    ];
  }
};

const onDisplayFormatChange = () => {
  if (props.phoneValidator(lazyPhone.value)) {
    lazyValue.value = format(lazyPhone.value);
  }
};
const onModelValueChange = () => {
  if (props.modelValue !== (lazyPhone.value.number?.input ?? '')
    && props.modelValue !== (lazyPhone.value.number?.e164 ?? '')
  ) {
    lazyValue.value = props.modelValue || '';
  }
};
const onCountryChange = () => {
  if (props.country && props.country !== lazyCountry.value) {
    lazyCountry.value = props.country;
  }
};

watch(() => props.rules, mergeRules, { deep: true, immediate: true });
watch(() => props.displayFormat, onDisplayFormatChange);
watch(() => props.modelValue, onModelValueChange);
watch(() => props.country, onCountryChange);

const onInvalidMessageChange = () => {
  mergeRules();
  if ((lazyValue.value ?? '') !== '') {
    validate();
  }
};

watch(labels.invalidMessage, onInvalidMessageChange);

const onCountryFocus = () => {
  countryFocused.value = true;
};
const onCountryBlur = () => {
  countryFocused.value = false;
};
const onLazyCountryOrValueChange = () => {
  lazyPhone.value = markRaw(parsePhoneNumber((lazyValue.value ?? '').trim(), {
    regionCode: lazyCountry.value,
  }));

  if (props.phoneValidator(lazyPhone.value)) {
    lazyValue.value = format(lazyPhone.value);
  }
};
const onLazyCountryChange = (
  _: string | undefined,
  oldLazyCountry: string | undefined,
) => {
  if (lazyCountry.value) {
    emit('update:country', lazyCountry.value);

    setCountryPreference(lazyCountry.value);
  } else {
    nextTick(() => {
      if (!lazyCountry.value) {
        lazyCountry.value = oldLazyCountry;
      }
    });
  }

  onLazyCountryOrValueChange();

  if ((lazyValue.value ?? '') !== '') {
    validate();
  }
};
const onLazyValueChange = () => {
  const countryInLazyValue = (lazyValue.value || '').startsWith('+');
  if (countryInLazyValue) {
    const detectedIso2 = parsePhoneNumber((lazyValue.value ?? '').trim()).regionCode;
    if (detectedIso2
      && lazyCountry.value !== detectedIso2
      && findCountry(detectedIso2)
    ) {
      lazyCountry.value = detectedIso2;
    }
  }

  onLazyCountryOrValueChange();
};
const onLazyPhoneChange = () => {
  const newValueRaw = lazyPhone.value.number?.input || '';
  const newValueE164 = lazyPhone.value.number?.e164 || newValueRaw;
  const newValueValid = props.phoneValidator(lazyPhone.value);
  if (
    props.modelValue !== newValueRaw
    || (props.modelValue !== newValueE164 && newValueValid)
  ) {
    emit('update:modelValue', (newValueValid ? newValueE164 : newValueRaw));
  }
};

watch(lazyCountry, onLazyCountryChange);
watch(lazyValue, onLazyValueChange);
watch(lazyPhone, onLazyPhoneChange, { deep: true });

const initializeCountry = async () => {
  if (lazyCountry.value) {
    return;
  }

  if (countriesCount.value === 1) {
    lazyCountry.value = firstCountry.value.iso2;

    return;
  }

  const guessedCountry = await guessCountry();
  if (!lazyCountry.value && guessedCountry) {
    lazyCountry.value = guessedCountry;
  }

  lazyCountry.value = lazyCountry.value || activeCountry.value.iso2;
};

const countryInputProps = computed(() => ({
  ref: countryInput,
  modelValue: lazyCountry.value,
  label: labels.countryLabel.value,
  'aria-label': labels.countryAriaLabel.value,
  items: countriesItems.value,
  itemTitle: 'name',
  itemValue: 'iso2',
  loading: guessingCountry.value,
  prependIcon: props.prependIcon,
  prependInnerIcon: props.prependInnerIcon,
  ...onlyAttrs((attr) => (
    WRAPPER_ATTRS.indexOf(attr) === -1 && INPUTS_COMMON_ATTRS.indexOf(attr) !== -1
  )),
  class: ['v-phone-input__country__input', {
    'v-phone-input--focused': countryFocused.value,
  }],
  'onUpdate:modelValue': (nextValue: string) => {
    lazyCountry.value = nextValue;
  },
  onFocus: onCountryFocus,
  onBlur: onCountryBlur,
}));

const phoneInputProps = computed(() => ({
  ref: phoneInput,
  modelValue: lazyValue.value,
  label: labels.label.value,
  'aria-label': labels.ariaLabel.value,
  placeholder: labels.placeholder.value,
  hint: labels.hint.value,
  rules: mergedRules.value,
  appendIcon: props.appendIcon,
  appendInnerIcon: props.appendInnerIcon,
  ...onlyAttrs((attr) => WRAPPER_ATTRS.indexOf(attr) === -1),
  validateOn: props.validateOn,
  class: 'v-phone-input__phone__input',
  type: 'tel',
  'onUpdate:modelValue': (nextValue: string) => {
    lazyValue.value = nextValue;
  },
}));

onMounted(() => {
  onLazyValueChange();
  nextTick(() => {
    initializeCountry();
  });
});

defineExpose({
  countryInputRef: countryInput,
  phoneInputRef: phoneInput,
  isValid: computed(() => phoneInput.value?.isValid ?? true),
  errorMessages: computed(() => phoneInput.value?.errorMessages ?? []),
  reset: async () => {
    await phoneInput.value?.reset();
  },
  resetValidation: async () => {
    await phoneInput.value?.resetValidation();
  },
  validate: async (silent: boolean) => (await phoneInput.value?.validate(silent)) ?? [],
});

defineOptions({
  components: {
    VListItem,
    VSelect,
    VTextField,
  },
});
</script>

<template>
  <div
    :class="{ 'v-phone-input--prepend-inner-icon': prependInnerIcon }"
    class="v-phone-input"
    v-bind="wrapperAttrs"
  >
    <slot
      name="country-input"
      v-bind="{ props: countryInputProps }"
    >
      <component
        :is="countrySelectComponent.type as any"
        v-bind="{
          ...countrySelectComponent.props,
          ...countryProps,
          menuProps: {
            maxHeight: 300,
            contentClass: 'v-phone-input__country__menu',
            closeOnContentClick: true,
            ...((countryProps ? countryProps.menuProps : undefined) || {}),
          },
          ...countryInputProps,
        }"
      >
        <template #selection>
          <slot
            name="country-selection"
            :country="activeCountry"
          >
            <slot
              name="country-icon"
              :country="activeCountry"
              :decorative="false"
            >
              <component
                :is="countryIconComponent"
                v-if="countryIconComponent"
                :country="activeCountry"
                :decorative="false"
              />
              <span v-else>
                {{ `+${activeCountry.dialCode}` }}
              </span>
            </slot>
          </slot>
        </template>
        <template #item="itemProps">
          <v-list-item v-bind="itemProps.props">
            <template #prepend>
              <slot
                name="country-icon"
                :country="itemProps.item.raw"
                :decorative="true"
              >
                <component
                  :is="countryIconComponent"
                  v-if="countryIconComponent"
                  :country="itemProps.item.raw"
                  :decorative="true"
                />
              </slot>
            </template>
            <template #title>
              <slot
                name="country-title"
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
                <span class="v-phone-input__country__append text-body-2">
                  +{{ itemProps.item.raw.dialCode }}
                </span>
              </slot>
            </template>
          </v-list-item>
        </template>
        <template
          v-for="(slotName, name) in namespacedSlots.country"
          #[name]="data"
        >
          <slot
            :name="slotName"
            v-bind="data"
          />
        </template>
      </component>
    </slot>
    <slot
      name="phone-input"
      v-bind="{ props: phoneInputProps }"
    >
      <component
        :is="VTextField"
        v-bind="{
          ...phoneProps,
          ...phoneInputProps,
        }"
      >
        <template
          v-for="(_, name) in namespacedSlots.default"
          #[name]="data"
        >
          <slot
            :name="name"
            v-bind="data"
          />
        </template>
      </component>
    </slot>
  </div>
</template>
