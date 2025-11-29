import "vuetify/styles";
import "flag-icons/css/flag-icons.min.css";
import "world-flags-sprite/stylesheets/flags32.css";
import { h } from "vue";
import {
  autocompletePhoneCountryInput,
  selectPhoneCountryInput,
  VPhoneCountryFlagSprite,
  VPhoneCountryFlagSvg,
} from "../../src";
import SlotsPhoneInput from "../fixtures/SlotsPhoneInput.vue";
import vuetifyPhoneInputTestTools from "../fixtures/vuetifyPhoneInputTestTools";

declare global {
  namespace Cypress {
    interface Chainable {
      compareSnapshot(options: string): Chainable<Element>;
    }
  }
}

describe("VuetifyPhoneInput", () => {
  const tools = vuetifyPhoneInputTestTools;

  it("prohibits country clearing", () => {
    tools.mount({
      countryProps: {
        clearable: true,
        persistentClear: true,
      },
    });

    tools.selectCountry("FR");
    tools.expectCountry("FR");

    tools.countryInput().get('.v-field__clearable [role="button"]').click();
    tools.expectCountry("FR");
  });

  it("searches country by name", () => {
    tools.mount({
      ...autocompletePhoneCountryInput,
    });

    tools.expectCountrySelectable("AF");
    tools.expectCountrySelectable("FR");

    tools.searchCountry("Fran");

    tools.expectCountryNotSelectable("AF");
    tools.expectCountrySelectable("FR");
  });

  it("searches country by dial code", () => {
    tools.mount({
      ...autocompletePhoneCountryInput,
    });

    tools.expectCountrySelectable("AF");
    tools.expectCountrySelectable("FR");

    tools.searchCountry("33");

    tools.expectCountryNotSelectable("AF");
    tools.expectCountrySelectable("FR");
  });

  (
    [
      ["select", selectPhoneCountryInput],
      ["autocomplete", autocompletePhoneCountryInput],
    ] as const
  ).forEach(([countryInputName, countryInputProps]) => {
    (
      [
        ["default", {}],
        ["svg", { countryDisplayComponent: VPhoneCountryFlagSvg }],
        ["sprite", { countryDisplayComponent: VPhoneCountryFlagSprite }],
      ] as const
    ).forEach(([countryDisplayName, countryDisplayProps]) => {
      (["filled", "outlined", "solo", "plain", "underlined"] as const).forEach(
        (variant) => {
          (["default", "comfortable", "compact"] as const).forEach(
            (density) => {
              it(`matches visual snapshot (input=${countryInputName} display=${countryDisplayName} variant=${variant} density=${density}`, () => {
                tools.mount({
                  modelValue: "+33612346789",
                  ...countryInputProps,
                  ...countryDisplayProps,
                  variant,
                  density,
                });

                cy.compareSnapshot(
                  `v-phone-input-${countryInputName}-${countryDisplayName}-${variant}-${density}`,
                );
              });
            },
          );
        },
      );
    });
  });

  it("matches visual snapshot (custom slots)", () => {
    tools.mountInApp(h(SlotsPhoneInput));

    cy.compareSnapshot('v-phone-input-custom-slots');
  });
});
