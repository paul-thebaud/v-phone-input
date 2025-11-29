import { getCountryCodeForRegionCode } from "awesome-phonenumber";
import { mount } from "cypress/vue";
import { h, type VNode } from "vue";
import { VApp, VContainer, VMain, type VSelect } from "vuetify/components";
import { createVuetify } from "vuetify/framework";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import { selectPhoneCountryInput, VPhoneInput, type VPhoneInputCountryObject } from "../../src";
import makePhoneInputTestTools from "./makePhoneInputTestTools";

const mountInApp = (vNode: VNode) =>
  mount(
    {
      render: () => h(VApp, [h(VMain, [h(VContainer, [vNode])])]),
    },
    {
      global: {
        plugins: [
          createVuetify({
            icons: {
              defaultSet: "mdi",
              aliases,
              sets: {
                mdi,
              },
            },
          }),
        ],
      },
    },
  );

const countryName = (country: string) => {
  const name = new Intl.DisplayNames(["en"], { type: "region" }).of(country);
  if (!name) {
    throw new Error("[test] Country name could not be translated.");
  }

  return name;
};

const countryInput = () =>
  cy.get(".v-phone-input > .v-phone-input__country__input");

const countryMenu = () => cy.get(".v-phone-input__country__menu .v-list");

const phoneInput = () =>
  cy.get('.v-phone-input > .v-phone-input__phone__input input[type="tel"]');
const phoneError = () =>
  cy.get(
    ".v-phone-input > .v-phone-input__phone__input .v-input__details .v-messages",
  );

const openCountryMenu = () => countryInput().click();

export default makePhoneInputTestTools({
  name: "Vuetify",
  mount: (props?) =>
    mountInApp(
      h(VPhoneInput<VPhoneInputCountryObject, typeof VSelect>, {
        ...selectPhoneCountryInput,
        country: props?.country,
        modelValue: props?.modelValue,
        ...props,
        // Eager is used to display error messages on mount.
        validateOn: "eager",
      }),
    ),
  selectCountry: (country) => {
    openCountryMenu();
    countryMenu().contains(countryName(country)).click({ force: true });
  },
  typePhone: (text) => phoneInput().type(text),
  expectCountry: (country) =>
    countryInput().contains(`+${getCountryCodeForRegionCode(country)}`),
  expectCountrySelectable: (country: string) => {
    openCountryMenu();
    countryMenu().contains(countryName(country)).should("exist");
  },
  expectCountryNotSelectable: (country: string) => {
    openCountryMenu();
    countryMenu().contains(countryName(country)).should("not.exist");
  },
  expectPhone: (text) => phoneInput().should("have.value", text),
  expectError: (text) => {
    if (text) {
      phoneError().contains(text);
    } else {
      phoneError().should("be.empty");
    }
  },
  countryInput,
  searchCountry: (text: string) => {
    countryInput().get('input[role="combobox"]').type(text);
  },
  mountInApp,
});
