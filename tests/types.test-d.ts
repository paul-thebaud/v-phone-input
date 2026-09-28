import { h, ref } from "vue";
import type { VAutocomplete, VSelect } from "vuetify/components";
import {
  autocompletePhoneCountryInput,
  createVPhoneInput,
  providePhoneInputOptions,
  selectPhoneCountryInput,
  usePhoneInput,
  VPhoneInput,
  type VPhoneInputCountryObject,
} from "../src";

describe("types", () => {
  it("supports defaults and generic countries in createVPhoneInput()", () => {
    createVPhoneInput({
      ...selectPhoneCountryInput,
      countryProps: {
        filterMode: "union",
      },
      invalidMessage: ({ country }) => country.iso2,
    });

    createVPhoneInput({
      ...autocompletePhoneCountryInput,
      countryProps: {
        filterMode: "union",
      },
      invalidMessage: ({ country }) => country.iso2,
    });

    createVPhoneInput({
      ...selectPhoneCountryInput,
      countryProps: {
        // @ts-expect-error
        filterMode: "invalid",
      },
      // @ts-expect-error
      invalidMessage: ({ country }) => country.iso3,
    });

    createVPhoneInput({
      ...selectPhoneCountryInput,
      countryProps: {
        filterMode: "union",
      },
      countries: [
        {
          dialCode: "33",
          iso2: "FR",
          iso3: "FRA",
          name: "France",
        },
      ],
      invalidMessage: ({ country }) => country.iso3,
    });
  });

  it("supports defaults and generic countries in providePhoneInputOptions()", () => {
    providePhoneInputOptions({
      ...selectPhoneCountryInput,
      countryProps: {
        filterMode: "union",
      },
      invalidMessage: ({ country }) => country.iso2,
    });

    providePhoneInputOptions({
      ...autocompletePhoneCountryInput,
      countryProps: {
        filterMode: "union",
      },
      invalidMessage: ({ country }) => country.iso2,
    });

    providePhoneInputOptions({
      ...selectPhoneCountryInput,
      countryProps: {
        // @ts-expect-error
        filterMode: "invalid",
      },
      // @ts-expect-error
      invalidMessage: ({ country }) => country.iso3,
    });

    providePhoneInputOptions({
      ...selectPhoneCountryInput,
      countryProps: {
        filterMode: "union",
      },
      countries: [
        {
          dialCode: "33",
          iso2: "FR",
          iso3: "FRA",
          name: "France",
        },
      ],
      invalidMessage: ({ country }) => country.iso3,
    });
  });

  it("supports defaults in VPhoneInput", () => {
    h(VPhoneInput<VPhoneInputCountryObject>, {
      countryProps: {
        filterMode: "union",
      },
      invalidMessage: ({ country }) => country.iso2,
    });

    h(VPhoneInput<VPhoneInputCountryObject>, {
      countryProps: {
        // @ts-expect-error
        filterMode: "invalid",
      },
      // @ts-expect-error
      invalidMessage: ({ country }) => country.iso3,
    });

    // @ts-expect-error
    h(VPhoneInput<CustomCountryObject, CustomCountryComponent>, {
      ...autocompletePhoneCountryInput,
    });
  });

  it("supports custom country object and select in VPhoneInput", () => {
    type CustomCountryComponent = typeof VSelect;
    type CustomCountryObject = {
      dialCode: string;
      iso2: string;
      iso3: string;
      name: string;
    };

    h(VPhoneInput<CustomCountryObject, CustomCountryComponent>, {
      ...selectPhoneCountryInput,
      countryProps: {
        filterMode: "union",
      },
      countries: [
        {
          dialCode: "33",
          iso2: "FR",
          iso3: "FRA",
          name: "France",
        },
      ],
      invalidMessage: ({ country }) => country.iso3,
    });

    h(VPhoneInput<CustomCountryObject, CustomCountryComponent>, {
      ...selectPhoneCountryInput,
      countryProps: {
        // @ts-expect-error
        filterMode: "invalid",
      },
      // @ts-expect-error
      invalidMessage: ({ country }) => country.iso4,
    });

    // @ts-expect-error
    h(VPhoneInput<CustomCountryObject, CustomCountryComponent>, {
      ...autocompletePhoneCountryInput,
    });
  });

  it("supports custom country object and autocomplete in VPhoneInput", () => {
    type CustomCountryComponent = typeof VAutocomplete;
    type CustomCountryObject = {
      dialCode: string;
      iso2: string;
      iso3: string;
      name: string;
    };

    h(VPhoneInput<CustomCountryObject, CustomCountryComponent>, {
      ...autocompletePhoneCountryInput,
      countryProps: {
        filterMode: "union",
      },
      countries: [
        {
          dialCode: "33",
          iso2: "FR",
          iso3: "FRA",
          name: "France",
        },
      ],
      invalidMessage: ({ country }) => country.iso3,
    });

    h(VPhoneInput<CustomCountryObject, CustomCountryComponent>, {
      ...autocompletePhoneCountryInput,
      countryProps: {
        // @ts-expect-error
        filterMode: "invalid",
      },
      // @ts-expect-error
      invalidMessage: ({ country }) => country.iso4,
    });

    // @ts-expect-error
    h(VPhoneInput<CustomCountryObject, CustomCountryComponent>, {
      ...selectPhoneCountryInput,
    });
  });

  it("supports defaults and generic countries in usePhoneInput()", () => {
    usePhoneInput({
      modelValue: ref(),
      invalidMessage: ({ country }) => country.iso2,
    });

    usePhoneInput({
      modelValue: ref(),
      // @ts-expect-error
      invalidMessage: ({ country }) => country.iso3,
    });

    usePhoneInput({
      modelValue: ref(),
      countries: [
        {
          dialCode: "33",
          iso2: "FR",
          iso3: "FRA",
          name: "France",
        },
      ],
      invalidMessage: ({ country }) => country.iso3,
    });

    usePhoneInput({
      modelValue: ref(),
      // @ts-expect-error
      invalidMessage: ({ country }) => country.iso4,
    });
  });
});
