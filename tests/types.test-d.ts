import { h, ref } from "vue";
import type { VAutocomplete } from "vuetify/components";
import {
  autocompletePhoneCountryInput,
  createVPhoneInput,
  providePhoneInputOptions,
  selectPhoneCountryInput,
  usePhoneInput,
  VPhoneInput,
} from "../src";

describe("types", () => {
  it("supports generic country and component in createVPhoneInput()", () => {
    createVPhoneInput({
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

    createVPhoneInput({
      ...selectPhoneCountryInput,
      countryProps: {
        // @ts-expect-error
        filterMode: "union",
      },
    });

    // @ts-expect-error
    createVPhoneInput({
      // @ts-expect-error
      invalidMessage: ({ country }) => country.iso3,
    });
  });

  it("supports generic country and component in providePhoneInputOptions()", () => {
    providePhoneInputOptions({
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

    providePhoneInputOptions({
      ...selectPhoneCountryInput,
      countryProps: {
        // @ts-expect-error
        filterMode: "union",
      },
    });

    // @ts-expect-error
    providePhoneInputOptions({
      // @ts-expect-error
      invalidMessage: ({ country }) => country.iso3,
    });
  });

  it("supports generic country and component in VPhoneInput", () => {
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

    // @ts-expect-error
    h(VPhoneInput<CustomCountryObject, CustomCountryComponent>, {
      ...selectPhoneCountryInput,
      countryProps: {
        filterMode: "union",
      },
    });

    // @ts-expect-error
    h(VPhoneInput<CustomCountryObject, CustomCountryComponent>, {
      invalidMessage: ({ country }) => country.iso3,
    });
  });

  it("supports generic country in usePhoneInput()", () => {
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
  });
});
