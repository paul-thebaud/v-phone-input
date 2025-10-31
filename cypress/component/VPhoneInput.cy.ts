/// <reference types="cypress" />
import { mount } from "cypress/vue";
import { h } from "vue";
import { createVuetify } from "vuetify";
import { VApp, VContainer, VMain } from "vuetify/components";
import { selectPhoneCountryInput, VPhoneInput } from "../../src";

import "vuetify/styles";

describe("VPhoneInput", () => {
  const vuetify = createVuetify();

  const mountPhoneInput = () =>
    mount(
      {
        render: () =>
          h(VApp, [
            h(VMain, [
              h(VContainer, [h(VPhoneInput, { ...selectPhoneCountryInput })]),
            ]),
          ]),
      },
      {
        global: {
          plugins: [vuetify],
        },
      },
    );

  it("mounts", () => {
    mountPhoneInput();

    cy.get('[data-test="phone-input"]').click();
    cy.get('[data-test="phone-input"]').type("0750123456");
    cy.screenshot();
  });
});
