import { mount } from "@vue/test-utils";
import { expect } from "vitest";
import { defineComponent, shallowRef } from "vue";
import { createVuetify } from "vuetify/framework";
import { createVPhoneInput, selectPhoneCountryInput, VPhoneInput } from "../../src";

describe("VPhoneInput", () => {
  const vuetify = createVuetify();

  test("mounts correctly without plugin", () => {
    const input = mount(VPhoneInput, {
      props: { ...selectPhoneCountryInput },
      global: {
        plugins: [vuetify],
      },
    });

    input
      .get('.v-phone-input__phone__input input[type="tel"]')
      .setValue("0750123456");

    expect(input.vm.phoneObject?.valid).toBeTruthy();
    expect(input.vm.phoneObject?.number?.input).toStrictEqual("0750123456");
  });

  test("mounts correctly with plugin", () => {
    const vPhoneInput = createVPhoneInput({
      ...selectPhoneCountryInput,
    });

    const Component = defineComponent({
      setup: () => ({ phoneInputRef: shallowRef() }),
      template: '<v-phone-input ref="phoneInputRef" />',
    });

    const input = mount(Component, {
      global: {
        plugins: [vuetify, vPhoneInput],
      },
    });

    input
      .get('.v-phone-input__phone__input input[type="tel"]')
      .setValue("0750123456");

    expect(input.vm.phoneInputRef.phoneObject?.valid).toBeTruthy();
    expect(input.vm.phoneInputRef.phoneObject?.number?.input).toStrictEqual(
      "0750123456",
    );
  });
});
