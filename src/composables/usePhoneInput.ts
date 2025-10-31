import { type ParsedPhoneNumber, parsePhoneNumber } from "awesome-phonenumber";
import { computed, isRef, ref, shallowRef, unref, watch } from "vue";
import formatPhoneObject from "../internals/formatPhoneObject";
import type {
  VPhoneInputComposable,
  VPhoneInputComposableOptions,
  VPhoneInputCountryGuesserResult,
  VPhoneInputCountryObject,
} from "../types";
import usePhoneInputCountries from "./usePhoneInputCountries";
import usePhoneInputMessages from "./usePhoneInputMessages";
import usePhoneInputPluginOptions from "./usePhoneInputPluginOptions.ts";

/**
 * Composable to create a custom phone input with two fields: one for country
 * selection and another for phone number.
 *
 * @param options
 */
export default function usePhoneInput<Country extends VPhoneInputCountryObject>(
  options: VPhoneInputComposableOptions<Country>,
): VPhoneInputComposable<Country> {
  const countries = usePhoneInputCountries(options);

  const { useOption } = usePhoneInputPluginOptions<Country>();

  const guessCountryOption = useOption("guessCountry", options);
  const modelFormatOption = useOption("modelFormat", options, "e164" as const);
  const displayFormatOption = useOption(
    "displayFormat",
    options,
    "national" as const,
  );
  const displayFormatDelayOption = useOption("displayFormatDelay", options);
  const displayFormatOnBlurOption = useOption(
    "displayFormatOnBlur",
    options,
    true,
  );
  const validateOption = useOption(
    "validate",
    options,
    (phone: ParsedPhoneNumber | null) => !phone || phone.valid,
  );

  const countryInputRef =
    options.countryInputRef ?? shallowRef<{ $el: HTMLElement } | HTMLElement>();
  const phoneInputRef =
    options.phoneInputRef ?? shallowRef<{ $el: HTMLElement } | HTMLElement>();

  const phone = ref<string | null>(null);
  const country = options.country ?? ref<string | null>();
  const countryGuessing = ref(false);
  const countryDefined = ref(!!country.value);

  country.value = countries.fallbackCountry.value.iso2;

  const countryObject = computed({
    get: () =>
      countries.findCountry.value(country.value) ??
      countries.fallbackCountry.value,
    set: (value) => {
      country.value = value.iso2;
    },
  });

  const phoneObject = computed(() => {
    const input = (phone.value ?? "").trim();

    return input !== ""
      ? parsePhoneNumber((phone.value ?? "").trim(), {
          regionCode: countryObject.value.iso2,
        })
      : null;
  });

  const phoneValid = computed(() => {
    if (validateOption.value === null) {
      return null;
    }

    return validateOption.value(phoneObject.value);
  });

  const phoneFormatted = computed(() => {
    if (phoneObject.value === null) {
      return phone.value ?? "";
    }

    return modelFormatOption.value !== null
      ? formatPhoneObject(modelFormatOption.value, phoneObject.value) ||
          (phone.value ?? "")
      : (phoneObject.value.number?.input ?? "");
  });

  const displayFormatOnBlurCanBound = computed(
    () => !!countryInputRef.value || !!phoneInputRef.value,
  );

  let delayedFormatPhoneInputValueTimeout: ReturnType<typeof setTimeout>;
  const formatPhoneInputValue = () => {
    clearTimeout(delayedFormatPhoneInputValueTimeout);

    if (
      phoneObject.value &&
      phoneValid.value &&
      displayFormatOption.value !== null
    ) {
      phone.value = formatPhoneObject(
        displayFormatOption.value,
        phoneObject.value,
      );
    }
  };

  const onModelValueChange = (next: string | null | undefined) => {
    if (
      next !== (phoneObject.value?.number?.input ?? "") &&
      next !== phoneFormatted.value
    ) {
      phone.value = next ?? "";
      formatPhoneInputValue();
    }
  };

  const onCountryChange = (
    next: string | null | undefined,
    prev: string | null | undefined,
  ) => {
    countryDefined.value = true;

    if (!next || !countries.findCountry.value(next)) {
      country.value = prev ?? countries.fallbackCountry.value.iso2;

      return;
    }

    if (guessCountryOption.value && "memoized" in guessCountryOption.value) {
      if (isRef(guessCountryOption.value.memoized)) {
        guessCountryOption.value.memoized.value = next;
      } else {
        guessCountryOption.value.memoized = next;
      }
    }
  };

  const onPhoneChange = (
    next: string | null | undefined,
    prev: string | null | undefined,
  ) => {
    if (typeof next !== "string") {
      phone.value = "";

      return;
    }

    const meaningLessCharsRegExp = /[^0-9]+/g;
    if (
      typeof prev === "string" &&
      next.length < prev.length &&
      next.replace(meaningLessCharsRegExp, "") ===
        prev.replace(meaningLessCharsRegExp, "")
    ) {
      // User is removing non-number chars from the input, do not trigger formatting.
      return;
    }

    if (phoneObject.value?.regionCode) {
      const phoneCountry = countries.findCountry.value(
        phoneObject.value.regionCode,
      );
      if (phoneCountry) {
        countryObject.value = phoneCountry;
      }
    }
  };

  const onPhoneObjectChange = () => {
    const displayFormatDelay =
      displayFormatOnBlurOption.value === null ||
      !displayFormatOnBlurCanBound.value
        ? (displayFormatDelayOption.value ?? true)
        : displayFormatDelayOption.value;
    if (displayFormatDelay === true || typeof displayFormatDelay === "number") {
      const displayFormatDelayOrDefault =
        displayFormatDelay === true ? 1000 : displayFormatDelay;
      if (displayFormatDelayOrDefault > 0) {
        delayedFormatPhoneInputValueTimeout = setTimeout(
          formatPhoneInputValue,
          displayFormatDelayOrDefault,
        );
      } else {
        formatPhoneInputValue();
      }
    }
  };

  const onPhoneFormattedChange = () => {
    options.modelValue.value = phoneFormatted.value;
  };

  const onInputBlur = () => {
    if (displayFormatOnBlurOption.value ?? true) {
      formatPhoneInputValue();
    }
  };

  const onInputRefChange = (
    next: { $el: HTMLElement } | HTMLElement | null | undefined,
    prev: { $el: HTMLElement } | HTMLElement | null | undefined,
  ) => {
    const unrefElement = (
      value: { $el: HTMLElement } | HTMLElement | null | undefined,
    ): HTMLElement | null | undefined =>
      (value as { $el: HTMLElement })?.$el ?? value;

    unrefElement(prev)?.removeEventListener("blur", onInputBlur);
    unrefElement(next)?.addEventListener("blur", onInputBlur);
  };

  watch(displayFormatOption, formatPhoneInputValue);
  watch(options.modelValue, onModelValueChange);
  watch(phone, onPhoneChange);
  watch(country, onCountryChange);
  watch(phoneObject, onPhoneObjectChange);
  watch(phoneFormatted, onPhoneFormattedChange);
  watch(countryInputRef, onInputRefChange, { immediate: true });
  watch(phoneInputRef, onInputRefChange, { immediate: true });

  // Trigger the phone input value watcher so an already filled number will
  // produce a country initialization.
  phone.value = options.modelValue.value ?? "";
  if (phoneValid.value) {
    formatPhoneInputValue();
  }

  // If country input value is still non-user defined, we will try to guess it.
  if (!countryDefined.value) {
    const guessCountry = () => {
      if (countries.countries.value.length === 1) {
        return countries.countries.value[0];
      }

      const guessCountryValue = guessCountryOption.value;
      if (guessCountryValue) {
        const memoizedGuessedCountry = unref(guessCountryValue.memoized);
        if (memoizedGuessedCountry) {
          return memoizedGuessedCountry;
        }

        return guessCountryValue();
      }

      return null;
    };

    countryGuessing.value = true;

    const useGuessedCountry = (
      guessedCountry: VPhoneInputCountryGuesserResult,
    ) => {
      countryObject.value =
        countries.findCountry.value(guessedCountry) ??
        countries.fallbackCountry.value;
      countryGuessing.value = false;
    };

    const guessedCountry = guessCountry();

    if (guessedCountry && typeof guessedCountry !== "string") {
      (async () => {
        useGuessedCountry(await guessedCountry);
      })();
    } else {
      useGuessedCountry(guessedCountry);
    }
  }

  return {
    ...countries,
    ...usePhoneInputMessages({
      ...options,
      country: countryObject,
      exampleFormat: computed(
        () => unref(options.displayFormat) ?? unref(options.exampleFormat),
      ),
    }),
    countryInputRef,
    phoneInputRef,
    phone,
    countryObject,
    phoneObject,
    phoneValid,
    countryGuessing,
    formatPhoneInputValue,
  };
}
