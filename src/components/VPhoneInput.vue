<script lang="ts">
import useCountries from '@/composables/useCountries';
import useCountryIconComponent from '@/composables/useCountryIconComponent';
import useCountrySelectComponent from '@/composables/useCountrySelectComponent';
import useLabels from '@/composables/useLabels';
import useNamespacedSlots from '@/composables/useNamespacedSlots';
import { Country, CountryGuesser, CountryIso2, CountryOrIso2 } from '@/types/countries';
import { CountryIconMode, MessageOptions, MessageResolver } from '@/types/options';
import { PhoneNumberObject } from '@/types/phone';
import { getOption } from '@/utils/options';
import formatPhone from '@/utils/phone/formatPhone';
import makeExample from '@/utils/phone/makeExample';
import makePhone from '@/utils/phone/makePhone';
import { PhoneNumberFormat } from 'awesome-phonenumber';
import { computed, defineComponent, nextTick, onMounted, PropType, ref, watch } from 'vue';
import { VListItem, VSelect } from 'vuetify/components';

export type VPhoneCountriesItems = ((Country & { preferred?: boolean }) | { divider: boolean })[];

export type ValidationResult = string | boolean | PromiseLike<string> | PromiseLike<boolean>;

export type ValidationRule =
  | ValidationResult
  | ((value: any) => ValidationResult)

export type VPhoneInputValidationRule =
  | ValidationRule
  | ((input: string, phone: PhoneNumberObject) => ValidationResult)
  | ((input: string, phone: PhoneNumberObject, messageOptions: MessageOptions) => ValidationResult);

const INPUTS_COMMON_ATTRS = [
  'variant',
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
];

export default defineComponent({
  components: {
    VListItem,
    VSelect,
  },
  props: {
    label: {
      type: [String, Function] as PropType<MessageResolver>,
      default: () => getOption('label'),
    },
    ariaLabel: {
      type: [String, Function] as PropType<MessageResolver>,
      default: () => getOption('ariaLabel'),
    },
    countryLabel: {
      type: [String, Function] as PropType<MessageResolver>,
      default: () => getOption('countryLabel'),
    },
    countryAriaLabel: {
      type: [String, Function] as PropType<MessageResolver>,
      default: () => getOption('countryAriaLabel'),
    },
    placeholder: {
      type: [String, Function] as PropType<MessageResolver>,
      default: () => getOption('placeholder'),
    },
    hint: {
      type: [String, Function] as PropType<MessageResolver>,
      default: () => getOption('hint'),
    },
    invalidMessage: {
      type: [String, Function] as PropType<MessageResolver>,
      default: () => getOption('invalidMessage'),
    },
    appendIcon: {
      type: String,
      default: undefined,
    },
    appendInnerIcon: {
      type: String,
      default: undefined,
    },
    prependIcon: {
      type: String,
      default: undefined,
    },
    prependInnerIcon: {
      type: String,
      default: undefined,
    },
    rules: {
      type: Array as PropType<VPhoneInputValidationRule[]>,
      default: () => [],
    },
    countryIconMode: {
      type: [String, Object] as PropType<CountryIconMode>,
      default: () => getOption('countryIconMode'),
    },
    allCountries: {
      type: Array as PropType<Country[]>,
      default: () => getOption('allCountries'),
    },
    preferCountries: {
      type: Array as PropType<CountryOrIso2[]>,
      default: () => getOption('preferCountries'),
    },
    includeCountries: {
      type: Array as PropType<CountryOrIso2[]>,
      default: () => getOption('includeCountries'),
    },
    excludeCountries: {
      type: Array as PropType<CountryOrIso2[]>,
      default: () => getOption('excludeCountries'),
    },
    defaultCountry: {
      type: String as PropType<CountryOrIso2 | undefined>,
      default: () => getOption('defaultCountry'),
    },
    countryGuesser: {
      type: Object as PropType<CountryGuesser>,
      default: () => getOption('countryGuesser'),
    },
    guessCountry: {
      type: Boolean,
      default: () => getOption('guessCountry'),
    },
    disableGuessLoading: {
      type: Boolean,
      default: () => getOption('disableGuessLoading'),
    },
    enableSearchingCountry: {
      type: Boolean,
      default: () => getOption('enableSearchingCountry'),
    },
    displayFormat: {
      type: String as PropType<PhoneNumberFormat>,
      default: () => getOption('displayFormat'),
    },
    country: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String as PropType<string | null>,
      default: '',
    },
    countryProps: {
      type: Object,
      default: () => ({}),
    },
    phoneProps: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: {
    'update:modelValue': (_value: string) => true,
    'update:country': (_country: CountryIso2) => true,
  },
  setup(props, { attrs, emit, slots }) {
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
    const phoneInput = ref(null as ({ validate: () => void } | null));

    const { namespacedSlots } = useNamespacedSlots(slots, ['country']);

    const { countryIconComponent } = useCountryIconComponent({ props });
    const { countrySelectComponent } = useCountrySelectComponent({ props });

    const countryFocused = ref(false);
    const mergedRules = ref([] as ValidationRule[]);
    const lazyCountry = ref(props.country as CountryIso2 | undefined);
    const lazyValue = ref(props.modelValue || '' as string | null);
    const lazyPhone = ref({ number: { input: '' } } as PhoneNumberObject);

    const countryAttrs = computed(() => ({
      ...countrySelectComponent.value.props,
      ...Object.keys(attrs).reduce((filteredAttrs, attrKey) => {
        if (INPUTS_COMMON_ATTRS.indexOf(attrKey) !== -1) {
          return { ...filteredAttrs, [attrKey]: attrs[attrKey] };
        }

        return filteredAttrs;
      }, {}),
      ...props.countryProps,
      menuProps: {
        maxHeight: 300,
        contentClass: 'v-phone-input__country__menu',
        ...((props.countryProps ? props.countryProps.menuProps : undefined) || {}),
      },
    }));
    const phoneAttrs = computed(() => ({
      ...attrs,
      ...props.phoneProps,
    }));

    const fallbackCountry = computed(() => findCountry(props.defaultCountry) || firstCountry.value);
    const activeCountry = computed(() => findCountry(lazyCountry.value) || fallbackCountry.value);
    const countriesItems = computed(() => {
      const preferredItems: VPhoneCountriesItems = preferredCountries.value
        .map((c) => ({ ...c, preferred: true }));
      if (preferredItems.length && otherCountries.value.length) {
        preferredItems.push({ divider: true });
      }

      return [...preferredItems, ...otherCountries.value];
    });

    const format = (phone: PhoneNumberObject) => formatPhone(phone, props.displayFormat);
    const example = computed(() => format(makeExample(activeCountry.value.iso2).toJSON()));

    const labels = useLabels({ props, country: activeCountry, example });

    const validate = () => {
      // FIXME There is currently a bug with vuetify making the validate
      // FIXME method unavailable in production build.
      // FIXME Reproduce and create issue.
      const vuetifyValidate = phoneInput.value?.validate
        || (phoneInput.value as any)?._?.setupState?.validate;

      return vuetifyValidate();
    };
    const mergeRules = () => {
      const rules = props.rules.map((rule) => (
        typeof rule === 'function'
          ? (() => rule(lazyValue.value || '', lazyPhone.value, labels.messageOptions.value))
          : rule
      ));
      if (!labels.invalidMessage.value) {
        mergedRules.value = rules;
      } else {
        mergedRules.value = [
          ...rules,
          () => !lazyValue.value
            || lazyPhone.value.valid
            || (labels.invalidMessage.value as string),
        ];
      }
    };

    const onDisplayFormatChange = () => {
      if (lazyPhone.value.valid) {
        lazyValue.value = format(lazyPhone.value);
      }
    };
    const onModelValueChange = () => {
      if (props.modelValue !== lazyPhone.value.number.input
        && props.modelValue !== lazyPhone.value.number.e164
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
      validate();
    };

    watch(labels.invalidMessage, onInvalidMessageChange);

    const onCountryFocus = () => {
      countryFocused.value = true;
    };
    const onCountryBlur = () => {
      countryFocused.value = false;
    };
    const onLazyCountryOrValueChange = () => {
      lazyPhone.value = makePhone(lazyValue.value, lazyCountry.value).toJSON();

      if (lazyPhone.value.valid) {
        lazyValue.value = format(lazyPhone.value);
      }
    };
    const onLazyCountryChange = (
      _: CountryIso2 | undefined,
      oldLazyCountry: CountryIso2 | undefined,
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

      validate();
    };
    const onLazyValueChange = () => {
      const countryInLazyValue = (lazyValue.value || '').startsWith('+');
      if (countryInLazyValue) {
        const detectedIso2 = makePhone(lazyValue.value).getRegionCode();
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
      const newValue = lazyPhone.value.number.e164 || lazyPhone.value.number.input;
      if (newValue !== props.modelValue) {
        emit('update:modelValue', newValue);
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

    onMounted(() => {
      onLazyValueChange();
      nextTick(() => {
        initializeCountry();
      });
    });

    return {
      countryInput,
      phoneInput,
      namespacedSlots,
      countrySelectComponent,
      countryIconComponent,
      countryAttrs,
      phoneAttrs,
      countryFocused,
      guessingCountry,
      mergeRules,
      lazyCountry,
      lazyValue,
      mergedRules,
      activeCountry,
      labels,
      countriesItems,
      onCountryFocus,
      onCountryBlur,
    };
  },
});
</script>

<template>
  <div class="v-phone-input">
    <component
      :is="countrySelectComponent.type"
      ref="countryInput"
      v-model="lazyCountry"
      :label="labels.countryLabel.value"
      :aria-label="labels.countryAriaLabel.value"
      :items="countriesItems"
      item-title="name"
      item-value="iso2"
      :loading="guessingCountry"
      :prepend-icon="prependIcon"
      :prepend-inner-icon="prependInnerIcon"
      :class="{ 'v-phone-input--focused': countryFocused }"
      class="v-phone-input__country__input"
      v-bind="countryAttrs"
      @focus="onCountryFocus"
      @blur="onCountryBlur"
    >
      <template #selection>
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
        v-for="(parentName, name) in namespacedSlots.country"
        #[name]="data"
      >
        <slot
          :name="parentName"
          v-bind="data"
        />
      </template>
    </component>
    <v-text-field
      ref="phoneInput"
      v-model="lazyValue"
      :label="labels.label.value"
      :aria-label="labels.ariaLabel.value"
      :placeholder="labels.placeholder.value"
      :hint="labels.hint.value"
      :rules="mergedRules"
      :append-icon="appendIcon"
      :append-inner-icon="appendInnerIcon"
      class="v-phone-input__phone__input"
      type="tel"
      v-bind="phoneAttrs"
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
    </v-text-field>
  </div>
</template>
