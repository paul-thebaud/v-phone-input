import { mount } from "cypress/vue";
import { h } from "vue";
import CustomPhoneInput from "./CustomPhoneInput.vue";
import makePhoneInputTestTools from "./makePhoneInputTestTools";

export default makePhoneInputTestTools({
  name: "Composable",
  mount: (props?) =>
    mount({
      render: () =>
        h("div", [
          h(CustomPhoneInput, {
            country: props?.country,
            modelValue: props?.modelValue,
            ...props,
          }),
        ]),
    }),
  selectCountry: (country) => cy.get("#country").select(country),
  typePhone: (text) => cy.get("#phone").type(text),
  expectCountry: (country) => cy.get("#country").should("have.value", country),
  expectCountrySelectable: (country) =>
    cy.get("#country").get(`option[value="${country}"]`).should("exist"),
  expectCountryNotSelectable: (country) =>
    cy.get("#country").get(`option[value="${country}"]`).should("not.exist"),
  expectPhone: (text) => cy.get("#phone").should("have.value", text),
  expectError: (text) => {
    if (text) {
      cy.get("#error").contains(text);
    } else {
      cy.get("#error").should("be.empty");
    }
  },
});
