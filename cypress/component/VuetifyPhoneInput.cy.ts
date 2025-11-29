import "vuetify/styles";
import { autocompletePhoneCountryInput } from "../../src";
import vuetifyPhoneInputTestTools from "../fixtures/vuetifyPhoneInputTestTools";

describe("VuetifyPhoneInput", () => {
  const tools = vuetifyPhoneInputTestTools;

  it("prohibits country clearing", () => {
    tools.mount({
      countryProps: {
        clearable: true,
        persistentClear: true,
      },
    });

    tools.selectCountry('FR');
    tools.expectCountry('FR');

    tools.countryInput().get(".v-field__clearable [role=\"button\"]").click();
    tools.expectCountry('FR');
  });

  it("searches country by name", () => {
    tools.mount({
      ...autocompletePhoneCountryInput,
    });

    tools.expectCountrySelectable('AF');
    tools.expectCountrySelectable('FR');

    tools.searchCountry('Fran');

    tools.expectCountryNotSelectable('AF');
    tools.expectCountrySelectable('FR');
  });

  it("searches country by dial code", () => {
    tools.mount({
      ...autocompletePhoneCountryInput,
    });

    tools.expectCountrySelectable('AF');
    tools.expectCountrySelectable('FR');

    tools.searchCountry('33');

    tools.expectCountryNotSelectable('AF');
    tools.expectCountrySelectable('FR');
  });
});
